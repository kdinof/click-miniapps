import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Stepper, type StepStatus } from '@/components/Stepper';
import { Button } from '@/components/Button';
import { Toast } from '@/components/Toast';
import { DevTab } from '@/screens/DevTab';
import { ContractTab } from '@/screens/ContractTab';
import { InfoTab } from '@/screens/InfoTab';
import { SupportTab } from '@/screens/SupportTab';
import { SuccessModal } from '@/screens/SuccessModal';
import { OptionsModal } from '@/screens/OptionsModal';
import { CongratulationsModal } from '@/screens/CongratulationsModal';
import { Register } from '@/screens/Register';
import { CreateApp } from '@/screens/CreateApp';
import { DashboardProvider, useDashboard, type State, type Tab } from '@/state/dashboard';
import { InfoFormProvider, useInfoForm, isInfoFormComplete, isValidTelegram, type InfoFormState } from '@/state/infoForm';
import type { TabStatus } from '@/components/Sidebar';

const STEP_LABELS = [
  'Доступ\nк sandbox',
  'Тестовый запуск\nМиниАпа',
  'Подписание\nдоговора',
  'Информация\nо МиниАппе',
  'Модерация\n/ Релиз',
];


function getTabStatuses(state: State, form: InfoFormState): Record<string, TabStatus> {
  const dev: TabStatus =
    state.dev === 'configured' ? 'done' :
    state.dev !== 'initial' ? 'progress' : 'empty';

  const contract: TabStatus =
    state.contractSigned ? 'done' :
    state.contractPhone.trim() !== '' || state.contractSent ? 'progress' : 'empty';

  const infoAnyFilled =
    [form.name, form.phone, form.nameRU, form.nameUZ, form.nameENG, form.descRU].some(v => v.trim() !== '') ||
    form.category !== '' || form.regions.length > 0 ||
    form.svgState.status !== 'idle' || form.pngState.status !== 'idle';
  const infoDone =
    form.name.trim() !== '' && form.phone.trim() !== '' &&
    form.nameRU.trim() !== '' && form.nameUZ.trim() !== '' && form.nameENG.trim() !== '' &&
    form.descRU.trim() !== '' && form.descUZ.trim() !== '' && form.descENG.trim() !== '' &&
    form.category !== '' && form.regions.length > 0 &&
    form.svgState.status === 'uploaded' && form.pngState.status === 'uploaded';
  const info: TabStatus = infoDone ? 'done' : infoAnyFilled ? 'progress' : 'empty';

  const supportAnyFilled =
    form.businessName.trim() !== '' || form.telegramUser.trim() !== '' ||
    form.supportContact.trim() !== '' ||
    form.faqs.some(f => f.question.trim() !== '' || f.answer.trim() !== '');
  const supportDone = form.businessName.trim() !== '' && isValidTelegram(form.telegramUser);
  const support: TabStatus = supportDone ? 'done' : supportAnyFilled ? 'progress' : 'empty';

  return { dev, contract, info, support };
}

function getStatuses(state: State, infoComplete: boolean): StepStatus[] {
  const { dev, config, contractPhone, contractSent, tab } = state;

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

  const info: StepStatus = infoComplete
    ? 'done'
    : tab === 'info'
      ? 'current'
      : 'pending';

  return [sandbox, testLaunch, contract, info, 'pending'];
}

function Dashboard({ appName }: { appName: string }) {
  const { state, dispatch } = useDashboard();
  const { form } = useInfoForm();
  const infoComplete = isInfoFormComplete(form);
  const steps = STEP_LABELS.map((label, i) => ({ label, status: getStatuses(state, infoComplete)[i] }));
  const canModerate = infoComplete && state.contractSigned;

  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-bg-sidebar">
      <Sidebar
        appName={appName}
        activeTab={state.tab}
        onTabChange={(k) => dispatch({ type: 'SET_TAB', tab: k as Tab })}
        tabStatuses={getTabStatuses(state, form)}
      />
      <main className="flex-1 py-4 pr-4">
        <div className="h-full overflow-auto rounded-island bg-bg-light-blue">
          {ready && (
          <div className="mx-auto flex w-[1000px] max-w-full flex-col pt-12 pb-12 animate-fade-in">
            <div className="flex items-center justify-between">
              <h1 className="text-[48px] leading-[48px] font-semibold text-text-primary">
                {appName}
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

            <div className="mt-10 flex flex-col gap-5">
              {state.tab === 'dev' && <DevTab appName={appName} />}
              {state.tab === 'contract' && <ContractTab />}
              {state.tab === 'info' && <InfoTab />}
              {state.tab === 'support' && <SupportTab />}
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
      <InfoFormProvider>
        <Dashboard appName={appName} />
      </InfoFormProvider>
    </DashboardProvider>
  );
}