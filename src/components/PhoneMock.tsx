import type { ReactNode } from 'react';

/**
 * Lightweight stylised phone frame used for the decorative "how it looks in the
 * app" mockups (S6, S9). Not a 1:1 of the Figma raster mockups — a clean
 * placeholder that conveys the same meaning for the prototype.
 */
export function PhoneMock({
  children,
  className = '',
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[28px] border border-border bg-bg-island ${className}`}
    >
      <div className="flex items-center justify-between px-4 pt-3 pb-1 text-[10px] font-semibold text-text-primary">
        <span>9:41</span>
        <span className="tracking-tight text-text-tertiary">▤ ▦ ▮</span>
      </div>
      <div className="px-4 pb-4">{children}</div>
    </div>
  );
}
