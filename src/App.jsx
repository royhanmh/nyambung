import { useMemo, useRef, useState } from "react";
import brandWordmark from "./assets/brand/nyambung-wordmark.png";
import questionDataset from "./data/nyambung-500-questions-id-ID.json";

const relationshipOptions = [
  { id: "friends", label: "Teman", desc: "Sering nongkrong & seru-seruan" },
  { id: "couple", label: "Pasangan", desc: "Bikin hubungan makin deket" },
  { id: "pdk_t", label: "PDKT", desc: "Buka percakapan yang makin nyaman" },
  { id: "group", label: "Rame-rame", desc: "Cairin suasana biar akrab" },
  { id: "new", label: "Baru kenal", desc: "Kenalan santai tanpa canggung" },
  { id: "family", label: "Keluarga", desc: "Nyaman, hangat, nostalgia" },
];

const playerCountOptions = [
  { id: "1-1", label: "Aku + 1 orang" },
  { id: "3-4", label: "3–4 orang" },
  { id: "5-8", label: "5–8 orang" },
  { id: "any", label: "Nggak mau ribet" },
];

const vibeOptions = [
  { id: "funny", label: "Receh" },
  { id: "deep", label: "Dalam" },
  { id: "nostalgia", label: "Nostalgia" },
  { id: "personal", label: "Personal" },
];

const relationshipAliasMap = {
  friends: ["friends", "family"],
  couple: ["couple", "pdk_t", "pasangan"],
  pdk_t: ["pdk_t", "couple", "new_people"],
  group: ["group", "rame_rame", "family"],
  new: ["new_people", "kenalan"],
  family: ["family", "friends", "group"],
};

const vibeCategoryMap = {
  funny: ["receh", "kenalan", "penasaran", "berani"],
  deep: ["dalam", "personal", "penasaran", "berani"],
  nostalgia: ["nostalgia", "kenalan"],
  personal: ["personal", "dalam"],
};

const fallbackQuestionBank = {
  friends: [
    "Kalau ngobrol santai, topik paling gampang bikin kamu ketawa itu apa?",
    "Hal paling absurd yang pernah kamu percaya waktu kecil apa?",
    "Apa kebiasaan orang lain yang ternyata bikin kamu nyaman?",
    "Kapan terakhir kali kamu ngerasa benar-benar nyambung sama teman?",
  ],
  couple: [
    "Momen paling 'wah, dia beda' itu kapan buat kamu?",
    "Hal kecil yang bikin kamu ngerasa dicintai itu apa?",
    "Kalau ada satu sifat yang mau kamu ubah dari diri kita, apa itu?",
    "Apa yang bikin kamu ngerasa aman sama hubungan ini?",
  ],
  group: [
    "Siapa yang paling sering bikin suasana group kaku tapi lucu?",
    "Kalau ada trip bareng, destinasi paling cocok buat grup kita apa?",
    "Di group ini, siapa yang paling gampang nyambung sama orang baru?",
    "Kriteria 'kompak' buat grup kita itu apa sih?",
  ],
  new: [
    "Hal pertama yang bikin kamu merasa nyaman sama orang baru itu apa?",
    "Pernah nggak ada orang yang awalnya asing tapi jadi gampang diajak ngobrol?",
    "Menurut kamu, cara paling natural mulai obrolan itu gimana?",
    "Apa topik yang paling gampang bikin kamu terbuka tanpa canggung?",
  ],
};

const shuffleArray = (items) => {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }

  return copy;
};

const buildQuestionBank = ({
  relationshipId,
  selectedVibes,
  depth,
  usedQuestions,
  previousQuestions,
  recentAnswers = [],
}) => {
  const aliases =
    relationshipAliasMap[relationshipId] ?? relationshipAliasMap.friends;
  const recentAnswer = recentAnswers[recentAnswers.length - 1];
  const answerMoodBoost =
    recentAnswer === "nyambung"
      ? ["personal", "dalam", "berani"]
      : recentAnswer === "skip"
        ? ["kenalan", "receh", "penasaran"]
        : [];

  const chosenCategories = [
    ...new Set([
      ...selectedVibes.flatMap((vibeId) => vibeCategoryMap[vibeId] ?? []),
      ...answerMoodBoost,
    ]),
  ];

  const filteredQuestions = questionDataset.questions.filter((question) => {
    const relationshipMatch = question.relationships?.some((relationship) =>
      aliases.includes(relationship),
    );
    const categoryMatch = chosenCategories.includes(question.category);
    const depthMatch = question.depth <= depth;
    const notUsed = !usedQuestions.has(question.id);
    const notRepeating = !previousQuestions.includes(question.text);

    return (
      relationshipMatch &&
      categoryMatch &&
      depthMatch &&
      notUsed &&
      notRepeating
    );
  });

  if (filteredQuestions.length > 0) {
    const rankedQuestions = filteredQuestions
      .map((question) => {
        const categoryScore = chosenCategories.includes(question.category)
          ? 3
          : 0;
        const vibeScore = question.vibes?.filter((vibe) =>
          [...selectedVibes, ...answerMoodBoost].includes(vibe),
        ).length;
        const depthScore = Math.max(0, depth - question.depth + 1);
        const recencyScore =
          recentAnswer === "nyambung" && question.category === "personal"
            ? 2
            : recentAnswer === "skip" && question.category === "receh"
              ? 2
              : 0;

        return {
          question,
          score: categoryScore + (vibeScore ?? 0) + depthScore + recencyScore,
        };
      })
      .sort((first, second) => second.score - first.score);

    return shuffleArray(rankedQuestions).map(({ question }) => ({
      id: question.id,
      text: question.text,
    }));
  }

  return shuffleArray(
    (fallbackQuestionBank[relationshipId] ?? fallbackQuestionBank.friends).map(
      (text, index) => ({ id: `fallback-${relationshipId}-${index}`, text }),
    ),
  );
};

