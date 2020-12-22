import React,{useEffect,createContext,useReducer,useContext} from 'react';
import "./App.css"
import {BrowserRouter,Route,Switch, useHistory} from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './components/screens/Home'
import Signin from './components/screens/SignIn'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup'
import CreatePost from './components/screens/CreatePost';
import {initialState, reducer} from './Reducers/userReducer'

export const UserContext = createContext()

const Routing = () => {
  const history = useHistory()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    const {state, dispatch} = useContext(UserContext)

    if(user) {
      dispatch({type: "USER", payload: user})
      history.push("/")
    }
    else {
      history.push("/signin")
    }

  }, [])

  return (
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
        <Route path="/createpost">
          <CreatePost/>
        </Route>
      </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
