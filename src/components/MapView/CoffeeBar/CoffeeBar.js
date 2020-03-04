import React from 'react'

// ---- M-UI imports ----
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
// ---- M-UI imports ----

import CoffeeInfo from './CoffeeInfo'

// M-UI styles 
const useStyles = makeStyles(theme => ({
  coffeeBar: {
    position: 'absolute',
    top: '90px',
    right: '10px',
    width: '400px',
    maxHeight: '60%',
    overflowY: 'scroll',
    zIndex: 999,

  }
}))

function CoffeeBar (props) {
  // M-UI styles instance
  const classes = useStyles()
  return(
    <Grid container className={classes.coffeeBar}>
      <Paper>
        <CoffeeInfo coffeeInfo={props.coffeeInfo}/>
      </Paper>
    </Grid>
  )
}

export default CoffeeBar