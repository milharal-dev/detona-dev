export interface UseFormContextProps {
  formState: 'waiting' | 'submitting' | 'done';
  twitterHandle: string;
  githubHandle: string;
  additionalInfo: string;
  result: string;
  handleFormState: (reset: boolean) => void;
  handleTwitterHandle: (value: string) => void;
  handleGithubHandle: (value: string) => void;
  handleAdditionalInfo: (value: string) => void;
  handleResult: (value: string) => void;
}

export interface UseFormProviderProps {
  children: React.ReactNode;
}
