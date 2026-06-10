import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

const variantClasses: Record<Variant, string> = {
  primary: 'bg-accent text-text-white hover:bg-accent-hover disabled:bg-text-disabled',
  secondary: 'bg-bg-control text-text-primary hover:brightness-95 disabled:opacity-60',
  ghost: 'text-text-primary hover:bg-bg-control/60 disabled:opacity-60',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  leftIcon?: ReactNode;
}

export function Button({
  variant = 'primary',
  leftIcon,
  className = '',
  children,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`flex h-11 min-w-[126px] items-center justify-center gap-2 rounded-button px-4 font-sans text-[17px] leading-[22px] font-semibold whitespace-nowrap transition-[background-color,filter] duration-150 disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {leftIcon}
      {children}
    </button>
  );
}
