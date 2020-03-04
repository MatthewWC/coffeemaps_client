import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

// ---- M-UI imports ----
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
// ---- M-UI imports ----

import FormBuilder from '../../tools/FormBuilder'

// M-UI styles
const useStyles = makeStyles(theme => ({
  coffeesRoot: {
    position: 'absolute',
    top: '10px',
    right: '120px',
    maxWidth: '300px'
  },
  error: {
    
  },
  loading: {

  },
}))

function Coffees ({ props, storeId }) {

  const [ visibility, setVisibility ] = React.useState(false)
  // handle button
  function handleClick(event){
    event.preventDefault()
    setVisibility(!visibility)
  }


  // M-UI styles instance
  const classes = useStyles()
  console.log(storeId)
  const { loading, error, data } = useQuery(GET_COFFEES, { variables: { storeId: storeId }})
  if(loading){
    return(
      <Grid container justify='center'>
        <Typography
          className={classes.loading}>
            Loading, please wait.
        </Typography>
      </Grid>
    )
  }
  if(error){
    return(
      <Grid container justify='center'>
        <Typography
          className={classes.error}>
            Something bad happened. Contact support.
        </Typography>
      </Grid>
    )
  }

  return(
    <Grid className={classes.coffeesRoot}>
      <Paper className={classes.paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                This Stores Coffee List 
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {data.getCoffees.map(coffee => {
                return (
                  <TableRow
                    key={coffee.id}>
                    <TableCell
                     key={coffee.id}>
                      <Link 
                        key={coffee.id}
                        href={`/coffee/${coffee.id}`}>
                       {coffee.coffeeName}
                      </Link>
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
          { visibility ? 
          <FormBuilder 
            formName={'Create Coffee Form'}
            fields={{
              storeName: 'String',
              coffeeName: 'String',
              description: 'String'
            }}
            imageUpload={true}
            mutation={CREATE_COFFEE}
            props={props}
          /> : null }
        { visibility ? null :
        <Button
          variant='contained'
          className={classes.button}
          onClick={(event) => {
            handleClick(event)
          }}>
          Create Coffee
        </Button>}
      </Paper>
    </Grid>
  )
}

export default Coffees

const GET_COFFEES = gql`
  query getCoffees($storeId: String!){
    getCoffees(storeId: $storeId){
      id
      storeId
      coffeeName
      imageUrl
      description
    }
  }`

  const CREATE_COFFEE = gql`
  mutation createCoffee(
    $storeName: String!,
    $coffeeName: String!,
    $imageUrl: String!,
    $description: String!
  ){
    createCoffee(
      storeName: $storeName,
      coffeeName: $coffeeName,
      imageUrl: $imageUrl,
      description: $description
    ){
      coffeeName
      description
    }
  }`