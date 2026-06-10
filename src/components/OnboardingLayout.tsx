import type { ReactNode } from 'react';
import { Globe, ChevronDown, SquareTerminal } from 'lucide-react';

// Общий каркас страниц регистрации: верхняя панель (лого + язык),
// 3D-иллюстрация в верхней зоне и плавающий блок документации снизу.
// Контент (заголовок + форма) центрируется по вертикали через слот children.
export function OnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-bg-light-blue">
      {/* Верхняя панель */}
      <header className="flex h-[60px] items-center justify-between px-[60px]">
        <img src="/assets/logo_MiniApps_dark.svg" alt="Click MiniApps" className="h-[19px] w-[140px]" />
        <button className="flex h-12 w-24 items-center gap-3 rounded-xl bg-white/[0.12]">
          <Globe size={24} className="text-accent" />
          <span className="text-body text-text-primary">RU</span>
          <ChevronDown size={24} className="text-text-secondary" />
        </button>
      </header>

      {/* Иллюстрация: 101px от верха страницы, 234×234px, по центру */}
      <img
        src="/assets/onboarding-illustration.png"
        alt=""
        className="pointer-events-none absolute top-[101px] left-1/2 size-[304px] -translate-x-1/2"
      />

      {/* Контент: 101 + 234 + 33 = 368px от верха */}
      <div className="absolute top-[368px] left-1/2 -translate-x-1/2">
        {children}
      </div>

      {/* Документация для разработчиков: 50px от низа */}
      <div className="absolute bottom-[50px] left-1/2 flex w-[500px] -translate-x-1/2 items-center justify-center gap-2.5 rounded-island bg-bg-island p-4">
        <SquareTerminal size={24} className="text-text-primary" />
        <span className="text-body text-text-primary">Документация для разработчиков</span>
      </div>
    </div>
  );
}
