import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Singup from './Singup';
import Login from './Login';
import Home from './Home';

const App = () => {
  return (
    <div>
      <Router> {/* Corrected the typo here */}
        <Routes>
          <Route path='/register' element={<Singup/>}/>
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

