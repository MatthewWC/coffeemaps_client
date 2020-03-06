import React from 'react'

// ---- M-UI imports
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
// ---- M-UI imports

import CoffeeMapsLogo from './CoffeeMapsLogo'

// M-UI styles
const useStyles = makeStyles(theme => ({
  headerRoot: {
    maxHeight: '40px',
    marginLeft: '10px',
    margin: 'auto'
  },
  title: {
    textDecoration: 'none',
  },
  logo: {
    width: '30px',
    height: '30px'
  }
}))

function Title () {

  // M-UI styles instance
  const classes = useStyles()
  return (
    <Grid className={classes.headerRoot} >
        <Typography 
          variant='h5'
          className={classes.title}
        >
          <CoffeeMapsLogo 
            className={classes.logo}
            viewBox={'0 0 21.664 21.665'}/>
          {` Coffee Maps`}
        </Typography>
    </Grid>
  )
}

export default Title