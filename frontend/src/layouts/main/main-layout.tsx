import { FC } from 'react';
import MainLayoutProps from './main-layout.types';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';

const MainLayout: FC<MainLayoutProps> = ({ children }: MainLayoutProps) => {
  return (
    <main>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default MainLayout;
