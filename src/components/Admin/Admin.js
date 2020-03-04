import React from 'react'

import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(theme => ({
  adminRoot: {
    padding: 100
  },
  paper: {
    width: '100%'
  }
}))

function Admin (){
  // M-UI styles instance
  const classes = useStyles()
  return(
    <Grid container className={classes.adminRoot}>
      <Paper className={classes.paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Admin Panel
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Link href='/stores'>Stores</Link>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Grid>
  )
}

export default Admin