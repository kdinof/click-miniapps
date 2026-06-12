import { useState, useRef, useEffect } from 'react';
import { Image, AlertCircle, Loader2 } from 'lucide-react';
import type { UploadState } from '@/state/infoForm';

export function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} kb`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileUploadArea({
  label,
  hint,
  accept,
  allowedExt,
  state,
  onFile,
  onRemove,
  deleteOnly = false,
}: {
  label: string;
  hint: string;
  accept: string;
  allowedExt: string;
  state: UploadState;
  onFile: (file: File) => void;
  onRemove: () => void;
  deleteOnly?: boolean;
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

  if (deleteOnly && state.status === 'uploaded') {
    return (
      <div className="flex h-[102px] items-center gap-3 rounded-[12px] border border-[#C4C8CC] bg-white px-4">
        <div className="shrink-0">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M3.87868 1.87868C4.44129 1.31607 5.20435 1 6 1H14C14.2652 1 14.5196 1.10536 14.7071 1.29289L20.7071 7.29289C20.8946 7.48043 21 7.73478 21 8V20C21 20.7957 20.6839 21.5587 20.1213 22.1213C19.5587 22.6839 18.7957 23 18 23H6C5.20435 23 4.44129 22.6839 3.87868 22.1213C3.31607 21.5587 3 20.7957 3 20V4C3 3.20435 3.31607 2.44129 3.87868 1.87868ZM6 3C5.73478 3 5.48043 3.10536 5.29289 3.29289C5.10536 3.48043 5 3.73478 5 4V20C5 20.2652 5.10536 20.5196 5.29289 20.7071C5.48043 20.8946 5.73478 21 6 21H18C18.2652 21 18.5196 20.8946 18.7071 20.7071C18.8946 20.5196 19 20.2652 19 20V8.41421L13.5858 3H6Z" fill="#0077FF"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M14 1C14.5523 1 15 1.44772 15 2V7H20C20.5523 7 21 7.44772 21 8C21 8.55228 20.5523 9 20 9H14C13.4477 9 13 8.55228 13 8V2C13 1.44772 13.4477 1 14 1Z" fill="#0077FF"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M7 13C7 12.4477 7.44772 12 8 12H16C16.5523 12 17 12.4477 17 13C17 13.5523 16.5523 14 16 14H8C7.44772 14 7 13.5523 7 13Z" fill="#0077FF"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M7 17C7 16.4477 7.44772 16 8 16H16C16.5523 16 17 16.4477 17 17C17 17.5523 16.5523 18 16 18H8C7.44772 18 7 17.5523 7 17Z" fill="#0077FF"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M7 9C7 8.44772 7.44772 8 8 8H10C10.5523 8 11 8.44772 11 9C11 9.55228 10.5523 10 10 10H8C7.44772 10 7 9.55228 7 9Z" fill="#0077FF"/>
          </svg>
        </div>
        <div className="flex flex-1 flex-col gap-0.5 min-w-0">
          <span className="truncate text-base font-semibold text-text-primary">{state.name}</span>
          <span className="text-body-sm text-text-secondary">PDF · {'size' in state ? state.size : ''}</span>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="shrink-0 flex items-center justify-center rounded-lg p-1 transition-colors hover:bg-bg-subtle"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 18C10.2652 18 10.5196 17.8946 10.7071 17.7071C10.8946 17.5196 11 17.2652 11 17V11C11 10.7348 10.8946 10.4804 10.7071 10.2929C10.5196 10.1054 10.2652 10 10 10C9.73478 10 9.48043 10.1054 9.29289 10.2929C9.10536 10.4804 9 10.7348 9 11V17C9 17.2652 9.10536 17.5196 9.29289 17.7071C9.48043 17.8946 9.73478 18 10 18ZM20 6H16V5C16 4.20435 15.6839 3.44129 15.1213 2.87868C14.5587 2.31607 13.7956 2 13 2H11C10.2044 2 9.44129 2.31607 8.87868 2.87868C8.31607 3.44129 8 4.20435 8 5V6H4C3.73478 6 3.48043 6.10536 3.29289 6.29289C3.10536 6.48043 3 6.73478 3 7C3 7.26522 3.10536 7.51957 3.29289 7.70711C3.48043 7.89464 3.73478 8 4 8H5V19C5 19.7956 5.31607 20.5587 5.87868 21.1213C6.44129 21.6839 7.20435 22 8 22H16C16.7956 22 17.5587 21.6839 18.1213 21.1213C18.6839 20.5587 19 19.7956 19 19V8H20C20.2652 8 20.5196 7.89464 20.7071 7.70711C20.8946 7.51957 21 7.26522 21 7C21 6.73478 20.8946 6.48043 20.7071 6.29289C20.5196 6.10536 20.2652 6 20 6ZM10 5C10 4.73478 10.1054 4.48043 10.2929 4.29289C10.4804 4.10536 10.7348 4 11 4H13C13.2652 4 13.5196 4.10536 13.7071 4.29289C13.8946 4.48043 14 4.73478 14 5V6H10V5ZM17 19C17 19.2652 16.8946 19.5196 16.7071 19.7071C16.5196 19.8946 16.2652 20 16 20H8C7.73478 20 7.48043 19.8946 7.29289 19.7071C7.10536 19.5196 7 19.2652 7 19V8H17V19ZM14 18C14.2652 18 14.5196 17.8946 14.7071 17.7071C14.8946 17.5196 15 17.2652 15 17V11C15 10.7348 14.8946 10.4804 14.7071 10.2929C14.5196 10.1054 14.2652 10 14 10C13.7348 10 13.4804 10.1054 13.2929 10.2929C13.1054 10.4804 13 10.7348 13 11V17C13 17.2652 13.1054 17.5196 13.2929 17.7071C13.4804 17.8946 13.7348 18 14 18Z" fill="#0077FF"/>
          </svg>
        </button>
      </div>
    );
  }

  if (state.status === 'uploaded' || state.status === 'error') {
    const isError = state.status === 'error';
    const ext = allowedExt.toUpperCase();
    return (
      <div className={`flex h-[102px] items-center gap-3 rounded-[12px] border px-4 ${isError ? 'border-error' : 'border-[#C4C8CC]'} bg-white`}>
        {state.status === 'uploaded' && state.previewUrl ? (
          <img src={state.previewUrl} alt="" className="size-[42px] rounded-[10px] object-cover shrink-0" />
        ) : (
          <div className={`flex size-12 shrink-0 items-center justify-center rounded-[10px] ${isError ? 'bg-error/10' : 'bg-bg-subtle'}`}>
            <Image size={20} className={isError ? 'text-error' : 'text-text-secondary'} />
          </div>
        )}
        <div className="flex flex-1 flex-col gap-0.5 min-w-0">
          <span className="truncate text-base font-semibold text-text-primary">{state.name}</span>
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
            className="flex size-8 items-center justify-center rounded-lg transition-colors hover:bg-bg-subtle"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 17C11.6044 17 11.2178 17.1173 10.8889 17.3371C10.56 17.5568 10.3036 17.8692 10.1522 18.2346C10.0009 18.6001 9.96126 19.0022 10.0384 19.3902C10.1156 19.7781 10.3061 20.1345 10.5858 20.4142C10.8655 20.6939 11.2219 20.8844 11.6098 20.9616C11.9978 21.0387 12.3999 20.9991 12.7654 20.8478C13.1308 20.6964 13.4432 20.44 13.6629 20.1111C13.8827 19.7822 14 19.3956 14 19C14 18.4696 13.7893 17.9609 13.4142 17.5858C13.0391 17.2107 12.5304 17 12 17ZM12 7C12.3956 7 12.7822 6.8827 13.1111 6.66294C13.44 6.44318 13.6964 6.13082 13.8478 5.76537C13.9991 5.39991 14.0387 4.99778 13.9616 4.60982C13.8844 4.22186 13.6939 3.86549 13.4142 3.58579C13.1345 3.30608 12.7781 3.1156 12.3902 3.03843C12.0022 2.96126 11.6001 3.00087 11.2346 3.15224C10.8692 3.30362 10.5568 3.55996 10.3371 3.88886C10.1173 4.21776 10 4.60444 10 5C10 5.53043 10.2107 6.03914 10.5858 6.41421C10.9609 6.78929 11.4696 7 12 7ZM12 14C12.3956 14 12.7822 13.8827 13.1111 13.6629C13.44 13.4432 13.6964 13.1308 13.8478 12.7654C13.9991 12.3999 14.0387 11.9978 13.9616 11.6098C13.8844 11.2219 13.6939 10.8655 13.4142 10.5858C13.1345 10.3061 12.7781 10.1156 12.3902 10.0384C12.0022 9.96126 11.6001 10.0009 11.2346 10.1522C10.8692 10.3036 10.5568 10.56 10.3371 10.8889C10.1173 11.2178 10 11.6044 10 12C10 12.5304 10.2107 13.0391 10.5858 13.4142C10.9609 13.7893 11.4696 14 12 14Z" fill="#0077FF"/>
            </svg>
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-9 z-20 min-w-[140px] overflow-hidden rounded-[12px] bg-white shadow-lg">
              {!deleteOnly && (
                <button
                  type="button"
                  onClick={() => { setMenuOpen(false); inputRef.current?.click(); }}
                  className="w-full px-4 py-3 text-left text-body-sm text-accent transition-colors hover:bg-bg-subtle"
                >
                  изменить
                </button>
              )}
              {!deleteOnly && (
                <button
                  type="button"
                  onClick={handleDownload}
                  className="w-full px-4 py-3 text-left text-body-sm text-accent transition-colors hover:bg-bg-subtle"
                >
                  скачать
                </button>
              )}
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
      className="flex h-[102px] w-full flex-col items-center justify-center gap-1.5 rounded-[12px] border border-dashed border-bg-ocean bg-bg-island transition-colors hover:bg-bg-ocean"
    >
      {state.status === 'loading' ? (
        <Loader2 size={20} className="animate-spin text-accent" />
      ) : (
        <>
          <div className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12.9999C18.7348 12.9999 18.4804 13.1053 18.2929 13.2928C18.1054 13.4803 18 13.7347 18 13.9999V14.3799L16.52 12.8999C15.9974 12.3814 15.2911 12.0905 14.555 12.0905C13.8189 12.0905 13.1126 12.3814 12.59 12.8999L11.89 13.5999L9.41 11.1199C8.88012 10.6155 8.17657 10.3342 7.445 10.3342C6.71343 10.3342 6.00988 10.6155 5.48 11.1199L4 12.5999V6.9999C4 6.73468 4.10536 6.48033 4.29289 6.29279C4.48043 6.10525 4.73478 5.9999 5 5.9999H12C12.2652 5.9999 12.5196 5.89454 12.7071 5.707C12.8946 5.51947 13 5.26511 13 4.9999C13 4.73468 12.8946 4.48033 12.7071 4.29279C12.5196 4.10525 12.2652 3.9999 12 3.9999H5C4.20435 3.9999 3.44129 4.31597 2.87868 4.87858C2.31607 5.44119 2 6.20425 2 6.9999V18.9999C2 19.7955 2.31607 20.5586 2.87868 21.1212C3.44129 21.6838 4.20435 21.9999 5 21.9999H17C17.7956 21.9999 18.5587 21.6838 19.1213 21.1212C19.6839 20.5586 20 19.7955 20 18.9999V13.9999C20 13.7347 19.8946 13.4803 19.7071 13.2928C19.5196 13.1053 19.2652 12.9999 19 12.9999ZM5 19.9999C4.73478 19.9999 4.48043 19.8945 4.29289 19.707C4.10536 19.5195 4 19.2651 4 18.9999V15.4299L6.9 12.5299C7.04691 12.3899 7.24206 12.3118 7.445 12.3118C7.64794 12.3118 7.84309 12.3899 7.99 12.5299L11.16 15.6999L15.46 19.9999H5ZM18 18.9999C17.9986 19.1913 17.9354 19.3772 17.82 19.5299L13.31 14.9999L14.01 14.2999C14.0817 14.2267 14.1673 14.1686 14.2617 14.1289C14.3561 14.0892 14.4576 14.0688 14.56 14.0688C14.6624 14.0688 14.7639 14.0892 14.8583 14.1289C14.9527 14.1686 15.0383 14.2267 15.11 14.2999L18 17.2099V18.9999ZM22.71 4.2899L19.71 1.2899C19.6149 1.19886 19.5028 1.12749 19.38 1.0799C19.1365 0.979878 18.8635 0.979878 18.62 1.0799C18.4972 1.12749 18.3851 1.19886 18.29 1.2899L15.29 4.2899C15.1968 4.38313 15.1228 4.49383 15.0723 4.61565C15.0219 4.73747 14.9959 4.86804 14.9959 4.9999C14.9959 5.2662 15.1017 5.52159 15.29 5.7099C15.4783 5.8982 15.7337 6.00399 16 6.00399C16.2663 6.00399 16.5217 5.8982 16.71 5.7099L18 4.4099V9.9999C18 10.2651 18.1054 10.5195 18.2929 10.707C18.4804 10.8945 18.7348 10.9999 19 10.9999C19.2652 10.9999 19.5196 10.8945 19.7071 10.707C19.8946 10.5195 20 10.2651 20 9.9999V4.4099L21.29 5.7099C21.383 5.80362 21.4936 5.87802 21.6154 5.92879C21.7373 5.97956 21.868 6.00569 22 6.00569C22.132 6.00569 22.2627 5.97956 22.3846 5.92879C22.5064 5.87802 22.617 5.80362 22.71 5.7099C22.8037 5.61693 22.8781 5.50633 22.9289 5.38447C22.9797 5.26261 23.0058 5.13191 23.0058 4.9999C23.0058 4.86788 22.9797 4.73718 22.9289 4.61532C22.8781 4.49346 22.8037 4.38286 22.71 4.2899Z" fill="#0077FF"/>
            </svg>
            <span className="text-body font-medium text-accent">{label}</span>
          </div>
          <span className="text-body-sm text-text-secondary">{hint}</span>
        </>
      )}
      <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={handleChange} />
    </button>
  );
}
