# Nyambung

Nyambung adalah permainan percakapan mobile-first dalam Bahasa Indonesia. Pilih hubungan, vibe, dan kedalaman obrolan, lalu mulai sesi dengan pertanyaan yang terasa lebih natural.

## Fitur

- Mode Teman, Pasangan, PDKT, Rame-rame, Baru kenal, dan Keluarga.
- Pilihan vibe dan tingkat kedalaman percakapan.
- Pertanyaan lokal terkurasi dari dataset Bahasa Indonesia.
- Interaksi swipe untuk melewati atau melanjutkan pertanyaan.
- PWA installable dengan dukungan offline untuk pool pertanyaan lokal.
- SEO teknis: canonical URL, Open Graph, Twitter Card, JSON-LD, `robots.txt`, dan sitemap.

## Stack

- React 19
- JavaScript dan JSX
- Vite 7
- CSS biasa dengan desain mobile-first

Tidak memakai TypeScript dan tidak membutuhkan dependency tambahan untuk fitur SEO/PWA.

## Menjalankan lokal

Pastikan Node.js dan npm tersedia.

```bash
npm install
npm run dev
```

Buka URL yang ditampilkan Vite, biasanya `http://localhost:5173`.

## Build production

```bash
npm run build
npm run preview
```

Output production berada di folder `dist/`.

## SEO dan PWA

- Domain publik: `https://nyambung.netlify.app/`
- Manifest: `public/manifest.webmanifest`
- Service worker: `public/sw.js`
- Crawler files: `public/robots.txt` dan `public/sitemap.xml`
- Dokumentasi teknis: [SEO-PWA.md](SEO-PWA.md)

Service worker memakai cache app shell dan fallback halaman utama saat offline. Dataset pertanyaan ikut dibundel ke aplikasi, jadi sesi dasar tetap dapat dimainkan tanpa koneksi.

## Struktur utama

```text
src/
  App.jsx                  # Alur dan state permainan
  main.jsx                 # Bootstrap React dan service worker
  styles.css               # Gaya aplikasi
  data/                    # Dataset pertanyaan
public/
  manifest.webmanifest     # Konfigurasi instalasi PWA
  sw.js                    # Cache dan fallback offline
  robots.txt               # Aturan crawler
  sitemap.xml              # Sitemap halaman publik
```

## Bahasa dan brand

Produk memakai Bahasa Indonesia (`id-ID`) dengan karakter hangat, playful, human, dan minimal. Lihat [BRAND-GUIDELINES.md](BRAND-GUIDELINES.md) dan [prd.md](prd.md) untuk aturan produk serta visual.
