import type { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { DIVISIONS } from '../../constants/placements';
import type { PayrollFormValues } from '../../types/payroll';
import { FieldShell } from './FieldShell';
import { SearchableSelect } from './SearchableSelect';

export function DivisionField({ register, setValue, watch, error }: { register: UseFormRegister<PayrollFormValues>; setValue: UseFormSetValue<PayrollFormValues>; watch: UseFormWatch<PayrollFormValues>; error?: string }) {
  const value = watch('division') || '';
  const options = DIVISIONS.map((division) => ({ value: division, label: division }));
  return <FieldShell label="Divisi" error={error}>
    <input type="hidden" {...register('division')} />
    <SearchableSelect value={value} placeholder="Pilih divisi" searchPlaceholder="Cari divisi" emptyText="Divisi tidak ditemukan" options={options} onChange={(selectedValue) => setValue('division', selectedValue, { shouldDirty: true, shouldTouch: true, shouldValidate: true })} />
  </FieldShell>;
}
