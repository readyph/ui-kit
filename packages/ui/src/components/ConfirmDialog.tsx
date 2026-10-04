import { type ReactNode } from 'react';
import { Modal } from './Modal';
import { Button, type ButtonVariant } from './Button';

export interface ConfirmDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Visual weight of the confirm button. */
  tone?: 'primary' | 'danger';
  /** Called when the user confirms. The project performs the action. */
  onConfirm?: () => void;
  onCancel?: () => void;
  /** Keep the dialog open and show a spinner (async confirm). */
  loading?: boolean;
  children?: ReactNode;
}

/** A focused yes/no confirmation built on `Modal`. */
export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  tone = 'primary',
  onConfirm,
  onCancel,
  loading = false,
  children,
}: ConfirmDialogProps) {
  const confirmVariant: ButtonVariant = tone === 'danger' ? 'danger' : 'primary';
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      size="sm"
      title={title}
      description={description}
      footer={
        <>
          <Button
            variant="secondary"
            onClick={() => {
              onCancel?.();
              onOpenChange?.(false);
            }}
            disabled={loading}
          >
            {cancelLabel}
          </Button>
          <Button variant={confirmVariant} onClick={onConfirm} loading={loading}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      {children}
    </Modal>
  );
}
