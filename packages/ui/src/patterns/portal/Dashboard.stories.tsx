import type { Meta, StoryObj } from '@storybook/react';
import { useState, type FormEvent, type KeyboardEvent } from 'react';
import {
  House,
  ChartBar,
  Users,
  SquaresFour,
  BookOpen,
  Gear,
  Package,
  DeviceMobile,
  Storefront,
  Plus,
  List,
  Sparkle,
  MagnifyingGlass,
  Bell,
  Warning,
  ChatCircle,
  PaperPlaneRight,
  CaretDown,
  ShoppingCart,
  CurrencyDollar,
  UsersThree,
  SignOut,
  CreditCard,
  User,
  type Icon as PhosphorIcon,
} from '@phosphor-icons/react';
import { Sidebar, SidebarSection, SidebarItem } from '../../components/Sidebar';
import { TopBar } from '../../components/TopBar';
import { IconButton } from '../../components/IconButton';
import { Button } from '../../components/Button';
import { Avatar } from '../../components/Avatar';
import { Badge } from '../../components/Badge';
import { Icon } from '../../components/Icon';
import { Menu } from '../../components/Menu';
import { cn } from '../../utils/cn';
import { ShortcutModeProvider } from '../../providers/ShortcutModeProvider';
import { goToStory } from '../nav';

/**
 * Home — Leda-first. At rest: greeting + Ask-Leda, with the stats below it; the
 * right column is reserved but blank. Focus → the field pops over a full-screen
 * backdrop. Send → the field drops to a composer, the conversation fills the
 * center (bottom-anchored), and the stats move into the right column. Leda
 * replies aren't instant, so a thinking state shows first. Mock data.
 */
