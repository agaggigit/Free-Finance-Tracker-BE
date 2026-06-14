Arsitektur Vertical Slice

Installan:
- express buat api
- pg buat ngehubungin node.js sama postgre
- dotenv buat ngeload env di .env
- nodemon buat ngejalanin ulang server tiap kali ada perubahan kode

Di Script di package.json ditambah dev, sama start, fungsinya:
- "dev": Saat kamu mengetik npm run dev di terminal, Node.js akan mengeksekusi nodemon. Ini yang akan kita pakai terus-menerus selama kita membangun aplikasi ini.
- "start": Saat kamu mengetik npm start, Node.js akan mengeksekusi node biasa. Ini baru akan kita pakai nanti jika aplikasimu sudah diunggah (deploy) ke peladen (server) asli di internet, karena peladen asli tidak butuh fitur auto-restart.
