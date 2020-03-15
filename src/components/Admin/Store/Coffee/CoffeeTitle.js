import React from 'react'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  paper: {
    margin: 'auto',
    padding: 5,
    minWidth: '245px',
    maxWidth: '245px'
  }
}))

function CoffeeTitle({ storeTitle }){
  const classes = useStyles()
  return(
    <Paper className={classes.paper}>
      <Typography noWrap variant='h4'>
        { storeTitle }
      </Typography>
    </Paper>
  )
}

export default CoffeeTitle