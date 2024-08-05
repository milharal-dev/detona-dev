import { FC, Fragment } from 'react';
import ProvidersProps from './providers.types';

const Providers: FC<ProvidersProps> = ({ children }: ProvidersProps) => {
  return <Fragment>{children}</Fragment>;
};

export default Providers;
