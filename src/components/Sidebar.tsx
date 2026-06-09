import type { ReactNode } from 'react';
import {
  ChevronDown,
  LayoutGrid,
  User,
  Globe,
  File,
  FileText,
  MessageSquare,
  LogOut,
} from 'lucide-react';

interface NavRowProps {
  icon: ReactNode;
  label: string;
  trailing?: ReactNode;
}

function NavRow({ icon, label, trailing }: NavRowProps) {
  return (
    <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors duration-150 hover:bg-white/5">
      <span className="flex size-6 shrink-0 items-center justify-center">{icon}</span>
      <span className="flex-1 text-body font-medium text-text-white">{label}</span>
      {trailing}
    </button>
  );
}

export function Sidebar({ appName }: { appName: string }) {
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

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex flex-col gap-3">
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
          <div className="flex flex-col gap-3">
            <NavRow icon={<LayoutGrid size={24} className={iconCls} />} label="Mini-App" />
            <NavRow icon={<User size={24} className={iconCls} />} label="Участники" />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <NavRow
            icon={<Globe size={24} className={iconCls} />}
            label="RU"
            trailing={<ChevronDown size={24} className="text-text-white" />}
          />
          <NavRow icon={<File size={24} className={iconCls} />} label="Документация" />
          <NavRow icon={<FileText size={24} className={iconCls} />} label="Release Notes" />
          <NavRow icon={<MessageSquare size={24} className={iconCls} />} label="Помощник" />
          <NavRow icon={<LogOut size={24} className={iconCls} />} label="Выйти" />
        </div>
      </div>
    </aside>
  );
}