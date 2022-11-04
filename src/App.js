import React from 'react';
import MainPage from './exchange/mainpage';
import { BrowserRouter as Router , Routes, Route  } from 'react-router-dom';
import Chanege from './exchange/method1/change';
import Exchnage from './exchange/method2/exchange';
import './app.css';


function App() {
  return (
    <Router>
      <Routes>
          <Route path='/' element={<MainPage/>} />
          <Route  path='method1'  element={<Chanege/>}/>
          <Route  path='method2'  element={<Exchnage/>}/>

      </Routes>
    </Router>  

  );
}

export default App;
