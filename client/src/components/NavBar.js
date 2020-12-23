import React,{useContext,useRef,useEffect,useState} from 'react'
import { Container, Form, FormControl, Nav, Navbar } from 'react-bootstrap'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InboxIcon from '@material-ui/icons/Inbox';
import ExploreIcon from '@material-ui/icons/Explore';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PostAddIcon from '@material-ui/icons/PostAdd';

const NavBar = ()=>{

    const {state, dispatch} = useContext(UserContext)
    const history = useHistory()
    
    const renderNav = () => {
      if(state) {
        return  (
          <>
            <Nav className="mr-auto">
              <Link to="/" className="nav-link">
                <Button
                  size="large"
                  startIcon={<ExploreIcon/>}
                >
                  Explore
                </Button>
              </Link>

              <Link to="/followingpost" className="nav-link">
                <Button
                  size="large"
                  startIcon={<InboxIcon/>}
                >
                  Feed
                </Button>
              </Link>

              <Link to="/createpost" className="nav-link">
                <Button
                  size="large"
                  startIcon={<PostAddIcon/>}
                >
                  Post
                </Button>
              </Link>
            </Nav>
            <Nav>
              <Link to="/profile" className="nav-link">
                <Button
                  size="large"
                  endIcon={<AccountCircleIcon/>}
                >
                  Profile
                </Button>
              </Link>
              <Button 
                variant="contained" 
                color="primary"
                size="small"
                endIcon={<ExitToAppIcon/>}
                onClick={() => {
                  localStorage.clear()
                  dispatch({type: "CLEAR"})
                  history.push('/signin')
                }}
              >
                Logout
              </Button>
            </Nav>
          </>
        )
      }
      else {
        return (
          <Nav className="ml-auto">
            <Link to="/signin" className="nav-link">
              <Button
                size="large"
              >
                Sign In
              </Button>
            </Link>
            <Link to="/signup" className="nav-link">
              <Button
                size="large"
              >
                Sign Up
              </Button>
            </Link>
          </Nav>
        )
      }
    }

    return(
      <Navbar fixed="top" bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Socio Connect</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {renderNav()}
          </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}


export default NavBar