import { type ReactNode } from 'react';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import { cn } from '../utils/cn';
import { Icon } from './Icon';

export interface EmptyStateProps {
  icon?: PhosphorIcon;
  title: ReactNode;
  description?: ReactNode;
  /** Primary action(s) — usually a Button. */
  action?: ReactNode;
  className?: string;
}

/** A centered placeholder for empty lists, no results, and first-run states. */
export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('mx-auto flex max-w-sm flex-col items-center gap-2 px-6 py-12 text-center', className)}>
      {icon && (
        <span className="mb-1 grid h-12 w-12 place-items-center rounded-full bg-surface-muted text-ink-subtle">
          <Icon icon={icon} size={24} />
        </span>
      )}
      <p className="text-sm font-semibold text-ink">{title}</p>
      {description && <p className="text-sm text-ink-muted">{description}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}
