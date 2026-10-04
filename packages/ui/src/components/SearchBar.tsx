import { forwardRef, useState, type InputHTMLAttributes } from 'react';
import { MagnifyingGlass, X } from '@phosphor-icons/react';
import { cn, focusRing } from '../utils/cn';
import { Icon } from './Icon';
import { Kbd } from './Kbd';
import { Spinner } from './Spinner';
import { useShortcutMode } from '../providers/ShortcutModeProvider';
import { formatShortcut } from '../utils/shortcut';

export interface SearchBarProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange' | 'size'> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onClear?: () => void;
  size?: 'sm' | 'md' | 'lg';
  /** Show a spinner (async suggestions in flight). */
  loading?: boolean;
  /** Key-hint (e.g. `"/"` or `"mod+k"`), revealed in shortcut mode. */
  shortcut?: string;
}

const sizes = { sm: 'h-sm text-sm', md: 'h-md text-sm', lg: 'h-lg text-base' };

/** A clearable, keyboard-focusable search field. Async-suggest ready. */
export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(function SearchBar(
  { value, defaultValue, onValueChange, onClear, size = 'md', loading = false, shortcut, placeholder = 'Search…', className, ...rest },
  ref,
) {
  const { shortcutMode } = useShortcutMode();
  const [internal, setInternal] = useState(defaultValue ?? '');
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;

  const setValue = (next: string) => {
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  };

  const showHint = Boolean(shortcut) && shortcutMode && !current;

  return (
    <div className={cn('relative flex items-center', className)}>
      <Icon icon={MagnifyingGlass} size="sm" className="pointer-events-none absolute left-3 text-ink-subtle" />
      <input
        ref={ref}
        type="search"
        role="searchbox"
        value={current}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        className={cn(
          'w-full rounded-base border border-border bg-surface pl-9 pr-9 text-ink placeholder:text-ink-subtle outline-none transition-colors duration-DEFAULT',
          'hover:border-border-strong focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-focus/40',
          '[&::-webkit-search-cancel-button]:hidden',
          sizes[size],
        )}
        {...rest}
      />
      <div className="absolute right-2.5 flex items-center gap-1">
        {loading && <Spinner size="sm" className="text-ink-subtle" />}
        {!loading && current && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setValue('');
              onClear?.();
            }}
            className={cn('grid h-5 w-5 place-items-center rounded-sm text-ink-subtle hover:bg-surface-muted hover:text-ink', focusRing)}
          >
            <Icon icon={X} size="sm" />
          </button>
        )}
        {showHint && (
          <span className="flex items-center gap-0.5">
            {formatShortcut(shortcut!).map((k, i) => (
              <Kbd key={i} size="sm">
                {k}
              </Kbd>
            ))}
          </span>
        )}
      </div>
    </div>
  );
});
