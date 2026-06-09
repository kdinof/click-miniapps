import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Check } from 'lucide-react';

interface MultiSelectProps {
  label?: string;
  placeholder: string;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
}

export function MultiSelect({ label, placeholder, options, value, onChange }: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  function toggle(option: string) {
    onChange(value.includes(option) ? value.filter((v) => v !== option) : [...value, option]);
  }

  function remove(e: React.MouseEvent, option: string) {
    e.stopPropagation();
    onChange(value.filter((v) => v !== option));
  }

  return (
    <div className="flex flex-col gap-1.5" ref={ref}>
      {label && <label className="text-body-sm text-text-primary">{label}</label>}

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex min-h-[52px] w-full flex-wrap items-center gap-2 rounded-[12px] border border-bg-ocean bg-bg-island px-4 py-2 pr-10 text-left outline-none transition-colors hover:bg-bg-ocean focus:border-accent"
        >
          {value.length === 0 ? (
            <span className="text-body text-text-secondary">{placeholder}</span>
          ) : (
            value.map((v) => (
              <span
                key={v}
                className="flex items-center gap-1 rounded-full border border-bg-ocean bg-bg-subtle px-3 py-1 text-body-sm text-text-primary"
              >
                {v}
                <span
                  role="button"
                  onClick={(e) => remove(e, v)}
                  className="flex items-center text-text-tertiary transition-colors hover:text-text-primary cursor-pointer"
                >
                  <X size={13} />
                </span>
              </span>
            ))
          )}
        </button>

        <ChevronDown
          size={20}
          className={`pointer-events-none absolute top-4 right-4 text-text-tertiary transition-transform ${open ? 'rotate-180' : ''}`}
        />

        {open && (
          <div className="absolute z-20 mt-1 w-full overflow-hidden rounded-[12px] border border-bg-ocean bg-bg-island shadow-lg">
            {options.map((option) => {
              const selected = value.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggle(option)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-body text-text-primary transition-colors hover:bg-bg-ocean"
                >
                  <span>{option}</span>
                  {selected && <Check size={16} className="text-accent" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
