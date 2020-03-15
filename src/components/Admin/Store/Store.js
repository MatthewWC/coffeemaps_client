import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

// ---- M-UI imports ----
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
// ---- M-UI imports ----

import StoreImage from './StoreImage'
import StoreUpdateForm from './StoreUpdateForm'
import StoreTitle from './StoreTitle'
import CoffeeList from './Coffee/CoffeeList'

const useStyles = makeStyles(theme => ({
  storeRoot: {
    flexGrow: 1,
    overflowX: 'hidden'
  },
}))

function Store (props) {
  // M-UI styles instance
  const classes = useStyles()

  const { loading, error, data } = useQuery(GET_STORE, { variables: { id: props.location.state.storeId }})
  const [ imageFile, setImageFile ] = React.useState(null)
  // onSubmit here, handle aws, pass imageurl to update form, update store, redirect
  if(loading){
    return(
      <h1>Loading</h1>
    )
  }

  if(error){
    return(
      <h1>Error</h1>
    )
  }

  async function passUpImage(imageFile){
    setImageFile(imageFile)
  }

  return(
    <div className={classes.storeRoot}>
      <Grid container alignItems='center' direction='column' spacing={1}>
        <Grid item sm={12}>
          <StoreImage imageUrl={data.getStore.imageUrl} passUpImage={passUpImage} />
        </Grid>
        <Grid item sm={12}>
          <StoreTitle storeTitle={data.getStore.storeName}/>
        </Grid>
        <Grid item sm={5}>
          <StoreUpdateForm imageFile={imageFile} storeInfo={data.getStore} props={props} />
        </Grid>
      </Grid>
      <CoffeeList props={props} storeId={props.location.state.storeId} storeName={data.getStore.storeName} />
    </div>
  )
}

export default Store

const GET_STORE = gql`
  query getStore($id: String!){
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