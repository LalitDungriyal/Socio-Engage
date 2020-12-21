import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <Route path="/">
        
      </Route>
    </BrowserRouter>
  );
}

export default App;
