import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

interface ShortcutModeContextValue {
  /** When true, components reveal their key-hint badges. */
  shortcutMode: boolean;
  setShortcutMode: (on: boolean) => void;
  toggleShortcutMode: () => void;
}

const ShortcutModeContext = createContext<ShortcutModeContextValue | null>(null);

export interface ShortcutModeProviderProps {
  children: ReactNode;
  /** Initial state (uncontrolled). */
  defaultOn?: boolean;
}

/**
 * Provides shortcut-hint mode. When on, actionable components reveal their
 * `<Kbd>` key-hint badges. The package renders the *affordance* only; the
 * project owns the actual key handling (see 06-Design-system.md §7).
 */
export function ShortcutModeProvider({
  children,
  defaultOn = false,
}: ShortcutModeProviderProps) {
  const [shortcutMode, setShortcutMode] = useState(defaultOn);
  const toggleShortcutMode = useCallback(() => setShortcutMode((v) => !v), []);
  const value = useMemo(
    () => ({ shortcutMode, setShortcutMode, toggleShortcutMode }),
    [shortcutMode, toggleShortcutMode],
  );
  return (
    <ShortcutModeContext.Provider value={value}>
      {children}
    </ShortcutModeContext.Provider>
  );
}

/**
 * Read shortcut-hint mode. Safe to call outside a provider — defaults to off,
 * so components work standalone.
 */
export function useShortcutMode(): ShortcutModeContextValue {
  const ctx = useContext(ShortcutModeContext);
  return (
    ctx ?? {
      shortcutMode: false,
      setShortcutMode: () => {},
      toggleShortcutMode: () => {},
    }
  );
}
