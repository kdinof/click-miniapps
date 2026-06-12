import { useState, type ReactNode } from 'react';
import { formatUzPhone, uzNationalDigits } from '@/lib/phone';

export interface TextFieldProps {
  label?: string;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  readOnly?: boolean;
  disabled?: boolean;
  error?: boolean;
  trailing?: ReactNode;
  helper?: ReactNode;
  maxLength?: number;
  textarea?: boolean;
  /** Enables digit-only input + the +998 ## ### ## ## mask, and flags an incomplete number on blur. */
  phone?: boolean;
}

export function TextField({
  label,
  value,
  placeholder,
  onChange,
  onBlur,
  readOnly,
  disabled,
  error,
  trailing,
  helper,
  maxLength,
  textarea,
  phone,
}: TextFieldProps) {
  const [touched, setTouched] = useState(false);

  const phoneIncomplete =
    !!phone && touched && (value ?? '').length > 0 && uzNationalDigits(value ?? '').length < 9;
  const showError = !!error || phoneIncomplete;

  const interactive = !readOnly && !disabled;

  const borderClass = disabled
    ? 'border-text-disabled'
    : showError
      ? 'border-error'
      : interactive
        ? 'border-bg-ocean hover:bg-bg-ocean focus-within:bg-bg-island focus-within:border-accent'
        : 'border-bg-ocean';

  const textColor = disabled ? 'text-text-disabled' : 'text-text-primary';
  const placeholderColor = disabled
    ? 'placeholder:text-text-disabled'
    : 'placeholder:text-text-secondary';

  const handleChange = (raw: string) => onChange?.(phone ? formatUzPhone(raw) : raw);
  const handleBlur = () => { if (phone) setTouched(true); onBlur?.(); };

  const helperContent =
    showError && phone && helper == null ? 'Введите номер целиком' : helper;

  const fieldClass = `min-w-0 flex-1 resize-none bg-transparent text-body outline-none ${textColor} ${placeholderColor}`;

  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className={`text-body-sm ${disabled ? 'text-text-disabled' : 'text-text-primary'}`}>{label}</label>}
      <div
        className={`flex gap-2 rounded-[12px] border bg-bg-island px-4 transition-colors ${borderClass} ${
          textarea ? 'py-3' : 'h-[52px] items-center'
        }`}
      >
        {textarea ? (
          <textarea
            value={value}
            placeholder={placeholder}
            readOnly={readOnly}
            disabled={disabled}
            maxLength={maxLength}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={handleBlur}
            rows={3}
            className={fieldClass}
          />
        ) : (
          <input
            value={value}
            placeholder={placeholder}
            readOnly={readOnly}
            disabled={disabled}
            maxLength={maxLength}
            inputMode={phone ? 'numeric' : undefined}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={handleBlur}
            className={fieldClass}
          />
        )}
        {trailing && <div className="flex shrink-0 items-center gap-2">{trailing}</div>}
      </div>
      {helperContent && (
        <span className={`text-body-sm ${showError ? 'text-error' : disabled ? 'text-text-disabled' : 'text-text-secondary'}`}>
          {helperContent}
        </span>
      )}
    </div>
  );
}
