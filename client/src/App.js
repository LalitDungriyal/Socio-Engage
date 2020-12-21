import React,{useEffect,createContext,useReducer,useContext} from 'react';
import "./App.css"
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './components/screens/Home'
import Signin from './components/screens/SignIn'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup'
function App() {
  return (
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/" >
            <Home />
          </Route>
          <Route path="/signin">
            <Signin />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
