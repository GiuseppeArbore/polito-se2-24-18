import { useState } from 'react';
import React from 'react';
import { Route, Routes, useRoutes} from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import GetServices from './Components/Customer/Service/Services';

function App(): JSX.Element {
  const [count, setCount] = useState<number>(0);

  return (
    <>
     
      <Routes>
          <Route path="/" element={ <GetServices/> }/>
        
      </Routes>
    </>
    
  );
  
}

export default App;
