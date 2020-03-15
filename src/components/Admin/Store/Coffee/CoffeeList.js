import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

// ---- M-UI imports ----
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
// ---- M-UI imports ----

import CreateCoffeeButton from './CreateCoffeeButton'

// M-UI styles
const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    left: 5,
    top: 55,
    width: '25%'
  },
  typography: {
    textAlign: 'center'
  },
  card: {
    margin: 10,
    padding: 10,
  }
}))

function CoffeeList ({ props, storeId, storeName }) {
  // M-UI styles instance 
  const classes = useStyles()
  const { loading, error, data } = useQuery(GET_COFFEE, { variables: { storeId: storeId }})

  if(loading){
    return(
      <h1>loading</h1>
    )
  }

  if(error){
    return(
      <h1>error</h1>
    )
  }

  return(
    <Paper className={classes.paper}>
      <Typography className={classes.typography}>
        Current Coffees
      </Typography>
      <Card className={classes.card}>
        <List>
          {data.getCoffees.map(coffee => {
            return(
              <Grid key={coffee.id}>
                <ListItem button onClick={(event) => {
                    event.preventDefault()
                    props.history.push({
                      pathname: '/coffee',
                      state: { coffeeId: coffee.id }
                    })
                  }}
                >
                <ListItemAvatar>
                <Avatar alt='coffee store' src={coffee.imageUrl}/>
                </ListItemAvatar>
                <ListItemText primary={coffee.coffeeName}/>
                </ListItem> 
                {
                  // render delete store button?
                }
                <Divider variant="inset" component="li"/>
              </Grid>
            )
          })}
        </List>
      </Card>
      <CreateCoffeeButton props={props} storeName={storeName}/>
    </Paper>
  )
}

export default CoffeeList


const GET_COFFEE = gql`
  query getCoffees($storeId: String!){
    getCoffees(storeId: $storeId){
      id
      coffeeName
      imageUrl
    }
  }`