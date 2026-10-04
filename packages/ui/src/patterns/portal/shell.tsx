import { type ReactNode } from 'react';
import {
  Package,
  DeviceMobile,
  Storefront,
  Plus,
  Sparkle,
  MagnifyingGlass,
  Bell,
  CaretDown,
  List,
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
import { Icon } from '../../components/Icon';
import { Menu } from '../../components/Menu';
import { cn } from '../../utils/cn';
import { portalNav, goToStory, routes } from '../nav';

export type Status = 'active' | 'degraded' | 'offline';

export function StatusDot({ status }: { status: Status }) {
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

const railPlatforms: { icon: PhosphorIcon; status: Status; label: string; storyId?: string }[] = [
  { icon: Package, status: 'active', label: 'Inventory', storyId: routes.inventoryHome },
  { icon: DeviceMobile, status: 'active', label: 'Mobile app' },
  { icon: Storefront, status: 'degraded', label: 'Storefront' },
];

export type NavKey = 'home' | 'reports' | 'team' | 'platforms' | 'memory' | 'settings';

export interface PortalShellProps {
  active: NavKey;
  title: ReactNode;
  /** Right-aligned top-bar controls; defaults to notifications + Ask Leda. */
  actions?: ReactNode;
  /** Wrap children in a scroll area (default). Pass false for a self-managing layout. */
  scroll?: boolean;
  children: ReactNode;
}

/** The portal shell: icon rail + side nav + top bar, with a content slot. */
export function PortalShell({ active, title, actions, scroll = true, children }: PortalShellProps) {
  const mainNav = portalNav.filter((n) => n.key !== 'settings');
  const settingsNav = portalNav.find((n) => n.key === 'settings')!;

  return (
    <div className="ds-root flex h-screen w-full overflow-hidden bg-surface-canvas font-sans text-ink">
      {/* Icon rail */}
      <div className="hidden w-rail shrink-0 flex-col items-center gap-2 py-3 sm:flex">
        <button
          onClick={() => goToStory(routes.portalHome)}
          className="grid h-9 w-9 place-items-center rounded-lg bg-primary-600 font-bold text-white shadow-sm focus:outline-none"
          aria-label="Home"
        >
          R
        </button>
        <div className="my-1 h-px w-6 bg-border" />
        {railPlatforms.map((p) => (
          <button
            key={p.label}
            onClick={() => p.storyId && goToStory(p.storyId)}
            aria-label={p.label}
            className="relative focus:outline-none"
          >
            <span className="grid h-9 w-9 place-items-center rounded-lg text-ink-subtle hover:bg-surface-muted hover:text-ink">
              <Icon icon={p.icon} size="md" />
            </span>
            <span className="absolute -bottom-0.5 -right-0.5">
              <StatusDot status={p.status} />
            </span>
          </button>
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
            {mainNav.map((n) => (
              <SidebarItem
                key={n.key}
                icon={n.icon}
                active={active === n.key}
                badge={n.badge}
                href={n.route}
                onClick={(e) => {
                  e.preventDefault();
                  goToStory(n.storyId);
                }}
              >
                {n.label}
              </SidebarItem>
            ))}
          </SidebarSection>
          <SidebarSection title="Settings">
            <SidebarItem
              icon={settingsNav.icon}
              active={active === 'settings'}
              href={settingsNav.route}
              onClick={(e) => {
                e.preventDefault();
                goToStory(settingsNav.storyId);
              }}
            >
              {settingsNav.label}
            </SidebarItem>
          </SidebarSection>
        </Sidebar>

        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar
            start={
              <>
                <IconButton icon={List} label="Open menu" variant="subtle" className="lg:hidden" />
                {typeof title === 'string' ? <span className="text-sm font-semibold text-ink">{title}</span> : title}
              </>
            }
            end={
              actions ?? (
                <>
                  <IconButton icon={Bell} label="Notifications" variant="subtle" />
                  <Button size="sm" leftIcon={Sparkle}>Ask Leda</Button>
                </>
              )
            }
          />
          {scroll ? <div className="min-h-0 flex-1 overflow-y-auto">{children}</div> : <div className="flex min-h-0 flex-1 flex-col">{children}</div>}
        </div>
      </div>
    </div>
  );
}
