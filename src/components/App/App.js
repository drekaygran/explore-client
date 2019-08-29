import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'

import Places from '../Places/Places'
import Place from '../Places/Place'
import CreatePlace from '../Places/CreatePlace'
import EditPlace from '../Places/EditPlace'

import EditAddress from '../Addresses/EditAddress'
import CreateAddress from '../Addresses/CreateAddress'

import MyMap from '../Places/MyMap'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = ({ heading, message, variant }) => {
    this.setState({ alerts: [...this.state.alerts, { heading, message, variant }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AutoDismissAlert
            key={index}
            heading={alert.heading}
            variant={alert.variant}
            message={alert.message}
          />
        ))}
        <main className="container-fluid">
          <Route
            path='/sign-up'
            render={() => (
              <SignUp
                alert={this.alert}
                setUser={this.setUser}
              />
            )}
          />
          <Route
            path='/sign-in'
            render={() => (
              <SignIn
                alert={this.alert}
                setUser={this.setUser}
              />
            )}
          />
          <AuthenticatedRoute
            user={user}
            path='/sign-out'
            render={() => (
              <SignOut
                alert={this.alert}
                clearUser={this.clearUser}
                user={user}
              />
            )}
          />
          <AuthenticatedRoute
            user={user}
            path='/change-password'
            render={() => (
              <ChangePassword
                alert={this.alert}
                user={user}
              />
            )}
          />
          <AuthenticatedRoute
            user={user}
            exact path='/places'
            render={() => (
              <Places
                alert={this.alert}
                user={user}
              />
            )}
          />
          <AuthenticatedRoute
            user={user}
            exact path='/places/:id'
            render={() => (
              <Place
                user={user}
                alert={this.alert}
              />
            )}
          />
          <AuthenticatedRoute
            user={user}
            path='/create-place'
            render={() => (
              <CreatePlace
                user={user}
                alert={this.alert}
              />
            )}
          />
          <AuthenticatedRoute
            user={user}
            exact path='/places/:id/edit'
            render={() => (
              <EditPlace
                user={user}
                alert={this.alert}
              />
            )}
          />
          <AuthenticatedRoute
            user={user}
            exact path='/addresses/:id/edit'
            render={() => (
              <EditAddress
                user={user}
                alert={this.alert}
              />
            )}
          />
          <AuthenticatedRoute
            user={user}
            exact path='/places/:id/create-address'
            render={() => (
              <CreateAddress
                user={user}
                alert={this.alert}
              />
            )}
          />
          <Route
            exact path='/'
            render={() => (
              <div className="row">
                <div className="col-sm-11 col-md-6 mx-auto mt-5">
                  <h1>Hey, let&apos;s explore eastie!</h1>
                </div>
                <div className="col-sm-12 col-md-6" style={{ marginRight: '-30px' }}>
                  <MyMap
                    center={{
                      lat: 42.376612,
                      lng: -71.032973
                    }}
                    zoom={14}
                  />
                </div>
              </div>
            )}
          />
        </main>
      </Fragment>
    )
  }
}
// <AuthenticatedRoute
//   user={user}
//   exact path='/places/:id/destroy'
//   render={() => (
//     <DeletePlace
//       user={user}
//       alert={this.alert}
//     />
//   )}
// />

export default App
