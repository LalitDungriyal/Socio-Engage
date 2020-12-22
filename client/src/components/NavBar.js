import React,{useContext,useRef,useEffect,useState} from 'react'
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../App'

const NavBar = ()=>{

    const {state, dispatch} = useContext(UserContext)
    const history = useHistory()
    
    const renderList = () => {
      if(state) {
        return  [
          <Link to="/" className="nav-link">Home</Link>,
          <Link to="/profile" className="nav-link">Profile</Link>,
          <Link to="/createpost" className="nav-link">Create Post</Link>,
          <Link to="/followingpost" className="nav-link">My Following Post</Link>,
          <Button 
            variant="primary" 
            onClick={() => {
              localStorage.clear()
              dispatch({type: "CLEAR"})
              history.push('/signin')
            }}
          >
              Log Out
          </Button>
        ]
      }
      else {
        return [
          <Link to="/signin" className="nav-link">Sign In</Link>,
          <Link to="/signup" className="nav-link">Sign Up</Link>
        ]
      }
    }

    return(
      <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {renderList()}
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
    )
}


export default NavBar