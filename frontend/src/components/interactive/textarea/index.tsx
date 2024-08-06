import { FC } from 'react';
import TextareaProps from './textarea.types';
import { cn } from '@/libs/utils';

const Textarea: FC<TextareaProps> = ({
  className,
  label,
  ...props
}: TextareaProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className="text-primary text-sm">{label}</label>}
      <textarea
        {...props}
        className={cn(
          'flex min-h-32 w-full rounded-xl resize-none bg-tertiary px-3 py-2 outline-none focus:ring-1 focus:ring-accent disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none text-primary placeholder:text-secondary',
          className
        )}
      />
    </div>
  );
};

export default Textarea;
