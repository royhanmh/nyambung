export const relationshipOptions = [
  { id: "friends", label: "Teman", desc: "Sering nongkrong & seru-seruan" },
  { id: "couple", label: "Pasangan", desc: "Bikin hubungan makin deket" },
  { id: "pdk_t", label: "PDKT", desc: "Buka percakapan yang makin nyaman" },
  { id: "group", label: "Rame-rame", desc: "Cairin suasana biar akrab" },
  { id: "new", label: "Baru kenal", desc: "Kenalan santai tanpa canggung" },
  { id: "family", label: "Keluarga", desc: "Nyaman, hangat, nostalgia" },
];

export const playerCountOptions = [
  { id: "1-1", label: "Aku + 1 orang" },
  { id: "3-4", label: "3–4 orang" },
  { id: "5-8", label: "5–8 orang" },
  { id: "any", label: "Nggak mau ribet" },
];

export const situationOptions = [
  { id: "nongkrong", label: "Nongkrong" },
  { id: "lagi_makan", label: "Lagi makan" },
  { id: "baru_ketemu", label: "Baru ketemu" },
  { id: "jalan", label: "Lagi jalan" },
  { id: "malam", label: "Malam-malam" },
  { id: "lagi_nunggu", label: "Lagi nunggu" },
  { id: "berdua", label: "Cuma berdua" },
  { id: "rame", label: "Lagi rame" },
  { id: "first_date", label: "First date" },
  { id: "road_trip", label: "Road trip" },
  { id: "reuni", label: "Reuni" },
];

export const experienceGroups = [
  {
    id: "cair",
    label: "Biar Cair",
    description: "Mulai tanpa mikir panjang.",
    modes: ["easy_mode", "worm_mode", "hot_takes", "rage_bait", "pop_quiz", "red_flags"],
  },
  {
    id: "rame",
    label: "Biar Rame",
    description: "Buat yang suka tunjuk-tunjukan.",
    modes: ["most_likely_to", "would_you_rather", "never_have_i_ever", "pass_the_phone"],
  },
  {
    id: "dekat",
    label: "Makin Dekat",
    description: "Pelan-pelan kenal lebih jauh.",
    modes: ["situationship", "spill", "soft_spot", "lore", "future_us", "origin_story", "family"],
  },
  {
    id: "heart",
    label: "Heart to Heart",
    description: "Kalau sudah siap cerita.",
    modes: ["3am", "dealbreakers", "clingy", "after_a_fight", "heavy_stuff", "money_talks"],
  },
];

export const vibeOptions = [
  { id: "funny", label: "Receh" },
  { id: "deep", label: "Dalam" },
  { id: "nostalgia", label: "Nostalgia" },
  { id: "personal", label: "Personal" },
];

export const depthLabels = {
  1: "Santai",
  2: "Ringan",
  3: "Penasaran",
  4: "Personal",
  5: "Dalam",
};

export const moveLabels = {
  ask: "Tanya",
  follow_up: "Tanya lagi",
  go_deeper: "Lebih dalam",
  deeper: "Lebih dalam",
  go_lighter: "Santai dulu",
  scenario: "Skenario",
  debate: "Debat",
  defend: "Bela pendapatmu",
  story: "Ceritain",
  vote: "Pilih",
  point: "Tunjuk orangnya",
  guess: "Tebak",
  reveal: "Buka jawaban",
  rank: "Urutkan",
  new_topic: "Ganti topik",
  reaction: "Reaksi",
};

export const modeConfig = {
  bebas: { group: "cair", label: "Bebas", moves: ["ask", "story", "new_topic"], archetypes: ["open", "story"] },
  easy_mode: { group: "cair", label: "Easy Mode", moves: ["ask", "story", "new_topic"], archetypes: ["open", "story"] },
  worm_mode: { group: "cair", label: "Worm Mode", moves: ["ask", "guess", "reaction"], archetypes: ["scenario", "guess"] },
  hot_takes: { group: "cair", label: "Hot Takes", moves: ["ask", "debate", "reaction"], archetypes: ["reflection", "forced_choice"] },
  rage_bait: { group: "cair", label: "Rage Bait", moves: ["ask", "debate", "defend", "reaction", "story"], archetypes: ["reflection", "forced_choice", "ranking_war", "vote"] },
  pop_quiz: { group: "cair", label: "Pop Quiz", moves: ["guess", "reveal", "reaction"], archetypes: ["guess", "vote"] },
  red_flags: { group: "cair", label: "Red Flags", moves: ["ask", "debate", "reaction"], archetypes: ["reflection", "forced_choice"] },
  most_likely_to: { group: "rame", label: "Most Likely To", moves: ["point", "reaction", "story"], archetypes: ["point", "vote"] },
  would_you_rather: { group: "rame", label: "Would You Rather", moves: ["vote", "defend", "reaction"], archetypes: ["forced_choice", "would_you_rather"] },
  never_have_i_ever: { group: "rame", label: "Never Have I Ever", moves: ["reveal", "story", "reaction"], archetypes: ["confession"] },
  pass_the_phone: { group: "rame", label: "Pass the Phone", moves: ["point", "reveal", "reaction"], archetypes: ["point", "confession"] },
  situationship: { group: "dekat", label: "Situationship", moves: ["ask", "story", "deeper"], archetypes: ["reflection", "confession"] },
  spill: { group: "dekat", label: "Spill", moves: ["reveal", "story", "reaction"], archetypes: ["confession", "story"] },
  soft_spot: { group: "dekat", label: "Soft Spot", moves: ["ask", "story", "deeper"], archetypes: ["open", "reflection"] },
  lore: { group: "dekat", label: "Lore", moves: ["story", "follow_up", "new_topic"], archetypes: ["story", "open"] },
  future_us: { group: "dekat", label: "Future Us", moves: ["ask", "scenario", "deeper"], archetypes: ["scenario", "reflection"] },
  origin_story: { group: "dekat", label: "Origin Story", moves: ["story", "follow_up", "deeper"], archetypes: ["story", "open"] },
  family: { group: "dekat", label: "Family", moves: ["story", "reveal", "deeper"], archetypes: ["story", "reflection"] },
  "3am": { group: "heart", label: "3AM", moves: ["ask", "deeper", "story"], archetypes: ["reflection", "open"] },
  dealbreakers: { group: "heart", label: "Dealbreakers", moves: ["ask", "debate", "defend"], archetypes: ["reflection", "forced_choice"] },
  clingy: { group: "heart", label: "Clingy", moves: ["ask", "story", "reaction"], archetypes: ["reflection", "confession"] },
  after_a_fight: { group: "heart", label: "After a Fight", moves: ["story", "deeper", "reaction"], archetypes: ["reflection", "story"] },
  heavy_stuff: { group: "heart", label: "Heavy Stuff", moves: ["ask", "deeper", "story"], archetypes: ["reflection", "open"] },
  money_talks: { group: "heart", label: "Money Talks", moves: ["ask", "debate", "story"], archetypes: ["reflection", "scenario"] },
};

export const creatorLink = "https://royhanmh.netlify.app/";

export const rageBaitLevels = [
  { id: 1, label: "Nyenggol" },
  { id: 2, label: "Panas" },
  { id: 3, label: "Bikin Ribut" },
  { id: 4, label: "Jangan Baper" },
  { id: 5, label: "Chaos" },
];
