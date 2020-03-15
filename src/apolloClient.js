import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'

const cache = new InMemoryCache()

// http://localhost:4000/graphql
// https://cmapi.matthewwcook.com/graphql
const httpLink = new HttpLink({
  uri: 'http://cmapi.matthewwcook.com/graphql',
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
})

const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink)
})

export default client