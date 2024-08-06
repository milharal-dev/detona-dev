import Button from '@/components/interactive/button/button';
import Input from '@/components/interactive/input';
import Textarea from '@/components/interactive/textarea';
import { useForm } from '@/hooks/useForm';
import { FC } from 'react';

const Form: FC = () => {
  const {
    twitterHandle,
    githubHandle,
    additionalInfo,
    handleFormState,
    handleTwitterHandle,
    handleGithubHandle,
    handleAdditionalInfo,
  } = useForm();

  return (
    <div className="flex flex-col gap-6 items-center">
      <Input
        label="usuário no twitter"
        placeholder="@DetonaDev"
        value={twitterHandle}
        onChange={(e) => handleTwitterHandle(e.target.value)}
      />
      <Input
        label="usuário no github"
        placeholder="detona-dev"
        value={githubHandle}
        onChange={(e) => handleGithubHandle(e.target.value)}
      />
      <Textarea
        label="alguma informação a mais para ajudar a insultar?"
        placeholder="o detona.dev é..."
        value={additionalInfo}
        onChange={(e) => handleAdditionalInfo(e.target.value)}
      />
      <Button
        text="ENVIAR"
        type="submit"
        onClick={() => handleFormState(false)}
      />
    </div>
  );
};

export default Form;
