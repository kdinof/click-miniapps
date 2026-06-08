import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export interface AccordionItemData {
  question: string;
  answer: string;
}

export function Accordion({
  items,
  defaultOpen = 0,
}: {
  items: AccordionItemData[];
  defaultOpen?: number;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="rounded-island bg-bg-island px-6 py-5">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 text-left"
            >
              <span className="text-body font-semibold text-text-primary">
                {item.question}
              </span>
              {isOpen ? (
                <Minus size={24} className="shrink-0 text-text-primary" />
              ) : (
                <Plus size={24} className="shrink-0 text-text-primary" />
              )}
            </button>
            {isOpen && (
              <p className="mt-2 text-body-sm text-text-secondary">{item.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
