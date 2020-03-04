import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

// --- M-UI imports ----
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
// --- M-UI imports ----

import FormBuilder from '../../tools/FormBuilder'
import Coffees from './Coffees'

// M-UI styles
const useStyles = makeStyles(theme => ({
  storeRoot: {
    
  }
}))

function Store(props) {
  
  // M-UI styles instance
  const classes = useStyles()

  // dirty way of getting the store id by itself
  const breakPoint = '/'
  const index = props.history.location.pathname.lastIndexOf(breakPoint)
  const storeId = props.history.location.pathname.slice(index + 1)

  const { loading, error, data } = useQuery(GET_STORE, { variables: { id: storeId }})

  async function handleClick(event){
    event.preventDefault()
    await props.client.mutate({
      mutation: DELETE_STORE,
      variables: {
        id: storeId
      }
    })
    props.history.push('/stores')
  }

  if(loading){
    return(
      <Grid container justify='center'>
        <Typography
          className={classes.storeRoot}>
            Loading, please wait.
        </Typography>
      </Grid>
    )
  }
  if(error){
    return(
      <Grid container justify='center'>
        <Typography
          className={classes.storeRoot}>
            Something bad happened. Contact support.
        </Typography>
      </Grid>
    )
  }

  return(
    <Grid container justify='center' className={classes.storeRoot}>
      <FormBuilder
            formName={'Update Store Form'}
            fields={{
              storeName: 'String',
              latitude: 'Float',
              longitude: 'Float',
              addressOne: 'String',
              phoneNumber: 'String',
              email: 'String'
            }}
            imageUpload={true}
            mutation={UPDATE_STORE}
            props={props}
            defaultFields={data.getStore}
            />
            <Button
        variant='contained'
        onClick={(event) => {
          handleClick(event)
        }}
      >
        DELETE
      </Button>
      <Coffees props={props} storeId={storeId} />
    </Grid>
  )
}

export default Store

const GET_STORE = gql`
  query getStore($id: String){
    getStore(id: $id){
      storeName
      latitude
      longitude
      addressOne
      phoneNumber
      email
      imageUrl
    }
  }`

const UPDATE_STORE = gql`
  mutation updateStore(
    $storeName: String!,
    $latitude: Float,
    $longitude: Float,
    $addressOne: String,
    $phoneNumber: String,
    $email: String,
    $imageUrl: String
  ){
    updateStore(
      storeName: $storeName,
      latitude: $latitude,
      longitude: $longitude,
      addressOne: $addressOne,
      phoneNumber: $phoneNumber,
      email: $email,
      imageUrl: $imageUrl
    ){
      storeName
      latitude
      longitude
      addressOne
      phoneNumber
      email
      imageUrl
    }
  }`

const DELETE_STORE = gql`
  mutation deleteStore(
    $id: String!
  ){
    deleteStore(
      id: $id
    ){
      storeName
    }
  }`