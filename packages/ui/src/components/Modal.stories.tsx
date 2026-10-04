import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Field } from './Field';
import { Input } from './Input';

const meta: Meta<typeof Modal> = {
  title: 'Components/Overlays/Modal',
  component: Modal,
  parameters: {
    docs: {
      description: {
        component: [
          'Accessible modal dialog (focus trap, Esc to close) built on Radix Dialog. Control `open` from the project. Compose the regions with `Modal.Header`, `Modal.Body`, `Modal.Footer`, or use the quick `title`/`footer` props.',
          '',
          '```tsx',
          "import { Modal, Button, Field, Input } from '@readyph/ui';",
          '',
          'function EditProfile() {',
          '  const [open, setOpen] = useState(false);',
          '  return (',
          '    <>',
          '      <Button onClick={() => setOpen(true)}>Edit profile</Button>',
          '      <Modal open={open} onOpenChange={setOpen}>',
          '        <Modal.Header>Edit profile</Modal.Header>',
          '        <Modal.Body>',
          '          <Field label="Display name"><Input defaultValue="Maria" /></Field>',
          '        </Modal.Body>',
          '        <Modal.Footer>',
          '          <Button variant="subtle" onClick={() => setOpen(false)}>Cancel</Button>',
          '          <Button onClick={() => setOpen(false)}>Save</Button>',
          '        </Modal.Footer>',
          '      </Modal>',
          '    </>',
          '  );',
          '}',
          '```',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Modal>;

export const Composed: Story = {
  name: 'Header / content / footer',
  render: function ComposedExample() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Edit profile</Button>
        <Modal open={open} onOpenChange={setOpen}>
          <Modal.Header>Edit profile</Modal.Header>
          <Modal.Body>
            <div className="flex flex-col gap-4">
              <Field label="Display name">
                <Input defaultValue="Maria Santos" />
              </Field>
              <Field label="Email">
                <Input type="email" defaultValue="maria@readyph.com" />
              </Field>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="subtle" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Save changes</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};

export const QuickProps: Story = {
  name: 'Quick (prop API)',
  render: function QuickExample() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Open
        </Button>
        <Modal
          open={open}
          onOpenChange={setOpen}
          title="Rename branch"
          description="Give this branch a new display name."
          footer={<Button onClick={() => setOpen(false)}>Save</Button>}
        >
          <Field label="Name">
            <Input defaultValue="Main warehouse" />
          </Field>
        </Modal>
      </>
    );
  },
};

export const Sizes: Story = {
  render: function SizesExample() {
    const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl' | null>(null);
    return (
      <>
        <div className="flex gap-2">
          {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
            <Button key={s} variant="secondary" onClick={() => setSize(s)}>
              {s}
            </Button>
          ))}
        </div>
        <Modal open={size !== null} onOpenChange={(o) => !o && setSize(null)} size={size ?? 'md'}>
          <Modal.Header>Size: {size}</Modal.Header>
          <Modal.Body>The modal width follows the `size` prop (sm / md / lg / xl).</Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setSize(null)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};
