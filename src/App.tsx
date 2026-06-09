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
import { CongratulationsModal } from '@/screens/CongratulationsModal';
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

function getStatuses(state: State): StepStatus[] {
  const { dev, config, contractPhone, contractSent, infoSaved, tab } = state;

  const sandbox: StepStatus = 'done';

  const configStarted =
    config.subdomain.trim() !== '' || config.phones.some((p) => p.trim() !== '');
  const testLaunch: StepStatus =
    dev === 'configured'
      ? 'done'
      : dev === 'configuring' || configStarted
        ? 'current'
        : 'pending';

  const contract: StepStatus = contractSent
    ? 'done'
    : tab === 'contract' || contractPhone.trim() !== ''
      ? 'current'
      : 'pending';

  const info: StepStatus = infoSaved
    ? 'done'
    : tab === 'info'
      ? 'current'
      : 'pending';

  return [sandbox, testLaunch, contract, info, 'pending'];
}

function Dashboard({ appName }: { appName: string }) {
  const { state, dispatch } = useDashboard();
  const steps = STEP_LABELS.map((label, i) => ({ label, status: getStatuses(state)[i] }));
  const moderationPrimary = state.tab === 'dev' && state.dev === 'configured';
  const canModerate = state.infoSaved && state.contractSigned;

  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-bg-sidebar">
      <Sidebar appName={appName} />
      <main className="flex-1 py-4 pr-4">
        <div className="h-full overflow-auto rounded-island bg-bg-light-blue">
          {ready && (
          <div className="mx-auto flex w-[1000px] max-w-full flex-col pt-12 pb-12 animate-fade-in">
            <div className="flex items-center justify-between">
              <h1 className="text-[48px] leading-[48px] font-semibold text-text-primary">
                Новый МиниАпп
              </h1>
              <Button
                variant={canModerate ? 'primary' : 'secondary'}
                className="w-[255px]"
                disabled={!canModerate}
                onClick={() => dispatch({ type: 'SEND_TO_MODERATION' })}
              >
                Отправить на модерацию
              </Button>
            </div>

            <div className="mt-10">
              <Stepper steps={steps} />
            </div>

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
      {state.modal === 'congratulations' && <CongratulationsModal />}
    </div>
  );
}

type Page = 'register' | 'createApp' | 'dashboard';

export default function App() {
  const [page, setPage] = useState<Page>('register');
  const [appName, setAppName] = useState('');

  if (page === 'register') return <Register onContinue={() => setPage('createApp')} />;
  if (page === 'createApp')
    return (
      <CreateApp
        onCreate={(name) => {
          setAppName(name);
          setPage('dashboard');
        }}
      />
    );

  return (
    <DashboardProvider>
      <Dashboard appName={appName} />
    </DashboardProvider>
  );
}