import { FC } from 'react';

const Header: FC = () => {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="w-full">
        <h1 className="text-2xl font-bold">
          detona.<span className="text-accent">dev</span>
        </h1>
        <p className="text-xs max-w-52 text-secondary">
          deixe a IA detonar os chatos da bolha dev por você
        </p>
      </div>
      <p className="text-5xl">🔥</p>
    </div>
  );
};

export default Header;