export default function App() {
  const [screen, setScreen] = useState("home");
  const [relationship, setRelationship] = useState("friends");
  const [playerCount, setPlayerCount] = useState("1-1");
  const [selectedVibes, setSelectedVibes] = useState(["funny"]);
  const [depth, setDepth] = useState(2);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [questionHistory, setQuestionHistory] = useState([]);
  const [lastAnswer, setLastAnswer] = useState(null);
  const [sessionNote, setSessionNote] = useState(
    "Biar obrolan tetap santai tapi nyambung.",
  );
  const [reportOpen, setReportOpen] = useState(false);
  const touchStartRef = useRef(null);

  const usedQuestions = useMemo(
    () => new Set(questionHistory.map((item) => item.id)),
    [questionHistory],
  );

  const previousQuestions = useMemo(
    () => questionHistory.map((item) => item.text),
    [questionHistory],
  );

  const conversationContext = useMemo(
    () => ({
      language: "id-ID",
      relationship,
      playerCount,
      vibes: selectedVibes,
      depth,
      previousQuestions,
      previousAnswers: answers,
      skippedQuestions: [],
      topics: selectedVibes,
      sessionDuration: answers.length * 30,
      preferredQuestionTypes: selectedVibes,
    }),
    [
      relationship,
      playerCount,
      selectedVibes,
      depth,
      previousQuestions,
      answers,
    ],
  );

  const currentQuestions = useMemo(
    () =>
      buildQuestionBank({
        relationshipId: relationship,
        selectedVibes,
        depth,
        usedQuestions,
        previousQuestions,
        recentAnswers: answers,
      }),
    [
      relationship,
      selectedVibes,
      depth,
      usedQuestions,
      previousQuestions,
      answers,
    ],
  );

  const currentQuestion =
    currentQuestions[questionIndex] ?? currentQuestions[0];
  const sessionProgress = Math.min(
    questionHistory.length + (screen === "game" && currentQuestion ? 1 : 0),
    Math.max(currentQuestions.length, 1),
  );

  const toggleVibe = (id) => {
    setSelectedVibes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const startSession = () => {
    setQuestionIndex(0);
    setAnswers([]);
    setQuestionHistory([]);
    setLastAnswer(null);
    setSessionNote("Biar obrolan tetap santai tapi nyambung.");
    setScreen("game");
  };

  const nextQuestion = () => {
    const preparedQuestion = currentQuestion;
    setQuestionHistory((prev) => [...prev, preparedQuestion]);

    const nextIndex = questionIndex + 1;

    if (nextIndex >= currentQuestions.length) {
      setScreen("summary");
      return;
    }

    setQuestionIndex(nextIndex);
  };

  const handleAnswer = (answerValue) => {
    const answerText = answerValue === "nyambung" ? "Nyambung" : "Lewati";
    const moodText =
      answerValue === "nyambung"
        ? "Kamu nyambung, jadi gue arahkan ke detail yang lebih dekat."
        : "Kamu mau santai dulu, jadi gue bikin pertanyaan yang lebih ringan.";

    setLastAnswer(answerText);
    setSessionNote(moodText);
    setAnswers((prev) => [...prev, answerValue]);
    nextQuestion();
  };

  const handleGestureStart = (event) => {
    touchStartRef.current = {
      x: event.clientX,
      y: event.clientY,
    };
  };

  const handleGestureEnd = (event) => {
    if (!touchStartRef.current) return;

    const deltaX = event.clientX - touchStartRef.current.x;
    const deltaY = event.clientY - touchStartRef.current.y;
    const threshold = 45;

    if (Math.abs(deltaX) < threshold && Math.abs(deltaY) < threshold) {
      touchStartRef.current = null;
      return;
    }

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      handleAnswer(deltaX < 0 ? "nyambung" : "skip");
    }

    touchStartRef.current = null;
  };

  const handleStopSession = () => {
    setReportOpen(false);
    setSessionNote(
      "Sesi kamu berhenti di sini. Kamu bisa mulai lagi kapan aja.",
    );
    setLastAnswer("Sesi selesai");
    setScreen("summary");
  };

  return (
    <main className="page-shell">
      <div className="phone-frame">
        <header className="topbar">
          <img className="brand-mark" src={brandWordmark} alt="nyambung" />
        </header>

        {screen === "home" && (
          <>
            <section className="hero">
              <p className="eyebrow">Biar ngobrol tetap nyambung</p>
              <h1>Mau ngobrol sama siapa?</h1>
            </section>

            <section className="choice-list" aria-label="Pilih hubungan">
              {relationshipOptions.map((option) => {
                const active = relationship === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    className={`option-card ${active ? "is-active" : ""}`}
                    aria-pressed={active}
                    onClick={() => setRelationship(option.id)}
                  >
                    <span className="option-number" aria-hidden="true">
                      {String(relationshipOptions.indexOf(option) + 1).padStart(2, "0")}
                    </span>
                    <div className="option-copy">
                      <span className="option-label">{option.label}</span>
                      <span className="option-desc">{option.desc}</span>
                    </div>
                    <span
                      className={`dot ${active ? "show" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </section>

            <div className="spacer" />

            <button
              type="button"
              className="primary-button"
              onClick={() => setScreen("setup")}
            >
              MULAI
            </button>

            <nav className="meta-links" aria-label="Navigasi tambahan">
              <button type="button">Tersimpan</button>
              <button type="button">Pengaturan</button>
            </nav>
          </>
        )}

        {screen === "setup" && (
          <>
            <section className="section-block first-block">
              <h2>Siapa aja yang ikut?</h2>
              <div className="segmented-grid">
                {playerCountOptions.map((option) => {
                  const active = playerCount === option.id;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      className={`segment ${active ? "is-active" : ""}`}
                      onClick={() => setPlayerCount(option.id)}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="section-block">
              <h2>Pilih vibe</h2>
              <div className="chip-list">
                {vibeOptions.map((vibe) => {
                  const active = selectedVibes.includes(vibe.id);

                  return (
                    <button
                      key={vibe.id}
                      type="button"
                      className={`chip ${active ? "is-active" : ""}`}
                      onClick={() => toggleVibe(vibe.id)}
                    >
                      {vibe.label}
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="section-block">
              <h2>Sedalam apa obrolannya?</h2>
              <input
                type="range"
                min="1"
                max="5"
                value={depth}
                onChange={(event) => setDepth(Number(event.target.value))}
                className="depth-slider"
                aria-label="Tingkat kedalaman obrolan"
              />
              <div className="depth-readout">Level {depth}</div>
            </section>

            <div className="spacer" />

            <div className="setup-actions">
              <button
                type="button"
                className="primary-button"
                onClick={startSession}
              >
                LANJUT
              </button>
              <button
                type="button"
                className="ghost-button"
                onClick={() => setScreen("home")}
              >
                KEMBALI
              </button>
            </div>
          </>
        )}

        {screen === "game" && (
          <>
            <section
              className="question-card"
              onPointerDown={handleGestureStart}
              onPointerUp={handleGestureEnd}
              onTouchStart={(event) => handleGestureStart(event.touches[0])}
              onTouchEnd={(event) => handleGestureEnd(event.changedTouches[0])}
            >
              <div className="question-meta">
                <span>
                  {
                    relationshipOptions.find((item) => item.id === relationship)
                      ?.label
                  }
                </span>
                <span>Level {depth}</span>
              </div>

              <h2>{currentQuestion?.text ?? currentQuestion}</h2>
            </section>

            <div className="prompt-note" aria-live="polite">
              {lastAnswer ? `${lastAnswer}: ${sessionNote}` : sessionNote}
            </div>

            <div className="gesture-hint" aria-label="Petunjuk gesture">
              <span>← Lewati</span>
              <span>Lanjut →</span>
            </div>

            <div className="answer-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => handleAnswer("skip")}
              >
                Lewati
              </button>
              <button
                type="button"
                className="secondary-button"
                onClick={() => handleAnswer("nyambung")}
              >
                Nyambung
              </button>
            </div>

            <div className="spacer" />

            <button
              type="button"
              className="ghost-button"
              onClick={handleStopSession}
            >
              Berhenti
            </button>
          </>
        )}

        {screen === "summary" && (
          <>
            <section className="summary-card">
              <p className="eyebrow">Sesi selesai</p>
              <h2>Obrolan kamu udah jalan.</h2>
              <ul>
                <li>
                  Hubungan:{" "}
                  {
                    relationshipOptions.find((item) => item.id === relationship)
                      ?.label
                  }
                </li>
                <li>Jumlah: {playerCount}</li>
                <li>Vibe: {selectedVibes.join(", ") || "campur"}</li>
                <li>Jawaban: {answers.length}</li>
                <li>
                  Context: {conversationContext.relationship} /{" "}
                  {conversationContext.depth}
                </li>
              </ul>
            </section>

            <div className="spacer" />

            <button
              type="button"
              className="primary-button"
              onClick={() => setScreen("home")}
            >
              MULAI BARU
            </button>
          </>
        )}
      </div>
    </main>
  );
}
