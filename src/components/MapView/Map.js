import React, { useEffect } from 'react'
import gql from 'graphql-tag'
import L from 'leaflet'
import 'leaflet-routing-machine'

// ---- M-UI imports ----
import { makeStyles } from '@material-ui/core/styles'
// ---- M-UI imports ----

// M-UI styles
const useStyles = makeStyles(theme => ({
  map: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    overflow: 'hidden'
  }
}))

function Map ({ client, onStoreMarkerClicked }) {

  // M-UI styles instance
  const classes = useStyles()
  
  //ref
  const mapRef = React.createRef()
  
  useEffect(() => {
    async function initMap(){
      
      mapRef.current = L.map('map', {
        // map starting spot
        center: [10, 10],
        zoom: 12,
        zoomControl: false,
        layers: [
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            detectRetina: true,
            maxZoom: 19,
          })
        ]
      }, []) 
    }
    initMap()
    .then(async () => {
      const stores = await client.query({query: GET_STORES})
      stores.data.getStores.map(store => {
        return L.marker([store.latitude, store.longitude])
            .addTo(mapRef.current)
            .bindTooltip(store.storeName, { className: 'myCSSClass', permanent: true})
            .on('click', () => {
              mapRef.current.flyTo([store.latitude, store.longitude])
              onStoreMarkerClicked(store)
            })
      })
    })
    // annoying warning disabled, cant figure out any other workaround
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={classes.map} id='map'/>
  )
}

export default Map

const GET_STORES = gql`
  query getStores{
    getStores{
      id
      storeName
      latitude
      longitude
      addressOne
      phoneNumber
      email
      imageUrl
    }
  }`