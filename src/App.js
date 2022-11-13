import React, { memo } from "react";
import { Routes, Route} from 'react-router-dom';

import MenuLink from './components/MenuLink';
import ImageSearch from "./pages/ImageSearch";

const App = memo(() => {
  return (
    <div>
      <h1>13-redux</h1>
      <nav>
        <MenuLink to='/imagesearch'>ImageSearch</MenuLink>
      </nav>
      <hr />
      <Routes>
        <Route path='imagesearch' element={<ImageSearch/>}></Route>
      </Routes>
    </div>
  );
});
  
export default App;
