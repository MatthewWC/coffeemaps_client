import React from 'react'

// ---- M-UI imports ----
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
// ---- M-UI imports ----

// M-UI styles
const useStyles = makeStyles(theme => ({
  buttonRoot: {
    zIndex: 999,
    position: 'absolute',
    right: 5,
    bottom: 20
  },
  button: {

  }
}))

function ReportButton () {
  // M-UI styles instance
  const classes = useStyles()

  return(
    <div className={classes.buttonRoot}>
      <Button 
        className={classes.button} 
        variant='contained'
        href='mailto:coffeemapsapp@gmail.com'>
          Report A Problem
      </Button>
    </div>
  )
}

export default ReportButton