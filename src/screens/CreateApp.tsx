import { useState } from 'react';
import { OnboardingLayout } from '@/components/OnboardingLayout';
import { Button } from '@/components/Button';

export function CreateApp({ onCreate }: { onCreate: (name: string) => void }) {
  const [name, setName] = useState('');

  return (
    <OnboardingLayout>
      <div className="flex w-[608px] flex-col items-center gap-10">
        {/* Заголовок */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-center text-[34px] leading-[44px] font-semibold text-text-primary">
            Создать Mini app
          </h1>
          <p className="text-center text-[19.5px] leading-[26px] text-text-secondary">
            В рабочем пространстве вы будете управлять Миниаппом: настраивать, тестировать и
            отслеживать аналитику
          </p>
        </div>

        {/* Поле названия + кнопка */}
        <div className="flex w-[500px] flex-col gap-4">
          <div className="flex flex-col gap-0.5">
            <label className="text-body-sm text-text-primary">Название миниаппа</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Safia Work"
              className="h-11 rounded-button border border-bg-ocean bg-bg-island px-3 text-body text-text-primary outline-none transition-colors placeholder:text-text-secondary hover:bg-bg-ocean focus:border-accent focus:bg-bg-island"
            />
          </div>
          <Button className="w-full" disabled={!name.trim()} onClick={() => onCreate(name.trim())}>
            Создать рабочее пространство
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
}