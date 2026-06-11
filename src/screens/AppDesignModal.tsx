import { Modal } from '@/components/Modal';

function InfoIcon() {
  return (
    <svg className="mt-0.5 shrink-0" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M10 2a8 8 0 1 0 0 16A8 8 0 0 0 10 2Zm0 1.5a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13Zm0 2.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Zm0 3a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0V10a.75.75 0 0 1 .75-.75Z" fill="#0077FF"/>
    </svg>
  );
}

export function AppDesignModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose} className="w-[560px] max-w-full">
      <div className="flex flex-col gap-5 max-h-[80vh] overflow-y-auto pr-1">
        <div className="flex flex-col gap-3 pr-8">
          <h2 className="text-h1 text-text-primary">Требования по дизайну и контенту</h2>
          <p className="text-body-sm text-text-secondary">
            Для создание единой картины у пользователя при использовании сервисов,
            пожалуйста, следуйте айдентике Click SuperApp
          </p>
          <p className="text-body-sm text-text-secondary">
            Айдентика по ссылке, пароль для доступа: Click
          </p>
          <a
            href="https://www.figma.com/community/file/1467042619607467621/click-up-design-system"
            target="_blank"
            rel="noopener noreferrer"
            className="text-body-sm text-accent"
          >
            Фигма с компонентами
          </a>
        </div>

        <div className="flex gap-3 rounded-card bg-bg-subtle px-4 py-4">
          <InfoIcon />
          <div className="flex flex-col gap-2">
            <p className="text-body-sm text-text-secondary">Основные требования к дизайну:</p>
            <ul className="flex flex-col gap-1.5 text-body-sm text-text-secondary list-disc list-inside">
              <li>Фон – светлый или темный, в зависимости от стиля Click Up</li>
              <li>Шрифт – Euclid Circular A</li>
              <li>Контент должен быть переведен на русский, узбекский, английский</li>
              <li>Цвета кнопок – соответствие общему стилю Click</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-3 rounded-card bg-bg-subtle px-4 py-4">
          <InfoIcon />
          <div className="flex flex-col gap-2">
            <p className="text-body-sm text-text-secondary">Необходимые экраны:</p>
            <ul className="flex flex-col gap-2.5 text-body-sm text-text-secondary list-disc list-inside">
              <li>
                <span className="font-semibold text-text-primary">Онбординг.</span>{' '}
                Расскажите кратко о своем сервисе, чем вы можете быть полезны пользователю.
                Добавьте ссылку на оферту сервиса в формате ссылки с текстом «Нажимая кнопку
                продолжить, пользователь соглашается с офертой сервиса». Добавьте кнопку
                «Продолжить». Пользователь не может перейти далее, не согласившись с условиями
                сервиса
              </li>
              <li>
                <span className="font-semibold text-text-primary">Кнопка связаться</span>{' '}
                в виде иконки на главной странице. Пользователь должен иметь быструю возможность
                связи с колл-центром вашего сервиса, не обращаясь в колл-центр Click SuperApp.
                Выделите горячую линию специально для вашего сервиса
              </li>
              <li>
                <span className="font-semibold text-text-primary">FAQ.</span>{' '}
                Сервис должен иметь справочник часто-задаваемых вопросов для избежания
                недопонимания со стороны покупателя
              </li>
              <li>
                <span className="font-semibold text-text-primary">Корзина.</span>{' '}
                Если ваш сервис подразумевает интернет-магазин, корзина для товаров должна быть
                проста, удобна и понятна для пользователя, отвечая на такие вопросы как: сколько
                времени займет доставка? по какому адресу будет доставлен товар? куда мне
                обратиться в случае недоставки товара?
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  );
}
