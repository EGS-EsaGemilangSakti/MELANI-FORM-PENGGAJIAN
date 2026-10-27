# Persetujuan rekening manual

BankApproval.gs menyediakan getManualBankApproval(payload). Gabungkan fungsi ini ke project Apps Script dan panggil setelah validasi format bank, nomor, dan nama, sebelum provider eksternal:

```js
const manualApproval = getManualBankApproval(payload);
if (manualApproval) return manualApproval;
```

Daftar persetujuan berada pada Script Property APPROVED_BANK_ACCOUNTS berupa JSON array dengan bank_code, account_number (string), dan account_owner. Ketiganya wajib cocok. Kapital dan spasi dinormalisasi; titik tetap signifikan. Rekening lain mengikuti validasi provider dan pengecualian lama yang telah disetujui. Hasil manual ditandai MANUAL_APPROVAL dengan score 10. Jangan simpan data rekening asli di repository.

Validasi nama lengkap dan pemilik rekening pada frontend/backend menerima huruf kapital, spasi, dan titik.

## Bypass seluruh rekening

Script Property `BYPASS_BANK_PROVIDER=true` menerima semua rekening yang lolos pemeriksaan format tanpa menghubungi provider. Respons memiliki score 10 dan validationSource BYPASS_PROVIDER. Sheet menyimpan Status Rekening BYPASS_PROVIDER. Ubah properti ke false untuk mengembalikan pemeriksaan provider dan persetujuan khusus.

## SPRINTER ACEH (27 Oktober 2026)

`SprinterAceh.patch` adalah perubahan Code.gs produksi: penempatan/posisi, status kosong, preflight lima lampiran, folder SIM, dan kolom SIM URL yang ditambahkan di akhir tanpa menulis ulang data lama. Patch tidak menyertakan konfigurasi privat atau pengecualian rekening lama. Terapkan pada ekspor Code.gs, simpan, lalu perbarui deployment web app yang sama. Folder SIM dibuat saat upload pertama di bawah folder unggahan yang sudah dikonfigurasi, atau gunakan Script Property SIM_FOLDER_ID.

Pengujian integrasi lokal: simpan ekspor Code.gs terbaru pada apps-script/Code.gs (diabaikan Git), lalu jalankan node --test tests/*.test.mjs. Build frontend: npm run build; npm run lint.