const meta: Meta = {
  tags: ['!autodocs'],
  title: 'Portal/Dashboard',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

type Status = 'active' | 'degraded' | 'offline';

function StatusDot({ status }: { status: Status }) {
  const color = status === 'active' ? 'bg-success' : status === 'degraded' ? 'bg-warning' : 'bg-ink-subtle';
  return (
    <span className="relative inline-flex h-2 w-2">
      {status === 'active' && (
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60 motion-reduce:hidden" />
      )}
      <span className={cn('relative inline-flex h-2 w-2 rounded-full ring-2 ring-surface', color)} />
    </span>
  );
}

const statusLabel: Record<Status, string> = { active: 'Active', degraded: 'Degraded', offline: 'Offline' };

function Sparkline({ points, tone = 'primary' }: { points: number[]; tone?: 'primary' | 'success' | 'error' }) {
  const w = 60;
  const h = 20;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const norm = (v: number) => (max === min ? h / 2 : h - ((v - min) / (max - min)) * h);
  const step = w / (points.length - 1);
  const d = points.map((p, i) => `${(i * step).toFixed(1)},${norm(p).toFixed(1)}`).join(' ');
  const stroke = tone === 'success' ? 'text-success' : tone === 'error' ? 'text-error' : 'text-primary-500';
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className={stroke} fill="none" aria-hidden="true">
      <polyline points={d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface Platform {
  name: string;
  icon: PhosphorIcon;
  status: Status;
  notif: number;
  msg: number;
  alerts: number;
}

const platforms: Platform[] = [
  { name: 'Inventory', icon: Package, status: 'active', notif: 3, msg: 0, alerts: 2 },
  { name: 'Mobile app', icon: DeviceMobile, status: 'active', notif: 1, msg: 5, alerts: 0 },
  { name: 'Storefront', icon: Storefront, status: 'degraded', notif: 0, msg: 2, alerts: 1 },
  { name: 'POS', icon: CreditCard, status: 'offline', notif: 0, msg: 0, alerts: 1 },
];

interface Stat {
  label: string;
  value: string;
  delta?: string;
  points: number[];
  tone?: 'primary' | 'success' | 'error';
  icon: PhosphorIcon;
}

const stats: Stat[] = [
  { icon: ShoppingCart, label: 'Orders', value: '18', delta: '+4', points: [6, 9, 7, 11, 8, 14, 18], tone: 'success' },
  { icon: CurrencyDollar, label: 'Revenue', value: '₱24.6k', delta: '+12%', points: [12, 15, 13, 18, 16, 21, 25], tone: 'success' },
  { icon: UsersThree, label: 'Customers', value: '342', points: [300, 310, 305, 320, 330, 335, 342] },
  { icon: Package, label: 'Low stock', value: '7', points: [2, 3, 3, 5, 4, 6, 7], tone: 'error' },
];

/** Platforms + Today — reused below the ask bar (at rest) and in the right column (chatting). */
function StatsPanel() {
  return (
    <div className="space-y-7">
      <section>
        <h3 className="mb-1.5 px-2 text-xs font-semibold uppercase tracking-wide text-ink-subtle">Platforms</h3>
        <div className="flex flex-col">
          {platforms.map((p) => (
            <button key={p.name} className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-surface-muted">
              <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-surface-muted text-ink">
                <Icon icon={p.icon} size="md" />
                <span className="absolute -bottom-0.5 -right-0.5">
                  <StatusDot status={p.status} />
                </span>
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink">{p.name}</p>
                <p className="text-xs text-ink-subtle">{statusLabel[p.status]}</p>
              </div>
              <div className="flex items-center gap-2.5 text-ink-subtle">
                {p.notif > 0 && (
                  <span className="flex items-center gap-0.5 text-xs">
                    <Icon icon={Bell} size="sm" /> {p.notif}
                  </span>
                )}
                {p.msg > 0 && (
                  <span className="flex items-center gap-0.5 text-xs">
                    <Icon icon={ChatCircle} size="sm" /> {p.msg}
                  </span>
                )}
                {p.alerts > 0 && (
                  <span className="flex items-center gap-0.5 text-xs text-warning">
                    <Icon icon={Warning} size="sm" weight="fill" /> {p.alerts}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-3 px-2 text-xs font-semibold uppercase tracking-wide text-ink-subtle">Today</h3>
        <div className="grid grid-cols-2 gap-x-5 gap-y-5 px-2">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="flex items-center gap-1.5 text-xs text-ink-subtle">
                <Icon icon={s.icon} size="sm" />
                {s.label}
              </p>
              <div className="mt-1 flex items-end justify-between gap-2">
                <span className="text-xl font-semibold tabular-nums text-ink">{s.value}</span>
                <Sparkline points={s.points} tone={s.tone} />
              </div>
              {s.delta && <p className="mt-0.5 text-xs text-success">{s.delta}</p>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const ledaAvatar = (
  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary-600 text-white">
    <Icon icon={Sparkle} size="sm" weight="fill" />
  </span>
);

function ThinkingDots() {
  return (
    <span className="inline-flex items-center gap-1" aria-label="Leda is thinking">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current opacity-60" />
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current opacity-60" style={{ animationDelay: '160ms' }} />
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current opacity-60" style={{ animationDelay: '320ms' }} />
    </span>
  );
}

interface Msg {
  id: number;
  role: 'user' | 'assistant';
  text: string;
  table?: boolean;
  pending?: boolean;
}

const lowStock = [
  { name: 'Calamansi 1kg', sku: 'FRT-014', stock: 18 },
  { name: 'Mango boxes', sku: 'FRT-022', stock: 0 },
  { name: 'Pomelo pack', sku: 'FRT-030', stock: 9 },
];

function ReplyTable() {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-surface-subtle text-left text-xs text-ink-subtle">
            <th className="px-3 py-2 font-medium">Product</th>
            <th className="px-3 py-2 font-medium">SKU</th>
            <th className="px-3 py-2 text-right font-medium">Stock</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {lowStock.map((r) => (
            <tr key={r.sku}>
              <td className="px-3 py-2 font-medium text-ink">{r.name}</td>
              <td className="px-3 py-2 text-ink-muted">{r.sku}</td>
              <td className="px-3 py-2 text-right">
                <Badge tone={r.stock === 0 ? 'error' : 'warning'} size="sm">{r.stock}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const suggestions = ['Show weekly sales', 'Add a product', "Who's low on stock?", 'Invite a teammate'];

export const Dashboard: Story = {
  name: 'Dashboard (live)',
  render: function PortalDashboard() {
    const [nav, setNav] = useState('home');
    const [chatting, setChatting] = useState(false);
    const [focused, setFocused] = useState(false);
    const [draft, setDraft] = useState('');
    const [messages, setMessages] = useState<Msg[]>([]);

    const sendText = (text: string) => {
      const t = text.trim();
      if (!t) return;
      const uid = Date.now();
      const aid = uid + 1;
      setMessages((prev) => [...prev, { id: uid, role: 'user', text: t }, { id: aid, role: 'assistant', text: '', pending: true }]);
      setChatting(true);
      setFocused(false);
      setDraft('');
      window.setTimeout(() => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === aid
              ? { ...m, pending: false, text: 'Here are the products below their reorder point — want me to draft a reorder?', table: true }
              : m,
          ),
        );
      }, 1600);
    };
    const send = (event: FormEvent) => {
      event.preventDefault();
      sendText(draft);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setFocused(false);
    };
    const exit = () => {
      setChatting(false);
      setMessages([]);
    };

    const showBackdrop = focused && !chatting;
    const barPos = chatting ? 'bottom-6 top-auto' : 'top-6 bottom-auto';

    return (
      <ShortcutModeProvider>
        <div className="ds-root relative flex h-screen w-full overflow-hidden bg-surface-canvas font-sans text-ink">
          {/* Icon rail */}
          <div className="hidden w-rail shrink-0 flex-col items-center gap-2 py-3 sm:flex">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary-600 font-bold text-white shadow-sm">R</span>
            <div className="my-1 h-px w-6 bg-border" />
            {platforms.slice(0, 3).map((p) => (
              <div key={p.name} className="relative">
                <span className="grid h-9 w-9 place-items-center rounded-lg text-ink-subtle hover:bg-surface-muted hover:text-ink">
                  <Icon icon={p.icon} size="md" />
                </span>
                <span className="absolute -bottom-0.5 -right-0.5">
                  <StatusDot status={p.status} />
                </span>
              </div>
            ))}
            <span className="grid h-9 w-9 place-items-center rounded-lg text-ink-subtle hover:bg-surface-muted hover:text-ink">
              <Icon icon={Plus} size="md" />
            </span>
            <div className="mt-auto">
              <Menu
                trigger={<button className="rounded-full focus:outline-none" aria-label="Account"><Avatar name="Maria Santos" size="sm" /></button>}
                items={[
                  { type: 'label', label: 'maria@readyph.com' },
                  { label: 'Account', icon: User },
                  { label: 'Billing', icon: CreditCard },
                  { type: 'separator' },
                  { label: 'Sign out', icon: SignOut, danger: true },
                ]}
              />
            </div>
          </div>

          {/* Window */}
          <div className="flex min-w-0 flex-1 overflow-hidden bg-surface sm:my-2 sm:mr-2 sm:rounded-xl sm:border sm:border-border sm:shadow-sm">
            <Sidebar className="hidden lg:flex">
              <div className="mb-2 flex items-center justify-between px-2 pt-1">
                <button className="flex items-center gap-1 text-sm font-semibold text-ink focus:outline-none">
                  Sunrise Groceries <Icon icon={CaretDown} size="sm" className="text-ink-subtle" />
                </button>
                <IconButton icon={MagnifyingGlass} label="Search" variant="subtle" size="sm" />
              </div>
              <SidebarSection>
                <SidebarItem icon={House} active={nav === 'home'} onClick={() => setNav('home')}>Home</SidebarItem>
                <SidebarItem icon={ChartBar} active={nav === 'reports'} onClick={() => goToStory('portal-reports--reports')}>Reports</SidebarItem>
                <SidebarItem icon={Users} active={nav === 'team'} badge={8} onClick={() => goToStory('portal-team--team')}>Team</SidebarItem>
                <SidebarItem icon={SquaresFour} active={nav === 'platforms'} onClick={() => goToStory('portal-platforms--platforms')}>Platforms</SidebarItem>
                <SidebarItem icon={BookOpen} active={nav === 'memory'} onClick={() => goToStory('portal-memory--memory')}>Memory</SidebarItem>
              </SidebarSection>
              <SidebarSection title="Settings">
                <SidebarItem icon={Gear} active={nav === 'settings'} onClick={() => goToStory('portal-settings--settings')}>Company</SidebarItem>
              </SidebarSection>
            </Sidebar>

            {/* Main */}
            <div className="flex min-w-0 flex-1 flex-col">
              <TopBar
                start={<><IconButton icon={List} label="Open menu" variant="subtle" className="lg:hidden" /><span className="text-sm font-semibold text-ink">{chatting ? 'Leda' : 'Home'}</span></>}
                end={
                  chatting ? (
                    <Button size="sm" variant="secondary" onClick={exit}>Back to dashboard</Button>
                  ) : (
                    <IconButton icon={Bell} label="Notifications" variant="subtle" />
                  )
                }
              />

              {/* stage: [center] [reserved right]. The ask field lives in here, below the top bar. */}
              <div className="relative grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_20rem]">
                {/* center */}
                <div className="min-w-0 overflow-hidden">
                  <div className="h-full overflow-y-auto px-4 sm:px-6">
                    {chatting ? (
                      <div className="mx-auto flex min-h-full w-full max-w-2xl flex-col justify-end gap-6 pb-24 pt-6">
                        {messages.map((m) =>
                          m.role === 'user' ? (
                            <div key={m.id} className="flex gap-3">
                              <Avatar name="Maria Santos" size="sm" />
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-semibold text-ink">Maria Santos</p>
                                <p className="mt-0.5 text-sm leading-relaxed text-ink">{m.text}</p>
                              </div>
                            </div>
                          ) : (
                            <div key={m.id} className="flex gap-3">
                              {ledaAvatar}
                              <div className="min-w-0 flex-1 space-y-3">
                                <p className="text-sm font-semibold text-ink">Leda</p>
                                {m.pending ? (
                                  <p className="flex items-center gap-2 text-sm text-ink-muted">
                                    Thinking <ThinkingDots />
                                  </p>
                                ) : (
                                  <>
                                    <p className="text-sm leading-relaxed text-ink">{m.text}</p>
                                    {m.table && <ReplyTable />}
                                    {m.table && (
                                      <div className="flex gap-2">
                                        <Button size="sm" variant="secondary">Export</Button>
                                        <Button size="sm" leftIcon={Package}>Draft reorder</Button>
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    ) : (
                      <div className="mx-auto w-full max-w-2xl pb-10 pt-[10.5rem]">
                        <StatsPanel />
                      </div>
                    )}
                  </div>
                </div>

                {/* right — reserved, blank until chatting */}
                <div className="hidden min-w-0 overflow-y-auto px-4 py-5 lg:block">
                  {chatting && <StatsPanel />}
                </div>

                {/* Ask-Leda field — inside the stage (below the top bar); only moves vertically */}
                <div className={cn('absolute left-0 right-0 z-50 transition-all duration-500 ease-standard lg:right-[20rem]', barPos)}>
                  <div className="px-4 sm:px-6">
                    <div className={cn('mx-auto w-full max-w-2xl transition-transform duration-300', showBackdrop ? 'scale-[1.02]' : 'scale-100')}>
                      <div
                        className={cn(
                          'overflow-hidden text-center transition-all duration-300',
                          chatting ? 'mb-0 max-h-0 opacity-0' : 'mb-4 max-h-28 opacity-100',
                        )}
                      >
                        <h1 className="text-2xl font-semibold text-ink">Good evening, Maria</h1>
                        <p className="mt-1 text-sm text-ink-muted">What can Leda help you with?</p>
                      </div>

                      <form onSubmit={send}>
                        <div
                          className={cn(
                            'flex items-center gap-3 rounded-xl border bg-surface px-4 py-2.5 transition-shadow',
                            showBackdrop ? 'border-primary-300 shadow-xl' : 'border-border shadow-md focus-within:border-primary-300',
                          )}
                        >
                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary-50 text-primary-600">
                            <Icon icon={Sparkle} size="md" weight="fill" />
                          </span>
                          <input
                            value={draft}
                            onFocus={() => !chatting && setFocused(true)}
                            onKeyDown={onKeyDown}
                            onChange={(e) => setDraft(e.target.value)}
                            placeholder="Ask Leda to show a report, add stock, invite a teammate…"
                            className="flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-subtle"
                          />
                          <button type="submit" aria-label="Send" className="grid h-8 w-8 shrink-0 place-items-center rounded-base bg-primary-600 text-white hover:bg-primary-700">
                            <Icon icon={PaperPlaneRight} size="sm" weight="fill" />
                          </button>
                        </div>
                      </form>

                      {showBackdrop && (
                        <div className="mt-2 overflow-hidden rounded-xl border border-border bg-surface shadow-xl">
                          <p className="px-4 pb-1 pt-3 text-xs font-medium uppercase tracking-wide text-ink-subtle">Try</p>
                          <ul className="pb-2">
                            {suggestions.map((s) => (
                              <li key={s}>
                                <button
                                  type="button"
                                  onMouseDown={(e) => e.preventDefault()}
                                  onClick={() => sendText(s)}
                                  className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-ink hover:bg-surface-muted"
                                >
                                  <Icon icon={Sparkle} size="sm" className="text-primary-500" />
                                  {s}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* full-screen backdrop (covers rail, sidebar, top bar, stats) */}
          <div
            onClick={() => setFocused(false)}
            className={cn(
              'absolute inset-0 z-40 bg-overlay transition-opacity duration-300',
              showBackdrop ? 'opacity-100' : 'pointer-events-none opacity-0',
            )}
          />
        </div>
      </ShortcutModeProvider>
    );
  },
};
