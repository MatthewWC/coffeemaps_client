import { Route, Switch, BrowserRouter, Redirect} from 'react-router-dom'
import React from 'react'
import { ApolloProvider } from 'react-apollo'

import client from '../apolloClient.js'
import Login from './Login'
import Register from './Register'
import Profile from './Profile'
import EditProfile from './Profile/EditProfile'
import MapView from './MapView'
import Admin from './Admin/Admin'
import Stores from './Admin/Stores'
import Store from './Admin/Store'
import Coffee from './Admin/Coffee'

import Header from './Header/Header'

function App() {

  return(
    <ApolloProvider client={client}>
      <BrowserRouter>
          <Header/> 
        <Switch>
          <Route 
            exact path='/'
            render={props => <MapView {...props} client={client}/>}
          />
          <Route 
            exact path='/register'
            render={props=> localStorage.getItem('token') ? 
             (<Redirect to={{ pathname: '/'}}/>) : (<Register {...props} client={client}/>)}
          />
          <Route 
            exact path='/login' 
            render={props => localStorage.getItem('token') ? 
             (<Redirect to={{ pathname: '/'}}/>) : (<Login {...props} client={client}/>)}
          />
          <Route 
            exact path='/profile'
            render={props => localStorage.getItem('token') ?
             <Profile {...props} client={client}/> :
             <Redirect to={{ pathname: '/login'}}/> }
          />
          <Route
            exact path='/edit_profile'
            render={props => localStorage.getItem('token') ?
             <EditProfile {...props} client={client}/> :
             <Redirect to={{ pathname: '/login'}}/>}
          />
          <ProtectedAdminRoute>
            <Route
              exact path='/admin'
              render={props => <Admin {...props} client={client}/>}
            />
            <Route
              exact path='/stores'
              render={props => <Stores {...props} client={client}/>}
            />
            <Route 
              path='/store'
              render={props => <Store {...props} client={client}/>}
            />
            <Route
              path='/coffee'
              render={props => <Coffee {...props} client={client}/>}
            />
          </ProtectedAdminRoute>
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  )
}

function ProtectedAdminRoute({
  children,
  ...props
}){
  return(
    <Route render={props => {
      return(
        localStorage.getItem('role') === 'ADMIN' ? (children) : (<Redirect to={{ pathname: '/'}}/>)
      )
    }}/>
  )
}

export default App