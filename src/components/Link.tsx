import type { ButtonHTMLAttributes } from 'react';

export type LinkProps = ButtonHTMLAttributes<HTMLButtonElement>;

/** Inline text link (accent, flush-left) — for in-card "go to" affordances, not a button. */
export function Link({ className = '', children, ...rest }: LinkProps) {
  return (
    <button
      className={`self-start text-body font-medium text-accent transition-colors hover:text-accent-hover hover:underline ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
