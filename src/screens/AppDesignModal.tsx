import { Modal } from '@/components/Modal';

export function AppDesignModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose} className="w-[560px] max-w-full">
      <div className="flex flex-col gap-5 max-h-[80vh] overflow-y-auto pr-1">
        <div className="flex flex-col gap-1 pr-8">
          <h2 className="text-h1 text-text-primary">Оформление приложения</h2>
          <p className="text-body-sm text-text-secondary">
            Для создания единой картины пользователя при использовании сервисов, пожалуйста,
            следуйте стайлгайду Click SuperApp
          </p>
          <a
            href="https://www.figma.com/community/file/1467042619607467621/click-up-design-system"
            target="_blank"
            rel="noopener noreferrer"
            className="text-body-sm text-accent underline"
          >
            Фигма и компонентная
          </a>
        </div>

        {/* Block 1 */}
        <div className="flex gap-3 rounded-card bg-bg-subtle px-4 py-4">
          <svg className="mt-0.5 shrink-0" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M10 2a8 8 0 1 0 0 16A8 8 0 0 0 10 2Zm0 1.5a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13Zm0 2.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Zm0 3a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0V10a.75.75 0 0 1 .75-.75Z" fill="#0077FF"/>
          </svg>
          <div className="flex flex-col gap-2">
            <p className="text-body-sm font-semibold text-text-primary">Основные требования к дизайну:</p>
            <ul className="flex flex-col gap-1.5 text-body-sm text-text-secondary list-disc list-inside">
              <li>Фон — светлый или тёмный, в зависимости от стиля Click Up</li>
              <li>Шрифт — Euclid Circular A</li>
              <li>Контент должен быть переведён на русский, узбекский, английский</li>
              <li>Цвета кнопок — соответствие системе цветов Click SuperApp</li>
            </ul>
          </div>
        </div>

        {/* Block 2 */}
        <div className="flex gap-3 rounded-card bg-bg-subtle px-4 py-4">
          <svg className="mt-0.5 shrink-0" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M10 2a8 8 0 1 0 0 16A8 8 0 0 0 10 2Zm0 1.5a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13Zm0 2.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Zm0 3a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0V10a.75.75 0 0 1 .75-.75Z" fill="#0077FF"/>
          </svg>
          <div className="flex flex-col gap-3">
            <p className="text-body-sm font-semibold text-text-primary">Необходимые экраны:</p>
            <div className="flex flex-col gap-2.5 text-body-sm text-text-secondary">
              <p>
                <span className="font-semibold text-text-primary">Кнопка авторизации: </span>
                Расположите кнопку к своему серверу, чтобы вы могли взаимодействовать с ним через Click SuperApp. Добавьте поле авторизации с текстом «Нажмите на "Продолжить", чтобы авторизоваться в [название сервиса]». Добавьте кнопку «Продолжить». Пользователь, нажимая кнопку, автоматически соглашается с офертой сервиса. Пользователь не может перейти дальше до согласия с офертой.
              </p>
              <p>
                <span className="font-semibold text-text-primary">Кнопка связи с колл-центром: </span>
                Кнопка связи с колл-центром на главной странице Click SuperApp. Выберите первую линию. Пользователь должен иметь быструю возможность связи с колл-центром вашего сервиса — это должна быть кнопка, не обращение в колл-центр Click SuperApp. Выделите первую линию специально для вашего сервиса.
              </p>
              <p>
                <span className="font-semibold text-text-primary">FAQ: </span>
                Сервис должен содержать отдельный модуль с часто задаваемыми вопросами для обработки недоразумений со стороны покупателя.
              </p>
              <p>
                <span className="font-semibold text-text-primary">Корзина: </span>
                Если ваш сервис поддерживает покупки и возможность добавления товаров в корзину, наличие корзины является обязательным условием. Добавьте кнопку «Оформить заказ» и укажите, куда обратиться в случае недоставки товара.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
