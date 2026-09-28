const universalSituations = new Set(["nongkrong", "lagi_makan", "lagi_nunggu", "baru_ketemu", "rame"]);

const relationshipAliases = {
  friends: ["friends", "family"],
  couple: ["couple", "pdk_t", "pasangan"],
  pdk_t: ["pdk_t", "couple", "new_people"],
  group: ["group", "rame_rame", "friends", "family"],
  new: ["new_people", "kenalan"],
  family: ["family", "friends", "group"],
};

const getAliases = (relationship) =>
  relationshipAliases[relationship] ?? relationshipAliases.friends;

export const fallbackFollowUps = {
  why: "Yang bikin kamu ngerasa begitu karena apa?",
  example: "Contoh paling nyata yang pernah kamu alami apa?",
  story: "Pernah ngalamin sendiri? Ceritain dong.",
  deeper: "Kalau dipikir-pikir, kenapa itu penting buat kamu?",
  reveal: "Jawaban jujurnya apa?",
  reaction: "Oke. Ada yang nggak setuju?",
  defend: "Nah, sekarang coba bela pendapatmu.",
};

const scoreQuestion = (question, state, config) => {
  const aliases = getAliases(state.relationship);
  let score = 0;
  if (question.experiences?.includes(state.mode)) score += 40;
  if (question.relationships?.some((item) => aliases.includes(item))) score += 20;
  if (!state.situation || question.situations?.includes(state.situation)) score += 15;
  else if (question.situations?.some((item) => universalSituations.has(item))) score += 5;
  if (Number.isFinite(question.depth) && Number.isFinite(state.depth)) {
    if (question.depth === state.depth) score += 12;
    else score -= Math.min(Math.abs(question.depth - state.depth) * 2, 8);
  }
  const playerCount = Number.isFinite(state.playerCount) ? state.playerCount : null;
  if (
    playerCount !== null &&
    question.minPlayers <= playerCount &&
    question.maxPlayers >= playerCount
  )
    score += 8;
  if (config?.archetypes?.includes(question.archetype)) score += 15;
  score += (question.vibes ?? []).filter((vibe) => state.selectedVibes?.includes(vibe)).length * 3;
  if (state.activeTopic && question.topics?.includes(state.activeTopic)) score += 8;
  if (state.recentTopics?.includes(question.topics?.[0])) score -= 5;
  if (state.recentArchetypes?.includes(question.archetype)) score -= 15;
  if (state.usedQuestionIds?.includes(question.id)) score -= 1000;
  if (state.mode === "rage_bait" && question.rageBait?.enabled) {
    const intensity = Number.isFinite(question.rageBait.intensity)
      ? question.rageBait.intensity
      : (state.rageIntensity ?? 2);
    score += Math.min(intensity, state.rageIntensity ?? 2) * 5;
  }
  if (state.mode === "rage_bait" && !question.rageBait?.enabled) score -= 12;
  return score;
};

export function selectQuestions(dataset, state, config) {
  const questions = dataset.questions ?? [];
  const compatible = questions.filter((question) => {
    const aliases = getAliases(state.relationship);
    const relationshipMatch = question.relationships?.some((item) => aliases.includes(item));
    const playerMatch =
      !Number.isFinite(state.playerCount) ||
      (question.minPlayers <= state.playerCount && question.maxPlayers >= state.playerCount);
    const depthCeiling = Number.isFinite(state.depth)
      ? Math.min(state.mode === "rage_bait" ? state.depth + 2 : state.depth + 1, 5)
      : 5;
    const depthMatch = !Number.isFinite(question.depth) || question.depth <= depthCeiling;
    const modeMatch = !state.mode || question.experiences?.includes(state.mode);
    const rageMatch = state.mode !== "rage_bait" || question.rageBait?.enabled === true;
    return relationshipMatch && playerMatch && depthMatch && modeMatch && rageMatch && !state.usedQuestionIds?.includes(question.id);
  });
  const fallbackCandidates = questions.filter((question) =>
    !state.usedQuestionIds?.includes(question.id) &&
    (state.mode !== "rage_bait" || question.rageBait?.enabled === true),
  );
  const pool = compatible.length ? compatible : fallbackCandidates;
  return [...pool]
    .sort((left, right) => scoreQuestion(right, state, config) - scoreQuestion(left, state, config))
    .map((question) => ({ id: question.id, text: question.text, metadata: question }));
}

export function getFallbackFollowUp(question, answer, move = "story") {
  const answerText = String(answer ?? "").trim();
  if (move === "defend") return fallbackFollowUps.defend;
  if (move === "reaction") return fallbackFollowUps.reaction;
  if (move === "deeper") return fallbackFollowUps.deeper;
  if (answerText.length < 8) return fallbackFollowUps.example;
  if (question?.followUpTypes?.includes("why")) return fallbackFollowUps.why;
  return fallbackFollowUps[question?.followUpTypes?.[0]] ?? fallbackFollowUps.story;
}

export function getNextMove(state, question) {
  const moves = state.allowedMoves ?? ["ask", "story", "new_topic"];
  const recent = state.recentMoves ?? [];
  const available = moves.filter((move) => !recent.slice(-2).includes(move));
  return available[0] ?? moves[0] ?? "ask";
}
