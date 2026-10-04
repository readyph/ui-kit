import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { X } from '@phosphor-icons/react';
import { cn, focusRing } from '../utils/cn';
import { Icon } from './Icon';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  /** Render a remove (×) affordance; the project supplies the handler. */
  onRemove?: () => void;
  /** Label for the remove control. */
  removeLabel?: string;
}

/** A compact, optionally removable label pill. */
export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  { onRemove, removeLabel = 'Remove', className, children, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1 rounded-base border border-border bg-surface-subtle px-2 py-0.5 text-xs text-ink',
        className,
      )}
      {...rest}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          aria-label={removeLabel}
          onClick={onRemove}
          className={cn(
            '-mr-0.5 grid h-4 w-4 place-items-center rounded-sm text-ink-subtle hover:bg-surface-muted hover:text-ink',
            focusRing,
          )}
        >
          <Icon icon={X} size={12} />
        </button>
      )}
    </span>
  );
});
