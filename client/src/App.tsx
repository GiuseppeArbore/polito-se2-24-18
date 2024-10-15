import { useState } from 'react';
import './App.css';

import GetServices from './Components/Customer/Service/Services';
import { Route, Routes, useRoutes} from 'react-router-dom';

import GetCounter from './Components/Counter/Counter';
import React from 'react';



function App(): JSX.Element {
  const [count, setCount] = useState<number>(0);

  return (
    <>
     
      <Routes>
          <Route path="/" element={ <GetServices /> }/> 
          <Route path="/counter" element={ <GetCounter total_counter={9}/> }/> 
        
      </Routes>
    </>
    
  );
  
}

export default App;