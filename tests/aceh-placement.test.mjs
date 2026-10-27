import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import { build } from 'esbuild';
class TestFileList { constructor(file={name:'test.png',type:'image/png',size:3}) { this.file=file; this.length=1; } item(){return this.file;} }
globalThis.FileList=TestFileList;
const bundle=await build({entryPoints:['src/schemas/payrollSchema.ts'],bundle:true,write:false,platform:'node',format:'esm'});
const {payrollSchema}=await import('data:text/javascript;base64,'+Buffer.from(bundle.outputFiles[0].text).toString('base64'));
const fixture={email:'test@example.com',fullName:'TEST USER',address:'JALAN CONTOH NOMOR SATU',addressDetail:'CONTOH',provinceCode:'11',provinceName:'ACEH',regencyCode:'1101',regencyName:'CONTOH',districtCode:'110101',districtName:'CONTOH',villageCode:'1101010001',villageName:'CONTOH',postalCode:'12345',nik:'0000000000000001',birthPlaceCode:'1101',birthPlace:'CONTOH',birthPlaceProvince:'ACEH',birthDate:'2000-01-01',gender:'Laki-laki',maritalStatus:'Belum Menikah',religion:'Islam',ptkpCode:'tk0',phone:'08000000000',motherName:'TEST',emergencyContact:'08000000001',emergencyContactName:'TEST',emergencyRelationship:'Ibu',placement:'SPRINTER ACEH',area:'ACEH',division:'',opsId:'TEST001',osId:'',employmentStatus:'',position:'SPRINTER ACEH',firstWorkDate:'2026-10-27',bankCode:'bank_bca',bankName:'bca',accountNumber:'000000001',accountOwner:'TEST USER',accountValidation:{status:'VALID',score:10,validatedName:'TEST USER',validationTimestamp:'',message:''},ownershipStatus:'PRIBADI',dataAgreement:true,formStartedAt:new Date().toISOString()};
const fields=['ktpFile','familyCardFile','powerOfAttorneyFile','diplomaFile','simFile'];
const values=()=>({...fixture,...Object.fromEntries(fields.map(k=>[k,new TestFileList()]))});
const ctx=vm.createContext({Utilities:{base64Decode:v=>Buffer.from(v,'base64')},MAX_FILE_SIZE:5242880,ALLOWED_MIME_TYPES:{ktp:['image/png','application/pdf'],kartuKeluarga:['image/png','application/pdf'],suratKuasa:['image/png','application/pdf'],diploma:['image/png']}});
vm.runInContext(fs.readFileSync('apps-script/Code.gs','utf8'),ctx);
const backendData=(patch={})=>({...fixture,bank:{bank_code:'bank_bca',bank_name:'bca'},birthDate:'01-01-2000',firstWorkDate:'27-10-2026',...patch});
// Backend allow-list excludes frontend-only properties.
for (const key of ['bankCode','bankName','dataAgreement']) delete fixture[key];
const front=()=>({...values(),bankCode:'bank_bca',bankName:'bca',dataAgreement:true});
const docs=()=>Object.fromEntries(['ktp','familyCard','powerOfAttorney','diploma','sim'].map(k=>[k,{fileName:'test.png',mimeType:'image/png',size:3,base64:'YWJj'}]));
test('both Aceh positions accept blank status and require four documents plus conditional power of attorney',()=>{
 for(const position of ['SPRINTER ACEH','KORLAP']) for(const ownershipStatus of ['PRIBADI','ORANG LAIN']){
  const v={...front(),position,ownershipStatus}; assert.equal(payrollSchema.safeParse(v).success,true);
  for(const field of fields){if(field==='powerOfAttorneyFile' && ownershipStatus==='PRIBADI'){assert.equal(payrollSchema.safeParse({...v,[field]:undefined}).success,true);continue;}const r=payrollSchema.safeParse({...v,[field]:undefined});assert.equal(r.success,false);assert.ok(r.error.issues.some(i=>i.path[0]===field));}
  assert.equal(ctx.validatePayload(backendData({position,ownershipStatus,employmentStatus:'DEDICATED'})).employmentStatus,'');
 }
});
test('Aceh rejects wrong positions and invalid or empty attachments',()=>{
 assert.equal(payrollSchema.safeParse({...front(),position:'Driver'}).success,false);
 assert.throws(()=>ctx.validatePayload(backendData({position:'Driver'})),/Posisi/);
 for(const field of fields) for(const file of [{type:'text/plain',size:3},{type:'image/png',size:0},{type:'image/png',size:5242881}]) assert.equal(payrollSchema.safeParse({...front(),ownershipStatus:'ORANG LAIN',[field]:new TestFileList(file)}).success,false);
 for(const key of Object.keys(docs())){
  const d=docs();delete d[key];assert.throws(()=>ctx.validateAcehDocuments(d,'ORANG LAIN'),/wajib/);
  for(const patch of [{mimeType:'text/plain'},{base64:''},{base64:' ',size:0},{size:4},{base64:Buffer.alloc(5242881).toString('base64'),size:5242881}])assert.throws(()=>ctx.validateAcehDocuments({...docs(),[key]:{...docs()[key],...patch}},'ORANG LAIN'));
 }
 ctx.validateAcehDocuments(docs(),'ORANG LAIN');
 const personalDocs=docs();delete personalDocs.powerOfAttorney;ctx.validateAcehDocuments(personalDocs,'PRIBADI');
 assert.equal(payrollSchema.safeParse({...front(),powerOfAttorneyFile:new TestFileList({type:'text/plain',size:0})}).success,true);
});
test('existing placement requirements are preserved',()=>{
 const v={...front(),placement:'WAHANA EXPRESS',position:'Driver',employmentStatus:'Daily Worker',powerOfAttorneyFile:undefined,diplomaFile:undefined,simFile:undefined};
 assert.equal(payrollSchema.safeParse(v).success,true);
 assert.equal(payrollSchema.safeParse({...v,employmentStatus:''}).success,false);
 assert.equal(payrollSchema.safeParse({...v,position:'KORLAP'}).success,false);
 const shopee={...v,placement:'SHOPEE EXPRESS',position:'Daily Worker',employmentStatus:'Daily Worker (DW)',opsId:'123',division:'LM',personalPhotoFile:new TestFileList(),diplomaFile:new TestFileList()};
 assert.equal(payrollSchema.safeParse(shopee).success,true);
 assert.equal(payrollSchema.safeParse({...shopee,personalPhotoFile:undefined}).success,false);
 assert.equal(payrollSchema.safeParse({...shopee,employmentStatus:'Dedicated',osId:'12'}).success,false);
 for(const placement of ['SHOPEE EXPRESS','WAHANA EXPRESS']) assert.throws(()=>ctx.validatePayload(backendData({placement,opsId:'123',division:'LM',position:placement==='SHOPEE EXPRESS'?'Daily Worker':'Driver'})),/Status karyawan/);
});
test('missing Aceh files cannot reach upload or save for NEW or REVISION',()=>{
 ctx.validateBankAccount=()=>({success:true,status:'VALID',score:10});
 ctx.validateTimestamp=()=>{};
 ctx.LockService={getScriptLock:()=>{throw new Error('SHOULD NOT REACH STORAGE');}};
 for(const submissionType of ['NEW','REVISION'])for(const key of Object.keys(docs())){const files=docs();delete files[key];assert.throws(()=>ctx.handleSubmitPayroll({website:'',submissionType,data:backendData({ownershipStatus:'ORANG LAIN'}),files}),/wajib diunggah/);}
});
test('SIM column appended without changing prior column positions or rewriting old rows',()=>{
 const headers=vm.runInContext('HEADERS',ctx);assert.equal(headers[22],'Status Karyawan');assert.equal(headers[38],'Ijazah URL');assert.equal(headers.at(-1),'SIM URL');
 const writes=[];const old=Array.from(headers).slice(0,-1);
 const sheet={getMaxColumns:()=>44,getLastRow:()=>10,getLastColumn:()=>43,getRange:(...args)=>({getValues:()=>[old],setValues:v=>writes.push({args,v})})};
 ctx.createSpreadsheetHeadersForSheet(sheet);assert.deepEqual(writes.map(x=>x.args),[[1,44,1,1]]);
 const row=ctx.buildSubmissionRow('test',ctx.validatePayload(backendData()),{},'ktp','kuasa','kk',{sim:'sim-link'});
 assert.equal(row.length,headers.length);assert.equal(row[22],'');assert.equal(row.at(-1),'sim-link');
});

