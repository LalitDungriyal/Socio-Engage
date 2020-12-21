import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import CreatePost from './Components/screens/CreatePost';
import Home from './Components/screens/Home';
import Profile from './Components/screens/Profile';
import SignIn from './Components/screens/SignIn';
import SignUp from './Components/screens/SignUp';

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signin">
        <SignIn />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/createpost">
        <CreatePost />
      </Route>
    </BrowserRouter>
  );
}

export default App;
