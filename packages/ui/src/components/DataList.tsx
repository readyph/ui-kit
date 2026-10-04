import { type ReactNode } from 'react';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import { cn } from '../utils/cn';
import { Icon } from './Icon';

export interface DataListItem {
  label: ReactNode;
  value: ReactNode;
  icon?: PhosphorIcon;
}

export interface DataListProps {
  items: DataListItem[];
  /** Stack label above value instead of side-by-side. */
  stacked?: boolean;
  className?: string;
}

/**
 * A label → value description list for "info" panels (company details, record
 * metadata). Side-by-side by default; `stacked` for narrow columns.
 */
export function DataList({ items, stacked = false, className }: DataListProps) {
  return (
    <dl className={cn('text-sm', className)}>
      {items.map((item, i) => (
        <div
          key={i}
          className={cn(
            'py-1.5',
            stacked ? 'flex flex-col gap-0.5' : 'flex items-center gap-3',
          )}
        >
          <dt className={cn('flex items-center gap-2 text-ink-muted', stacked ? '' : 'w-28 shrink-0')}>
            {item.icon && <Icon icon={item.icon} size="sm" className="text-ink-subtle" />}
            {item.label}
          </dt>
          <dd className={cn('min-w-0 text-ink', stacked ? '' : 'flex-1 truncate text-right')}>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
