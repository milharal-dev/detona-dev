import { FC } from 'react';
import Form from './components/form';
import { useForm } from '@/hooks/useForm';

import Loading from './components/loading';
import Result from './components/result';

const Home: FC = () => {
  const { formState } = useForm();

  return formState === 'submitting' ? (
    <Loading />
  ) : formState === 'done' ? (
    <Result />
  ) : (
    <Form />
  );
};

export default Home;
