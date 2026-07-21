import type { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { SHOPEE_EMPLOYMENT_STATUSES, WAHANA_EMPLOYMENT_STATUSES } from '../../constants/placements';
import type { PayrollFormValues } from '../../types/payroll';
import { FieldShell, inputClass } from './FieldShell';

type Props = {
  register: UseFormRegister<PayrollFormValues>;
  setValue: UseFormSetValue<PayrollFormValues>;
  watch: UseFormWatch<PayrollFormValues>;
  error?: string;
};

export function EmploymentStatusField({ register, setValue, watch, error }: Props) {
  const placement = watch('placement');
  const statuses = placement === 'SHOPEE EXPRESS' ? SHOPEE_EMPLOYMENT_STATUSES : placement === 'WAHANA EXPRESS' ? WAHANA_EMPLOYMENT_STATUSES : [];
  return (
    <FieldShell label="Status Karyawan" error={error}>
      <select className={inputClass} disabled={!placement} {...register('employmentStatus')} onChange={(event) => {
        setValue('employmentStatus', event.target.value, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
        setValue('osId', '', { shouldDirty: true, shouldValidate: true });
      }}>
        <option value="">{placement ? 'Pilih status' : 'Pilih penempatan terlebih dahulu'}</option>
        {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
      </select>
    </FieldShell>
  );
}
