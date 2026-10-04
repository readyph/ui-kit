import { forwardRef } from 'react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { cn, focusRing } from '../utils/cn';
import { Icon } from './Icon';

export interface PaginationProps {
  /** Current 1-based page. */
  page: number;
  /** Total number of pages. */
  pageCount: number;
  onPageChange: (page: number) => void;
  /** How many numbered pages to show around the current page. */
  siblingCount?: number;
  className?: string;
}

const DOTS = '…';

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function computePages(page: number, pageCount: number, siblingCount: number): (number | string)[] {
  const total = siblingCount * 2 + 5;
  if (pageCount <= total) return range(1, pageCount);
  const left = Math.max(page - siblingCount, 1);
  const right = Math.min(page + siblingCount, pageCount);
  const showLeftDots = left > 2;
  const showRightDots = right < pageCount - 1;
  if (!showLeftDots && showRightDots) return [...range(1, 3 + siblingCount * 2), DOTS, pageCount];
  if (showLeftDots && !showRightDots) return [1, DOTS, ...range(pageCount - (2 + siblingCount * 2), pageCount)];
  return [1, DOTS, ...range(left, right), DOTS, pageCount];
}

/** Page navigator with previous/next and numbered pages. */
export const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination(
  { page, pageCount, onPageChange, siblingCount = 1, className },
  ref,
) {
  if (pageCount <= 1) return null;
  const pages = computePages(page, pageCount, siblingCount);
  const btn =
    'inline-grid h-8 min-w-8 place-items-center rounded-base px-2 text-sm text-ink-muted transition-colors duration-DEFAULT hover:bg-surface-muted hover:text-ink disabled:cursor-not-allowed disabled:opacity-40';

  return (
    <nav ref={ref} aria-label="Pagination" className={cn('flex items-center gap-1', className)}>
      <button
        type="button"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className={cn(btn, focusRing)}
      >
        <Icon icon={CaretLeft} size="sm" />
      </button>
      {pages.map((p, i) =>
        typeof p === 'number' ? (
          <button
            key={i}
            type="button"
            aria-current={p === page ? 'page' : undefined}
            onClick={() => onPageChange(p)}
            className={cn(
              btn,
              focusRing,
              p === page && 'bg-primary-600 text-white hover:bg-primary-700 hover:text-white',
            )}
          >
            {p}
          </button>
        ) : (
          <span key={i} className="grid h-8 w-8 place-items-center text-ink-subtle">
            {DOTS}
          </span>
        ),
      )}
      <button
        type="button"
        aria-label="Next page"
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
        className={cn(btn, focusRing)}
      >
        <Icon icon={CaretRight} size="sm" />
      </button>
    </nav>
  );
});
