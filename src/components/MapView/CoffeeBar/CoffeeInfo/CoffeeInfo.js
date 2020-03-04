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
  coffeeInfoRoot: {
    padding: 10,
    maxHeight: '60%',
    justifyContent: 'center'
  },
  coffeeRoot: {
    textAlign: 'center',
    margin: 10
  },
  imageContainer: {
    margin: 'auto',
    width: '150px',
    height: '150px'
  },
  title: {
    textDecoration: 'underline'
  }
}))

//TODO: add contribute to icon images 
function CoffeeInfo ({ coffeeInfo }) {
  // M-UI styles instance
  const classes = useStyles()
  console.log(coffeeInfo)

  if(coffeeInfo){
    return (
      <Grid container className={classes.coffeeInfoRoot}>
        <Typography
          variant='h4'>
          Store Coffees
        </Typography>
        {coffeeInfo.data.getCoffees.map(coffee => {
          return(
          <Grid className={classes.coffeeRoot}>
          <Avatar 
          className={classes.imageContainer} 
          src={coffee.imageUrl || ''} 
          alt='store'/>
          <Typography
            className={classes.title}>
            {coffee.coffeeName}
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
                    description
                  </TableCell>
                  <TableCell>
                    {coffee.description}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
        </Grid>
        )})}
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

export default CoffeeInfo