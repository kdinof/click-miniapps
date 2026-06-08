import { useState } from 'react';
import { Check } from 'lucide-react';
import { OnboardingLayout } from '@/components/OnboardingLayout';
import { Button } from '@/components/Button';

export function Register({ onContinue }: { onContinue: () => void }) {
  const [accepted, setAccepted] = useState(false);

  return (
    <OnboardingLayout>
      <div className="flex w-[500px] flex-col items-center gap-10">
        {/* Заголовок */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-center text-[34px] leading-[44px] font-semibold text-text-primary">
            Добро пожаловать!
          </h1>
          <p className="text-center text-[19.5px] leading-[26px] text-text-secondary">
            Зарегистрируйтесь через Google и начните интеграцию в Click MiniApps
          </p>
        </div>

        {/* Согласие + кнопка */}
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full flex-col items-center rounded-island bg-bg-island p-4">
            <div className="flex w-[390px] items-start gap-3">
              <button
                type="button"
                onClick={() => setAccepted((v) => !v)}
                className={`flex size-6 shrink-0 items-center justify-center rounded-lg border-2 transition-colors ${
                  accepted ? 'border-accent bg-accent' : 'border-text-secondary'
                }`}
              >
                {accepted && <Check size={16} className="text-text-white" />}
              </button>
              <p className="flex-1 text-body text-text-primary">
                Я принимаю <span className="text-accent">оферту</span> и{' '}
                <span className="text-accent">правила публикации</span> приложений в Click SuperApp
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Button className="w-full" disabled={!accepted} onClick={onContinue}>
              Продолжить с Google
            </Button>
            <Button variant="secondary" className="w-full" disabled={!accepted} onClick={onContinue}>
              Продолжить с Email
            </Button>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
}
