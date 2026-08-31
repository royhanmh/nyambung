# SEO dan PWA Nyambung

## Konfigurasi

- Domain publik: `https://nyambung.netlify.app/`
- Bahasa utama: `id-ID`
- Route publik: `/`
- Strategi offline: app shell dan asset same-origin dicache oleh service worker; pool pertanyaan sudah ikut dalam bundle aplikasi.
- Dependency baru: tidak ada.

Versi dependency tetap mengikuti `package.json`:

- React `^19.1.0`
- React DOM `^19.1.0`
- Vite `^7.1.0`
- `@vitejs/plugin-react` `^5.0.0`

## Praktik yang diterapkan

- Satu canonical URL yang konsisten di metadata, sitemap, dan structured data.
- Open Graph dan Twitter Card memakai URL absolut dan asset yang benar-benar tersedia agar bisa dibaca crawler lintas platform.
- JSON-LD memakai `WebApplication`, bahasa aplikasi, logo, URL, dan penawaran gratis.
- Manifest memakai `id`, `scope`, `start_url`, standalone display, portrait orientation, warna brand, serta entry ikon `any` dan `maskable` terpisah.
- `robots.txt` hanya mengizinkan crawling halaman publik yang memang tersedia.

## Verifikasi

1. Jalankan `npm run build`.
2. Pastikan `dist/index.html`, `dist/manifest.webmanifest`, `dist/robots.txt`, dan `dist/sitemap.xml` terbentuk.
3. Buka aplikasi melalui HTTPS, cek manifest dan service worker di DevTools Application.
4. Reload saat offline dan pastikan halaman serta pertanyaan lokal tetap bisa dimainkan.
