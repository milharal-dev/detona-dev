import { FC } from 'react';
import ButtonProps from './button.types';
import { cn } from '@/libs/utils';

const Button: FC<ButtonProps> = ({
  text,
  icon,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'bg-accent text-background rounded-xl text-xl px-4 w-full text-center py-3 font-bold disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none',
        className
      )}
      {...props}
    >
      {text || icon}
    </button>
  );
};

export default Button;
