import React from 'react';
import { BrowserRouter,Route } from 'react-router-dom';

/* JS Imports */
import LandingPage from './pages/landingPage';
import AddCode from './pages/addCodePage';

/* CSS Imports */
import './App.css';


const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path ="/" exact component={LandingPage} />
        <Route path ="/addCode" component={AddCode} /> 
      </BrowserRouter>
    </div>
  );
}

export default App;
