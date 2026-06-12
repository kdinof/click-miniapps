export interface TabItem {
  key: string;
  label: string;
}

export interface TabsProps {
  tabs: TabItem[];
  active: string;
  onChange: (key: string) => void;
}

export function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div className="flex w-full gap-2">
      {tabs.map((tab) => {
        const isActive = tab.key === active;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`flex h-14 flex-1 items-center justify-center rounded-button px-2 text-body font-semibold whitespace-nowrap transition-colors duration-150 ${
              isActive
                ? 'bg-bg-control text-text-primary'
                : 'bg-transparent border border-[#C4C8CC] text-text-secondary hover:border-accent hover:text-accent cursor-pointer'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
