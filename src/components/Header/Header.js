import React, { Component, Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { withRouter } from 'react-router-dom'

import { signIn } from '../../api/auth'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#places">Places</Nav.Link>
    <Nav.Link href="#create-place">Add a Place</Nav.Link>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

const guestOptions = (
  <Fragment>
    <Nav.Link href="#places">Places</Nav.Link>
    <Nav.Link href="#create-place">Add a Place</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

// const handleGuest = eventKey => {
// if (eventKey) {
//     <SignIn
//       setUser={{ email: 'guest@guest', password: 'guest' }}
//     />
//   }
// }

// const unauthenticatedOptions = (
//   <Fragment>
//     <Nav.Link href="#sign-up">Sign Up</Nav.Link>
//     <Nav.Link href="#sign-in">Sign In</Nav.Link>
//   </Fragment>
// )

// const alwaysOptions = (
//   <Fragment>
//   </Fragment>
// )

class Header extends Component {
  render () {
    const { user, history, setUser } = this.props
    const guestSignIn = (user, setUser) => {
      signIn({ email: 'guest@guest', password: 'guest' })
        .then(res => setUser(res.data.user))
        // .then(() => console.log(user.email))
        .then(() => history.push('/places'))
    }
    return (
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Navbar.Brand className="title" href="#">
        Explore Eastie
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
            { user && user.email !== 'guest@guest' ? authenticatedOptions : (!user ? <Fragment>
              <Nav.Link href="#sign-up">Sign Up</Nav.Link>
              <Nav.Link href="#sign-in">Sign In</Nav.Link>
              <Nav.Link onSelect={() => guestSignIn(user, setUser)} href="#places">Guest Sign In</Nav.Link></Fragment> : guestOptions) }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default withRouter(Header)
