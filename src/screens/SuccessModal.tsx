import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { TextField } from '@/components/TextField';
import { CopyButton } from '@/components/CopyButton';
import { useDashboard, TOKEN_LINK } from '@/state/dashboard';

export function SuccessModal() {
  const { dispatch } = useDashboard();
  const close = () => dispatch({ type: 'CLOSE_SUCCESS' });

  return (
    <Modal onClose={close} className="w-[520px] max-w-full">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 pr-8">
          <h2 className="text-center text-h2 text-text-primary">
            Тестовый МиниАпп опубликован
          </h2>
          <p className="text-center text-body-sm text-text-secondary">
            Можете скопировать ссылку на МиниАпп
          </p>
        </div>
        <TextField readOnly value={TOKEN_LINK} trailing={<CopyButton value={TOKEN_LINK} />} />
        <Button className="w-full" onClick={close}>
          Понятно
        </Button>
      </div>
    </Modal>
  );
}
