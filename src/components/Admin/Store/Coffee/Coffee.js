import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

// ---- M-UI imports ----
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
// ---- M-UI imports ----

import CoffeeImage from './CoffeeImage'
import CoffeeUpdateForm from './CoffeeUpdateForm'
import CoffeeTitle from './CoffeeTitle'

const useStyles = makeStyles(theme => ({
  storeRoot: {
    flexGrow: 1,
    overflowX: 'hidden'
  },
}))

function Coffee (props) {

  // M-UI styles instance
  const classes = useStyles()

  const { loading, error, data } = useQuery(GET_COFFEE, { variables: { id: props.location.state.coffeeId }})
  const [ imageFile, setImageFile ] = React.useState(null)

  // could just render already built view components for loading, or error.
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

  return (
    <div className={classes.storeRoot}>
      <Grid container alignItems='center' direction='column' spacing={1}>
        <Grid item sm={12}>
          <CoffeeImage imageUrl={data.getCoffee.imageUrl} passUpImage={passUpImage} />
        </Grid>
        <Grid item sm={12}>
          <CoffeeTitle storeTitle={data.getCoffee.coffeeName}/>
        </Grid>
        <Grid item sm={5}>
          <CoffeeUpdateForm imageFile={imageFile} coffeeInfo={data.getCoffee} props={props} />
        </Grid>
      </Grid>
    </div>
  )
}

export default Coffee

const GET_COFFEE = gql`
  query getCoffee($id: String!){
    getCoffee(id: $id){
      coffeeName
      imageUrl
      description
    }
  }`