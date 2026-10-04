import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ConfirmDialog } from './ConfirmDialog';
import { Button } from './Button';

const meta: Meta<typeof ConfirmDialog> = {
  parameters: {
    docs: {
      description: {
        component: `A focused yes/no confirmation built on \`Modal\`. The project performs the action in \`onConfirm\`.

\`\`\`tsx
import { ConfirmDialog, Button } from '@readyph/ui';

<ConfirmDialog
  open={open}
  onOpenChange={setOpen}
  tone="danger"
  title="Delete this product?"
  confirmLabel="Delete"
  onConfirm={remove}
/>
\`\`\``,
      },
    },
  },
  title: 'Components/Overlays/ConfirmDialog',
  component: ConfirmDialog,
};
export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

export const Danger: Story = {
  render: function DangerExample() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="danger" onClick={() => setOpen(true)}>
          Delete product
        </Button>
        <ConfirmDialog
          open={open}
          onOpenChange={setOpen}
          tone="danger"
          title="Delete this product?"
          description="This cannot be undone. The product will be removed from all branches."
          confirmLabel="Delete"
          onConfirm={() => setOpen(false)}
        />
      </>
    );
  },
};

export const Primary: Story = {
  render: function PrimaryExample() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Publish</Button>
        <ConfirmDialog
          open={open}
          onOpenChange={setOpen}
          title="Publish to all branches?"
          description="Customers will see these changes immediately."
          confirmLabel="Publish"
          onConfirm={() => setOpen(false)}
        />
      </>
    );
  },
};
