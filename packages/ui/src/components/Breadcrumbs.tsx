import { forwardRef, Fragment, type ReactNode } from 'react';
import { CaretRight } from '@phosphor-icons/react';
import { cn, focusRing } from '../utils/cn';
import { Icon } from './Icon';

export interface Crumb {
  label: ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbsProps {
  items: Crumb[];
  className?: string;
}

/** Hierarchical trail. The last item is the current page (not a link). */
export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(function Breadcrumbs(
  { items, className },
  ref,
) {
  return (
    <nav ref={ref} aria-label="Breadcrumb" className={cn('flex items-center text-sm', className)}>
      <ol className="flex items-center gap-1.5">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <Fragment key={i}>
              <li className="flex items-center">
                {last ? (
                  <span aria-current="page" className="font-medium text-ink">
                    {item.label}
                  </span>
                ) : item.href || item.onClick ? (
                  <a
                    href={item.href}
                    onClick={item.onClick}
                    className={cn('rounded-sm text-ink-muted transition-colors hover:text-ink', focusRing)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <span className="text-ink-muted">{item.label}</span>
                )}
              </li>
              {!last && <Icon icon={CaretRight} size={14} className="text-ink-subtle" />}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
});
