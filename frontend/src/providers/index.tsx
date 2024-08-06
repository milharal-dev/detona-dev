import { FC } from 'react';
import ProvidersProps from './providers.types';
import { UseFormProvider } from '@/hooks/useForm';

const Providers: FC<ProvidersProps> = ({ children }: ProvidersProps) => {
  return <UseFormProvider>{children}</UseFormProvider>;
};

export default Providers;
