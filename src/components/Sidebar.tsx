import type { ReactNode } from 'react';
import {
  ChevronDown,
  Globe,
  File,
  FileText,
  MessageSquare,
  LogOut,
} from 'lucide-react';
import { DEVELOPER_DOCS_URL } from '@/lib/links';

const NAV_TABS = [
  { key: 'dev', label: 'Для разработчиков' },
  { key: 'contract', label: 'Подписание договора' },
  { key: 'info', label: 'Общая информация' },
  { key: 'support', label: 'Поддержка пользователей' },
];

interface NavRowProps {
  icon: ReactNode;
  label: string;
  trailing?: ReactNode;
  href?: string;
}

function NavRow({ icon, label, trailing, href }: NavRowProps) {
  const cls =
    'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors duration-150 hover:bg-white/5';
  const content = (
    <>
      <span className="flex size-6 shrink-0 items-center justify-center">{icon}</span>
      <span className="flex-1 text-body font-medium text-text-white">{label}</span>
      {trailing}
    </>
  );
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {content}
      </a>
    );
  }
  return <button className={cls}>{content}</button>;
}

export function Sidebar({ appName, activeTab, onTabChange }: {
  appName: string;
  activeTab: string;
  onTabChange: (key: string) => void;
}) {
  const iconCls = 'text-text-white';
  return (
    <aside className="flex h-screen w-[248px] shrink-0 flex-col bg-bg-sidebar px-2 py-6">
      <div className="px-4 pb-6">
        <img
          src="/assets/logo.png"
          alt="Click MiniApps"
          className="h-[18px] w-[136px]"
          onError={(e) => {
            e.currentTarget.src = '/assets/logo-placeholder.png';
            e.currentTarget.className = 'h-9 w-9 opacity-40';
          }}
        />
      </div>

      <div className="flex flex-1 flex-col justify-between overflow-hidden">
        <div className="flex flex-col gap-1 overflow-y-auto">
          <NavRow
            icon={
              <img
                src="/assets/logo-placeholder.png"
                alt=""
                className="size-6 rounded-full object-cover ring-1 ring-white/20"
                onError={(e) => {
                  e.currentTarget.src = '/assets/logo-placeholder.png';
                }}
              />
            }
            label={appName}
            trailing={<ChevronDown size={24} className="text-text-white" />}
          />

          <div className="flex flex-col gap-0.5 pt-1">
            {NAV_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => onTabChange(tab.key)}
                className={`flex w-full items-center rounded-xl py-2.5 pl-[52px] pr-4 text-left text-body-sm transition-colors duration-150 ${
                  activeTab === tab.key
                    ? 'bg-white/10 font-semibold text-text-white'
                    : 'font-medium text-white/50 hover:bg-white/5 hover:text-white/80'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <NavRow
            icon={<Globe size={24} className={iconCls} />}
            label="RU"
            trailing={<ChevronDown size={24} className="text-text-white" />}
          />
          <NavRow icon={<File size={24} className={iconCls} />} label="Документация" href={DEVELOPER_DOCS_URL} />
          <NavRow icon={<FileText size={24} className={iconCls} />} label="Release Notes" />
          <NavRow icon={<MessageSquare size={24} className={iconCls} />} label="Помощник" />
          <NavRow icon={<LogOut size={24} className={iconCls} />} label="Выйти" />
        </div>
      </div>
    </aside>
  );
}
