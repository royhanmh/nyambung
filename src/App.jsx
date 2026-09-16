import { useEffect, useMemo, useRef, useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiChevronDown,
  FiChevronRight,
  FiChevronUp,
  FiHeart,
  FiMoreVertical,
  FiSettings,
} from "react-icons/fi";
import brandWordmark from "./assets/brand/nyambung-wordmark.png";
import brandWordmarkDark from "./assets/brand/nyambung-wordmark-dark.png";
import questionDataset from "./data/nyambung-1000-questions-id-ID.json";
import { modeConfig, situationOptions } from "./data/conversation-config";
import {
  getFallbackFollowUp,
  getNextMove,
  selectQuestions,
} from "./engine/conversation-engine";

const primaryModeOptions = [
  { id: "nyambung", label: "NYAMBUNG", description: "Biar ngobrol ngalir." },
  {
    id: "rage_bait",
    label: "RAGE BAIT",
    description: "Bikin pengen nyanggah.",
  },
];

const getDefaultMode = ({ playMode, relationship, playerCount, situation }) => {
  if (playMode === "rage_bait") return "rage_bait";
  if (relationship === "group" || playerCount !== "1-1")
    return "most_likely_to";
  if (relationship === "pdk_t") return "soft_spot";
  if (relationship === "couple") {
    return situation === "malam" ? "future_us" : "soft_spot";
  }
  if (playerCount !== "1-1") return "worm_mode";
  const nyambungPools = {
    friends: ["easy_mode", "worm_mode", "pop_quiz", "red_flags"],
    new: ["easy_mode", "spill", "lore"],
    family: ["lore", "family", "spill", "easy_mode"],
    default: ["easy_mode", "worm_mode", "spill"],
  };
  const pool = nyambungPools[relationship] ?? nyambungPools.default;
  return pool[Math.floor(Math.random() * pool.length)];
};

const STORAGE_KEYS = {
  favorites: "nyambung.favoriteQuestions",
  settings: "nyambung.settings",
};

const defaultSettings = {
  vibration: true,
  sound: true,
  darkMode: false,
};

const readStorage = (key, fallback) => {
  if (typeof window === "undefined") return fallback;

  try {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
};

const writeStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {}
};

const readSavedQuestions = () => {
  const saved = readStorage(STORAGE_KEYS.favorites, []);
  return Array.isArray(saved) ? saved : [];
};

const readSettings = () => ({
  ...defaultSettings,
  ...(readStorage(STORAGE_KEYS.settings, defaultSettings) ?? {}),
});

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

const getOptionLabel = (options, id) =>
  options.find((option) => option.id === id)?.label ?? id;

const depthLabels = {
  1: "Ringan",
  2: "Santai",
  3: "Penasaran",
  4: "Personal",
  5: "Dalam",
};

const clamp = (value, minimum, maximum) =>
  Math.min(Math.max(value, minimum), maximum);

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function HeartIcon({ filled = false }) {
  return (
    <FiHeart
      className="heart-icon"
      aria-hidden="true"
      fill={filled ? "currentColor" : "none"}
      strokeWidth={1.8}
    />
  );
}

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

function NotFoundPage() {
  const notFoundWordmark = readSettings().darkMode
    ? brandWordmarkDark
    : brandWordmark;

  return (
    <main className="not-found-page">
      <img className="not-found-mark" src={notFoundWordmark} alt="nyambung" />
      <p className="eyebrow">Halaman tidak ditemukan</p>
      <h1>Obrolan ini nyasar.</h1>
      <p>Alamatnya tidak ada. Balik ke awal, lalu mulai lagi.</p>
      <a className="primary-button not-found-button" href="/">
        KEMBALI KE AWAL
      </a>
    </main>
  );
}

const shuffleArray = (items) => {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }

  return copy;
};

