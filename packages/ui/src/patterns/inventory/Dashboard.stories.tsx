import type { Meta, StoryObj } from '@storybook/react';
import {
  Sparkle,
  PaperPlaneRight,
  Package,
  WarningCircle,
  XCircle,
  CurrencyDollar,
  Camera,
  Receipt,
  ArrowDown,
  ArrowUp,
  ArrowsClockwise,
  Warning,
  CaretRight,
  type Icon as PhosphorIcon,
} from '@phosphor-icons/react';
import { Stat } from '../../components/Stat';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { InventoryShell } from './shell';
import { goToStory, routes } from '../nav';

/**
 * Inventory Dashboard — the operational overview for this platform (distinct
 * from the Portal's company-wide control room). Ask-Leda bar, stock health,
 * open purchase orders + variances, today's movements, and a needs-attention
 * feed. See 04-Inventory.md §5. Mock data.
 */
const meta: Meta = {
  tags: ['!autodocs'],
  title: 'Inventory/Dashboard',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

const quickActions: { label: string; icon: PhosphorIcon }[] = [
  { label: "What's low on stock?", icon: Warning },
  { label: 'Receive a delivery', icon: Camera },
  { label: 'New PO from photo', icon: Receipt },
  { label: "Today's movements", icon: ArrowsClockwise },
];

function AskBar() {
  return (
    <section>
      <div className="mb-4">
        <h1 className="text-xl font-semibold text-ink">Good evening, Maria</h1>
        <p className="mt-0.5 text-sm text-ink-muted">Ask Leda, or snap a receipt to stock in.</p>
      </div>
      <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-2.5 shadow-sm focus-within:border-primary-300">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary-50 text-primary-600">
          <Icon icon={Sparkle} size="md" weight="fill" />
        </span>
        <input
          placeholder="Stock in a delivery, create a PO, check a product…"
          className="flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-subtle"
        />
        <button aria-label="Send" className="grid h-8 w-8 shrink-0 place-items-center rounded-base bg-primary-600 text-white hover:bg-primary-700">
          <Icon icon={PaperPlaneRight} size="sm" weight="fill" />
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {quickActions.map((q) => (
          <button
            key={q.label}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-ink-muted hover:border-primary-200 hover:text-ink"
          >
            <Icon icon={q.icon} size="sm" className="text-primary-500" />
            {q.label}
          </button>
        ))}
      </div>
    </section>
  );
}

interface PoRow {
  id: string;
  supplier: string;
  status: 'ordered' | 'partial' | 'received';
  ordered: number;
  received: number;
  variance?: string;
}

const openPos: PoRow[] = [
  { id: 'PO-1043', supplier: 'Fresh Fields Co.', status: 'partial', ordered: 12, received: 10, variance: '2 short' },
  { id: 'PO-1041', supplier: 'Dizon Produce', status: 'ordered', ordered: 30, received: 0 },
  { id: 'PO-1038', supplier: 'Metro Packaging', status: 'partial', ordered: 8, received: 6, variance: '2 short' },
];

const poStatus: Record<PoRow['status'], { label: string; tone: 'info' | 'warning' | 'success' }> = {
  ordered: { label: 'Ordered', tone: 'info' },
  partial: { label: 'Partially received', tone: 'warning' },
  received: { label: 'Received', tone: 'success' },
};

interface MoveRow {
  product: string;
  qty: number;
  reason: string;
  ref: string;
  time: string;
}

const movements: MoveRow[] = [
  { product: 'Calamansi 1kg', qty: 40, reason: 'received', ref: 'PO-1043', time: '10m ago' },
  { product: 'Mango boxes', qty: -6, reason: 'sold', ref: 'ORD-882', time: '22m ago' },
  { product: 'Pomelo pack', qty: -2, reason: 'damaged', ref: '—', time: '1h ago' },
  { product: 'Rice 25kg', qty: 15, reason: 'received', ref: 'PO-1038', time: '2h ago' },
];

interface Attention {
  icon: PhosphorIcon;
  tone: 'error' | 'warning';
  title: string;
  detail: string;
  action: string;
}

const attention: Attention[] = [
  { icon: XCircle, tone: 'error', title: 'Mango boxes out of stock', detail: 'Reorder point is 10 · 0 on hand', action: 'Reorder' },
  { icon: Warning, tone: 'warning', title: 'PO-1043 short-delivered', detail: 'Ordered 12, received 10', action: 'Review' },
  { icon: Camera, tone: 'warning', title: "Couldn't read 2 lines on a receipt", detail: 'Delivery receipt · needs a quick check', action: 'Fix' },
];

export const Dashboard: Story = {
  name: 'Dashboard',
  render: () => (
    <InventoryShell active="dashboard" title="Dashboard">
      <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6">
        <AskBar />

        {/* Stock health */}
        <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Stat icon={Package} label="Total SKUs" value="128" points={[120, 122, 121, 124, 126, 127, 128]} sparklineTone="primary" />
          <Stat icon={Warning} label="Low stock" value="7" delta="+2" deltaTone="error" points={[3, 4, 4, 5, 5, 6, 7]} sparklineTone="error" />
          <Stat icon={XCircle} label="Out of stock" value="2" delta="+1" deltaTone="error" points={[0, 1, 1, 1, 2, 1, 2]} sparklineTone="error" />
          <Stat icon={CurrencyDollar} label="Stock value" value="₱482k" delta="+3%" deltaTone="success" points={[440, 450, 455, 460, 470, 476, 482]} sparklineTone="success" />
        </section>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Open POs + movements */}
          <div className="space-y-6 lg:col-span-2">
            <Card padding="none">
              <div className="flex items-center justify-between px-4 py-3">
                <h2 className="text-sm font-semibold text-ink">Open purchase orders</h2>
                <Button size="sm" variant="subtle" rightIcon={CaretRight} onClick={() => goToStory(routes.inventoryPoList)}>View all</Button>
              </div>
              <div className="divide-y divide-border border-t border-border">
                {openPos.map((po) => (
                  <div key={po.id} className="flex items-center gap-3 px-4 py-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-surface-muted text-ink-subtle">
                      <Icon icon={Receipt} size="md" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="flex items-center gap-2 text-sm font-medium text-ink">
                        {po.id}
                        <Badge tone={poStatus[po.status].tone} size="sm">{poStatus[po.status].label}</Badge>
                      </p>
                      <p className="truncate text-xs text-ink-subtle">{po.supplier}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm tabular-nums text-ink">{po.received}/{po.ordered}</p>
                      {po.variance ? (
                        <span className="text-xs text-warning">{po.variance}</span>
                      ) : (
                        <span className="text-xs text-ink-subtle">received</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card padding="none">
              <div className="flex items-center justify-between px-4 py-3">
                <h2 className="text-sm font-semibold text-ink">Today's movements</h2>
                <Button size="sm" variant="subtle" rightIcon={CaretRight} onClick={() => goToStory(routes.inventoryMovements)}>Ledger</Button>
              </div>
              <div className="divide-y divide-border border-t border-border">
                {movements.map((m, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-2.5">
                    <span
                      className={
                        m.qty > 0
                          ? 'grid h-7 w-7 shrink-0 place-items-center rounded-full bg-success/10 text-success'
                          : 'grid h-7 w-7 shrink-0 place-items-center rounded-full bg-error/10 text-error'
                      }
                    >
                      <Icon icon={m.qty > 0 ? ArrowDown : ArrowUp} size="sm" weight="bold" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-ink">{m.product}</p>
                      <p className="text-xs text-ink-subtle">
                        {m.reason} · {m.ref}
                      </p>
                    </div>
                    <span className={m.qty > 0 ? 'text-sm font-medium tabular-nums text-success' : 'text-sm font-medium tabular-nums text-error'}>
                      {m.qty > 0 ? `+${m.qty}` : m.qty}
                    </span>
                    <span className="w-14 text-right text-xs text-ink-subtle">{m.time}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Needs attention */}
          <div>
            <Card padding="none">
              <div className="flex items-center gap-2 px-4 py-3">
                <Icon icon={WarningCircle} size="md" className="text-warning" weight="fill" />
                <h2 className="text-sm font-semibold text-ink">Needs attention</h2>
                <Badge tone="warning" size="sm">{attention.length}</Badge>
              </div>
              <div className="divide-y divide-border border-t border-border">
                {attention.map((a, i) => (
                  <div key={i} className="px-4 py-3">
                    <div className="flex items-start gap-2.5">
                      <Icon icon={a.icon} size="md" weight="fill" className={a.tone === 'error' ? 'text-error' : 'text-warning'} />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-ink">{a.title}</p>
                        <p className="mt-0.5 text-xs text-ink-subtle">{a.detail}</p>
                        <div className="mt-2 flex gap-2">
                          <Button size="sm" variant="secondary">{a.action}</Button>
                          <Button size="sm" variant="subtle" leftIcon={Sparkle}>Fix with Leda</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </InventoryShell>
  ),
};
