import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import React from 'react';
import { Route, Routes, useRoutes} from 'react-router-dom';

import GetCounter from './Components/Counter/Counter';



function App(): JSX.Element {
  const [count, setCount] = useState<number>(0);

  return (
    <>
     
      <Routes>
          <Route path="/counter" element={ <GetCounter total_counter={9}/> }/> 
        
      </Routes>
    </>
    
  );
  
}

export default App;