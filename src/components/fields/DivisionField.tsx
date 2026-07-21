import type { UseFormRegister } from 'react-hook-form';
import { DIVISIONS } from '../../constants/placements';
import type { PayrollFormValues } from '../../types/payroll';
import { FieldShell, inputClass } from './FieldShell';

export function DivisionField({ register, error }: { register: UseFormRegister<PayrollFormValues>; error?: string }) {
  return <FieldShell label="Divisi" error={error}>
    <select className={inputClass} {...register('division')}>
      <option value="">Pilih divisi</option>
      {DIVISIONS.map((division) => <option key={division} value={division}>{division}</option>)}
    </select>
  </FieldShell>;
}
