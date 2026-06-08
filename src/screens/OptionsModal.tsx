import type { ReactNode } from 'react';
import { Sparkles, Puzzle, Users, Layers } from 'lucide-react';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { useDashboard } from '@/state/dashboard';

interface Option {
  icon: ReactNode;
  term: string;
  title: string;
  text: string;
  action: string;
}

const options: Option[] = [
  {
    icon: <Sparkles size={24} />,
    term: '1 неделя',
    title: 'Создать через AI',
    text: 'Если у вас пока нет Mini App или команды разработки, начните с AI-сценария: опишите идею сервиса, а платформа поможет перейти к созданию Mini App.',
    action: 'Начать с AI',
  },
  {
    icon: <Puzzle size={24} />,
    term: '1 месяц',
    title: 'Самостоятельная разработка',
    text: 'Для тех, кто хочет создать свой Миниапп. Вы разрабатываете Миниапп сами, а мы даём документацию для интеграции',
    action: 'Документация',
  },
  {
    icon: <Users size={24} />,
    term: '2 недели',
    title: 'Решение от партнёров',
    text: 'Проверенные Миниаппы партнёров и интеграция без разработки. Быстрая интеграция и выбор подходящего Миниаппа имено для вас',
    action: 'Оставить заявку',
  },
  {
    icon: <Layers size={24} />,
    term: '1 неделя',
    title: 'Витрина без разработки',
    text: 'Для тех, кто хочет запуститься бесплатно. Простое и быстрое создание Миниаппа на нашем конструкторе без использования кода',
    action: 'Документация',
  },
];

export function OptionsModal() {
  const { dispatch } = useDashboard();
  const close = () => dispatch({ type: 'CLOSE_MODAL' });

  return (
    <Modal onClose={close} className="w-[630px] max-w-full">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1 pr-8">
          <h2 className="text-h1 text-text-primary">Нет приложения?</h2>
          <p className="text-body-sm text-text-secondary">
            Создайте Mini App с помощью AI или выберите готовый способ запуска через
            партнёров и витрину.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {options.map((o) => (
            <div key={o.title} className="flex flex-col gap-3 rounded-card bg-bg-subtle p-5">
              <div className="flex items-start justify-between">
                <span className="text-text-primary">{o.icon}</span>
                <span className="text-body-sm text-text-secondary">{o.term}</span>
              </div>
              <h3 className="text-body font-semibold text-text-primary">{o.title}</h3>
              <p className="flex-1 text-body-sm text-text-secondary">{o.text}</p>
              <Button variant="secondary" className="w-full">
                {o.action}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
