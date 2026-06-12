import React from 'react';
import { Button } from '@/components/Button';
import { TextField } from '@/components/TextField';
import { Select } from '@/components/Select';
import { MultiSelect } from '@/components/MultiSelect';
import { FileUploadArea, formatSize } from '@/components/FileUploadArea';
import { useInfoForm, type UploadState } from '@/state/infoForm';

function SectionTitle({ title, sub }: { title: string; sub?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-body font-semibold text-text-primary">{title}</h3>
      {sub && <div className="text-body-sm text-text-secondary">{sub}</div>}
    </div>
  );
}

export function InfoTab() {
  const { form, set } = useInfoForm();
  const {
    name, phone,
    nameRU, nameUZ, nameENG, descRU, descUZ, descENG,
    category, catRU, catUZ, catENG, regions,
    svgState, pngState, pdfRU, pdfUZ, pdfENG,
  } = form;

  const setName = (v: string) => set('name', v);
  const setPhone = (v: string) => set('phone', v);
  const setNameRU = (v: string) => set('nameRU', v);
  const setNameUZ = (v: string) => set('nameUZ', v);
  const setNameENG = (v: string) => set('nameENG', v);
  const setDescRU = (v: string) => set('descRU', v);
  const setDescUZ = (v: string) => set('descUZ', v);
  const setDescENG = (v: string) => set('descENG', v);
  const setCategory = (v: string) => set('category', v);
  const setCatRU = (v: string) => set('catRU', v);
  const setCatUZ = (v: string) => set('catUZ', v);
  const setCatENG = (v: string) => set('catENG', v);
  const setRegions = (v: string[]) => set('regions', v);
  const setSvgState = (v: UploadState) => set('svgState', v);
  const setPngState = (v: UploadState) => set('pngState', v);
  const setPdfRU = (v: UploadState) => set('pdfRU', v);
  const setPdfUZ = (v: UploadState) => set('pdfUZ', v);
  const setPdfENG = (v: UploadState) => set('pdfENG', v);

  function handleUpload(file: File, allowedExt: string, setState: (v: UploadState) => void) {
    setState({ status: 'loading' });
    setTimeout(() => {
      const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
      if (ext !== allowedExt) {
        setState({ status: 'error', name: file.name, message: 'Неверный формат файла' });
        return;
      }
      const hasPreview = allowedExt === 'png' || allowedExt === 'svg';
      const previewUrl = hasPreview ? URL.createObjectURL(file) : undefined;
      setState({ status: 'uploaded', name: file.name, size: formatSize(file.size), previewUrl, file });
    }, 1200);
  }

  return (
    <div className="flex flex-col gap-8 rounded-island bg-bg-island p-9">
      {/* Требования по дизайну и контенту */}
      <div className="flex items-center gap-3 rounded-island bg-[#C5D2E0]/[0.16] px-6 py-3">
        <div className="flex flex-1 items-start gap-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
            <path d="M19 2H9C8.20435 2 7.44129 2.31607 6.87868 2.87868C6.31607 3.44129 6 4.20435 6 5V6H5C4.20435 6 3.44129 6.31607 2.87868 6.87868C2.31607 7.44129 2 8.20435 2 9V19C2 19.7957 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H15C15.7957 22 16.5587 21.6839 17.1213 21.1213C17.6839 20.5587 18 19.7957 18 19V18H19C19.7957 18 20.5587 17.6839 21.1213 17.1213C21.6839 16.5587 22 15.7957 22 15V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7957 2 19 2ZM16 19C16 19.2652 15.8946 19.5196 15.7071 19.7071C15.5196 19.8946 15.2652 20 15 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V12H16V19ZM16 10H4V9C4 8.73478 4.10536 8.48043 4.29289 8.29289C4.48043 8.10536 4.73478 8 5 8H15C15.2652 8 15.5196 8.10536 15.7071 8.29289C15.8946 8.48043 16 8.73478 16 9V10ZM20 15C20 15.2652 19.8946 15.5196 19.7071 15.7071C19.5196 15.8946 19.2652 16 19 16H18V9C17.9973 8.65886 17.9364 8.32067 17.82 8H20V15ZM20 6H8V5C8 4.73478 8.10536 4.48043 8.29289 4.29289C8.48043 4.10536 8.73478 4 9 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V6Z" fill="#141414"/>
          </svg>
          <div className="flex flex-col">
            <p className="text-body font-semibold text-text-primary">Требования по дизайну и контенту</p>
            <p className="text-body text-text-secondary">
              Подготовьте оформление Mini App, тексты, FAQ, поддержку пользователей и основные экраны по требованиям Click.
            </p>
          </div>
        </div>
        <Button
          variant="secondary"
          className="w-[255px]"
          onClick={() => window.open('/docs.html', '_blank', 'noopener,noreferrer')}
        >
          Ознакомиться
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

        <div className="grid grid-cols-3 gap-4">
          <TextField label="Название RU" placeholder="Введите название" value={nameRU} onChange={setNameRU} />
          <TextField label="Название UZ" placeholder="Введите название" value={nameUZ} onChange={setNameUZ} />
          <TextField label="Название ENG" placeholder="Введите название" value={nameENG} onChange={setNameENG} />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <TextField textarea maxLength={400} label="Описание RU" placeholder="Из описания должно быть понятно, какие услуги вы оказываете" helper="max: 400" value={descRU} onChange={setDescRU} />
          <TextField textarea maxLength={400} label="Описание UZ" placeholder="Из описания должно быть понятно, какие услуги вы оказываете" helper="max: 400" value={descUZ} onChange={setDescUZ} />
          <TextField textarea maxLength={400} label="Описание ENG" placeholder="Из описания должно быть понятно, какие услуги вы оказываете" helper="max: 400" value={descENG} onChange={setDescENG} />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <TextField maxLength={30} label="Для категории RU" placeholder="Описание для категории" helper="max: 30" value={catRU} onChange={setCatRU} />
          <TextField maxLength={30} label="Для категории UZ" placeholder="Turkum tavsifi" helper="max: 30" value={catUZ} onChange={setCatUZ} />
          <TextField maxLength={30} label="Для категории ENG" placeholder="Category Description" helper="max: 30" value={catENG} onChange={setCatENG} />
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
          sub="Загрузите логотип компании для карточки Mini App в Click SuperApp."
        />
        <div className="grid grid-cols-2 gap-4">
          <FileUploadArea
            label="Загрузить SVG"
            hint="Формат: SVG, размер: 32×32 px"
            accept=".svg"
            allowedExt="svg"
            state={svgState}
            onFile={(f) => handleUpload(f, 'svg', setSvgState)}
            onRemove={() => setSvgState({ status: 'idle' })}
          />
          <FileUploadArea
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
              <FileUploadArea
                label="Загрузить PDF"
                hint="Формат: PDF"
                accept=".pdf"
                allowedExt="pdf"
                state={state}
                onFile={(f) => handleUpload(f, 'pdf', setState)}
                onRemove={() => setState({ status: 'idle' })}
                deleteOnly
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
