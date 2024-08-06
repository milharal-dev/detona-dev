import { createContext, useContext, useState } from 'react';
import { UseFormContextProps, UseFormProviderProps } from './useForm.types';

export const UseFormContext = createContext<UseFormContextProps>(
  {} as UseFormContextProps
);

export const UseFormProvider = ({ children }: UseFormProviderProps) => {
  const [formState, setFormState] = useState<'waiting' | 'submitting' | 'done'>(
    'waiting'
  );

  const [twitterHandle, setTwitterHandle] = useState<string>('');
  const [githubHandle, setGithubHandle] = useState<string>('');
  const [additionalInfo, setAdditionalInfo] = useState<string>('');

  const [result, setResult] = useState<string>(
    'TESTE RESULT BLA BLA LOREM IPSUM DOLOR SIM AMET TESTE RESULT BLA BLA LOREM IPSUM DOLOR SIM AMET TESTE RESULT BLA BLA LOREM IPSUM DOLOR SIM AMET TESTE RESULT BLA BLA LOREM IPSUM DOLOR SIM AMET'
  );

  function handleFormState(reset: boolean) {
    if (reset) {
      setFormState('waiting');
      return;
    }

    setFormState('submitting');

    setTimeout(() => {
      setFormState('done');
    }, 5000);
  }

  function handleTwitterHandle(value: string) {
    if (!value.startsWith('@')) {
      value = '@' + value;
    }

    setTwitterHandle(value);
  }

  function handleGithubHandle(value: string) {
    setGithubHandle(value);
  }

  function handleAdditionalInfo(value: string) {
    setAdditionalInfo(value);
  }

  function handleResult(value: string) {
    setResult(value);
  }

  return (
    <UseFormContext.Provider
      value={{
        formState,
        twitterHandle,
        githubHandle,
        additionalInfo,
        result,
        handleFormState,
        handleTwitterHandle,
        handleGithubHandle,
        handleAdditionalInfo,
        handleResult,
      }}
    >
      {children}
    </UseFormContext.Provider>
  );
};

export const useForm = () => useContext(UseFormContext);
