import { BrowserRouter, Route, Routes, } from 'react-router-dom';

import SportsEvent from '@Pages/SportsEvent';

const router = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SportsEvent />} />
      </Routes>
    </BrowserRouter >
  );
};

export default router;
