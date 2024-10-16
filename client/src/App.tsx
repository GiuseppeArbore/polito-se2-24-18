import { useState } from 'react';
import './App.css';

import GetServices from './Components/Customer/Service/Services';
import { Route, Routes, useRoutes} from 'react-router-dom';

import GetCounter from './Components/Counter/Counter';
import OfficeDesk from './Components/Counter/OfficeDesk';
import React from 'react';
import GetTicket from './Components/Client/Ticket';
import HomePage from './Components/Homepage/HomePage';



function App(): JSX.Element {
  const [count, setCount] = useState<number>(0);

  return (
    <>
     
      <Routes>
          <Route path="/" element={ <HomePage /> }/> 
          <Route path="/services" element={ <GetServices /> }/>
          <Route path="/counter" element={ <GetCounter total_counter={9}/> }/> 
          <Route path="/counter/:number/:ticket_number?" element={ <OfficeDesk /> }/>   
          <Route path='/ticket/:service_type/:ticket_number' element={ <GetTicket /> } />
      </Routes>
    </>
    
  );
  
}

export default App;