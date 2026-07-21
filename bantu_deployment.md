# link spreadsheet              : https://docs.google.com/spreadsheets/d/1mUx6O2uR8X8xMuajKlocMSXHL86kwb1UbppoWMKPlUY/edit?gid=0#gid=0
# link folder PAYROLL_UPLOADS   : https://drive.google.com/drive/folders/1NtUNujvqMP-2uJmo8qKGrcunT7L88txQ?hl=ID
## link folder KTP              : https://drive.google.com/drive/folders/1pHmN-cyamYDlBhzRhOHOwPC5-7Z8E6mX
## link folder KARTU_KELUARGA   : https://drive.google.com/drive/folders/1nWbT79ggh30ElK2aMwkiLt2vWCFO116a
## link folder SURAT_KUASA      : https://drive.google.com/drive/folders/1b24i2MQ7Juh_1Jwv_IvtdfAsNh-XoHRw

# ID yang dipakai Apps Script

SPREADSHEET_ID=1mUx6O2uR8X8xMuajKlocMSXHL86kwb1UbppoWMKPlUY
UPLOADS_FOLDER_ID=1I2kf0hYDbJxL8-BBo6Hb_QN89DzTjupy
KTP_FOLDER_ID=1pHmN-cyamYDlBhzRhOHOwPC5-7Z8E6mX
KK_FOLDER_ID=1nWbT79ggh30ElK2aMwkiLt2vWCFO116a
SURAT_KUASA_FOLDER_ID=1b24i2MQ7Juh_1Jwv_IvtdfAsNh-XoHRw
PERSONAL_PHOTO_FOLDER_ID=1EELG__0s2mjJV_1R4kG0CLiSUhQZBk1t
DIPLOMA_FOLDER_ID=1k2eB3k6f6-AEddgoVzLFZtDkmzZEJUU1
NPWP_FOLDER_ID=1TG-w8OC_n0HDX5HxBbvoTHNe6C0rVZJ0
BPJS_HEALTH_FOLDER_ID=1RtqJZ2Z0_7eplVfUXCBvgUbXkxteNb
BPJS_EMPLOYMENT_FOLDER_ID=1NoCXOsfFoGH_SFUgUwXZ57WnwMd0gVv5
DOMICILE_LETTER_FOLDER_ID=1Xq6rSAQ41hC9dsbEsFLuKOsWBt78J_RL

# Script Properties yang perlu diisi di Google Apps Script

API_CO_ID_KEY=isi_api_key_api_co_id_di_sini
SPREADSHEET_ID=1mUx6O2uR8X8xMuajKlocMSXHL86kwb1UbppoWMKPlUY
UPLOADS_FOLDER_ID=1I2kf0hYDbJxL8-BBo6Hb_QN89DzTjupy
KTP_FOLDER_ID=1pHmN-cyamYDlBhzRhOHOwPC5-7Z8E6mX
KK_FOLDER_ID=1nWbT79ggh30ElK2aMwkiLt2vWCFO116a
SURAT_KUASA_FOLDER_ID=1b24i2MQ7Juh_1Jwv_IvtdfAsNh-XoHRw
PERSONAL_PHOTO_FOLDER_ID=1EELG__0s2mjJV_1R4kG0CLiSUhQZBk1t
DIPLOMA_FOLDER_ID=1k2eB3k6f6-AEddgoVzLFZtDkmzZEJUU1
NPWP_FOLDER_ID=1TG-w8OC_n0HDX5HxBbvoTHNe6C0rVZJ0
BPJS_HEALTH_FOLDER_ID=1RtqJZ2Z0_7eplVfUXCBvgUbXkxteNb
BPJS_EMPLOYMENT_FOLDER_ID=1NoCXOsfFoGH_SFUgUwXZ57WnwMd0gVv5
DOMICILE_LETTER_FOLDER_ID=1Xq6rSAQ41hC9dsbEsFLuKOsWBt78J_RL
ALLOWED_ORIGINS=http://localhost:5173,https://database.ptesagemilangsakti.com

# Tempat menaruh API key

API key API.CO.ID jangan ditaruh di React, jangan ditaruh di .env frontend, dan jangan di-hardcode di file .gs.

Taruh di:
Google Apps Script -> Project Settings -> Script Properties -> Add script property

Property:
API_CO_ID_KEY

Value:
API key dari API.CO.ID

# Urutan deployment yang disarankan

1. Push project ke GitHub.
2. Aktifkan GitHub Pages dengan Source: GitHub Actions.
3. Tunggu URL GitHub Pages aktif.
4. Ambil origin URL GitHub Pages, contoh:
   https://database.ptesagemilangsakti.com
5. Isi Script Properties Apps Script:
   API_CO_ID_KEY
   SPREADSHEET_ID
   KTP_FOLDER_ID
   KK_FOLDER_ID
   SURAT_KUASA_FOLDER_ID
   ALLOWED_ORIGINS
6. Jalankan setup() di Apps Script.
7. Deploy Apps Script sebagai Web App.
8. Salin Web App URL.
9. Isi GitHub Actions variable:
   VITE_API_URL=https://script.google.com/macros/s/WEB_APP_DEPLOYMENT_ID/exec
10. Re-run workflow GitHub Pages agar frontend memakai URL Apps Script production.
