import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { House, Package, ChartBar, Gear } from '@phosphor-icons/react';
import { MainNav, MainNavItem } from './MainNav';
import { ShortcutModeProvider } from '../providers/ShortcutModeProvider';

const meta: Meta<typeof MainNav> = {
  title: 'Components/Navigation/Main Nav',
  component: MainNav,
  parameters: {
    docs: {
      description: {
        component: [
          'Horizontal primary navigation. The package renders the look; the project owns navigation — pass `href` for links or `onClick` for buttons, and set `active` yourself from the current route.',
          '',
          '```tsx',
          "import { MainNav, MainNavItem } from '@readyph/ui';",
          "import { House, Package } from '@phosphor-icons/react';",
          '',
          'function TopNav({ pathname }: { pathname: string }) {',
          '  return (',
          '    <MainNav>',
          '      <MainNavItem icon={House} href="/" active={pathname === "/"}>',
          '        Home',
          '      </MainNavItem>',
          '      <MainNavItem icon={Package} href="/inventory" active={pathname.startsWith("/inventory")}>',
          '        Inventory',
          '      </MainNavItem>',
          '    </MainNav>',
          '  );',
          '}',
          '```',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof MainNav>;

export const Default: Story = {
  render: function DefaultExample() {
    const [active, setActive] = useState('home');
    const items = [
      { key: 'home', label: 'Home', icon: House },
      { key: 'inventory', label: 'Inventory', icon: Package },
      { key: 'reports', label: 'Reports', icon: ChartBar },
      { key: 'settings', label: 'Settings', icon: Gear },
    ];
    return (
      <MainNav>
        {items.map((item) => (
          <MainNavItem
            key={item.key}
            icon={item.icon}
            active={active === item.key}
            onClick={() => setActive(item.key)}
          >
            {item.label}
          </MainNavItem>
        ))}
      </MainNav>
    );
  },
};

export const WithShortcutHints: Story = {
  name: 'Shortcut hints',
  render: () => (
    <ShortcutModeProvider defaultOn>
      <MainNav>
        <MainNavItem icon={House} active shortcut="g h">
          Home
        </MainNavItem>
        <MainNavItem icon={Package} shortcut="g i">
          Inventory
        </MainNavItem>
        <MainNavItem icon={ChartBar} shortcut="g r">
          Reports
        </MainNavItem>
      </MainNav>
    </ShortcutModeProvider>
  ),
};
