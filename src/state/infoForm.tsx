import { createContext, useContext, useState, type ReactNode } from 'react';

export type UploadState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'uploaded'; name: string; size: string; previewUrl?: string; file: File }
  | { status: 'error'; name: string; message: string };

export interface FaqItem {
  question: string;
  answer: string;
}

export interface InfoFormState {
  hasCert: boolean;
  name: string;
  phone: string;
  businessName: string;
  telegramUser: string;
  nameRU: string;
  nameUZ: string;
  nameENG: string;
  descRU: string;
  descUZ: string;
  descENG: string;
  category: string;
  catRU: string;
  catUZ: string;
  catENG: string;
  regions: string[];
  svgState: UploadState;
  pngState: UploadState;
  pdfRU: UploadState;
  pdfUZ: UploadState;
  pdfENG: UploadState;
  supportContact: string;
  supportPdf: UploadState;
  faqs: FaqItem[];
}

const initial: InfoFormState = {
  hasCert: false,
  name: '',
  phone: '',
  businessName: '',
  telegramUser: '',
  nameRU: '',
  nameUZ: '',
  nameENG: '',
  descRU: '',
  descUZ: '',
  descENG: '',
  category: '',
  catRU: '',
  catUZ: '',
  catENG: '',
  regions: [],
  svgState: { status: 'idle' },
  pngState: { status: 'idle' },
  pdfRU: { status: 'idle' },
  pdfUZ: { status: 'idle' },
  pdfENG: { status: 'idle' },
  supportContact: '',
  supportPdf: { status: 'idle' },
  faqs: [{ question: '', answer: '' }],
};

/** Все обязательные поля «Общей информации» заполнены — управляет доступностью модерации. */
export function isInfoFormComplete(f: InfoFormState): boolean {
  return (
    f.name.trim() !== '' &&
    f.phone.trim() !== '' &&
    f.businessName.trim() !== '' &&
    f.telegramUser.trim() !== '' &&
    f.nameRU.trim() !== '' &&
    f.nameUZ.trim() !== '' &&
    f.nameENG.trim() !== '' &&
    f.descRU.trim() !== '' &&
    f.descUZ.trim() !== '' &&
    f.descENG.trim() !== '' &&
    f.category !== '' &&
    f.regions.length > 0 &&
    f.svgState.status === 'uploaded' &&
    f.pngState.status === 'uploaded'
  );
}

const InfoFormContext = createContext<{
  form: InfoFormState;
  set: <K extends keyof InfoFormState>(key: K, value: InfoFormState[K]) => void;
} | null>(null);

export function InfoFormProvider({ children }: { children: ReactNode }) {
  const [form, setForm] = useState<InfoFormState>(initial);
  function set<K extends keyof InfoFormState>(key: K, value: InfoFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }
  return <InfoFormContext.Provider value={{ form, set }}>{children}</InfoFormContext.Provider>;
}

export function useInfoForm() {
  const ctx = useContext(InfoFormContext);
  if (!ctx) throw new Error('useInfoForm must be used within InfoFormProvider');
  return ctx;
}
