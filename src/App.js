import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Contact from './routes/Contact';

import Home from './routes/Home'
import Pricing from './routes/Pricing'
import Training from './routes/Training';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/HousingDashboard' element={<Pricing />} />
        <Route path='/TimeSeries' element={<Training />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
