import type { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { SHOPEE_POSITIONS, WAHANA_POSITIONS } from '../../constants/placements';
import type { PayrollFormValues } from '../../types/payroll';
import { FieldShell } from './FieldShell';
import { SearchableSelect } from './SearchableSelect';

export function PositionField({ register, setValue, watch, error }: { register: UseFormRegister<PayrollFormValues>; setValue: UseFormSetValue<PayrollFormValues>; watch: UseFormWatch<PayrollFormValues>; error?: string }) {
  const placement = watch('placement');
  const positions = placement === 'SHOPEE EXPRESS' ? SHOPEE_POSITIONS : placement === 'WAHANA EXPRESS' ? WAHANA_POSITIONS : [];
  const value = watch('position') || '';
  const options = positions.map((position) => ({ value: position, label: position }));
  return (
    <FieldShell label="Posisi" error={error}>
      <input type="hidden" {...register('position')} />
      <SearchableSelect value={value} disabled={!placement} placeholder={placement ? 'Pilih posisi' : 'Pilih penempatan terlebih dahulu'} searchPlaceholder="Cari posisi" emptyText="Posisi tidak ditemukan" options={options} onChange={(selectedValue) => setValue('position', selectedValue, { shouldDirty: true, shouldTouch: true, shouldValidate: true })} />
    </FieldShell>
  );
}
