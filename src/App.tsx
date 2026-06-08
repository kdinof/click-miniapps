import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Stepper, type StepStatus } from '@/components/Stepper';
import { Tabs } from '@/components/Tabs';
import { Button } from '@/components/Button';
import { Toast } from '@/components/Toast';
import { DevTab } from '@/screens/DevTab';
import { ContractTab } from '@/screens/ContractTab';
import { InfoTab } from '@/screens/InfoTab';
import { SuccessModal } from '@/screens/SuccessModal';
import { OptionsModal } from '@/screens/OptionsModal';
import { Register } from '@/screens/Register';
import { CreateApp } from '@/screens/CreateApp';
import { DashboardProvider, useDashboard, type State, type Tab } from '@/state/dashboard';

const STEP_LABELS = [
  'Доступ\nк sandbox',
  'Тестовый запуск\nМиниАпа',
  'Подписание\nдоговора',
  'Информация\nо МиниАппе',
  'Модерация\n/ Релиз',
];

const TABS = [
  { key: 'dev', label: 'Для разработчиков' },
  { key: 'contract', label: 'Подписание договора' },
  { key: 'info', label: 'Общая информация' },
];

// Статус каждого шага выводится из заполненности данных, а не из активного таба:
//   pending  — серый,            ничего не начато
//   current  — синий без галки,  начато, но не завершено
//   done     — синий с галкой,   полностью заполнено
function getStatuses(state: State): StepStatus[] {
  const { dev, config, contractPhone, contractSent } = state;

  // 1. Доступ к sandbox — доступен по умолчанию, всегда готово
  const sandbox: StepStatus = 'done';

  // 2. Тестовый запуск — начато при вводе сабдомена/телефона или на странице конфига
  const configStarted =
    config.subdomain.trim() !== '' || config.phones.some((p) => p.trim() !== '');
  const testLaunch: StepStatus =
    dev === 'configured'
      ? 'done'
      : dev === 'configuring' || configStarted
        ? 'current'
        : 'pending';

  // 3. Подписание договора — начато при вводе телефона, готово после отправки
  const contract: StepStatus = contractSent
    ? 'done'
    : contractPhone.trim() !== ''
      ? 'current'
      : 'pending';

  // 4. Информация о МиниАппе и 5. Модерация — данных в сторе пока нет
  return [sandbox, testLaunch, contract, 'pending', 'pending'];
}

function Dashboard() {
  const { state, dispatch } = useDashboard();
  const steps = STEP_LABELS.map((label, i) => ({ label, status: getStatuses(state)[i] }));
  const moderationPrimary = state.tab === 'dev' && state.dev === 'configured';

  // После создания рабочего пространства сначала показываем пустой шелл,
  // через 1 сек «подгружаем» контент главной страницы.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-bg-sidebar">
      <Sidebar />
      <main className="flex-1 py-4 pr-4">
        <div className="h-full overflow-auto rounded-island bg-bg-light-blue">
          {ready && (
          <div className="mx-auto flex w-[1000px] max-w-full flex-col pt-12 pb-12 animate-fade-in">
            {/* Title */}
            <div className="flex items-center justify-between">
              <h1 className="text-[48px] leading-[48px] font-semibold text-text-primary">
                Новый МиниАпп
              </h1>
              <Button variant={moderationPrimary ? 'primary' : 'secondary'} className="w-[255px]">
                Отправить на модерацию
              </Button>
            </div>

            {/* Stepper */}
            <div className="mt-10">
              <Stepper steps={steps} />
            </div>

            {/* Tabs + content */}
            <div className="mt-[60px] flex flex-col gap-5">
              <Tabs
                tabs={TABS}
                active={state.tab}
                onChange={(k) => dispatch({ type: 'SET_TAB', tab: k as Tab })}
              />
              {state.tab === 'dev' && <DevTab />}
              {state.tab === 'contract' && <ContractTab />}
              {state.tab === 'info' && <InfoTab />}
            </div>
          </div>
          )}
        </div>
      </main>

      {state.toast && (
        <Toast message="Токен сгенерирован" onHide={() => dispatch({ type: 'HIDE_TOAST' })} />
      )}
      {state.modal === 'success' && <SuccessModal />}
      {state.modal === 'options' && <OptionsModal />}
    </div>
  );
}

// Линейный онбординг перед дашбордом: регистрация → название МиниАппа → главная.
type Page = 'register' | 'createApp' | 'dashboard';

export default function App() {
  const [page, setPage] = useState<Page>('register');

  if (page === 'register') return <Register onContinue={() => setPage('createApp')} />;
  if (page === 'createApp') return <CreateApp onCreate={() => setPage('dashboard')} />;

  return (
    <DashboardProvider>
      <Dashboard />
    </DashboardProvider>
  );
}
