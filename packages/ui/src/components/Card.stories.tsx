import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardFooter } from './Card';
import { Button } from './Button';
import { Badge } from './Badge';

const meta: Meta<typeof Card> = {
  parameters: { docs: { description: { component: `\`\`\`tsx
import { Card, CardHeader, CardFooter } from '@readyph/ui';

<Card>
  <CardHeader>Title</CardHeader>
  Body content
  <CardFooter>Actions</CardFooter>
</Card>
\`\`\`` } } },
  title: 'Components/Data display/Card',
  component: Card,
  argTypes: {
    padding: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg'] },
    elevation: { control: 'inline-radio', options: ['flat', 'sm', 'md'] },
  },
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  render: (args) => (
    <Card {...args} className="w-80">
      <h3 className="text-sm font-semibold text-ink">Inventory sync</h3>
      <p className="mt-1 text-sm text-ink-muted">
        Last synchronized 4 minutes ago across 3 branches.
      </p>
    </Card>
  ),
};

export const WithHeaderFooter: Story = {
  render: () => (
    <Card className="w-96" padding="none">
      <div className="px-4 pt-4">
        <CardHeader>
          <h3 className="text-sm font-semibold text-ink">Team plan</h3>
          <Badge tone="primary">Active</Badge>
        </CardHeader>
      </div>
      <div className="px-4 py-4 text-sm text-ink-muted">
        Unlimited seats, priority support and SSO. Billed annually.
      </div>
      <div className="px-4 pb-4">
        <CardFooter>
          <Button variant="subtle" size="sm">
            Cancel
          </Button>
          <Button size="sm">Upgrade</Button>
        </CardFooter>
      </div>
    </Card>
  ),
};

export const Interactive: Story = {
  render: () => (
    <Card interactive className="w-72 cursor-pointer">
      <h3 className="text-sm font-semibold text-ink">Hover me</h3>
      <p className="mt-1 text-sm text-ink-muted">Interactive cards lift on hover.</p>
    </Card>
  ),
};
