import React from 'react'
import gql from 'graphql-tag'

import Map from './Map'
import SideBar from './SideBar/SideBar'
import CoffeeBar from './CoffeeBar'
import ReportButton from './ReportButton'
//TODO: import user button

// ---- M-UI imports ----
import { makeStyles } from '@material-ui/core/styles'
// ---- M-UI imports ----

// M-UI styles
const useStyles = makeStyles(theme => ({
  mapViewRoot: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  }
}))

function MapView (props) {
  // M-UI styles instance
  const classes = useStyles()

  const [ storeInfo, setStoreInfo ] = React.useState(null)
  const [ coffeeInfo, setCoffeeInfo ] = React.useState(null)
  const [ visibility, setVisibility ] = React.useState(false)

  //store info function on marker click
  async function onStoreMarkerClicked(store){
    setStoreInfo(store)
    const coffees = await props.client.query({
      query: GET_COFFEES,
      variables: {
        storeId: store.id
      }
    })
    setCoffeeInfo(coffees)
    setVisibility(!visibility)
  }

  return (
    <div className={classes.mapViewRoot}>
      <Map 
        onStoreMarkerClicked={onStoreMarkerClicked} 
        client={props.client}/>
      { visibility ? <SideBar storeInfo={storeInfo}/> : null }
      { visibility ? <CoffeeBar coffeeInfo={coffeeInfo}/> : null }
      <ReportButton/>
    </div>
  )
}

export default MapView

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