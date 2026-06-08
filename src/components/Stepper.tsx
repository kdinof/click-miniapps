import { Check } from 'lucide-react';

export type StepStatus = 'done' | 'current' | 'pending';

export interface Step {
  label: string;
  status: StepStatus;
}

export interface StepperProps {
  steps: Step[];
}

export function Stepper({ steps }: StepperProps) {
  return (
    <div className="relative w-full">
      {/* background track */}
      <div className="absolute top-1.5 left-0 h-3 w-full rounded-full bg-bg-ocean" />

      <div className="relative flex items-start justify-between">
        {steps.map((step, i) => {
          const active = step.status !== 'pending';
          const alignment =
            i === 0
              ? 'items-start text-left'
              : i === steps.length - 1
                ? 'items-end text-right'
                : 'items-center text-center';
          return (
            <div key={i} className={`flex flex-col gap-3.5 ${alignment}`}>
              <div
                className={`flex size-6 items-center justify-center rounded-full ${
                  active ? 'bg-accent' : 'bg-bg-island ring-1 ring-[#dfe3e8]'
                }`}
              >
                {step.status === 'done' && (
                  <Check size={14} strokeWidth={3} className="text-text-white" />
                )}
              </div>
              <p
                className={`text-body-sm whitespace-pre-line ${
                  active ? 'text-text-primary' : 'text-text-tertiary'
                }`}
              >
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
