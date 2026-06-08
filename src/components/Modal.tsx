import type { ReactNode } from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export function Modal({ onClose, children, className = '' }: ModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className={`relative rounded-island bg-bg-island p-6 shadow-xl ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute top-5 right-5 text-text-tertiary transition-colors hover:text-text-primary"
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
}
