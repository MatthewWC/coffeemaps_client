import { Route, Switch, BrowserRouter, Redirect} from 'react-router-dom'
import React from 'react'
import { ApolloProvider } from 'react-apollo'

import client from '../apolloClient.js'
import Login from './Login'
import Register from './Register'
import Profile from './Profile'
import EditProfile from './Profile/EditProfile'
import MapView from './MapView'
import AdminPanel from './Admin/AdminPanel/AdminPanel'
import Coffee from './Admin/Store/Coffee/Coffee'
import Store from './Admin/Store/Store'
import Header from './Header/Header'
import CreateStoreForm from './Admin/Store/CreateStoreForm'
import CreateCoffeeForm from './Admin/Store/Coffee/CreateCoffeeForm'

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
              render={props => <AdminPanel {...props} client={client}/>}
            />
            <Route 
              path='/store'
              render={props => <Store {...props} client={client}/>}
            />
            <Route
              exact path='/createStore'
              render={props => <CreateStoreForm {...props} client={client}/>}
            />
            <Route
              exact path='/createCoffee'
              render={props => <CreateCoffeeForm {...props} client={client}/>}
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