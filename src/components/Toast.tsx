import { useEffect } from 'react';
import { Check } from 'lucide-react';

export interface ToastProps {
  message: string;
  onHide: () => void;
}

export function Toast({ message, onHide }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onHide, 2500);
    return () => clearTimeout(t);
  }, [onHide]);

  return (
    <div className="fixed top-6 left-1/2 z-[60] -translate-x-1/2">
      <div className="flex items-center gap-2 rounded-full bg-[#212327] py-2.5 pr-5 pl-2.5 shadow-lg">
        <span className="flex size-6 items-center justify-center rounded-full bg-[#2fc26e]">
          <Check size={15} strokeWidth={3} className="text-white" />
        </span>
        <span className="text-body font-semibold text-text-white">{message}</span>
      </div>
    </div>
  );
}
