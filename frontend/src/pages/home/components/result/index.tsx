import Button from '@/components/interactive/button/button';
import Textarea from '@/components/interactive/textarea';
import { useForm } from '@/hooks/useForm';
import { FC } from 'react';

const Result: FC = () => {
  const { twitterHandle, result, handleFormState } = useForm();

  return (
    <div className="flex flex-col gap-4 w-full items-center">
      <Textarea
        value={result}
        label={`A IA tem isso a dizer sobre o ${twitterHandle}:`}
        disabled
        className="min-h-72"
      />
      <Button
        text="GERAR NOVAMENTE"
        type="submit"
        onClick={() => handleFormState(true)}
      />
    </div>
  );
};

export default Result;
