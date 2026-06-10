import { useState } from 'react';
import { Check } from 'lucide-react';
import { OnboardingLayout } from '@/components/OnboardingLayout';
import { Button } from '@/components/Button';
import { TextField } from '@/components/TextField';

function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.859-3.048.859-2.344 0-4.328-1.583-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.964 10.709A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.709V4.959H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.041l3.007-2.332z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.959L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
      />
    </svg>
  );
}

export function Register({ onContinue }: { onContinue: () => void }) {
  const [accepted, setAccepted] = useState(false);
  const [email, setEmail] = useState('');

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

        {/* Способы входа */}
        <div className="flex w-full flex-col gap-4">
          {/* Войти с Google */}
          <button
            type="button"
            onClick={onContinue}
            disabled={!accepted}
            className="flex h-[52px] w-full items-center justify-center gap-2 rounded-button border border-bg-ocean bg-bg-island px-4 text-body font-semibold text-text-primary transition-colors hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <GoogleLogo />
            Войти с Google
          </button>

          {/* Разделитель */}
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-body-sm text-text-secondary">ИЛИ</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Email */}
          <TextField placeholder="Введите ваш email" value={email} onChange={setEmail} />

          {/* Согласие */}
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

          {/* Войти */}
          <Button className="w-full" disabled={!accepted} onClick={onContinue}>
            Войти
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
}
