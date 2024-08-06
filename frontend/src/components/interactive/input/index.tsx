import { FC } from 'react';
import InputProps from './input.types';
import { cn } from '@/libs/utils';

const Input: FC<InputProps> = ({ className, label, ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className="text-primary text-sm">{label}</label>}
      <input
        {...props}
        className={cn(
          'flex h-10 w-full rounded-xl bg-tertiary px-3 py-2 outline-none focus:ring-1 focus:ring-accent disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none text-primary placeholder:text-secondary',
          className
        )}
      />
    </div>
  );
};

export default Input;
