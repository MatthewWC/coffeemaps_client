import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

// ---- M-UI imports ----
import Link from '@material-ui/core/Link'
import Table from '@material-ui/core/Table'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
// ---- M-UI imports ----

import FormBuilder from '../../tools/FormBuilder'

// M-UI styles
const useStyles = makeStyles(theme => ({
  storesRoot: {
    padding: 100
  },
  paper: {
    width: '100%'
  },
  button: {
    marginTop: 10,
  }
}))

function Stores (props) {
  // M-UI styles instance
  const classes = useStyles()

  const [ visibility, setVisibility ] = React.useState(false)
  // handle button
  function handleClick(event){
    event.preventDefault()
    setVisibility(!visibility)
  }

  // graphql query
  const { loading, error, data } = useQuery(GET_STORES)

  if(loading) {
    return(
      <div>
        <h1>Loading....</h1>
      </div>
    )
  }

  if(error){
    return(
      <div>
        <h1>Something bad happend. Contact support.</h1>
      </div>
    )
  }

  return(
    <Grid container className={classes.storesRoot}>
      <Paper className={classes.paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Coffee Shops
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {data.getStores.map(store => {
                return (
                  <TableRow
                    key={store.id}>
                    <TableCell
                     key={store.id}>
                      <Link 
                        key={store.id}
                        href={`/store/${store.id}`}>
                       {store.storeName}
                      </Link>
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </Paper>
      { visibility ? 
        <FormBuilder 
          formName={'Create Store Form'}
          fields={{
            storeName: 'String',
            latitude: 'Float',
            longitude: 'Float',
            addressOne: 'String',
            phoneNumber: 'String',
            email: 'String'
          }}
          imageUpload={true}
          mutation={CREATE_STORE}
          props={props}
        /> : null }
      { visibility ? null :
      <Button
        variant='contained'
        className={classes.button}
        onClick={(event) => {
          handleClick(event)
        }}>
        Create Store
      </Button>}
    </Grid>
  )
}

export default Stores

const GET_STORES = gql`
  query getStores{
    getStores{
      storeName
      id
    }
  }`

const CREATE_STORE = gql`
  mutation createStore($storeName: String!, $latitude: Float!, $longitude: Float!,
    $addressOne: String!, $phoneNumber: String!, $email: String!, $imageUrl: String!){
      createStore(storeName: $storeName, latitude: $latitude, longitude: $longitude,
        addressOne: $addressOne, phoneNumber: $phoneNumber, email: $email, imageUrl: $imageUrl){
          storeName
        }
    }`