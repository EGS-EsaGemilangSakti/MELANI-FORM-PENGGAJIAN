const SCRIPT_PROPERTIES = PropertiesService.getScriptProperties();
const DEFAULT_SPREADSHEET_ID = '1mUx6O2uR8X8xMuajKlocMSXHL86kwb1UbppoWMKPlUY';
const DEFAULT_UPLOADS_FOLDER_ID = '1I2kf0hYDbJxL8-BBo6Hb_QN89DzTjupy';
const DEFAULT_KTP_FOLDER_ID = '1pHmN-cyamYDlBhzRhOHOwPC5-7Z8E6mX';
const DEFAULT_KK_FOLDER_ID = '1nWbT79ggh30ElK2aMwkiLt2vWCFO116a';
const DEFAULT_SURAT_KUASA_FOLDER_ID = '1b24i2MQ7Juh_1Jwv_IvtdfAsNh-XoHRw';
const DEFAULT_PERSONAL_PHOTO_FOLDER_ID = '1EELG__0s2mjJV_1R4kG0CLiSUhQZBk1t';
const DEFAULT_DIPLOMA_FOLDER_ID = '1k2eB3k6f6-AEddgoVzLFZtDkmzZEJUU1';
const DEFAULT_NPWP_FOLDER_ID = '1TG-w8OC_n0HDX5HxBbvoTHNe6C0rVZJ0';
const DEFAULT_BPJS_HEALTH_FOLDER_ID = '1RtqJZ2Z0_7eplVfUXCBvgUbXkxteNb';
const DEFAULT_BPJS_EMPLOYMENT_FOLDER_ID = '1NoCXOsfFoGH_SFUgUwXZ57WnwMd0gVv5';
const DEFAULT_DOMICILE_LETTER_FOLDER_ID = '1Xq6rSAQ41hC9dsbEsFLuKOsWBt78J_RL';
const SPREADSHEET_ID = SCRIPT_PROPERTIES.getProperty('SPREADSHEET_ID') || DEFAULT_SPREADSHEET_ID;
const UPLOADS_FOLDER_ID = SCRIPT_PROPERTIES.getProperty('UPLOADS_FOLDER_ID') || DEFAULT_UPLOADS_FOLDER_ID;
const KTP_FOLDER_ID = SCRIPT_PROPERTIES.getProperty('KTP_FOLDER_ID') || DEFAULT_KTP_FOLDER_ID;
const SURAT_KUASA_FOLDER_ID = SCRIPT_PROPERTIES.getProperty('SURAT_KUASA_FOLDER_ID') || DEFAULT_SURAT_KUASA_FOLDER_ID;
const KK_FOLDER_ID = SCRIPT_PROPERTIES.getProperty('KK_FOLDER_ID') || DEFAULT_KK_FOLDER_ID;
const PERSONAL_PHOTO_FOLDER_ID = SCRIPT_PROPERTIES.getProperty('PERSONAL_PHOTO_FOLDER_ID') || DEFAULT_PERSONAL_PHOTO_FOLDER_ID;
const DIPLOMA_FOLDER_ID = SCRIPT_PROPERTIES.getProperty('DIPLOMA_FOLDER_ID') || DEFAULT_DIPLOMA_FOLDER_ID;
const NPWP_FOLDER_ID = SCRIPT_PROPERTIES.getProperty('NPWP_FOLDER_ID') || DEFAULT_NPWP_FOLDER_ID;
const BPJS_HEALTH_FOLDER_ID = SCRIPT_PROPERTIES.getProperty('BPJS_HEALTH_FOLDER_ID') || DEFAULT_BPJS_HEALTH_FOLDER_ID;
const BPJS_EMPLOYMENT_FOLDER_ID = SCRIPT_PROPERTIES.getProperty('BPJS_EMPLOYMENT_FOLDER_ID') || DEFAULT_BPJS_EMPLOYMENT_FOLDER_ID;
const DOMICILE_LETTER_FOLDER_ID = SCRIPT_PROPERTIES.getProperty('DOMICILE_LETTER_FOLDER_ID') || DEFAULT_DOMICILE_LETTER_FOLDER_ID;
const DEFAULT_ALLOWED_ORIGINS = 'http://localhost:5173,https://database.ptesagemilangsakti.com';
const ALLOWED_ORIGINS = (SCRIPT_PROPERTIES.getProperty('ALLOWED_ORIGINS') || DEFAULT_ALLOWED_ORIGINS).split(',').map(function (origin) {
  return origin.trim();
}).filter(String);
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = {
  ktp: ['application/pdf', 'image/jpeg', 'image/png'],
  kartuKeluarga: ['application/pdf', 'image/jpeg', 'image/png'],
  suratKuasa: ['application/pdf', 'image/jpeg', 'image/png'],
  personalPhoto: ['image/jpeg', 'image/png'],
  diploma: ['image/jpeg', 'image/png'],
  npwp: ['image/jpeg', 'image/png'],
  bpjsHealth: ['image/jpeg', 'image/png'],
  bpjsEmployment: ['image/jpeg', 'image/png'],
  domicileLetter: ['image/jpeg', 'image/png']
};
