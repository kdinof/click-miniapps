import { useEffect, useState, type ReactNode } from 'react';
import { Check, Info, Ban } from 'lucide-react';

/* ---------------------------------------------------------------------------
   Navigation model — drives both the sidebar and the scroll-spy.
   Section ids must match the <Section id> below.
--------------------------------------------------------------------------- */
type NavNode = { id: string; label: string; children?: { id: string; label: string }[] };

const NAV: NavNode[] = [
  { id: 'intro', label: 'Введение' },
  { id: 'glossary', label: 'Терминология' },
  { id: 's1', label: '1. Запуск и инициализация' },
  { id: 's2', label: '2. Производительность и загрузка' },
  { id: 's3', label: '3. Адаптивность интерфейса' },
  { id: 's4', label: '4. Поддержка тем и доступность' },
  {
    id: 's5',
    label: '5. Элементы интерфейса',
    children: [
      { id: 's5-header', label: 'Header' },
      { id: 's5-navbar', label: 'Navbar' },
      { id: 's5-buttons', label: 'Кнопки' },
      { id: 's5-forms', label: 'Поля ввода и формы' },
    ],
  },
  { id: 's6', label: '6. Сценарии взаимодействия' },
  { id: 's7', label: '7. Оплата' },
  { id: 's8', label: '8. Локализация' },
  { id: 's9', label: '9. Интеграция с Click SuperApp' },
  { id: 's10', label: '10. Дополнительно' },
];

// Flattened with depth — drives both rendering and scroll-spy.
const FLAT_NAV: { id: string; label: string; level: number }[] = NAV.flatMap((n) => [
  { id: n.id, label: n.label, level: 0 },
  ...(n.children ?? []).map((c) => ({ id: c.id, label: c.label, level: 1 })),
]);

const GLOSSARY: { term: string; desc: string }[] = [
  {
    term: 'Splash screen',
    desc: 'Начальный экран, который отображается при запуске приложения или веб-сайта, обычно на короткое время, пока загружается основное содержимое.',
  },
  { term: 'Read Only', desc: 'Поле, которое нельзя редактировать.' },
  { term: 'WebView', desc: 'Веб-страница, встроенная в приложение.' },
  { term: 'Contrast ≥ 4.5:1', desc: 'Цвета текста и фона должны хорошо различаться.' },
  { term: 'Header', desc: 'Верхняя панель с кнопками и названием.' },
  { term: 'Navbar', desc: 'Нижняя панель навигации.' },
];

/* ---------------------------------------------------------------------------
   Building blocks
--------------------------------------------------------------------------- */
function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-8 border-t border-border pt-10">
      <h2 className="text-[26px] leading-[32px] font-semibold text-text-primary">{title}</h2>
      <div className="mt-6 flex flex-col gap-4">{children}</div>
    </section>
  );
}

function H3({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h3 id={id} className="mt-2 scroll-mt-8 text-[18px] leading-[24px] font-semibold text-text-primary">
      {children}
    </h3>
  );
}

function CheckList({ children }: { children: ReactNode }) {
  return <ul className="flex flex-col gap-3">{children}</ul>;
}

function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/10">
        <Check size={13} strokeWidth={3} className="text-accent" />
      </span>
      <div className="flex-1 text-body leading-[24px] text-text-primary">{children}</div>
    </li>
  );
}

function SubList({ children }: { children: ReactNode }) {
  return <ul className="mt-2.5 flex flex-col gap-2 pl-0.5">{children}</ul>;
}

function SubItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-2.5 text-body-sm leading-[20px] text-text-secondary">
      <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-text-tertiary" />
      <span className="flex-1">{children}</span>
    </li>
  );
}

type Tone = 'required' | 'recommended' | 'optional' | 'forbidden';
const TAG_TONES: Record<Tone, string> = {
  required: 'bg-accent/10 text-accent',
  recommended: 'bg-badge-bg text-text-secondary',
  optional: 'bg-bg-subtle text-text-tertiary',
  forbidden: 'bg-error/10 text-error',
};

function Tag({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span
      className={`ml-2 inline-flex items-center rounded-full px-2 py-0.5 align-middle text-badge font-medium whitespace-nowrap ${TAG_TONES[tone]}`}
    >
      {children}
    </span>
  );
}

