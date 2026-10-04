import { forwardRef, type FormHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  /** Vertical gap between fields. */
  gap?: 'sm' | 'md' | 'lg';
  children?: ReactNode;
}

const gaps = { sm: 'gap-3', md: 'gap-4', lg: 'gap-6' };

/** A vertically-stacked form. The project owns `onSubmit` and where it posts. */
export const Form = forwardRef<HTMLFormElement, FormProps>(function Form(
  { gap = 'md', className, children, ...rest },
  ref,
) {
  return (
    <form ref={ref} className={cn('flex flex-col', gaps[gap], className)} {...rest}>
      {children}
    </form>
  );
});

export interface FormActionsProps extends HTMLAttributes<HTMLDivElement> {
  align?: 'start' | 'between' | 'end';
  children?: ReactNode;
}

const aligns = { start: 'justify-start', between: 'justify-between', end: 'justify-end' };

/** A row of form actions (submit / cancel), aligned to the end by default. */
export const FormActions = forwardRef<HTMLDivElement, FormActionsProps>(function FormActions(
  { align = 'end', className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cn('flex items-center gap-2 pt-2', aligns[align], className)} {...rest}>
      {children}
    </div>
  );
});
