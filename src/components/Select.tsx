import { ChevronDown } from 'lucide-react';

export interface SelectProps {
  label?: string;
  placeholder: string;
  options: string[];
  disabled?: boolean;
  error?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

export function Select({ label, placeholder, options, disabled, error, value, onChange }: SelectProps) {
  const borderClass = disabled
    ? 'border-text-disabled'
    : error
      ? 'border-error'
      : 'border-bg-ocean hover:bg-bg-ocean focus:border-accent focus:bg-bg-island';

  const controlled = value !== undefined;

  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className={`text-body-sm ${disabled ? 'text-text-disabled' : 'text-text-primary'}`}>{label}</label>}
      <div className="relative">
        <select
          {...(controlled ? { value } : { defaultValue: '' })}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          disabled={disabled}
          className={`h-[52px] w-full appearance-none rounded-[12px] border bg-bg-island px-4 pr-10 text-body outline-none transition-colors ${borderClass} ${
            controlled && value === '' ? 'text-text-secondary' : disabled ? 'text-text-disabled' : 'text-text-primary'
          }`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown
          size={20}
          className={`pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 ${
            disabled ? 'text-text-disabled' : 'text-text-tertiary'
          }`}
        />
      </div>
    </div>
  );
}
