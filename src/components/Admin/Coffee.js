import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

// --- M-UI imports ----
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
// --- M-UI imports ----

import FormBuilder from '../../tools/FormBuilder'

// M-UI styles
const useStyles = makeStyles(theme => ({
  error: {
    
  },
  loading: {

  }
}))

function Coffee(props) {
  // M-UI styles instance
  const classes = useStyles()

  // dirty way of getting the store id by itself
  const breakPoint = '/'
  const index = props.history.location.pathname.lastIndexOf(breakPoint)
  const coffeeId = props.history.location.pathname.slice(index + 1)

  const { loading, error, data } = useQuery(GET_COFFEE, { variables: { id: coffeeId }})
  
  async function handleClick(event) {
    event.preventDefault()
    await props.client.mutate({
      mutation: DELETE_COFFEE,
      variables: {
        id: coffeeId
      }
    })
    props.history.push('/stores')
  }

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
    <Grid container justify='center'>
      <FormBuilder
            formName={'Update Coffee Form'}
            fields={{
              coffeeName: 'String',
              description: 'String',
            }}
            imageUpload={true}
            mutation={UPDATE_COFFEE}
            props={props}
            defaultFields={data.getCoffee}
            />
      <Button
        variant='contained'
        onClick={(event) => {
          handleClick(event)
        }}
      >
        DELETE
      </Button>
    </Grid>
  )
}

export default Coffee

const GET_COFFEE = gql`
  query getCoffee($id: String!){
    getCoffee(id: $id){
      id
      storeId
      coffeeName
      imageUrl
      description
    }
  }`

const UPDATE_COFFEE = gql`
  mutation updateCoffee(
    $coffeeName: String!,
    $imageUrl: String,
    $description: String
  ){
    updateCoffee(
      coffeeName: $coffeeName,
      imageUrl: $imageUrl,
      description: $description
    ){
      coffeeName
      imageUrl
      description
    }
  }`

  const DELETE_COFFEE = gql`
    mutation deleteCoffee(
      $id: String!,
    ){
      deleteCoffee(
        id: $id
      ){
        coffeeName
        imageUrl
        description
      }
    }`