test('Aceh personal accounts save four documents and ignore a stale power-of-attorney upload',()=>{
 const c=vm.createContext({Utilities:{base64Decode:v=>Buffer.from(v,'base64')},MAX_FILE_SIZE:5242880,ALLOWED_MIME_TYPES:{ktp:['image/png'],kartuKeluarga:['image/png'],suratKuasa:['image/png'],diploma:['image/png']}});
 vm.runInContext(fs.readFileSync('apps-script/Code.gs','utf8'),c);
 const uploads=[];const saved=[];
 Object.assign(c,{validateTimestamp:()=>{},validateBankAccount:()=>({success:true,status:'VALID',score:10}),LockService:{getScriptLock:()=>({waitLock(){},releaseLock(){}})},assertOpsSubmissionLimit:()=>{},generateUUID:()=> 'test-id',uploadToDrive:(_file,type)=>{uploads.push(type);return {url:type+'-url'};},saveToSpreadsheet:(...args)=>saved.push(args),logSubmission:()=>{}});
 for(const position of ['SPRINTER ACEH','KORLAP'])for(const submissionType of ['NEW','REVISION']){
  uploads.length=0;const files=docs();files.powerOfAttorney={mimeType:'text/plain',base64:'invalid',size:0};
  assert.equal(c.handleSubmitPayroll({website:'',submissionType,data:backendData({position}),files}).success,true);
  assert.deepEqual(uploads.sort(),['diploma','kartuKeluarga','ktp','sim']);
  assert.equal(saved.at(-1)[4],'');assert.equal(saved.at(-1)[1].employmentStatus,'');
 }
});
