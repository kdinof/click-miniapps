import type { ReactNode } from 'react';
import { Globe, ChevronDown, SquareTerminal } from 'lucide-react';

// Общий каркас страниц регистрации: верхняя панель (лого + язык),
// 3D-иллюстрация в верхней зоне и плавающий блок документации снизу.
// Контент (заголовок + форма) центрируется по вертикали через слот children.
export function OnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-bg-light-blue">
      {/* Верхняя панель */}
      <header className="flex items-center justify-between px-[60px] py-1.5">
        <img src="/assets/logo_MiniApps_dark.svg" alt="Click MiniApps" className="h-[18px] w-[140px]" />
        <button className="flex items-center gap-3 py-3">
          <Globe size={24} className="text-accent" />
          <span className="text-body text-text-primary">RU</span>
          <ChevronDown size={24} className="text-text-primary" />
        </button>
      </header>

      {/* Иллюстрация */}
      <img
        src="/assets/onboarding-illustration.png"
        alt=""
        className="pointer-events-none absolute top-[101px] left-1/2 size-[234px] -translate-x-1/2"
      />

      {/* Центрированный контент */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {children}
      </div>

      {/* Документация для разработчиков */}
      <div className="absolute bottom-[50px] left-1/2 flex w-[500px] -translate-x-1/2 items-center justify-center gap-2.5 rounded-island bg-bg-island p-4">
        <SquareTerminal size={24} className="text-text-primary" />
        <span className="text-body text-text-primary">Документация для разработчиков</span>
      </div>
    </div>
  );
}
