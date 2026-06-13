import type { UseFormRegister } from 'react-hook-form';
import { FileText } from 'lucide-react';
import type { PayrollFormValues } from '../../types/payroll';

export function PowerOfAttorneyUploadField({ register, error, required }: { register: UseFormRegister<PayrollFormValues>; error?: string; required: boolean }) {
  return (
    <label className="block md:col-span-2">
      <span className="sr-only">Surat Kuasa{required ? '' : ' opsional'}</span>
      <div className="relative flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#4d4635] bg-[#1c1b1b] px-6 text-center transition hover:border-[#f2ca50]/70">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#f2ca50]/10">
          <FileText className="h-7 w-7 text-[#f2ca50]" />
        </div>
        <p className="text-sm font-semibold tracking-[0.05em] text-white">Upload Surat Kuasa</p>
        <p className="mt-1 max-w-52 text-xs font-medium leading-4 text-[#d0c5af]">Format PDF, JPG, JPEG, atau PNG. Wajib jika rekening milik orang lain.</p>
        <input className="absolute inset-0 cursor-pointer opacity-0" type="file" accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png" {...register('powerOfAttorneyFile')} />
      </div>
      {error ? <span className="mt-2 block text-sm text-accent">{error}</span> : null}
    </label>
  );
}
