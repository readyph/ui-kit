import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '../utils/cn';
import { useField } from './Field';
import { inputBase, inputState } from './Input';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

/** Multi-line text input. Reads field wiring from a surrounding `<Field>`. */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { invalid, className, id, rows = 4, ...rest },
  ref,
) {
  const field = useField();
  const isInvalid = invalid ?? field?.invalid ?? false;
  return (
    <textarea
      ref={ref}
      id={id ?? field?.id}
      rows={rows}
      aria-invalid={isInvalid || undefined}
      aria-describedby={field?.describedBy}
      aria-required={field?.required || undefined}
      className={cn(inputBase, inputState(isInvalid), 'min-h-20 resize-y px-3 py-2 text-sm leading-normal', className)}
      {...rest}
    />
  );
});
