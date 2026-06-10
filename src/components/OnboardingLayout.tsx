import type { ReactNode } from 'react';
import { Globe, ChevronDown, SquareTerminal } from 'lucide-react';

// Общий каркас страниц регистрации: верхняя панель (лого + язык),
// 3D-иллюстрация над контентом и плавающий блок документации снизу.
// Иллюстрация и контент центрируются по вертикали единой группой,
// поэтому заголовок никогда не наезжает на иллюстрацию.
export function OnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-bg-light-blue">
      {/* Верхняя панель */}
      <header className="flex items-center justify-between px-[60px] py-1.5">
        <img src="/assets/logo_MiniApps_dark.svg" alt="Click MiniApps" className="h-[18px] w-[140px]" />
        <button className="flex items-center gap-3 py-3">
          <Globe size={24} className="text-accent" />
          <span className="text-body text-text-primary">RU</span>
          <ChevronDown size={24} className="text-text-primary" />
        </button>
      </header>

      {/* Иллюстрация + центрированный контент */}
      <main className="flex flex-1 flex-col items-center justify-center gap-10 py-6">
        <img
          src="/assets/onboarding-illustration.png"
          alt=""
          className="pointer-events-none size-[234px] shrink-0"
        />
        {children}
      </main>

      {/* Документация для разработчиков */}
      <div className="flex justify-center px-4 pb-[50px] pt-4">
        <div className="flex w-[500px] items-center justify-center gap-2.5 rounded-island bg-bg-island p-4">
          <SquareTerminal size={24} className="text-text-primary" />
          <span className="text-body text-text-primary">Документация для разработчиков</span>
        </div>
      </div>
    </div>
  );
}
