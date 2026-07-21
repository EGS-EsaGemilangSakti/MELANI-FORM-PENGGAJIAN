import type { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { EMERGENCY_RELATIONSHIPS } from '../../constants/placements';
import type { PayrollFormValues } from '../../types/payroll';
import { FieldShell, inputClass } from './FieldShell';

type Props = {
  register: UseFormRegister<PayrollFormValues>;
  setValue: UseFormSetValue<PayrollFormValues>;
  watch: UseFormWatch<PayrollFormValues>;
  errors: Partial<Record<'area' | 'motherName' | 'emergencyContact' | 'emergencyContactName' | 'emergencyRelationship' | 'opsId' | 'osId', string>>;
};

const uppercase = (value: string) => value.toUpperCase();

export function PersonalEmergencyFields({ register, setValue, errors }: Omit<Props, 'watch'>) {
  return <>
    <FieldShell label="Ibu Kandung" error={errors.motherName}>
      <input className={inputClass} placeholder="NAMA IBU KANDUNG" {...register('motherName')} onChange={(event) => setValue('motherName', uppercase(event.target.value), { shouldDirty: true, shouldValidate: true })} />
    </FieldShell>
    <FieldShell label="Kontak Darurat" error={errors.emergencyContact}>
      <input className={inputClass} type="tel" inputMode="numeric" placeholder="08xxxxxxxxxx" {...register('emergencyContact')} onChange={(event) => setValue('emergencyContact', event.target.value.replace(/\D/g, ''), { shouldDirty: true, shouldValidate: true })} />
    </FieldShell>
    <FieldShell label="Nama Kontak Darurat" error={errors.emergencyContactName}>
      <input className={inputClass} placeholder="NAMA KONTAK DARURAT" {...register('emergencyContactName')} onChange={(event) => setValue('emergencyContactName', uppercase(event.target.value), { shouldDirty: true, shouldValidate: true })} />
    </FieldShell>
    <FieldShell label="Hubungan Kontak Darurat" error={errors.emergencyRelationship}>
      <select className={inputClass} {...register('emergencyRelationship')}>
        <option value="">Pilih hubungan</option>
        {EMERGENCY_RELATIONSHIPS.map((relationship) => <option key={relationship} value={relationship}>{relationship}</option>)}
      </select>
    </FieldShell>
  </>;
}

export function AreaAndOpsFields({ register, setValue, watch, errors }: Props) {
  const placement = watch('placement');
  const employmentStatus = watch('employmentStatus');
  const shopee = placement === 'SHOPEE EXPRESS';
  const requiresOsId = shopee && employmentStatus === 'Dedicated';
  return <>
    <FieldShell label="Area" error={errors.area}>
      <input className={inputClass} placeholder="AREA" {...register('area')} onChange={(event) => setValue('area', uppercase(event.target.value), { shouldDirty: true, shouldValidate: true })} />
    </FieldShell>
    <FieldShell label="ID OPS" error={errors.opsId}>
      <div className="flex">
        {shopee ? <span className="flex items-center border border-r-0 border-[#99907c]/20 bg-slate-100 px-3 text-[#1c1b1b]">Ops</span> : null}
        <input className={inputClass} inputMode={shopee ? 'numeric' : 'text'} placeholder={shopee ? '2131313' : 'ID OPS'} {...register('opsId')} onChange={(event) => setValue('opsId', shopee ? event.target.value.replace(/\D/g, '') : event.target.value.replace(/[^A-Za-z0-9]/g, ''), { shouldDirty: true, shouldValidate: true })} />
      </div>
    </FieldShell>
    {requiresOsId ? <FieldShell label="ID OS" error={errors.osId}>
      <div className="flex">
        <span className="flex items-center border border-r-0 border-[#99907c]/20 bg-slate-100 px-3 text-[#1c1b1b]">Os</span>
        <input className={inputClass} inputMode="numeric" placeholder="2131313" {...register('osId')} onChange={(event) => setValue('osId', event.target.value.replace(/\D/g, ''), { shouldDirty: true, shouldValidate: true })} />
      </div>
    </FieldShell> : null}
  </>;
}
