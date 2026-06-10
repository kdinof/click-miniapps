import { useState, useRef, useEffect } from 'react';
import { Image, Upload, AlertCircle, Loader2, MoreVertical } from 'lucide-react';
import { Button } from '@/components/Button';
import { Link } from '@/components/Link';
import { TextField } from '@/components/TextField';
import { Select } from '@/components/Select';
import { MultiSelect } from '@/components/MultiSelect';
import { Switch } from '@/components/Switch';
import { useDashboard } from '@/state/dashboard';

type UploadState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'uploaded'; name: string; size: string; previewUrl?: string; file: File }
  | { status: 'error'; name: string; message: string };

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} kb`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function LogoUploadArea({
  label,
  hint,
  accept,
  allowedExt,
  state,
  onFile,
  onRemove,
}: {
  label: string;
  hint: string;
  accept: string;
  allowedExt: string;
  state: UploadState;
  onFile: (file: File) => void;
  onRemove: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';
    onFile(file);
  }

  function handleDownload() {
    if (state.status !== 'uploaded') return;
    const url = state.previewUrl ?? URL.createObjectURL(state.file);
    const a = document.createElement('a');
    a.href = url;
    a.download = state.name;
    a.click();
    setMenuOpen(false);
  }

  if (state.status === 'uploaded' || state.status === 'error') {
    const isError = state.status === 'error';
    const ext = allowedExt.toUpperCase();
    return (
      <div className={`flex items-center gap-3 rounded-[12px] border px-4 py-3 ${isError ? 'border-error' : 'border-bg-ocean'} bg-bg-island`}>
        {state.status === 'uploaded' && state.previewUrl ? (
          <img src={state.previewUrl} alt="" className="size-10 rounded-[8px] object-cover" />
        ) : (
          <div className={`flex size-10 items-center justify-center rounded-[8px] ${isError ? 'bg-error/10' : 'bg-bg-subtle'}`}>
            <Image size={20} className={isError ? 'text-error' : 'text-text-secondary'} />
          </div>
        )}
        <div className="flex flex-1 flex-col gap-0.5 min-w-0">
          <span className="truncate text-body-sm font-medium text-text-primary">{state.name}</span>
          {isError ? (
            <span className="flex items-center gap-1 text-body-sm text-error">
              <AlertCircle size={12} /> {state.message}
            </span>
          ) : (
            <span className="text-body-sm text-text-secondary">
              {ext} · {'size' in state ? state.size : ''}
            </span>
          )}
        </div>

        <div className="relative shrink-0" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="flex size-8 items-center justify-center rounded-lg text-text-tertiary transition-colors hover:bg-bg-subtle hover:text-text-primary"
          >
            <MoreVertical size={16} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-9 z-20 min-w-[140px] overflow-hidden rounded-[12px] bg-white shadow-lg">
              <button
                type="button"
                onClick={() => { setMenuOpen(false); inputRef.current?.click(); }}
                className="w-full px-4 py-3 text-left text-body-sm text-accent transition-colors hover:bg-bg-subtle"
              >
                изменить
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="w-full px-4 py-3 text-left text-body-sm text-accent transition-colors hover:bg-bg-subtle"
              >
                скачать
              </button>
              <button
                type="button"
                onClick={() => { setMenuOpen(false); onRemove(); }}
                className="w-full px-4 py-3 text-left text-body-sm text-error transition-colors hover:bg-bg-subtle"
              >
                удалить
              </button>
            </div>
          )}
        </div>

        <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={handleChange} />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      className="flex w-full flex-col items-center justify-center gap-1.5 rounded-[12px] border border-dashed border-bg-ocean bg-bg-island py-5 transition-colors hover:bg-bg-ocean"
    >
      {state.status === 'loading' ? (
        <Loader2 size={20} className="animate-spin text-accent" />
      ) : (
        <>
          <div className="flex items-center gap-2">
            <Upload size={18} className="text-accent" />
            <span className="text-body font-medium text-accent">{label}</span>
          </div>
          <span className="text-body-sm text-text-secondary">{hint}</span>
        </>
      )}
      <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={handleChange} />
    </button>
  );
}

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
  const { dispatch } = useDashboard();
  const [hasCert, setHasCert] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [telegramUser, setTelegramUser] = useState('');
  const [nameRU, setNameRU] = useState('');
  const [nameUZ, setNameUZ] = useState('');
  const [nameENG, setNameENG] = useState('');
  const [descRU, setDescRU] = useState('');
  const [descUZ, setDescUZ] = useState('');
  const [descENG, setDescENG] = useState('');
  const [category, setCategory] = useState('');
  const [regions, setRegions] = useState<string[]>([]);
  const [svgState, setSvgState] = useState<UploadState>({ status: 'idle' });
  const [pngState, setPngState] = useState<UploadState>({ status: 'idle' });
  const [pdfRU, setPdfRU] = useState<UploadState>({ status: 'idle' });
  const [pdfUZ, setPdfUZ] = useState<UploadState>({ status: 'idle' });
  const [pdfENG, setPdfENG] = useState<UploadState>({ status: 'idle' });
  const [saved, setSaved] = useState(false);

  const isFormComplete =
    name.trim() !== '' &&
    phone.trim() !== '' &&
    businessName.trim() !== '' &&
    telegramUser.trim() !== '' &&
    nameRU.trim() !== '' &&
    nameUZ.trim() !== '' &&
    nameENG.trim() !== '' &&
    descRU.trim() !== '' &&
    descUZ.trim() !== '' &&
    descENG.trim() !== '' &&
    category !== '' &&
    regions.length > 0 &&
    svgState.status === 'uploaded' &&
    pngState.status === 'uploaded';

  function handleSave() {
    setSaved(true);
    dispatch({ type: 'SAVE_INFO' });
  }

  function handleUpload(
    file: File,
    allowedExt: string,
    setState: React.Dispatch<React.SetStateAction<UploadState>>,
  ) {
    setState({ status: 'loading' });
    setTimeout(() => {
      const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
      if (ext !== allowedExt) {
        setState({ status: 'error', name: file.name, message: 'Неверный формат файла' });
        return;
      }
      const isPng = allowedExt === 'png';
      const previewUrl = isPng ? URL.createObjectURL(file) : undefined;
      setState({ status: 'uploaded', name: file.name, size: formatSize(file.size), previewUrl, file });
    }, 1200);
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Prepare block */}
      <div className="flex flex-col gap-4 rounded-island bg-bg-island p-6">
        <h2 className="text-h2 text-text-primary">Перед запуском подготовьте</h2>
        <div className="flex gap-4">
          <PrepareCard
            icon={<Image size={24} />}
            title="Оформление приложения"
            text="Подготовьте оформление Mini App, тексты, FAQ, поддержку пользователей и основные экраны по требованиям Click."
          />
        </div>
        <div className="flex items-start gap-4 rounded-card bg-bg-subtle px-6 py-3">
          <img src="/assets/info-icon.svg" alt="" className="mt-0.5 size-5 shrink-0" />
          <div className="flex flex-col">
            <p className="text-body font-semibold text-text-primary">Убедитесь, что договор подписан</p>
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
          <Button
            variant={saved ? 'secondary' : isFormComplete ? 'primary' : 'secondary'}
            className="w-[170px]"
            disabled={!isFormComplete}
            onClick={handleSave}
            leftIcon={saved ? <span className="text-accent">✓</span> : undefined}
          >
            {saved ? 'Сохранено' : 'Сохранить'}
          </Button>
        </div>

        {/* Business info */}
        <div className="flex flex-col gap-4">
          <SectionTitle title="Информация о бизнесе" sub="Заполните информацию и мы свяжемся с вами" />
          <div className="grid grid-cols-2 gap-4">
            <TextField label="Как к вам обращаться?" placeholder="Укажите как к вам обращаться" value={name} onChange={setName} />
            <TextField phone label="Номер телефона" placeholder="Укажите номер телефона" value={phone} onChange={setPhone} />
          </div>
        </div>

        {/* Telegram group */}
        <div className="flex flex-col gap-4">
          <SectionTitle
            title="Создание группы в телеграм"
            sub="Мы создадим группу в телеграмме, для поддержки интеграции. Добавьте в неё свою команду разработки"
          />
          <div className="grid grid-cols-2 gap-4">
            <TextField label="Название бизнеса" placeholder="Укажите название своего бизнеса" value={businessName} onChange={setBusinessName} />
            <TextField label="Юзер в телеграмме" placeholder="@telegram_name" value={telegramUser} onChange={setTelegramUser} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-body text-text-primary">
              У меня есть свидетельство о регистрации бизнеса
            </span>
            <Switch checked={hasCert} onChange={setHasCert} />
          </div>
        </div>

        <hr className="border-t border-[#C4C8CC]" />

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
            <TextField label="Название RU" placeholder="Введите название" value={nameRU} onChange={setNameRU} />
            <TextField label="Название UZ" placeholder="Введите название" value={nameUZ} onChange={setNameUZ} />
            <TextField label="Название ENG" placeholder="Введите название" value={nameENG} onChange={setNameENG} />
          </div>

          {/* Description RU/UZ/ENG */}
          <div className="grid grid-cols-3 gap-4">
            <TextField textarea maxLength={400} label="Описание RU" placeholder="Из описания должно быть понятно, какие услуги вы оказываете" helper="max: 400" value={descRU} onChange={setDescRU} />
            <TextField textarea maxLength={400} label="Описание UZ" placeholder="Из описания должно быть понятно, какие услуги вы оказываете" helper="max: 400" value={descUZ} onChange={setDescUZ} />
            <TextField textarea maxLength={400} label="Описание ENG" placeholder="Из описания должно быть понятно, какие услуги вы оказываете" helper="max: 400" value={descENG} onChange={setDescENG} />
          </div>

          {/* Category descr RU/UZ/ENG */}
          <div className="grid grid-cols-3 gap-4">
            <TextField maxLength={30} label="Для категории RU" placeholder="Описание для категории" helper="max: 30" />
            <TextField maxLength={30} label="Для категории UZ" placeholder="Turkum tavsifi" helper="max: 30" />
            <TextField maxLength={30} label="Для категории ENG" placeholder="Category Description" helper="max: 30" />
          </div>

          <Select label="Категория" placeholder="Выберите категорию" options={['Финансы', 'Доставка', 'Образование', 'Развлечения', 'Сервисы']} value={category} onChange={setCategory} />
          <MultiSelect
            label="Регион оказания услуг"
            placeholder="Выберите регион оказания услуг, где вы будете работать"
            options={['Ташкент', 'Самаркандская область', 'Бухарская область', 'Ферганская область', 'Андижанская область', 'Наманганская область', 'Хорезмская область', 'Сурхандарьинская область', 'Кашкадарьинская область', 'Джизакская область', 'Сырдарьинская область', 'Навоийская область', 'Вся страна']}
            value={regions}
            onChange={setRegions}
          />
        </div>

        <hr className="border-t border-[#C4C8CC]" />

        {/* Logo upload */}
        <div className="flex flex-col gap-4">
          <SectionTitle
            title="Логотип"
            sub="Загрузите логотип компании для корпуса Mini App в Click SuperApp."
          />
          <div className="grid grid-cols-2 gap-4">
            <LogoUploadArea
              label="Загрузить SVG"
              hint="Формат: SVG, размер: 32×32 px"
              accept=".svg"
              allowedExt="svg"
              state={svgState}
              onFile={(f) => handleUpload(f, 'svg', setSvgState)}
              onRemove={() => setSvgState({ status: 'idle' })}
            />
            <LogoUploadArea
              label="Загрузить PNG"
              hint="Формат: PNG, размер: 512×512 px"
              accept=".png"
              allowedExt="png"
              state={pngState}
              onFile={(f) => handleUpload(f, 'png', setPngState)}
              onRemove={() => setPngState({ status: 'idle' })}
            />
          </div>
          <div className="flex items-start gap-3 rounded-card bg-bg-subtle px-4 py-3">
            <img src="/assets/info-icon.svg" alt="" className="mt-0.5 size-5 shrink-0" />
            <div className="flex flex-col">
              <span className="text-body-sm font-semibold text-text-primary">Проверка логотипа перед публикацией</span>
              <span className="text-body-sm text-text-secondary">
                Перед публикацией логотип может пройти проверку и адаптацию под визуальные требования Click SuperApp.
              </span>
            </div>
          </div>
        </div>

        <hr className="border-t border-[#C4C8CC]" />

        {/* Oferta */}
        <div className="flex flex-col gap-4">
          <SectionTitle
            title="Оферта"
            sub="Загрузите оферты на трёх языках в отдельных pdf файлах"
          />
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Файл RU', state: pdfRU, setState: setPdfRU },
              { label: 'Файл UZ', state: pdfUZ, setState: setPdfUZ },
              { label: 'Файл ENG', state: pdfENG, setState: setPdfENG },
            ].map(({ label, state, setState }) => (
              <div key={label} className="flex flex-col gap-1.5">
                <span className="text-body-sm text-text-primary">{label}</span>
                <LogoUploadArea
                  label="Загрузить PDF"
                  hint="Формат: PDF"
                  accept=".pdf"
                  allowedExt="pdf"
                  state={state}
                  onFile={(f) => handleUpload(f, 'pdf', setState)}
                  onRemove={() => setState({ status: 'idle' })}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
