import Home from '@/pages/home';
import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const AppRouter: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
