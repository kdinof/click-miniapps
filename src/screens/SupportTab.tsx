import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { TextField } from '@/components/TextField';
import { Switch } from '@/components/Switch';
import { FileUploadArea, formatSize } from '@/components/FileUploadArea';
import { useInfoForm, isValidTelegram, type UploadState } from '@/state/infoForm';

function SectionTitle({ title, sub }: { title: string; sub?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-body font-semibold text-text-primary">{title}</h3>
      {sub && <div className="text-body-sm text-text-secondary">{sub}</div>}
    </div>
  );
}

export function SupportTab() {
  const { form, set } = useInfoForm();
  const { hasCert, businessName, telegramUser, supportContact, supportPdf, faqs } = form;
  const [telegramTouched, setTelegramTouched] = useState(false);

  const setHasCert = (v: boolean) => set('hasCert', v);
  const setBusinessName = (v: string) => set('businessName', v);
  const setTelegramUser = (v: string) => set('telegramUser', v);
  const setSupportContact = (v: string) => set('supportContact', v);
  const setSupportPdf = (v: UploadState) => set('supportPdf', v);
  const updateFaq = (index: number, key: keyof (typeof faqs)[number], value: string) =>
    set('faqs', faqs.map((f, i) => (i === index ? { ...f, [key]: value } : f)));
  const addFaq = () => set('faqs', [...faqs, { question: '', answer: '' }]);
  const removeFaq = (index: number) => set('faqs', faqs.filter((_, i) => i !== index));

  function handleUpload(file: File, allowedExt: string, setState: (v: UploadState) => void) {
    setState({ status: 'loading' });
    setTimeout(() => {
      const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
      if (ext !== allowedExt) {
        setState({ status: 'error', name: file.name, message: 'Неверный формат файла' });
        return;
      }
      setState({ status: 'uploaded', name: file.name, size: formatSize(file.size), file });
    }, 1200);
  }

  const telegramError = telegramTouched && telegramUser !== '' && !isValidTelegram(telegramUser);

  return (
    <div className="flex flex-col gap-8 rounded-island bg-bg-island p-9">

      {/* Создание группы в телеграм */}
      <div className="flex flex-col gap-4">
        <SectionTitle
          title="Создание группы в телеграм"
          sub="Мы создадим группу в телеграмме, для поддержки интеграции. Добавьте в неё свою команду разработки"
        />
        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="Название бизнеса"
            placeholder="Укажите название своего бизнеса"
            value={businessName}
            onChange={setBusinessName}
          />
          <TextField
            label="Юзер в телеграмме"
            placeholder="@telegram_name"
            value={telegramUser}
            onChange={setTelegramUser}
            onBlur={() => setTelegramTouched(true)}
            error={telegramError}
            helper={telegramError ? 'Формат: @username' : undefined}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-body text-text-primary">
            У меня есть свидетельство о регистрации бизнеса
          </span>
          <Switch checked={hasCert} onChange={setHasCert} />
        </div>
      </div>

      <hr className="border-t border-[#C4C8CC]" />

      {/* Поддержка пользователей */}
      <div className="flex flex-col gap-4">
        <SectionTitle
          title="Поддержка пользователей"
          sub={
            <div className="flex flex-col gap-2">
              <p>Click заботится о своих клиентах, поэтому мы стремимся, чтобы поддержка в вашем мини-аппе была на том же высоком уровне, что и в Click SuperApp.</p>
              <p>Для этого подготовьте данные для нашего колл-центра. Мы обучим команду, и в случае обращений сможем оперативно помочь или перенаправить звонок в вашу службу поддержки.</p>
            </div>
          }
        />
        <TextField
          label="Укажите контакт поддержки"
          placeholder="Телефон, email или @username в Telegram"
          value={supportContact}
          onChange={setSupportContact}
        />
        <div className="flex flex-col gap-1.5">
          <span className="text-body-sm text-text-primary">Файл RU</span>
          <FileUploadArea
            label="Загрузить PDF"
            hint="Формат: PDF"
            accept=".pdf"
            allowedExt="pdf"
            state={supportPdf}
            onFile={(f) => handleUpload(f, 'pdf', setSupportPdf)}
            onRemove={() => setSupportPdf({ status: 'idle' })}
            deleteOnly
          />
        </div>
        <button type="button" className="self-start text-body-sm font-medium text-accent hover:underline">
          Скачать шаблон клиентского пути
        </button>
      </div>

      <hr className="border-t border-[#C4C8CC]" />

      {/* FAQs */}
      <div className="flex flex-col gap-4">
        <SectionTitle
          title="FAQs МиниАппа"
          sub="Добавьте самые частые вопросы и ответы, которые помогут клиентам разобраться в вашем сервисе."
        />
        {faqs.map((faq, i) => {
          const questionError = faq.question.trim() === '' && faq.answer.trim() !== '';
          const answerError = faq.answer.trim() === '' && faq.question.trim() !== '';
          return (
            <div key={i} className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-body font-semibold text-text-primary">Вопрос {i + 1}</p>
                {faqs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFaq(i)}
                    aria-label="Удалить вопрос"
                    className="flex items-center justify-center rounded-lg p-1 text-text-tertiary transition-colors hover:bg-bg-subtle hover:text-error"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
              <TextField
                label="Вопрос"
                placeholder="Напишите сам вопрос"
                value={faq.question}
                onChange={(v) => updateFaq(i, 'question', v)}
                error={questionError}
                helper={questionError ? 'Обязательное поле' : undefined}
              />
              <TextField
                textarea
                maxLength={400}
                label="Ответ"
                placeholder="Напишите решение или ответ на вопрос"
                value={faq.answer}
                onChange={(v) => updateFaq(i, 'answer', v)}
                error={answerError}
                helper={answerError ? 'Обязательное поле' : 'max: 400'}
              />
            </div>
          );
        })}
        <button
          type="button"
          onClick={addFaq}
          className="flex items-center justify-center gap-2 self-center font-sans text-[17px] font-semibold text-accent transition-opacity hover:opacity-80"
        >
          <Plus size={20} /> Добавить новый вопрос
        </button>
      </div>
    </div>
  );
}
