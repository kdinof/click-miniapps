import type { ReactNode } from 'react';

type Variant = 'default' | 'violet';

const variantClasses: Record<Variant, string> = {
  default: 'bg-badge-bg text-text-primary',
  violet: 'bg-badge-violet-bg text-violet',
};

export interface BadgeProps {
  variant?: Variant;
  icon?: ReactNode;
  children: ReactNode;
}

export function Badge({ variant = 'default', icon, children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-menu font-medium whitespace-nowrap ${variantClasses[variant]}`}
    >
      {icon}
      {children}
    </span>
  );
}
