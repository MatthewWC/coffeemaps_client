import React from 'react'

// ---- M-UI imports
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
// ---- M-UI imports

// M-UI styles
const useStyles = makeStyles(theme => ({
  storeInfoRoot: {
    padding: 10,
    maxHeight: '60%',
    justifyContent: 'center',
  },
  imageContainer: {
    margin: 'auto',
    width: '150px',
    height: '150px'
  },
  title: {
    textDecoration: 'underline',
    width: '100%',
    textAlign: 'center'
  }
}))

//TODO: add contribute to icon images 
function StoreInfo ({ storeInfo }) {
  // M-UI styles instance
  const classes = useStyles()
  console.log(storeInfo)

  if(storeInfo){
    return (
      <Grid container className={classes.storeInfoRoot}>
        <Avatar 
          className={classes.imageContainer} 
          src={storeInfo.imageUrl || ''} 
          alt='store'/>
        <Typography
          className={classes.title}
          variant='h4'>
          {storeInfo.storeName}
        </Typography>
        <Card
          raised={true}>
          <TableContainer>
            <Table>
              <TableHead>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    Address
                  </TableCell>
                  <TableCell>
                    {storeInfo.addressOne}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    Phone Number
                  </TableCell>
                  <TableCell>
                    {storeInfo.phoneNumber}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    Email
                  </TableCell>
                  <TableCell>
                    {storeInfo.email}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>
    )
  }
  else{
    //TODO: ellaborate 
    return(
      <div></div>
    )
  }
}

export default StoreInfo