import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export function CopyButton({ value, size = 20 }: { value: string; size?: number }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={copy}
      aria-label="Скопировать"
      className="flex shrink-0 items-center justify-center text-accent transition-colors hover:text-accent-hover"
    >
      {copied ? <Check size={size} /> : <Copy size={size} />}
    </button>
  );
}
