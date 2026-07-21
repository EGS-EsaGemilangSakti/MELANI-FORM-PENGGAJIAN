import type { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { SHOPEE_EMPLOYMENT_STATUSES, WAHANA_EMPLOYMENT_STATUSES } from '../../constants/placements';
import type { PayrollFormValues } from '../../types/payroll';
import { FieldShell } from './FieldShell';
import { SearchableSelect } from './SearchableSelect';

type Props = {
  register: UseFormRegister<PayrollFormValues>;
  setValue: UseFormSetValue<PayrollFormValues>;
  watch: UseFormWatch<PayrollFormValues>;
  error?: string;
};

export function EmploymentStatusField({ register, setValue, watch, error }: Props) {
  const placement = watch('placement');
  const statuses = placement === 'SHOPEE EXPRESS' ? SHOPEE_EMPLOYMENT_STATUSES : placement === 'WAHANA EXPRESS' ? WAHANA_EMPLOYMENT_STATUSES : [];
  const value = watch('employmentStatus') || '';
  const options = statuses.map((status) => ({ value: status, label: status }));
  return (
    <FieldShell label="Status Karyawan" error={error}>
      <input type="hidden" {...register('employmentStatus')} />
      <SearchableSelect value={value} disabled={!placement} placeholder={placement ? 'Pilih status' : 'Pilih penempatan terlebih dahulu'} searchPlaceholder="Cari status karyawan" emptyText="Status karyawan tidak ditemukan" options={options} onChange={(selectedValue) => {
        setValue('employmentStatus', selectedValue, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
        setValue('osId', '', { shouldDirty: true, shouldValidate: true });
      }} />
    </FieldShell>
  );
}
