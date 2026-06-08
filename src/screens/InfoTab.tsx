import { useState } from 'react';
import { Image, FileText, Info } from 'lucide-react';
import { Button } from '@/components/Button';
import { Link } from '@/components/Link';
import { TextField } from '@/components/TextField';
import { Select } from '@/components/Select';
import { Switch } from '@/components/Switch';

function PrepareCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex flex-1 flex-col gap-4 rounded-card bg-bg-subtle p-6">
      <span className="text-text-primary">{icon}</span>
      <div className="flex flex-col gap-1">
        <h3 className="text-h2 text-text-primary">{title}</h3>
        <p className="text-body-sm text-text-secondary">{text}</p>
      </div>
      <Link>Перейти</Link>
    </div>
  );
}

function SectionTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-body font-semibold text-text-primary">{title}</h3>
      {sub && <p className="text-body-sm text-text-secondary">{sub}</p>}
    </div>
  );
}

export function InfoTab() {
  const [hasCert, setHasCert] = useState(false);
  const [phone, setPhone] = useState('');

  return (
    <div className="flex flex-col gap-5">
      {/* Prepare block */}
      <div className="flex flex-col gap-4 rounded-island bg-bg-island p-6">
        <h2 className="text-h2 text-text-primary">Перед запуском подготовьте</h2>
        <div className="flex gap-4">
          <PrepareCard
            icon={<Image size={24} />}
            title="Дизайн и контент"
            text="Подготовьте оформление Mini App, тексты, FAQ, поддержку пользователей и основные экраны по требованиям Click."
          />
          <PrepareCard
            icon={<FileText size={24} />}
            title="Договор и документы"
            text="Заключите договор с Click, подготовьте реквизиты, логотип и данные компании для подключения Mini App."
          />
        </div>
        <div className="flex items-start gap-4 rounded-card bg-bg-subtle px-6 py-3">
          <Info size={24} className="shrink-0 text-text-primary" />
          <div className="flex flex-col">
            <p className="text-body font-semibold text-text-primary">Нужно подписать договор</p>
            <p className="text-body-sm text-text-secondary">
              Полный запуск станет доступен после подписания договора и прохождения модерации
            </p>
          </div>
        </div>
      </div>

      {/* General info form */}
      <div className="flex flex-col gap-8 rounded-island bg-bg-island p-9">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-h2 text-text-primary">Общая информация</h2>
            <p className="text-body-sm text-text-secondary">
              Ознакомьтесь с Документацией перед заполнением
            </p>
          </div>
          <Button variant="secondary" className="w-[170px]" disabled>
            Сохранить
          </Button>
        </div>

        {/* Business info */}
        <div className="flex flex-col gap-4">
          <SectionTitle title="Информация о бизнесе" sub="Заполните информацию и мы свяжемся с вами" />
          <div className="grid grid-cols-2 gap-4">
            <TextField label="Как к вам обращаться?" placeholder="Укажите как к вам обращаться" />
            <TextField
              phone
              label="Номер телефона"
              placeholder="Укажите номер телефона"
              value={phone}
              onChange={setPhone}
            />
          </div>
        </div>

        {/* Telegram group */}
        <div className="flex flex-col gap-4">
          <SectionTitle
            title="Создание группы в телеграм"
            sub="Мы создадим группу в телеграмме, для поддержки интеграции. Добавьте в неё свою команду разработки"
          />
          <div className="grid grid-cols-2 gap-4">
            <TextField label="Название бизнеса" placeholder="Укажите название своего бизнеса" />
            <TextField label="Юзер в телеграмме" placeholder="@telegram_name" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-body text-text-primary">
              У меня есть свидетельство о регистрации бизнеса
            </span>
            <Switch checked={hasCert} onChange={setHasCert} />
          </div>
        </div>

        {/* Mini App info */}
        <div className="flex flex-col gap-4">
          <SectionTitle
            title="Информация о МиниАппе"
            sub="Заполните название и описание МиниАппа на трёх языках и выберите категорию"
          />

          <div className="flex flex-col gap-3">
            <SectionTitle
              title="Как данные будут отображаться в мини-аппе"
              sub="После заполнения формы пользователь увидит название, описание и категорию в интерфейсе мини-апла."
            />
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Название мини-аппа', src: '/assets/info/app-name.png' },
                { label: 'Описание компании', src: '/assets/info/description.png' },
                { label: 'Категория в каталоге', src: '/assets/info/category.png' },
              ].map((m) => (
                <div key={m.label} className="flex flex-col gap-2">
                  <p className="text-center text-body-sm font-semibold text-text-primary">{m.label}</p>
                  <img src={m.src} alt={m.label} className="w-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Name RU/UZ/ENG */}
          <div className="grid grid-cols-3 gap-4">
            <TextField label="Название RU" placeholder="Введите название" />
            <TextField label="Название UZ" placeholder="Введите название" />
            <TextField label="Название ENG" placeholder="Введите название" />
          </div>

          {/* Description RU/UZ/ENG */}
          <div className="grid grid-cols-3 gap-4">
            <TextField textarea maxLength={400} label="Описание RU" placeholder="Из описания должно быть понятно, какие услуги вы оказываете" helper="max: 400" />
            <TextField textarea maxLength={400} label="Описание UZ" placeholder="Из описания должно быть понятно, какие услуги вы оказываете" helper="max: 400" />
            <TextField textarea maxLength={400} label="Описание ENG" placeholder="Из описания должно быть понятно, какие услуги вы оказываете" helper="max: 400" />
          </div>

          {/* Category descr RU/UZ/ENG */}
          <div className="grid grid-cols-3 gap-4">
            <TextField maxLength={30} label="Для категории RU" placeholder="Описание для категории" helper="max: 30" />
            <TextField maxLength={30} label="Для категории UZ" placeholder="Turkum tavsifi" helper="max: 30" />
            <TextField maxLength={30} label="Для категории ENG" placeholder="Category Description" helper="max: 30" />
          </div>

          <Select label="Категория" placeholder="Выберите категорию" options={['Финансы', 'Доставка', 'Образование', 'Развлечения', 'Сервисы']} />
          <Select
            label="Регион оказания услуг"
            placeholder="Выберите регион оказания услуг, где вы будете работать"
            options={['Ташкент', 'Самарканд', 'Бухара', 'Вся страна']}
          />
        </div>
      </div>
    </div>
  );
}
