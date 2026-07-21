const SCRIPT_PROPERTIES = PropertiesService.getScriptProperties();
const DEFAULT_SPREADSHEET_ID = '1mUx6O2uR8X8xMuajKlocMSXHL86kwb1UbppoWMKPlUY';
const DEFAULT_UPLOADS_FOLDER_ID = '1I2kf0hYDbJxL8-BBo6Hb_QN89DzTjupy';
const DEFAULT_KTP_FOLDER_ID = '1pHmN-cyamYDlBhzRhOHOwPC5-7Z8E6mX';
const DEFAULT_KK_FOLDER_ID = '1nWbT79ggh30ElK2aMwkiLt2vWCFO116a';
const DEFAULT_SURAT_KUASA_FOLDER_ID = '1b24i2MQ7Juh_1Jwv_IvtdfAsNh-XoHRw';
const SPREADSHEET_ID = SCRIPT_PROPERTIES.getProperty('SPREADSHEET_ID') || DEFAULT_SPREADSHEET_ID;
const UPLOADS_FOLDER_ID = SCRIPT_PROPERTIES.getProperty('UPLOADS_FOLDER_ID') || DEFAULT_UPLOADS_FOLDER_ID;
const KTP_FOLDER_ID = SCRIPT_PROPERTIES.getProperty('KTP_FOLDER_ID') || DEFAULT_KTP_FOLDER_ID;
const SURAT_KUASA_FOLDER_ID = SCRIPT_PROPERTIES.getProperty('SURAT_KUASA_FOLDER_ID') || DEFAULT_SURAT_KUASA_FOLDER_ID;
const KK_FOLDER_ID = SCRIPT_PROPERTIES.getProperty('KK_FOLDER_ID') || DEFAULT_KK_FOLDER_ID;
const DEFAULT_ALLOWED_ORIGINS = 'http://localhost:5173,https://melani.ptesagemilangsakti.com';
const ALLOWED_ORIGINS = (SCRIPT_PROPERTIES.getProperty('ALLOWED_ORIGINS') || DEFAULT_ALLOWED_ORIGINS).split(',').map(function (origin) {
  return origin.trim();
}).filter(String);
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = {
  ktp: ['application/pdf', 'image/jpeg', 'image/png'],
  kartuKeluarga: ['application/pdf', 'image/jpeg', 'image/png'],
  suratKuasa: ['application/pdf', 'image/jpeg', 'image/png']
};
