import { useState } from 'react';
import './App.css';
import React from 'react';
import { Route, Routes, useRoutes} from 'react-router-dom';

import GetCounter from './Components/Counter/Counter';
import GetTicket from './Components/Client/Ticket';



function App(): JSX.Element {
  const [count, setCount] = useState<number>(0);

  return (
    <>
     
      <Routes>
          <Route path="/counter" element={ <GetCounter total_counter={9}/> }/> 
        
          <Route path='/ticket/:ticket_number' element={ <GetTicket /> } />
      </Routes>
    </>
    
  );
  
}

export default App;