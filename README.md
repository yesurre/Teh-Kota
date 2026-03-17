
# Teh-Kota
# PT Teh Kota Indonesia - Website

## ▶️ Cara Menjalankan (Lokal)
Kamu bisa menjalankan website ini dengan dua cara berikut.

1. **Buka langsung di browser**
   - Cukup double‑click `index.html` untuk membuka di browser.
   - Cara ini cocok untuk preview cepat.

2. **Jalankan server lokal (disarankan)**
   - Server lokal membantu saat ada file/folder bertambah dan path lebih konsisten.

```bash
# 1) Jalankan server lokal dengan Python 3
python -m http.server 8000

# 2) Buka di browser
# http://localhost:8000
```

## 🚀 Deploy ke GitHub Pages
Ikuti langkah ini supaya website bisa diakses online:

1. Pastikan file `index.html` berada di **root repo** (bukan di folder lain).
2. Push semua file ke branch `main`.
3. Di GitHub, buka **Settings > Pages**.
4. Pada **Source**, pilih:
   - **Branch: `main`**
   - **Folder: `/ (root)`**
5. Klik **Save**.
6. Tunggu proses publish selesai.  
   Situs akan bisa diakses di:
   `https://<username>.github.io/<repo>`

## ✅ Catatan Proyek (Sesuai Kondisi Saat Ini)
- File halaman kontak sudah menggunakan `contact.html` dan semua tautan telah disesuaikan.
- Nama file gambar sudah tanpa spasi agar aman untuk web hosting.

## 📄 Lisensi
Proyek ini menggunakan lisensi MIT. Jika belum ada file lisensi, kamu bisa menambahkan `LICENSE` berisi template MIT.
 279b316 (first commit)
