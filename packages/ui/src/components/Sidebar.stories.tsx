import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { House, Package, ChartBar, Users, Gear, Receipt } from '@phosphor-icons/react';
import { Sidebar, SidebarSection, SidebarItem } from './Sidebar';
import { ShortcutModeProvider } from '../providers/ShortcutModeProvider';

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Navigation/Sidebar Nav',
  component: Sidebar,
  parameters: {
    docs: {
      description: {
        component: [
          'A vertical navigation column. Compose it from `Sidebar`, `SidebarSection` and `SidebarItem`. Items render an `<a>` when given `href`, otherwise a `<button>` — the project owns navigation and the `active` state.',
          '',
          '```tsx',
          "import { Sidebar, SidebarSection, SidebarItem } from '@readyph/ui';",
          "import { House, Package } from '@phosphor-icons/react';",
          '',
          '<Sidebar>',
          '  <SidebarSection>',
          '    <SidebarItem icon={House} href="/" active>Dashboard</SidebarItem>',
          '    <SidebarItem icon={Package} href="/inventory" badge={128}>Inventory</SidebarItem>',
          '  </SidebarSection>',
          '</Sidebar>',
          '```',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  render: function DefaultExample() {
    const [active, setActive] = useState('dashboard');
    return (
      <div className="h-[32rem] overflow-hidden rounded-lg border border-border">
        <Sidebar className="h-full">
          <SidebarSection title="Operations">
            <SidebarItem icon={House} active={active === 'dashboard'} onClick={() => setActive('dashboard')}>
              Dashboard
            </SidebarItem>
            <SidebarItem icon={Package} badge={128} active={active === 'inventory'} onClick={() => setActive('inventory')}>
              Inventory
            </SidebarItem>
            <SidebarItem icon={Receipt} active={active === 'orders'} onClick={() => setActive('orders')}>
              Orders
            </SidebarItem>
            <SidebarItem icon={ChartBar} active={active === 'reports'} onClick={() => setActive('reports')}>
              Reports
            </SidebarItem>
          </SidebarSection>
          <SidebarSection title="Admin">
            <SidebarItem icon={Users} active={active === 'team'} onClick={() => setActive('team')}>
              Team
            </SidebarItem>
            <SidebarItem icon={Gear} active={active === 'settings'} onClick={() => setActive('settings')}>
              Settings
            </SidebarItem>
          </SidebarSection>
        </Sidebar>
      </div>
    );
  },
};

export const WithShortcutHints: Story = {
  name: 'Shortcut hints',
  render: () => (
    <ShortcutModeProvider defaultOn>
      <div className="h-80 overflow-hidden rounded-lg border border-border">
        <Sidebar className="h-full">
          <SidebarSection>
            <SidebarItem icon={House} active shortcut="g h">
              Dashboard
            </SidebarItem>
            <SidebarItem icon={Package} shortcut="g i">
              Inventory
            </SidebarItem>
            <SidebarItem icon={ChartBar} shortcut="g r">
              Reports
            </SidebarItem>
          </SidebarSection>
        </Sidebar>
      </div>
    </ShortcutModeProvider>
  ),
};
