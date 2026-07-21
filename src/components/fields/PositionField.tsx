import type { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { SHOPEE_POSITIONS, WAHANA_POSITIONS } from '../../constants/placements';
import type { PayrollFormValues } from '../../types/payroll';
import { FieldShell, inputClass } from './FieldShell';

export function PositionField({ register, setValue, watch, error }: { register: UseFormRegister<PayrollFormValues>; setValue: UseFormSetValue<PayrollFormValues>; watch: UseFormWatch<PayrollFormValues>; error?: string }) {
  const placement = watch('placement');
  const positions = placement === 'SHOPEE EXPRESS' ? SHOPEE_POSITIONS : placement === 'WAHANA EXPRESS' ? WAHANA_POSITIONS : [];
  return (
    <FieldShell label="Posisi" error={error}>
      <select className={inputClass} disabled={!placement} {...register('position')} onChange={(event) => setValue('position', event.target.value, { shouldDirty: true, shouldTouch: true, shouldValidate: true })}>
        <option value="">{placement ? 'Pilih posisi' : 'Pilih penempatan terlebih dahulu'}</option>
        {positions.map((position) => <option key={position} value={position}>{position}</option>)}
      </select>
    </FieldShell>
  );
}
