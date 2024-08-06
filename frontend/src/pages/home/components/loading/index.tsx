import { FC } from 'react';

import { ring } from 'ldrs';

ring.register();

const Loading: FC = () => {
  return (
    <div className="flex flex-col gap-8 text-xl w-full items-center text-center">
      <p>
        A IA está criando a crítica <i>construtiva</i> para você...
      </p>
      <l-ring size="64" stroke="6" bg-opacity="0" speed="2" color="#DAC9DC" />
    </div>
  );
};

export default Loading;
