import {
  Box,
  AppWindow,
  Sparkles,
  FileText,
  Rocket,
  ChevronLeft,
  X,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/Button';
import { Link } from '@/components/Link';
import { Badge } from '@/components/Badge';
import { TextField } from '@/components/TextField';
import { CopyButton } from '@/components/CopyButton';
import { useDashboard, TOKEN_LINK } from '@/state/dashboard';

/* --------------------------------- Glow --------------------------------- */
function Glow() {
  return (
    <div
      className="pointer-events-none absolute bottom-[-60px] left-1/2 h-[240px] w-[820px] -translate-x-1/2 rounded-[50%] blur-2xl"
      style={{
        background: 'radial-gradient(closest-side, rgba(64,150,255,0.40), rgba(64,150,255,0))',
      }}
    />
  );
}

/* ------------------------------ Token card ------------------------------ */
function TokenCard({ variant }: { variant: 'initial' | 'generated' | 'masked' }) {
  const { dispatch } = useDashboard();
  const sub =
    variant === 'masked'
      ? 'Используйте токен для проверки Mini App на выбранных пользователях.'
      : 'Поменяйте тестовый токен на продовый, чтобы тестировать миниапп';

  return (
    <div className="relative w-full overflow-hidden rounded-island bg-bg-island p-9">
      <Glow />
      <div className="relative flex flex-col items-center gap-9">
        <div className="flex w-[600px] max-w-full flex-col items-center gap-4">
          <h2 className="text-h1 text-text-primary">Токен</h2>
          <p className="text-center text-body text-text-secondary">{sub}</p>
        </div>

        {variant === 'initial' ? (
          <Button className="w-[235px]" onClick={() => dispatch({ type: 'GENERATE_TOKEN' })}>
            Сгенерировать
          </Button>
        ) : (
          <div className="w-full">
            <TextField
              readOnly
              value={variant === 'masked' ? '•'.repeat(64) : TOKEN_LINK}
              trailing={<CopyButton value={TOKEN_LINK} />}
            />
          </div>
        )}
      </div>
    </div>
  );
}

/* ----------------------------- Launch block ----------------------------- */
function LaunchBlock() {
  const { dispatch } = useDashboard();
  return (
    <div className="flex items-center justify-between gap-4 rounded-island bg-bg-island px-6 py-5">
      <div className="flex items-center gap-4">
        <Rocket size={24} className="shrink-0 text-text-primary" />
        <div className="flex flex-col">
          <p className="text-body font-semibold text-text-primary">Запуск тестового МиниАпа</p>
          <p className="text-body-sm text-text-secondary">
            Полный запуск станет доступен после подписания договора и прохождения модерации
          </p>
        </div>
      </div>
      <Button className="w-[140px]" onClick={() => dispatch({ type: 'START_CONFIG' })}>
        Начать
      </Button>
    </div>
  );
}

/* ------------------------------ Dev cards ------------------------------- */
function SandboxCard() {
  return (
    <div className="flex flex-1 flex-col gap-5 rounded-island bg-bg-island p-6">
      <div className="flex flex-col gap-4">
        <Box size={24} className="text-text-primary" />
        <div className="flex flex-col gap-1">
          <div>
            <Badge icon={<FileText size={12} />}>.md файлы с инструкциями</Badge>
          </div>
          <h3 className="text-h2 text-text-primary">Sandbox и документация</h3>
          <p className="text-body-sm text-text-secondary">
            Разработчик может получить доступ к sandbox, изучить документацию и начать
            тестовую интеграцию до завершения полной бизнесовой проверки.
          </p>
        </div>
      </div>
      <Link>Перейти</Link>
    </div>
  );
}

function AICard() {
  const { dispatch } = useDashboard();
  return (
    <div className="flex flex-1 flex-col justify-between gap-5 rounded-island bg-bg-island p-6">
      <div className="flex flex-col gap-4">
        <AppWindow size={24} className="text-text-primary" />
        <div className="flex flex-col gap-1">
          <div>
            <Badge variant="violet" icon={<Sparkles size={12} />}>
              AI генерация приложений
            </Badge>
          </div>
          <h3 className="text-h2 text-text-primary">Нет приложения?</h3>
          <p className="text-body-sm text-text-secondary">
            Создайте Mini App с помощью AI или выберите готовый способ запуска через
            партнёров и витрину.
          </p>
        </div>
      </div>
      <Link onClick={() => dispatch({ type: 'OPEN_OPTIONS' })}>
        Посмотреть варианты
      </Link>
    </div>
  );
}

function InfoBanner() {
  return (
    <div className="flex items-start gap-4 rounded-island bg-bg-island px-6 py-3">
      <img src="/assets/info-icon.svg" alt="" className="mt-0.5 size-5 shrink-0" />
      <div className="flex flex-col">
        <p className="text-body font-semibold text-text-primary">Убедитесь, что договор подписан</p>
        <p className="text-body text-text-secondary">
          Полный запуск станет доступен после подписания договора и прохождения модерации
        </p>
      </div>
    </div>
  );
}

/* ----------------------------- Config page ------------------------------ */
function ConfigPage() {
  const { state, dispatch } = useDashboard();
  const { subdomain, phones } = state.config;

  return (
    <div className="flex flex-col gap-6 rounded-island bg-bg-island p-9">
      <button
        onClick={() => dispatch({ type: 'BACK_FROM_CONFIG' })}
        aria-label="Назад"
        className="flex size-6 items-center justify-center text-text-primary"
      >
        <ChevronLeft size={24} />
      </button>

      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-h2 text-text-primary">Получение токена</h2>
          <p className="text-body-sm text-text-secondary">
            Укажите сабдомен и добавьте пользователей, которым будет доступен тестовый Mini
            App в Click SuperApp.
          </p>
        </div>
        <Button className="w-[185px]" onClick={() => dispatch({ type: 'LAUNCH' })}>
          Запустить МиниАпп
        </Button>
      </div>

      {/* Subdomain */}
      <div className="flex flex-col gap-3">
        <h3 className="text-body font-semibold text-text-primary">Укажите сабдомен МиниАпа</h3>
        <p className="text-body-sm text-text-secondary">
          Введите сабдомен в формате: click.названиеминиаппа.uz. на котором будет
          открываться тестовая версия Mini App. Он должен быть добавлен и настроен заранее.{' '}
          <span className="cursor-pointer text-accent">Как получить и настроить сабдомен.</span>
        </p>
        <TextField
          placeholder="https://www.sabdomenov.net/..."
          value={subdomain}
          onChange={(v) => dispatch({ type: 'SET_SUBDOMAIN', value: v })}
        />
      </div>

      {/* Phones */}
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-body font-semibold text-text-primary">
              Укажите, кому будет доступен тестовый МиниАпп
            </h3>
            <p className="text-body-sm text-text-secondary">
              Укажите до 20 номеров телефонов. Только эти пользователи смогут открыть
              тестовый Mini App в Click SuperApp.
            </p>
          </div>
          <Button
            variant="secondary"
            className="w-[170px] shrink-0"
            onClick={() => dispatch({ type: 'ADD_PHONE' })}
          >
            Добавить номер
          </Button>
        </div>

        <div className="flex flex-col gap-3">
          {phones.map((phone, i) => (
            <TextField
              key={i}
              phone
              label="Номер телефона"
              placeholder="+998 90 123 45 67"
              value={phone}
              onChange={(v) => dispatch({ type: 'SET_PHONE', index: i, value: v })}
              trailing={
                <>
                  <button
                    onClick={() => dispatch({ type: 'CLEAR_PHONE', index: i })}
                    aria-label="Очистить"
                    className="text-text-tertiary transition-colors hover:text-text-primary"
                  >
                    <X size={20} />
                  </button>
                  <button
                    onClick={() => dispatch({ type: 'REMOVE_PHONE', index: i })}
                    aria-label="Удалить"
                    className="text-accent transition-colors hover:text-accent-hover"
                  >
                    <Trash2 size={20} />
                  </button>
                </>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------- Availability (S6) --------------------------- */
const TEST_USERS = [
  'Абрамов Матвей',
  'Некрасов Константин',
  'Ермолаев Марк',
  'Синицын Леонид',
  'Гаврилов Иван',
];

function AvailabilityBlock() {
  return (
    <div className="flex gap-6 overflow-hidden rounded-island bg-bg-island p-6">
      <div className="flex flex-1 flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h2 className="text-h2 text-text-primary">Mini App доступен тестовым пользователям</h2>
          <p className="text-body-sm text-text-secondary">
            Тестовая версия доступна по ссылке и через поиск в Click SuperApp только для
            добавленных пользователей.
          </p>
        </div>
        <TextField
          label="Название МиниАппа"
          value="Safia Work"
          readOnly
          trailing={<CopyButton value="Safia Work" />}
        />
        <TextField
          label="Диплинк (по диплинку можете попасть в свой тестовый МиниАпп)"
          value={TOKEN_LINK}
          readOnly
          trailing={<CopyButton value={TOKEN_LINK} />}
        />
      </div>

      <div className="relative -mb-6 w-[280px] shrink-0 self-stretch overflow-hidden rounded-t-island bg-[#e0eefe]/50">
        <img
          src="/assets/dev/test-search.png"
          alt="Тестовый Mini App в поиске Click SuperApp"
          className="absolute left-1/2 top-6 w-[210px] -translate-x-1/2 rounded-2xl border-4 border-black/[0.08]"
        />
      </div>
    </div>
  );
}

function AvailableUsersTable() {
  const { dispatch } = useDashboard();
  return (
    <div className="flex flex-col gap-5 rounded-island bg-bg-island p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-h2 text-text-primary">Кому доступен тестовый МиниАпп</h2>
        <Button variant="secondary" className="w-[170px]" onClick={() => dispatch({ type: 'EDIT_CONFIG' })}>
          Редактировать
        </Button>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center rounded-lg bg-bg-ocean px-4 py-3 text-body-sm font-semibold text-text-secondary">
          <span className="flex-1">ФИО</span>
          <span className="flex-1">Номер телефона</span>
          <span className="w-6" />
        </div>
        {TEST_USERS.map((name) => (
          <div key={name} className="flex items-center border-b border-border px-4 py-3.5 last:border-0">
            <span className="flex-1 text-body font-medium text-text-primary">{name}</span>
            <span className="flex-1 text-body text-text-primary">+998 90 123 45 67</span>
            <CopyButton value="+998 90 123 45 67" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------- DevTab --------------------------------- */
export function DevTab() {
  const { state } = useDashboard();

  if (state.dev === 'configuring') return <ConfigPage />;

  const tokenVariant =
    state.dev === 'configured' ? 'masked' : state.dev === 'tokenGenerated' ? 'generated' : 'initial';

  return (
    <div className="flex flex-col gap-5">
      <TokenCard variant={tokenVariant} />

      {state.dev === 'tokenGenerated' && <LaunchBlock />}

      {state.dev === 'configured' ? (
        <>
          <AvailabilityBlock />
          <AvailableUsersTable />
        </>
      ) : (
        <>
          <div className="flex items-stretch gap-2">
            <SandboxCard />
            <AICard />
          </div>
          <InfoBanner />
        </>
      )}
    </div>
  );
}
