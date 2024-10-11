import { useState } from 'react';
import './App.css';
import React from 'react';
import { Route, Routes, useRoutes} from 'react-router-dom';

import GetCounter from './Components/Counter/Counter';
import OfficeDesk from './Components/Counter/OfficeDesk';



function App(): JSX.Element {
  const [count, setCount] = useState<number>(0);

  return (
    <>
     
      <Routes>
          <Route path="/counter" element={ <GetCounter total_counter={9}/> }/> 
          <Route path="/counter/:number/:ticket_number?" element={ <OfficeDesk /> }/>
      </Routes>
    </>
    
  );
  
}

export default App;