function InfoCallout({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-3 rounded-card border-l-[3px] border-accent bg-bg-light-blue px-4 py-3.5">
      <Info size={18} className="mt-0.5 shrink-0 text-accent" />
      <p className="flex-1 text-body-sm leading-[20px] text-text-secondary">{children}</p>
    </div>
  );
}

function Forbidden({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5 rounded-card border-l-[3px] border-error bg-error/5 px-4 py-3.5">
      <div className="flex items-center gap-2 text-body-sm font-semibold text-error">
        <Ban size={16} className="shrink-0" /> Запрещено
      </div>
      <ul className="flex flex-col gap-2">{children}</ul>
    </div>
  );
}

function ForbiddenItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-2.5 text-body-sm leading-[20px] text-text-primary">
      <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-error" />
      <span className="flex-1">{children}</span>
    </li>
  );
}

/* ---------------------------------------------------------------------------
   Page
--------------------------------------------------------------------------- */
export function DocsPage() {
  const [active, setActive] = useState('intro');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0 },
    );
    FLAT_NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-bg-island text-text-primary">
      <div className="mx-auto flex max-w-[1240px]">
        {/* Sidebar */}
        <aside className="sticky top-0 hidden h-screen w-[300px] shrink-0 overflow-y-auto border-r border-border bg-[#FBFCFD] py-7 lg:block">
          <img src="/assets/logo_MiniApps_dark.svg" alt="Click MiniApps" className="mb-7 ml-5 h-5" />
          <div className="mb-4 px-5">
            <p className="text-menu font-medium uppercase tracking-wide text-text-tertiary">
              Документация
            </p>
            <p className="mt-0.5 text-body-sm font-semibold text-text-primary">
              Чек-лист Must-Have
            </p>
          </div>
          <nav className="flex flex-col">
            {FLAT_NAV.map((n) => {
              const isActive = active === n.id;
              return (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={() => setActive(n.id)}
                  className={`flex items-center border-l-2 py-2 pr-4 text-body-sm leading-[18px] transition-colors ${
                    n.level === 0 ? 'pl-[18px]' : 'pl-9'
                  } ${
                    isActive
                      ? 'border-accent bg-accent/[0.06] font-medium text-accent'
                      : 'border-transparent text-text-secondary hover:bg-bg-subtle hover:text-text-primary'
                  }`}
                >
                  {n.label}
                </a>
              );
            })}
          </nav>
        </aside>

        {/* Content */}
        <main className="min-w-0 flex-1 px-6 py-12 sm:px-10 lg:px-16">
          <div className="mx-auto flex max-w-[800px] flex-col gap-10">
            {/* Title */}
            <header className="flex flex-col gap-3">
              <p className="text-menu font-medium uppercase tracking-wide text-accent">
                Mini-Apps · Design Review
              </p>
              <h1 className="text-[40px] leading-[46px] font-semibold text-text-primary">
                Чек-лист Must-Have требований для Mini-Apps
              </h1>
              <p className="text-body leading-[24px] text-text-secondary">
                Перечень обязательных (Must-Have) требований, которые проверяются на этапе Design
                Review перед публикацией Mini-App в Click SuperApp.
              </p>
            </header>

            {/* Введение */}
            <Section id="intro" title="Введение">
              <p className="text-body leading-[24px] text-text-secondary">
                Фирменный стиль приложения определяет, как Mini-App выглядит внутри Click SuperApp.
                Выберите один из двух подходов:
              </p>
              <CheckList>
                <CheckItem>
                  Если используется собственный фирменный стиль, он адаптирован под мобильные экраны
                  и поддерживает светлую или тёмную тему.
                </CheckItem>
                <CheckItem>
                  Если собственного фирменного стиля нет, рекомендуется придерживаться UI-kit Click
                  SuperApp (цвета, шрифты, система отступов, сетка).
                </CheckItem>
              </CheckList>
            </Section>

            {/* Терминология */}
            <Section id="glossary" title="Терминология">
              <div className="overflow-hidden rounded-card border border-border">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-bg-subtle">
                      <th className="w-[200px] px-4 py-2.5 text-body-sm font-semibold text-text-primary">
                        Термин
                      </th>
                      <th className="px-4 py-2.5 text-body-sm font-semibold text-text-primary">
                        Описание
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {GLOSSARY.map((row) => (
                      <tr key={row.term} className="border-t border-border align-top">
                        <td className="px-4 py-3 text-body-sm font-medium text-text-primary">
                          {row.term}
                        </td>
                        <td className="px-4 py-3 text-body-sm leading-[20px] text-text-secondary">
                          {row.desc}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            {/* 1. Запуск */}
            <Section id="s1" title="1. Запуск и начальная инициализация">
              <CheckList>
                <CheckItem>
                  Приложение корректно запускается через Splash Screen (экран загрузки, если
                  предусмотрено).
                </CheckItem>
                <CheckItem>
                  При первом запуске отображается онбординг:
                  <SubList>
                    <SubItem>информирует о возможностях приложения;</SubItem>
                    <SubItem>
                      обязательно содержит согласие с публичной офертой (с чекбоксом или подписью под
                      кнопкой);
                    </SubItem>
                    <SubItem>
                      оферта на узбекском языке — обязательно; русский, каракалпакский, английский —
                      рекомендуется.
                    </SubItem>
                  </SubList>
                </CheckItem>
                <CheckItem>
                  Пользовательские данные (имя, фамилия, номер телефона) получены из Click SuperApp:
                  <SubList>
                    <SubItem>отображаются корректно;</SubItem>
                    <SubItem>
                      находятся в режиме Read Only (только для просмотра, без возможности
                      редактировать).
                    </SubItem>
                  </SubList>
                </CheckItem>
                <CheckItem>
                  Экран регистрации или выхода отсутствует (автоматическая авторизация).
                </CheckItem>
                <CheckItem>В приложении нет функции удаления аккаунта.</CheckItem>
              </CheckList>
            </Section>

            {/* 2. Производительность */}
            <Section id="s2" title="2. Производительность и загрузка">
              <CheckList>
                <CheckItem>
                  Загрузка в WebView (веб-страница, встроенная в приложение) занимает не более 1–2
                  секунд при стабильном интернете.
                  <SubList>
                    <SubItem>
                      Проверьте скорость загрузки приложения с помощью GTmetrix.
                    </SubItem>
                  </SubList>
                </CheckItem>
              </CheckList>
            </Section>

            {/* 3. Адаптивность */}
            <Section id="s3" title="3. Адаптивность интерфейса">
              <CheckList>
                <CheckItem>
                  Интерфейс корректно отображается на экранах с шириной от 360 px до 1280 px
                  (смартфоны и 10″ планшеты в горизонтальной ориентации). Проверьте отображение
                  приложения в режиме Device Mode (Chrome DevTools, Responsinator или аналогичные
                  сервисы).
                </CheckItem>
              </CheckList>
            </Section>

            {/* 4. Темы и доступность */}
            <Section id="s4" title="4. Поддержка тем и доступность">
              <CheckList>
                <CheckItem>
                  Светлая или тёмная темы
                  <SubList>
                    <SubItem>
                      интерфейс может быть реализован в светлой, тёмной или обеих темах.
                    </SubItem>
                  </SubList>
                </CheckItem>
                <CheckItem>
                  Контрастность
                  <SubList>
                    <SubItem>
                      контраст между текстом, иконками и фоном должен быть не менее 4.5:1 в
                      соответствии с рекомендациями для доступности;
                    </SubItem>
                    <SubItem>
                      при переходе на тёмную тему убедитесь, что все элементы (текст, кнопки, иконки)
                      остаются чёткими и читаемыми.
                    </SubItem>
                  </SubList>
                </CheckItem>
              </CheckList>
              <InfoCallout>
                Контраст измеряется в коэффициентах от 1:1 (тот же цвет) до 21:1 (чёрный на белом).
                4.5:1 — это базовый стандарт, установленный WCAG, для обычного текста.
              </InfoCallout>
            </Section>

            {/* 5. Элементы интерфейса */}
            <Section id="s5" title="5. Элементы интерфейса">
              <H3 id="s5-header">Header</H3>
              <CheckList>
                <CheckItem>
                  Название приложения (логотип — по желанию)
                  <Tag tone="required">Обязательно</Tag>
                </CheckItem>
                <CheckItem>
                  Кнопка «Закрыть» (возврат в Click SuperApp)
                  <Tag tone="required">Обязательно</Tag>
                </CheckItem>
                <CheckItem>
                  Кнопка «Помощь» (контактные данные поддержки или чат-бот)
                  <Tag tone="required">Обязательно</Tag>
                  <p className="mt-2 text-body-sm leading-[20px] text-text-secondary">
                    Доступ к поддержке обязателен на всех этапах: до и после оплаты. Кнопка может быть
                    размещена в Header, на экране подтверждения, в разделе «Профиль» или другом видимом
                    месте. Главное — пользователь должен всегда легко найти, как обратиться за
                    помощью.
                  </p>
                </CheckItem>
                <CheckItem>
                  Иконка профиля пользователя, отображающая информацию о текущем пользователе (может
                  располагаться в Header или Navbar).
                </CheckItem>
              </CheckList>

              <H3 id="s5-navbar">Навигация представлена в виде Navbar</H3>
              <CheckList>
                <CheckItem>От 1 до 5 разделов.</CheckItem>
                <CheckItem>
                  Если количество пунктов превышает 5, последний элемент может быть оформлен как
                  «Меню», «Ещё» или «Другое».
                </CheckItem>
              </CheckList>

              <H3 id="s5-buttons">Кнопки</H3>
              <CheckList>
                <CheckItem>
                  Текст явно описывает действие (call to action) — даёт чёткое указание пользователю,
                  что сделать.
                </CheckItem>
              </CheckList>

              <H3 id="s5-forms">Поля ввода и формы</H3>
              <CheckList>
                <CheckItem>
                  Написаны понятные placeholder (подсказки) с оптимальным размером и цветом.
                </CheckItem>
                <CheckItem>
                  При ошибке появляется обводка нужного цвета, иконка и текст ошибки (error).
                </CheckItem>
                <CheckItem>Поддержка масок ввода (телефон, код подтверждения).</CheckItem>
              </CheckList>
            </Section>

            {/* 6. Сценарии */}
            <Section id="s6" title="6. Сценарии взаимодействия">
              <p className="text-body leading-[24px] text-text-primary">
                Проверьте последовательность ключевых сценариев (сценарий заказа товара, аренды и
                т.п.). Обратите внимание, что все сценарии могут быть уникальными и варьироваться в
                зависимости от специфики партнёра. Примеры сценариев — для заказа товара и аренды.
              </p>
            </Section>

            {/* 7. Оплата */}
            <Section id="s7" title="7. Оплата">
              <CheckList>
                <CheckItem>Оплата производится исключительно через Click SuperApp.</CheckItem>
                <CheckItem>Нет функции добавления / управления картами.</CheckItem>
                <CheckItem>Оплата осуществляется до оказания услуги или доставки.</CheckItem>
              </CheckList>
            </Section>

            {/* 8. Локализация */}
            <Section id="s8" title="8. Локализация">
              <CheckList>
                <CheckItem>
                  Поддерживаются языки:
                  <SubList>
                    <SubItem>узбекский — обязательный язык;</SubItem>
                    <SubItem>русский, английский и каракалпакский — рекомендованные.</SubItem>
                  </SubList>
                </CheckItem>
                <CheckItem>Не допускается смешение языков на одном экране.</CheckItem>
              </CheckList>
            </Section>

            {/* 9. Интеграция */}
            <Section id="s9" title="9. Интеграция с Click SuperApp">
              <CheckList>
                <CheckItem>
                  Все ссылки ведут только на доверенные адреса (без внешних переходов).
                </CheckItem>
                <CheckItem>
                  Передача данных пользователя, оплата, локализация работают корректно.
                </CheckItem>
              </CheckList>
              <Forbidden>
                <ForbiddenItem>
                  Переадресация на сторонние ресурсы (в том числе для информационных миниаппов).
                </ForbiddenItem>
                <ForbiddenItem>
                  Продвижение внешних приложений, ссылки на App Store / Google Play.
                </ForbiddenItem>
              </Forbidden>
            </Section>

            {/* 10. Дополнительно */}
            <Section id="s10" title="10. Дополнительно">
              <CheckList>
                <CheckItem>В приложении отсутствует реклама.</CheckItem>
              </CheckList>
            </Section>
          </div>
        </main>
      </div>
    </div>
  );
}
