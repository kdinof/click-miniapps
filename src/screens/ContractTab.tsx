import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/Button';
import { Accordion, type AccordionItemData } from '@/components/Accordion';
import { useDashboard } from '@/state/dashboard';
import { formatUzPhone } from '@/lib/phone';

const faq: AccordionItemData[] = [
  {
    question: 'Кто такой мерчант Click Business, и как им стать?',
    answer:
      'Мерчант Click Business – предприниматель или компания, принимающая оплату за свои товары и услуги через сервисы Click. Чтобы стать мерчантом, подайте заявку на подключение. Наш менеджер свяжется с вами и поможет завершить процесс подключения.',
  },
  {
    question: 'Кто может стать мерчантом Click Business?',
    answer:
      'Мерчантом может стать любое юридическое лицо или индивидуальный предприниматель, зарегистрированный в Узбекистане и имеющий расчётный счёт в банке.',
  },
  {
    question: 'Как оформить договор с Click Business?',
    answer:
      'Оставьте номер телефона в форме выше — менеджер свяжется с вами, согласует условия и пришлёт договор на подписание в электронном виде.',
  },
  {
    question: 'С каких карт вы сможете принимать оплаты?',
    answer:
      'Приём оплаты доступен со всех карт UZCARD и HUMO, а также с карт международных платёжных систем, поддерживаемых Click.',
  },
];

/* Hero card with the corner blue glows */
function HeroGlow() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[260px]"
      style={{
        background:
          'radial-gradient(60% 120% at 12% 110%, rgba(64,150,255,0.45), transparent 60%),' +
          'radial-gradient(60% 120% at 88% 110%, rgba(64,150,255,0.45), transparent 60%)',
        filter: 'blur(6px)',
      }}
    />
  );
}

export function ContractTab() {
  const { state, dispatch } = useDashboard();

  return (
    <div className="flex flex-col gap-5">
      <div className="relative overflow-hidden rounded-island bg-bg-island px-9 py-12">
        <HeroGlow />
        <div className="relative flex flex-col items-center gap-4">
          {state.contractSigned ? (
            <>
              <CheckCircle2 size={40} className="text-accent" />
              <h2 className="text-center text-h1 text-text-primary">
                Вы уже подписали договор!
              </h2>
              <p className="max-w-[560px] text-center text-body text-text-secondary">
                Ваш договор готов для получения MerchantId для авторизации. Вы можете перейти
                к настройке и настроить интеграцию в Click Super App.
              </p>
              <Button className="mt-2 w-[220px]" onClick={() => dispatch({ type: 'SET_TAB', tab: 'info' })}>
                Перейти к интеграции
              </Button>
            </>
          ) : state.contractSent ? (
            <>
              <CheckCircle2 size={40} className="text-accent" />
              <h2 className="text-center text-h1 text-text-primary">
                Мы получили вашу заявку!
              </h2>
              <p className="max-w-[560px] text-center text-body text-text-secondary">
                Мы свяжемся с вами для заключения договора на размещение МиниАппа. Когда
                договор будет оформлен, проверьте статус подключения.
              </p>
              <Button className="mt-2 w-[200px]" onClick={() => dispatch({ type: 'CHECK_CONTRACT_STATUS' })}>
                Проверить статус
              </Button>
            </>
          ) : (
            <>
              <h2 className="max-w-[600px] text-center text-h1 text-text-primary">
                Для интеграции миниаппа вам необходимо подписать договор
              </h2>
              <p className="max-w-[520px] text-center text-body text-text-secondary">
                Оставьте номер телефона - мы свяжемся с вами для заключения договора на
                размещение миниаппа.
              </p>
              <input
                value={state.contractPhone}
                onChange={(e) =>
                  dispatch({ type: 'SET_CONTRACT_PHONE', value: formatUzPhone(e.target.value) })
                }
                inputMode="numeric"
                placeholder="Номер вашего телефона"
                className="mt-2 h-[52px] w-[290px] rounded-[12px] border border-bg-ocean bg-bg-island px-4 text-center text-body text-text-primary outline-none transition-colors placeholder:text-text-secondary hover:bg-bg-ocean focus:border-accent focus:bg-bg-island"
              />
              <Button className="w-[200px]" onClick={() => dispatch({ type: 'SUBMIT_CONTRACT' })}>
                Отправить
              </Button>
            </>
          )}
        </div>
      </div>

      <Accordion items={faq} />
    </div>
  );
}
