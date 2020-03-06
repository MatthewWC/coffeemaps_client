import React from 'react'

// ---- M-UI imports ----
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
// ---- M-UI imports ----

import Title from './Title'
import UserPanel from './UserPanel'

// M-UI styles
const useStyles = makeStyles(theme => ({
  headerRoot: {
    height: '7%',
    minHeight: '7%',
    backgroundColor: '#B36D17'
  }
}))

function Header () {

  // M-UI styles instance
  const classes = useStyles()

  return(
    <Grid 
      className={classes.headerRoot}
      container 
      justify='space-between'
    >
      <Title/>
      <UserPanel/>
    </Grid>
  )
}

export default Header