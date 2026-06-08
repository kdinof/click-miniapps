export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Switch({ checked, onChange }: SwitchProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200 ${
        checked ? 'bg-accent' : 'bg-bg-control'
      }`}
    >
      <span
        className={`absolute top-1 size-5 rounded-full bg-white shadow-sm transition-all duration-200 ${
          checked ? 'left-6' : 'left-1'
        }`}
      />
    </button>
  );
}
