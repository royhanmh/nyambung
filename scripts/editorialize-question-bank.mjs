import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "src", "data", "nyambung-1000-questions-id-ID.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

const replacements = [
  [/first date/gi, "kencan pertama"],
  [/first impression/gi, "kesan pertama"],
  [/quality time/gi, "waktu berdua"],
  [/red flag/gi, "tanda yang bikin ragu"],
  [/stalking/gi, "diam-diam melihat akun seseorang"],
  [/influencer/gi, "orang terkenal di internet"],
  [/playlist/gi, "daftar lagu"],
  [/survive/gi, "bertahan"],
  [/slow response/gi, "lama membalas"],
  [/coffee shop/gi, "kedai kopi"],
  [/weekend/gi, "akhir pekan"],
  [/traveling/gi, "jalan-jalan"],
  [/\bgroup\b/gi, "grup"],
  [/'otw'/gi, "'sudah jalan'"],
  [/seseorang seseorang/gi, "seseorang"],
];

const openerVariants = [
  [/^Menurut kamu,/i, "Kalau menurutmu,"],
  [/^Apa yang membuatmu/i, "Hal apa yang bikin kamu"],
  [/^Apa yang bikin kamu/i, "Hal kecil apa yang bikin kamu"],
];

const exactRewrites = {
  q_0058: "Kalau bisa tinggal di kota mana pun selama setahun, kamu pilih kota apa?",
  q_0213: "Kapan kamu terakhir kali merasa seseorang benar-benar mendengarkanmu?",
  q_0224: "Kapan kamu merasa ceritamu benar-benar didengar oleh seseorang?",
  q_0356: "Saat sedang butuh disayang, perhatian seperti apa yang paling kamu cari?",
  q_0357: "Kalau kamu sayang seseorang, biasanya kamu menunjukkannya lewat apa?",
  q_0365: "Kalau bisa mengulang satu kencan, bagian mana yang ingin kamu jalani lagi?",
  q_0388: "Apa yang membuatmu merasa aman untuk bercerita tanpa takut dihakimi?",
  q_0406: "Siapa di sini yang paling mungkin menikah duluan?",
  q_0019: "Kalau bisa merancang akhir pekan yang pas buatmu, isinya apa?",
  q_0252: "Tanda apa yang dulu pernah kamu abaikan karena telanjur suka?",
  q_0293: "Pernah sengaja menunda balas chat supaya kelihatan nggak terlalu tertarik?",
  q_0303: "Kencan pertama yang ideal buatmu bakal seperti apa?",
  q_0307: "Kalau seseorang lama membalas pesanmu, kamu santai atau mulai kepikiran?",
  q_0342: "Untuk kencan pertama, kamu pilih kedai kopi, museum, taman, atau jalan-jalan?",
  q_0355: "Kalau punya waktu berdua seharian, kamu paling ingin ngapain?",
  q_0402: "Kalau harus menebak, siapa di sini yang bakal terkenal duluan?",
  q_0417: "Siapa di antara kalian yang paling mungkin dikenal banyak orang?",
  q_0458: "Pelajaran sekolah apa yang dulu paling kamu tunggu?",
  q_0459: "Pelajaran sekolah apa yang dulu paling sering kamu hindari?",
};

const groupOpeners = [
  "Di antara kalian, siapa yang",
  "Siapa di sini yang",
  "Kalau harus menunjuk satu orang, siapa yang",
  "Menurut kalian, siapa yang",
];

const rewriteText = (question, index) => {
  let text = exactRewrites[question.id] ?? question.text.trim();

  for (const [pattern, replacement] of replacements) {
    text = text.replace(pattern, replacement);
  }

  for (const [pattern, replacement] of openerVariants) {
    text = text.replace(pattern, replacement);
  }

  if (question.category === "rame_rame" && /^Siapa yang paling mungkin/i.test(text)) {
    const opener = groupOpeners[index % groupOpeners.length];
    text = text.replace(/^Siapa yang paling mungkin/i, opener);
  }

  text = text.replace(/\s+/g, " ").trim();
  text = exactRewrites[question.id] ?? text;
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const relationshipByCategory = {
  pasangan: ["couple"],
  pdkt: ["pdk_t", "new_people", "couple"],
  rame_rame: ["group", "friends", "family"],
};

const categoryIndexes = {};
data.questions = data.questions.map((question) => {
  const index = categoryIndexes[question.category] ?? 0;
  categoryIndexes[question.category] = index + 1;

  const relationships = relationshipByCategory[question.category];
  return {
    ...question,
    text: rewriteText(question, index),
    ...(relationships ? { relationships } : {}),
  };
});

fs.writeFileSync(dataPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
console.log(`Editorialized ${data.questions.length} questions`);
