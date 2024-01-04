import { BrowserRouter, Route, Routes, } from 'react-router-dom';

import SportsEvent from '@Pages/SportsEvent';
import PageNotFound from '@Pages/PageNotFound';

const router = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SportsEvent />}></Route>
        <Route
          path="*"
          element={<PageNotFound />}
        />
      </Routes>
    </BrowserRouter >
  );
};

export default router;
