import React from 'react'

// ---- M-UI imports
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
// ---- M-UI imports

import CoffeeMapsLogo from './CoffeeMapsLogo'

// M-UI styles
const useStyles = makeStyles(theme => ({
  headerRoot: {
    position: 'absolute',
    bottom: 'auto',
    left: '10px',
    top: '10px',
    width: '400px',
    zIndex: 1000
  },
  paper: {
    padding: '10px'
  },
  title: {
    textDecoration: 'none',
  },
  logo: {
    width: '40px',
    height: '40px'
  }
}))

function Title () {

  // M-UI styles instance
  const classes = useStyles()
  return (
    <Grid className={classes.headerRoot} >
      <Paper className={classes.paper}>
        <Typography 
          variant='h4'
          className={classes.title}
        >
          <CoffeeMapsLogo 
            className={classes.logo}
            viewBox={'0 0 21.664 21.665'}/>
          {` Coffee Maps`}
        </Typography>
      </Paper>
    </Grid>
  )
}

export default Title