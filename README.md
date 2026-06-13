Aku buat projek ini karena sial lah, orang orang dikit dikit premium, sedikit sedikit berbayar, sedikit sedikit pakai langganan, so here's my fully free project.

---

## 🚀 Project Roadmap & Scope Strategy

Dokumentasi ini membagi pengembangan fitur aplikasi menjadi 4 fase strategis untuk menjaga kualitas kode, presisi kalkulasi, dan manajemen waktu pengembangan yang efektif.

### 1. MVP (Minimum Viable Product) - *Core Engine*

Fitur wajib yang menjadi pondasi utama aplikasi dan penentu nilai jual awal yang membedakannya dari aplikasi komersial ber-paywall.

* **Books** - Pondasi utama aplikasi untuk mencatat transaksi pendapatan dan pengeluaran harian.
* **Wallet** - Diperlukan untuk melacak sumber dana, tujuan transaksi, dan melihat saldo aktual saat ini.
* **Category Management (Tidak Terbatas)** - Fitur kustomisasi dasar agar pengguna tidak terkunci oleh kategori bawaan aplikasi.
* **Multi-Currency** - Fitur unggulan utama penghancur *paywall* yang harus ditanam langsung di level arsitektur database sejak awal.

### 2. Medium - *Utility Expansion*

Fitur yang ditambahkan setelah mesin pencatatan inti (*core engine*) berjalan dengan stabil tanpa adanya selisih angka.

* **Tampilan Kalender & Pencatatan Harian** - Di tahap MVP, kita fokus membuat data transaksinya tersimpan dengan benar dulu di database dalam bentuk list atau tabel terstruktur.
* **Charts** - Membutuhkan data dari modul `Books` yang sudah matang dan terakumulasi untuk memvisualisasikan tren secara akurat.
* **Budget** - Langkah logis setelah pencatatan lancar untuk membatasi pengeluaran berdasarkan data historis pengguna.
* **Profile & Settings** - Untuk mengelola preferensi dasar pengguna, seperti penentuan mata uang utama aplikasi (*base currency*).
* **Backup & Restore (Lokal/CSV)** - Pengamanan data tingkat awal menggunakan format teks terstruktur sebelum lompat ke integrasi eksternal.

### 3. Maximum - *Premium & Automation Layer*

Fitur canggih yang meningkatkan kenyamanan pengguna, namun membutuhkan infrastruktur tambahan dan manajemen status data yang lebih kompleks.

* **Widget di HP atau Desktop** - Widget membutuhkan integrasi mendalam dengan sistem operasi (OS).
* **Pengingat Tagihan** - Membutuhkan sistem penjadwalan (*task queue/cron job*) dan pengiriman notifikasi yang berjalan di latar belakang (*background worker*).
* **Backup & Restore (Cloud/Google Drive)** - Membutuhkan integrasi API pihak ketiga, penanganan token, dan sistem autentikasi OAuth yang aman.
* **Import Asset** - Membutuhkan sistem manajemen penyimpanan berkas (*file storage*) baik secara lokal maupun komputasi awan.
* **Goals** - Menuntut logika sinkronisasi berlapis karena harus melacak kemajuan dana secara *real-time* dari sisa anggaran dan dompet.

### 4. Soon (Future Roadmap) - *Enterprise & Advanced Analytics*

Fitur skala raksasa yang bertindak sebagai modul independen baru. Ditunda ke fase akhir karena membutuhkan integrasi pihak ketiga yang masif atau pemodelan data tingkat lanjut.

* **Audit Investasi & Saham** - Membutuhkan integrasi *live data scraping* harga pasar dan logika analisis portofolio keuangan yang rumit.
* **Pencatatan & Valuasi Aset Mahal** - Membutuhkan API eksternal atau *crawler* untuk memperkirakan harga pasar properti/otomotif secara berkala.
* **Kalkulasi Pajak** - Regulasi perpajakan bersifat dinamis dan membutuhkan logika perhitungan hukum yang kaku serta terpisah dari arus kas harian.
* **Prediksi & Proyeksi Keuangan** - Membutuhkan implementasi algoritma deret waktu (*time-series analysis*) atau pemodelan statistik tingkat lanjut.
* **Rencana Pensiun** - Bukan fokus utama dari pelacakan harian dan melibatkan variabel jangka panjang yang sangat kompleks.
* **Multi-User Family Account & RBAC** - Membutuhkan arsitektur keamanan tingkat lanjut, pemisahan akses database (*multi-tenancy*), dan manajemen sesi yang sangat ketat.
* **Integrasi Banking System (Otomatis)** - Membutuhkan biaya, kerja sama resmi, atau teknik *reverse engineering* API bank yang memiliki risiko kepatuhan tinggi di Indonesia.