import type { Meta, StoryObj } from '@storybook/react';
import { Toaster } from './Toaster';
import { toast } from './toastStore';
import { Button } from '../Button';

const meta: Meta = {
  title: 'Components/Feedback/Toast',
  parameters: {
    docs: { description: { component: `Mount \`Toaster\` once near the app root, then call \`toast\` anywhere.

\`\`\`tsx
import { Toaster, toast } from '@readyph/ui';

// near the root, once
<Toaster />

// anywhere
toast.success('Saved');
\`\`\`` } }, layout: 'centered' },
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {
  render: () => (
    <>
      <div className="flex flex-wrap gap-3">
        <Button variant="secondary" onClick={() => toast.info('Synced 128 items.')}>
          Info
        </Button>
        <Button variant="secondary" onClick={() => toast.success('Product published.')}>
          Success
        </Button>
        <Button variant="secondary" onClick={() => toast.warning('Low stock on 3 items.')}>
          Warning
        </Button>
        <Button variant="secondary" onClick={() => toast.error('Failed to save changes.')}>
          Error
        </Button>
        <Button
          onClick={() =>
            toast({
              title: 'Export ready',
              description: 'Your inventory report is ready to download.',
              tone: 'success',
              action: { label: 'Download', onClick: () => toast.info('Downloading…') },
            })
          }
        >
          With title + action
        </Button>
      </div>
      <Toaster position="bottom-right" />
    </>
  ),
};
