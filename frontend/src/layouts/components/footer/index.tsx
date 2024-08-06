import { FC } from 'react';

const Footer: FC = () => {
  return (
    <div className="absolute bottom-6">
      <p className="text-secondary text-xs">
        Made with hate by{' '}
        <a
          href="https://github.com/milharal-dev/detona-dev"
          target="_blank"
          rel="noreferrer"
          className="underline text-accent"
        >
          Milharal dos Devs
        </a>
      </p>
    </div>
  );
};

export default Footer;