const buildQuestionBankLegacy = ({
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

const buildConversationQuestions = ({
  relationship,
  playerCount,
  situation,
  mode,
  depth,
  selectedVibes,
  questionHistory,
  rageIntensity,
}) => {
  const config = modeConfig[mode] ?? modeConfig.easy_mode;
  const state = {
    relationship,
    playerCount:
      playerCount === "1-1"
        ? 2
        : playerCount === "3-4"
          ? 4
          : playerCount === "5-8"
            ? 8
            : 10,
    situation,
    mode,
    depth,
    rageIntensity,
    selectedVibes,
    activeTopic: questionHistory.at(-1)?.metadata?.topics?.[0],
    recentTopics: questionHistory
      .slice(-4)
      .flatMap((item) => item.metadata?.topics ?? []),
    recentArchetypes: questionHistory
      .slice(-3)
      .map((item) => item.metadata?.archetype)
      .filter(Boolean),
    usedQuestionIds: questionHistory.map((item) => item.id),
  };

  return selectQuestions(questionDataset, state, config);
};

export default function App() {
  const [screen, setScreen] = useState("home");
  const [returnScreen, setReturnScreen] = useState("home");
  const [relationship, setRelationship] = useState("friends");
  const [playerCount, setPlayerCount] = useState("1-1");
  const [participantMode, setParticipantMode] = useState("pair");
  const [situation, setSituation] = useState("nongkrong");
  const [isSituationOpen, setIsSituationOpen] = useState(false);
  const [playMode, setPlayMode] = useState("nyambung");
  const [experience, setExperience] = useState("cair");
  const [mode, setMode] = useState("easy_mode");
  const [rageIntensity, setRageIntensity] = useState(2);
  const [selectedVibes, setSelectedVibes] = useState(["funny"]);
  const [depth, setDepth] = useState(2);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [sessionQuestions, setSessionQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [questionHistory, setQuestionHistory] = useState([]);
  const [lastAnswer, setLastAnswer] = useState(null);
  const [conversationMove, setConversationMove] = useState("ask");
  const [sessionNote, setSessionNote] = useState(
    "Biar obrolan tetap santai tapi nyambung.",
  );
  const [reportOpen, setReportOpen] = useState(false);
  const [expandedSavedId, setExpandedSavedId] = useState(null);
  const [savedQuestions, setSavedQuestions] = useState(readSavedQuestions);
  const [settings, setSettings] = useState(readSettings);
  const [isKebabOpen, setIsKebabOpen] = useState(false);
  const kebabRef = useRef(null);
  const [sessionMeta, setSessionMeta] = useState(null);
  const touchStartRef = useRef(null);
  const swipeExitTimerRef = useRef(null);
  const audioContextRef = useRef(null);
  const [swipeState, setSwipeState] = useState({
    x: 0,
    y: 0,
    phase: "idle",
  });
  const brandWordmarkForTheme = settings.darkMode
    ? brandWordmarkDark
    : brandWordmark;

  useEffect(
    () => () => {
      window.clearTimeout(swipeExitTimerRef.current);
      audioContextRef.current?.close();
    },
    [],
  );

  useEffect(() => {
    writeStorage(STORAGE_KEYS.favorites, savedQuestions);
  }, [savedQuestions]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.settings, settings);
  }, [settings]);

  useEffect(() => {
    document.documentElement.dataset.theme = settings.darkMode
      ? "dark"
      : "light";
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", settings.darkMode ? "#172c2a" : "#f5efe8");
  }, [settings.darkMode]);

  useEffect(() => {
    if (!isKebabOpen) return;
    const handleClick = (event) => {
      if (kebabRef.current && !kebabRef.current.contains(event.target)) {
        setIsKebabOpen(false);
      }
    };
    const handleKey = (event) => {
      if (event.key === "Escape") setIsKebabOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick, { passive: true });
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isKebabOpen]);

  useEffect(() => {
    setIsKebabOpen(false);
  }, [screen]);

  useEffect(() => {
    setExpandedSavedId(null);
  }, [screen]);

  const screenRef = useRef(screen);
  const returnScreenRef = useRef(returnScreen);
  const gameActionsRef = useRef(null);
  useEffect(() => {
    screenRef.current = screen;
  }, [screen]);
  useEffect(() => {
    returnScreenRef.current = returnScreen;
  }, [returnScreen]);

  useEffect(() => {
    gameActionsRef.current = { answer: animateAnswer, depth: animateDepth };
  });

  useEffect(() => {
    if (screen !== "game") return;
    const handleArrowKeys = (event) => {
      if (isKebabOpen || event.repeat) return;
      if (event.target instanceof HTMLElement) {
        const tag = event.target.tagName;
        if (
          tag === "INPUT" ||
          tag === "TEXTAREA" ||
          tag === "SELECT" ||
          event.target.isContentEditable
        )
          return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        gameActionsRef.current?.answer("next");
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        gameActionsRef.current?.answer("skip");
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        gameActionsRef.current?.depth(1);
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        gameActionsRef.current?.depth(-1);
      }
    };
    document.addEventListener("keydown", handleArrowKeys);
    return () => document.removeEventListener("keydown", handleArrowKeys);
  }, [screen, isKebabOpen]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.history) return;
    const initialHash = window.location.hash.replace("#", "");
    if (initialHash === "saved" || initialHash === "settings") {
      setReturnScreen("home");
      setScreen(initialHash);
      window.history.replaceState(
        { screen: initialHash, returnScreen: "home" },
        "",
        `#${initialHash}`,
      );
    } else {
      window.history.replaceState(
        { screen: "home", returnScreen: "home" },
        "",
        "#home",
      );
    }
    const handlePopState = (event) => {
      const state = event.state;
      const current = screenRef.current;
      const ret = returnScreenRef.current;
      if (current === "game") {
        setSessionNote(
          "Sesi kamu berhenti di sini. Kamu bisa mulai lagi kapan aja.",
        );
        setLastAnswer("Sesi selesai");
        setScreen("summary");
        window.history.pushState(
          { screen: "summary", returnScreen: ret },
          "",
          "#summary",
        );
        return;
      }
      if (current === "summary") {
        setScreen("home");
        window.history.pushState(
          { screen: "home", returnScreen: "home" },
          "",
          "#home",
        );
        return;
      }
      if (current === "setup") {
        setScreen("home");
        return;
      }
      if (current === "saved" || current === "settings") {
        setScreen(returnScreenRef.current ?? "home");
        return;
      }
      if (current === "home") {
        if (!state || !state.screen) {
          window.history.pushState(
            { screen: "home", returnScreen: "home" },
            "",
            "#home",
          );
        } else {
          setScreen(state.screen);
          if (state.returnScreen) setReturnScreen(state.returnScreen);
        }
        return;
      }
      if (state?.screen) {
        setScreen(state.screen);
        if (state.returnScreen) setReturnScreen(state.returnScreen);
      } else {
        setScreen("home");
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !window.history) return;
    const currentState = window.history.state;
    if (currentState?.screen === screen) return;
    if (screen === "home" && !currentState) return;
    window.history.pushState({ screen, returnScreen }, "", `#${screen}`);
  }, [screen, returnScreen]);

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
      situation,
      experience,
      mode,
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
      situation,
      experience,
      mode,
    ],
  );

  const currentQuestion =
    sessionQuestions[questionIndex] ?? sessionQuestions[0];
  const sessionProgress = Math.min(
    questionHistory.length + (screen === "game" && currentQuestion ? 1 : 0),
    Math.max(sessionQuestions.length, 1),
  );

  const toggleVibe = (id) => {
    setSelectedVibes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const openSetup = (nextRelationship = relationship) => {
    setRelationship(nextRelationship);
    const nextParticipantMode = nextRelationship === "group" ? "group" : "pair";
    setParticipantMode(nextParticipantMode);
    setPlayerCount(nextParticipantMode === "group" ? "3-4" : "1-1");
    setSituation("nongkrong");
    setIsSituationOpen(false);
    setPlayMode("nyambung");
    setExperience("cair");
    setMode("easy_mode");
    setDepth(2);
    setScreen("setup");
  };

  const handleParticipantMode = (nextMode) => {
    setParticipantMode(nextMode);
    setPlayerCount(nextMode === "pair" ? "1-1" : "3-4");
  };

  const startBebas = () => {
    const shuffled = shuffleArray(questionDataset.questions).map((q) => ({
      id: q.id,
      text: q.text,
      metadata: q,
    }));
    setRelationship("bebas");
    setSituation("acak");
    setMode("bebas");
    setPlayMode("nyambung");
    setSessionMeta({
      relationship: "bebas",
      situation: "acak",
      mode: "bebas",
      playerCount: "1-1",
      selectedVibes: [],
    });
    setQuestionIndex(0);
    setSessionQuestions(shuffled);
    setAnswers([]);
    setQuestionHistory([]);
    setLastAnswer(null);
    setConversationMove("ask");
    setSessionNote("Mode bebas. Semua soal diacak.");
    setScreen("game");
  };

  const openSecondaryScreen = (nextScreen) => {
    setReturnScreen(screen);
    setScreen(nextScreen);
  };

  const toggleFavorite = (question = currentQuestion) => {
    if (!question?.id || !question?.text) return;

    setSavedQuestions((previous) => {
      const alreadySaved = previous.some((item) => item.id === question.id);
      return alreadySaved
        ? previous.filter((item) => item.id !== question.id)
        : [...previous, { id: question.id, text: question.text }];
    });
  };

  const isFavorite = (question = currentQuestion) =>
    Boolean(
      question?.id && savedQuestions.some((item) => item.id === question.id),
    );

  const updateSetting = (key, value) => {
    setSettings((previous) => ({ ...previous, [key]: value }));
  };

  const triggerVibration = (duration = 20, enabled = settings.vibration) => {
    if (!enabled || typeof navigator === "undefined") return;
    if (typeof navigator.vibrate === "function") navigator.vibrate(duration);
  };

  const triggerTone = (
    frequency = 560,
    duration = 0.055,
    enabled = settings.sound,
  ) => {
    if (!enabled || typeof window === "undefined") return;

    const AudioContextConstructor =
      window.AudioContext || window.webkitAudioContext;
    if (!AudioContextConstructor) return;

    if (
      !audioContextRef.current ||
      audioContextRef.current.state === "closed"
    ) {
      audioContextRef.current = new AudioContextConstructor();
    }

    const audioContext = audioContextRef.current;
    const playTone = () => {
      const now = audioContext.currentTime;
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.035, now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      oscillator.connect(gain).connect(audioContext.destination);
      oscillator.start(now);
      oscillator.stop(now + duration);
    };

    if (audioContext.state === "suspended") {
      audioContext
        .resume()
        .then(playTone)
        .catch(() => {});
      return;
    }

    playTone();
  };

  const handleVibrationToggle = () => {
    const nextValue = !settings.vibration;
    updateSetting("vibration", nextValue);
    if (nextValue) triggerVibration(20, nextValue);
  };

  const handleSoundToggle = () => {
    const nextValue = !settings.sound;
    updateSetting("sound", nextValue);
    if (nextValue) triggerTone(660, 0.06, nextValue);
  };

  const handleResetData = () => {
    if (!window.confirm("Hapus semua pertanyaan favorit dan pengaturan?"))
      return;

    setSavedQuestions([]);
    setSettings(defaultSettings);
    setSelectedVibes(["funny"]);
    setDepth(2);
    setPlayerCount("1-1");
    setRelationship("friends");
    setParticipantMode("pair");
    setSituation("nongkrong");
    setIsSituationOpen(false);
    setPlayMode("nyambung");
    setExperience("cair");
    setMode("easy_mode");
    setRageIntensity(2);
  };

  const startSession = () => {
    const sessionMode = getDefaultMode({
      playMode,
      relationship,
      playerCount,
      situation,
    });
    const initialQuestions = buildConversationQuestions({
      relationship,
      playerCount,
      situation,
      mode: sessionMode,
      depth,
      selectedVibes,
      questionHistory: [],
      rageIntensity,
    });

    setQuestionIndex(0);
    setSessionQuestions(initialQuestions);
    setMode(sessionMode);
    setSessionMeta({
      relationship,
      situation,
      mode: sessionMode,
      playerCount,
      selectedVibes: [...selectedVibes],
    });
    setAnswers([]);
    setQuestionHistory([]);
    setLastAnswer(null);
    setConversationMove("ask");
    setSessionNote("Biar obrolan tetap santai tapi nyambung.");
    setScreen("game");
  };

  const nextQuestion = () => {
    const preparedQuestion = currentQuestion;
    if (!preparedQuestion) return;

    setQuestionHistory((prev) => [...prev, preparedQuestion]);

    const nextIndex = questionIndex + 1;

    if (nextIndex >= sessionQuestions.length) {
      setScreen("summary");
      return;
    }

    setQuestionIndex(nextIndex);
  };

  const handleAnswer = (answerValue) => {
    const answerText = answerValue === "skip" ? "Lewati" : "Lanjut";
    const nextMove =
      answerValue === "skip"
        ? "new_topic"
        : getNextMove(
            {
              allowedMoves: modeConfig[mode]?.moves,
              recentMoves: [conversationMove],
            },
            currentQuestion?.metadata,
          );
    const moodText =
      answerValue === "skip"
        ? "Kita lewati dulu. Cari pertanyaan yang lebih pas."
        : getFallbackFollowUp(currentQuestion?.metadata, answerValue, nextMove);

    setLastAnswer(answerText);
    setConversationMove(nextMove);
    setSessionNote(moodText);
    setAnswers((prev) => [...prev, answerValue]);

    nextQuestion();
  };

  const handleGestureStart = (event) => {
    if (swipeState.phase === "exiting") return;
    if (event.pointerType === "mouse" && event.button !== 0) return;

    event.currentTarget.setPointerCapture?.(event.pointerId);
    touchStartRef.current = {
      x: event.clientX,
      y: event.clientY,
      t: event.timeStamp ?? Date.now(),
    };
    setSwipeState({ x: 0, y: 0, phase: "dragging" });
  };

  const handleGestureMove = (event) => {
    if (!touchStartRef.current) return;

    const deltaX = event.clientX - touchStartRef.current.x;
    const deltaY = event.clientY - touchStartRef.current.y;
    const horizontal = Math.abs(deltaX) >= Math.abs(deltaY);
    setSwipeState({
      x: horizontal ? clamp(deltaX, -150, 150) : 0,
      y: horizontal ? 0 : clamp(deltaY, -110, 110),
      phase: "dragging",
    });
  };

  const settleCard = () => {
    setSwipeState({ x: 0, y: 0, phase: "settling" });
    window.clearTimeout(swipeExitTimerRef.current);
    swipeExitTimerRef.current = window.setTimeout(() => {
      setSwipeState({ x: 0, y: 0, phase: "idle" });
    }, prefersReducedMotion() ? 40 : 260);
  };

  const animateAnswer = (
    answerValue,
    exitX = answerValue === "skip" ? -460 : 460,
    exitY = 0,
  ) => {
    if (swipeState.phase === "exiting") return;

    triggerVibration();
    triggerTone(answerValue === "skip" ? 440 : 620);
    setSwipeState({ x: exitX, y: exitY, phase: "exiting" });
    window.clearTimeout(swipeExitTimerRef.current);
    swipeExitTimerRef.current = window.setTimeout(() => {
      handleAnswer(answerValue);
      setSwipeState({ x: 0, y: 0, phase: "idle" });
    }, prefersReducedMotion() ? 40 : 240);
  };

  const animateDepth = (direction) => {
    if (swipeState.phase === "exiting") return;

    const nextDepth = clamp(depth + direction, 1, 5);
    if (nextDepth === depth) {
      settleCard();
      return;
    }

    triggerVibration(14);
    triggerTone(direction > 0 ? 700 : 420, 0.045);
    setSwipeState({ x: 0, y: direction > 0 ? -180 : 180, phase: "exiting" });
    window.clearTimeout(swipeExitTimerRef.current);
    swipeExitTimerRef.current = window.setTimeout(() => {
      setDepth(nextDepth);
      setSessionNote(
        direction > 0
          ? "Kita masuk sedikit lebih dalam."
          : "Santai dulu. Cari yang lebih ringan.",
      );
      setSwipeState({ x: 0, y: 0, phase: "idle" });
    }, prefersReducedMotion() ? 40 : 230);
  };

  const handleGestureEnd = (event) => {
    if (
      !touchStartRef.current ||
      swipeState.phase === "exiting" ||
      swipeState.phase === "entering"
    )
      return;

    const start = touchStartRef.current;
    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    const dt = Math.max(
      16,
      (event.timeStamp ?? Date.now()) -
        (start.t ?? event.timeStamp ?? Date.now()),
    );
    const velocityX = deltaX / dt;
    const threshold = 48;
    touchStartRef.current = null;

    if (Math.abs(deltaX) < threshold && Math.abs(deltaY) < threshold) {
      settleCard();
      return;
    }

    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      animateDepth(deltaY < 0 ? 1 : -1);
      return;
    }

    const answerValue = deltaX < 0 ? "skip" : "next";
    const baseExit = 460;
    const velocityExit = Math.round(
      Math.min(560, Math.max(380, Math.abs(velocityX) * 320)),
    );
    const exitX = deltaX < 0 ? -velocityExit : velocityExit;

    animateAnswer(answerValue, exitX, 0);
  };

  const handleGestureCancel = () => {
    if (!touchStartRef.current) return;
    touchStartRef.current = null;
    settleCard();
  };

  const handleStopSession = () => {
    setReportOpen(false);
    setSessionNote(
      "Sesi kamu berhenti di sini. Kamu bisa mulai lagi kapan aja.",
    );
    setLastAnswer("Sesi selesai");
    setScreen("summary");
  };

  const handleBackNavigation = () => {
    if (screen === "saved" || screen === "settings") {
      setScreen(returnScreenRef.current ?? "home");
      return;
    }
    if (
      typeof window !== "undefined" &&
      window.history &&
      window.history.length > 1
    ) {
      window.history.back();
      return;
    }
    if (screen === "setup") {
      setScreen("home");
      return;
    }
  };

  const isKnownPath = ["/", "/index.html"].includes(window.location.pathname);

  if (!isKnownPath) {
    return <NotFoundPage />;
  }

  return (
    <div className={"app-shell" + (settings.darkMode ? " theme-dark" : "")}>
      <main className="page-shell">
        <div className="phone-frame">
          <header className="topbar">
            {screen !== "home" && screen !== "game" && screen !== "summary" && (
              <button
                type="button"
                className="topbar-back"
                aria-label="Kembali"
                onClick={handleBackNavigation}
              >
                <FiArrowLeft aria-hidden="true" />
              </button>
            )}
            <img
              className="brand-mark"
              src={brandWordmarkForTheme}
              alt="nyambung"
            />
            <div className="topbar-actions" ref={kebabRef}>
              <button
                type="button"
                className="topbar-kebab"
                aria-label="Menu"
                aria-expanded={isKebabOpen}
                aria-haspopup="menu"
                onClick={() => setIsKebabOpen((open) => !open)}
              >
                <FiMoreVertical aria-hidden="true" />
              </button>
              {isKebabOpen && (
                <div
                  className="kebab-menu"
                  role="menu"
                  aria-label="Menu pengaturan"
                >
                  <button
                    type="button"
                    className="kebab-item"
                    role="menuitem"
                    onClick={() => {
                      setIsKebabOpen(false);
                      openSecondaryScreen("saved");
                    }}
                  >
                    <FiHeart aria-hidden="true" />
                    Tersimpan
                  </button>
                  <button
                    type="button"
                    className="kebab-item"
                    role="menuitem"
                    onClick={() => {
                      setIsKebabOpen(false);
                      openSecondaryScreen("settings");
                    }}
                  >
                    <FiSettings aria-hidden="true" />
                    Pengaturan
                  </button>
                </div>
              )}
            </div>
          </header>

          {screen === "home" && (
            <>
              <section className="hero">
                <p className="eyebrow">Biar ngobrol tetap nyambung</p>
                <h1>Mau ngobrol sama siapa?</h1>
              </section>

              <section className="choice-list" aria-label="Pilih hubungan">
                {relationshipOptions.map((option) => {
                  return (
                    <button
                      key={option.id}
                      type="button"
                      className="option-card"
                      onClick={() => openSetup(option.id)}
                    >
                      <div className="option-copy">
                        <span className="option-label">{option.label}</span>
                        <span className="option-desc">{option.desc}</span>
                      </div>
                      <FiChevronRight
                        className="choice-arrow"
                        aria-hidden="true"
                      />
                    </button>
                  );
                })}
              </section>
              <button type="button" className="bebas-link" onClick={startBebas}>
                Lewati, langsung mulai
              </button>
            </>
          )}

          {screen === "setup" && (
            <div className="setup-screen">
              <h1 className="visually-hidden">Atur obrolan</h1>
              <section className="section-block experience-picker first-block">
                <h2>Pilih mode</h2>
                <div className="primary-mode-list">
                  {primaryModeOptions.map((option) => {
                    const active = playMode === option.id;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        className={`primary-mode-option ${option.id === "rage_bait" ? "is-rage" : ""} ${active ? "is-active" : ""}`}
                        aria-pressed={active}
                        onClick={() => {
                          setPlayMode(option.id);
                          setExperience("cair");
                          setMode(
                            option.id === "rage_bait"
                              ? "rage_bait"
                              : getDefaultMode({
                                  playMode: "nyambung",
                                  relationship,
                                  playerCount,
                                  situation,
                                }),
                          );
                        }}
                      >
                        <span>
                          <strong>{option.label}</strong>
                          <small>{option.description}</small>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>

              {relationship === "group" && (
                <section className="section-block">
                  <h2>Berapa orang?</h2>
                  <div
                    className="participant-count-list"
                    aria-label="Jumlah orang"
                  >
                    {playerCountOptions
                      .filter((option) => option.id !== "1-1")
                      .map((option) => {
                        const active = playerCount === option.id;

                        return (
                          <button
                            key={option.id}
                            type="button"
                            className={`participant-count ${active ? "is-active" : ""}`}
                            aria-pressed={active}
                            onClick={() => setPlayerCount(option.id)}
                          >
                            {option.label}
                          </button>
                        );
                      })}
                  </div>
                </section>
              )}

              <section className="section-block">
                <h2>Suasananya?</h2>
                <button
                  type="button"
                  className="disclosure-button"
                  aria-expanded={isSituationOpen}
                  aria-controls="situation-options"
                  onClick={() => setIsSituationOpen((open) => !open)}
                >
                  <span>
                    {
                      situationOptions.find((item) => item.id === situation)
                        ?.label
                    }{" "}
                    · ubah
                  </span>
                  {isSituationOpen ? (
                    <FiChevronUp aria-hidden="true" />
                  ) : (
                    <FiChevronDown aria-hidden="true" />
                  )}
                </button>
                {isSituationOpen && (
                  <div
                    className="disclosure-options"
                    id="situation-options"
                  >
                    {situationOptions.map((option) => {
                      const active = situation === option.id;

                      return (
                        <button
                          key={option.id}
                          type="button"
                          className={`chip ${active ? "is-active" : ""}`}
                          aria-pressed={active}
                          onClick={() => {
                            setSituation(option.id);
                            setIsSituationOpen(false);
                          }}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </section>

              <p className="setup-summary">
                {getOptionLabel(relationshipOptions, relationship)} ·{" "}
                {situationOptions.find((item) => item.id === situation)?.label}{" "}
                · {playMode === "rage_bait" ? "Rage Bait" : "Nyambung"}
              </p>

              <div className="spacer" />

              <div className="setup-actions">
                <button
                  type="button"
                  className="primary-button"
                  onClick={startSession}
                >
                  MULAI AJA
                </button>
              </div>
            </div>
          )}

          {screen === "game" && (
            <>
              <h1 className="visually-hidden">Pertanyaan</h1>
              <div className={`question-stack is-${swipeState.phase}`}>
                <div className="stack-card stack-2" aria-hidden="true" inert>
                  <button
                    type="button"
                    className={
                      "favorite-button" +
                      (isFavorite(
                        sessionQuestions[questionIndex + 2] ??
                          sessionQuestions[questionIndex + 1],
                      )
                        ? " is-active"
                        : "")
                    }
                    aria-label={
                      isFavorite(
                        sessionQuestions[questionIndex + 2] ??
                          sessionQuestions[questionIndex + 1],
                      )
                        ? "Hapus dari tersimpan"
                        : "Simpan pertanyaan"
                    }
                    aria-pressed={isFavorite(
                      sessionQuestions[questionIndex + 2] ??
                        sessionQuestions[questionIndex + 1],
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(
                        sessionQuestions[questionIndex + 2] ??
                          sessionQuestions[questionIndex + 1],
                      );
                    }}
                  >
                    <HeartIcon
                      filled={isFavorite(
                        sessionQuestions[questionIndex + 2] ??
                          sessionQuestions[questionIndex + 1],
                      )}
                    />
                    {isFavorite(
                      sessionQuestions[questionIndex + 2] ??
                        sessionQuestions[questionIndex + 1],
                    )
                      ? "Tersimpan"
                      : "Simpan"}
                  </button>
                  <p>
                    {sessionQuestions[questionIndex + 2]?.text ??
                      sessionQuestions[questionIndex + 1]?.text ??
                      ""}
                  </p>
                </div>
                <div className="stack-card stack-1" aria-hidden="true" inert>
                  <button
                    type="button"
                    className={
                      "favorite-button" +
                      (isFavorite(sessionQuestions[questionIndex + 1])
                        ? " is-active"
                        : "")
                    }
                    aria-label={
                      isFavorite(sessionQuestions[questionIndex + 1])
                        ? "Hapus dari tersimpan"
                        : "Simpan pertanyaan"
                    }
                    aria-pressed={isFavorite(
                      sessionQuestions[questionIndex + 1],
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(sessionQuestions[questionIndex + 1]);
                    }}
                  >
                    <HeartIcon
                      filled={isFavorite(sessionQuestions[questionIndex + 1])}
                    />
                    {isFavorite(sessionQuestions[questionIndex + 1])
                      ? "Tersimpan"
                      : "Simpan"}
                  </button>
                  <p>{sessionQuestions[questionIndex + 1]?.text ?? ""}</p>
                </div>
                <section
                  key={currentQuestion?.id ?? `q-${questionIndex}`}
                  className={`question-card is-${swipeState.phase}`}
                  style={{
                    "--swipe-x": `${swipeState.x}px`,
                    "--swipe-y": `${swipeState.y}px`,
                    "--swipe-rotate": `${clamp(swipeState.x / 18, -8, 8)}deg`,
                    "--swipe-opacity": "1",
                  }}
                  onPointerDown={handleGestureStart}
                  onPointerMove={handleGestureMove}
                  onPointerUp={handleGestureEnd}
                  onPointerCancel={handleGestureCancel}
                >
                  <button
                    type="button"
                    className={
                      "favorite-button" + (isFavorite() ? " is-active" : "")
                    }
                    aria-label={
                      isFavorite()
                        ? "Hapus dari tersimpan"
                        : "Simpan pertanyaan"
                    }
                    aria-pressed={isFavorite()}
                    onPointerDown={(event) => event.stopPropagation()}
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleFavorite();
                    }}
                  >
                    <HeartIcon filled={isFavorite()} />
                    {isFavorite() ? "Tersimpan" : "Simpan"}
                  </button>

                  <h2>{currentQuestion?.text ?? currentQuestion}</h2>
                </section>
              </div>

              <div className="gesture-hint" aria-label="Petunjuk gesture">
                <FiArrowLeft aria-hidden="true" />
                <span>Swipe</span>
                <FiArrowRight aria-hidden="true" />
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
              <section className="summary-card thank-you">
                <p className="eyebrow">Sesi selesai</p>
                <h1>Udah nyambung.</h1>
                <p className="thank-lede">
                  {answers.length > 0
                    ? `Kalian buka ${answers.length} topik hari ini${savedQuestions.length > 0 ? `, ${savedQuestions.length} tersimpan` : ""}. Yang mau diingat, simpan aja.`
                    : "Gak apa. Ngobrolnya udah cukup buat hari ini."}
                </p>
              </section>

              <button
                type="button"
                className="primary-button summary-restart"
                onClick={() => setScreen("home")}
              >
                MULAI BARU
              </button>
            </>
          )}

          {screen === "saved" && (
            <>
              <section className="secondary-page-heading">
                <p className="eyebrow">Koleksi kamu</p>
                <h1>Pertanyaan tersimpan</h1>
                <p>Balik lagi ke pertanyaan yang rasanya pas.</p>
              </section>

              {savedQuestions.length > 0 ? (
                <section
                  className="saved-list"
                  aria-label="Pertanyaan tersimpan"
                >
                  {savedQuestions.map((question) => {
                    const isOpen = expandedSavedId === question.id;

                    return (
                      <article
                        className={
                          "saved-item" + (isOpen ? " is-open" : "")
                        }
                        key={question.id}
                      >
                        <button
                          type="button"
                          className="saved-open"
                          aria-expanded={isOpen}
                          aria-label={
                            isOpen
                              ? "Tutup pertanyaan lengkap"
                              : "Lihat pertanyaan lengkap"
                          }
                          onClick={() =>
                            setExpandedSavedId(isOpen ? null : question.id)
                          }
                        >
                          <span aria-hidden="true">{question.text}</span>
                        </button>
                        <button
                          type="button"
                          className="saved-remove"
                          aria-label="Hapus pertanyaan dari tersimpan"
                          onClick={() => toggleFavorite(question)}
                        >
                          <HeartIcon filled />
                        </button>
                      </article>
                    );
                  })}
                </section>
              ) : (
                <section className="empty-state">
                  <h2>Belum ada yang disimpan.</h2>
                  <p>Kalau ada pertanyaan yang terasa pas, tekan hati.</p>
                </section>
              )}
            </>
          )}

          {screen === "settings" && (
            <>
              <section className="secondary-page-heading">
                <p className="eyebrow">Atur seperlunya</p>
                <h1>Pengaturan</h1>
                <p>Beberapa pilihan kecil biar Nyambung terasa pas.</p>
              </section>

              <section
                className="settings-list"
                aria-label="Pengaturan aplikasi"
              >
                <div className="setting-row">
                  <div>
                    <h2>Getaran</h2>
                    <p>
                      Getar kecil saat kamu memilih atau menggeser pertanyaan.
                    </p>
                  </div>
                  <button
                    type="button"
                    className={
                      "toggle" + (settings.vibration ? " is-active" : "")
                    }
                    role="switch"
                    aria-label="Getaran"
                    aria-checked={settings.vibration}
                    onClick={handleVibrationToggle}
                  >
                    {settings.vibration ? "Nyala" : "Mati"}
                  </button>
                </div>
                <div className="setting-row">
                  <div>
                    <h2>Suara</h2>
                    <p>
                      Tone pendek saat kamu memilih atau menggeser pertanyaan.
                    </p>
                  </div>
                  <button
                    type="button"
                    className={"toggle" + (settings.sound ? " is-active" : "")}
                    role="switch"
                    aria-label="Suara"
                    aria-checked={settings.sound}
                    onClick={handleSoundToggle}
                  >
                    {settings.sound ? "Nyala" : "Mati"}
                  </button>
                </div>
                <div className="setting-row">
                  <div>
                    <h2>Mode gelap</h2>
                    <p>Ganti tampilan saat layar terasa terlalu terang.</p>
                  </div>
                  <button
                    type="button"
                    className={
                      "toggle" + (settings.darkMode ? " is-active" : "")
                    }
                    role="switch"
                    aria-label="Mode gelap"
                    aria-checked={settings.darkMode}
                    onClick={() =>
                      updateSetting("darkMode", !settings.darkMode)
                    }
                  >
                    {settings.darkMode ? "Nyala" : "Mati"}
                  </button>
                </div>
              </section>

              <button
                type="button"
                className="reset-button"
                onClick={handleResetData}
              >
                RESET APLIKASI
              </button>

              <footer className="settings-footer">
                created by{" "}
                <a
                  href="https://royhanmh.netlify.app/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  royhanmh
                </a>
              </footer>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
