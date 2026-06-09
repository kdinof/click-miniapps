import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { useDashboard } from '@/state/dashboard';

export function CongratulationsModal() {
  const { dispatch } = useDashboard();
  const close = () => dispatch({ type: 'CLOSE_MODAL' });

  return (
    <Modal onClose={close} className="w-[400px] max-w-full">
      <div className="flex flex-col items-center gap-4 py-2">
        <span className="text-[48px] leading-none">🎉</span>
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-center text-h1 font-semibold text-text-primary">Поздравляем!</h2>
          <p className="text-center text-body text-text-secondary">
            Ваш MiniApp готов! Теперь он доступен в Click SuperApp и виден пользователям.
          </p>
        </div>
        <Button className="mt-2 w-full" onClick={close}>
          к Дашборду
        </Button>
      </div>
    </Modal>
  );
}
