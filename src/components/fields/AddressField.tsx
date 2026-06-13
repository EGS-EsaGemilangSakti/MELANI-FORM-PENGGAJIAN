import { useEffect } from 'react';
import type { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { useDistricts, useProvinces, useRegencies, useVillages } from '../../hooks/useRegional';
import type { PayrollFormValues } from '../../types/payroll';
import { sanitizeText } from '../../utils/sanitize';
import { FieldShell, inputClass } from './FieldShell';

function composeAddress(values: Pick<PayrollFormValues, 'addressDetail' | 'villageName' | 'districtName' | 'regencyName' | 'provinceName' | 'postalCode'>): string {
  return [
    sanitizeText(values.addressDetail),
    values.villageName ? `DESA/KEL. ${values.villageName}` : '',
    values.districtName ? `KEC. ${values.districtName}` : '',
    values.regencyName,
    values.provinceName,
    values.postalCode ? `KODE POS ${values.postalCode}` : '',
  ].filter(Boolean).join(', ');
}

export function AddressField({
  register,
  setValue,
  watch,
  errors,
}: {
  register: UseFormRegister<PayrollFormValues>;
  setValue: UseFormSetValue<PayrollFormValues>;
  watch: UseFormWatch<PayrollFormValues>;
  errors: FieldErrors<PayrollFormValues>;
}) {
  const values = watch();
  const addressDetail = values.addressDetail;
  const provinceCode = values.provinceCode;
  const regencyCode = values.regencyCode;
  const districtCode = values.districtCode;
  const villageName = values.villageName;
  const districtName = values.districtName;
  const regencyName = values.regencyName;
  const provinceName = values.provinceName;
  const postalCode = values.postalCode;
  const provinces = useProvinces();
  const regencies = useRegencies(provinceCode);
  const districts = useDistricts(regencyCode);
  const villages = useVillages(districtCode);

  useEffect(() => {
    setValue('address', composeAddress({ addressDetail, villageName, districtName, regencyName, provinceName, postalCode }), { shouldValidate: true });
  }, [addressDetail, villageName, districtName, regencyName, provinceName, postalCode, setValue]);

  return (
    <div className="grid gap-4 md:col-span-2 md:grid-cols-2">
      <input type="hidden" {...register('address')} />
      <FieldShell label="Provinsi" error={errors.provinceCode?.message || errors.provinceName?.message}>
        <select
          className={inputClass}
          value={provinceCode}
          disabled={provinces.isLoading}
          onChange={(event) => {
            const selected = provinces.data?.find((item) => item.code === event.target.value);
            setValue('provinceCode', selected?.code ?? '', { shouldValidate: true });
            setValue('provinceName', selected?.name ?? '', { shouldValidate: true });
            setValue('regencyCode', '', { shouldValidate: true });
            setValue('regencyName', '', { shouldValidate: true });
            setValue('districtCode', '', { shouldValidate: true });
            setValue('districtName', '', { shouldValidate: true });
            setValue('villageCode', '', { shouldValidate: true });
            setValue('villageName', '', { shouldValidate: true });
            setValue('postalCode', '', { shouldValidate: true });
          }}
        >
          <option value="">{provinces.isLoading ? 'Memuat provinsi' : 'Pilih provinsi'}</option>
          {(provinces.data ?? []).map((item) => <option key={item.code} value={item.code}>{item.name}</option>)}
        </select>
      </FieldShell>

      <FieldShell label="Kabupaten/Kota" error={errors.regencyCode?.message || errors.regencyName?.message}>
        <select
          className={inputClass}
          value={regencyCode}
          disabled={!provinceCode || regencies.isLoading}
          onChange={(event) => {
            const selected = regencies.data?.find((item) => item.code === event.target.value);
            setValue('regencyCode', selected?.code ?? '', { shouldValidate: true });
            setValue('regencyName', selected?.name ?? '', { shouldValidate: true });
            setValue('districtCode', '', { shouldValidate: true });
            setValue('districtName', '', { shouldValidate: true });
            setValue('villageCode', '', { shouldValidate: true });
            setValue('villageName', '', { shouldValidate: true });
            setValue('postalCode', '', { shouldValidate: true });
          }}
        >
          <option value="">{regencies.isLoading ? 'Memuat kabupaten/kota' : 'Pilih kabupaten/kota'}</option>
          {(regencies.data ?? []).map((item) => <option key={item.code} value={item.code}>{item.name}</option>)}
        </select>
      </FieldShell>

      <FieldShell label="Kecamatan" error={errors.districtCode?.message || errors.districtName?.message}>
        <select
          className={inputClass}
          value={districtCode}
          disabled={!regencyCode || districts.isLoading}
          onChange={(event) => {
            const selected = districts.data?.find((item) => item.code === event.target.value);
            setValue('districtCode', selected?.code ?? '', { shouldValidate: true });
            setValue('districtName', selected?.name ?? '', { shouldValidate: true });
            setValue('villageCode', '', { shouldValidate: true });
            setValue('villageName', '', { shouldValidate: true });
            setValue('postalCode', '', { shouldValidate: true });
          }}
        >
          <option value="">{districts.isLoading ? 'Memuat kecamatan' : 'Pilih kecamatan'}</option>
          {(districts.data ?? []).map((item) => <option key={item.code} value={item.code}>{item.name}</option>)}
        </select>
      </FieldShell>

      <FieldShell label="Kelurahan/Desa" error={errors.villageCode?.message || errors.villageName?.message}>
        <select
          className={inputClass}
          value={values.villageCode}
          disabled={!districtCode || villages.isLoading}
          onChange={(event) => {
            const selected = villages.data?.find((item) => item.code === event.target.value);
            setValue('villageCode', selected?.code ?? '', { shouldValidate: true });
            setValue('villageName', selected?.name ?? '', { shouldValidate: true });
            setValue('postalCode', selected?.postal_codes?.[0] ?? '', { shouldValidate: true });
          }}
        >
          <option value="">{villages.isLoading ? 'Memuat kelurahan/desa' : 'Pilih kelurahan/desa'}</option>
          {(villages.data ?? []).map((item) => <option key={item.code} value={item.code}>{item.name}</option>)}
        </select>
      </FieldShell>

      <FieldShell label="Kode Pos" error={errors.postalCode?.message}>
        <input
          className={inputClass}
          inputMode="numeric"
          maxLength={5}
          value={postalCode}
          onChange={(event) => setValue('postalCode', event.target.value.replace(/\D/g, ''), { shouldValidate: true })}
        />
      </FieldShell>

      <FieldShell label="Detail Alamat" error={errors.addressDetail?.message} className="md:col-span-2">
        <textarea
          className={`${inputClass} min-h-24 resize-y`}
          maxLength={200}
          placeholder="Contoh: Jl. Merdeka No. 12, RT 003/RW 004, Blok A, patokan dekat masjid"
          value={addressDetail}
          onChange={(event) => setValue('addressDetail', sanitizeText(event.target.value), { shouldValidate: true })}
        />
      </FieldShell>

      {errors.address?.message ? <p className="text-sm text-accent md:col-span-2">{errors.address.message}</p> : null}
    </div>
  );
}
