import React from 'react';
import MainPage from './exchange/mainpage';
import { BrowserRouter as Router , Routes, Route  } from 'react-router-dom';
import Method1 from './exchange/method1/change';
import Method2 from './exchange/method2/exchange';
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
          <Route path='/' element={<MainPage/>} />
          <Route  path='method1'  element={<Method1/>}/>
          <Route  path='method2'  element={<Method2/>}/>

      </Routes>
    </Router>  

  );
}

export default App;
