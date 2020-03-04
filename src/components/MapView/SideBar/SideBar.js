import React from 'react'

import StoreInfo from './StoreInfo'

// ---- M-UI imports ----
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
// ---- M-UI imports ----

// M-UI styles 
const useStyles = makeStyles(theme => ({
  sideBar: {
    position: 'absolute',
    top: '90px',
    left: '10px',
    width: '400px',
    height: '55%',
    zIndex: 999,

  }
}))

function SideBar (props) {
  // M-UI styles instance
  const classes = useStyles()

  return (
    <Grid container className={classes.sideBar}>
      <Paper>
        <StoreInfo storeInfo={props.storeInfo}/>
      </Paper>
    </Grid>
  )
}

export default SideBar