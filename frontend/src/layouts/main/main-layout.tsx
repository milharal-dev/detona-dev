import { FC } from 'react';
import MainLayoutProps from './main-layout.types';
import Header from '../components/header';
import Footer from '../components/footer';

const MainLayout: FC<MainLayoutProps> = ({ children }: MainLayoutProps) => {
  return (
    <body className="flex flex-col w-full items-center bg-background min-h-screen text-primary">
      <main className="relative max-w-screen-xs w-full flex min-h-screen flex-col gap-8 px-6 py-6">
        <Header />
        {children}
        <Footer />
      </main>
    </body>
  );
};

export default MainLayout;
