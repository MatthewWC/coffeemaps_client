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
import Button from '@material-ui/core/Button'
// ---- M-UI imports ----

// M-UI styles
const useStyles = makeStyles(theme => ({
  storeListRoot: {
    marginTop: 5,
  },
  paper: {
   margin: 'auto',
   width: '75%',
  },
  typography: {
    textAlign: 'center'
  },
  card: {
    margin: 10,
    padding: 10,
  },
  button: {
    marginTop: 5,
    margin: 'auto',
    width: '25%'
  }
}))

function StoreList ({ client, props }) {
  // M-UI styles instance 
  const classes = useStyles()
  const { loading, error, data } = useQuery(GET_STORES)

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
    <Grid className={classes.storeListRoot} container justify='center' direction='column'>
      <Paper className={classes.paper}>
        <Typography className={classes.typography}>
          Current Stores
        </Typography>
        <Card className={classes.card}>
          <List>
            {data.getStores.map(store => {
              return(
                <Grid key={store.id}>
                  <ListItem button onClick={(event) => {
                      event.preventDefault()
                      props.history.push({
                        pathname: '/store',
                        state: { storeId: store.id }
                      })
                    }}
                  >
                  <ListItemAvatar>
                  <Avatar alt='coffee store' src={store.imageUrl}/>
                  </ListItemAvatar>
                  <ListItemText primary={store.storeName}/>
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
      </Paper>
      <Button
        className={classes.button}
        variant='contained'
        onClick={() => {
          props.history.push('/createStore')
        }}>
        Create Store
      </Button>
    </Grid>
  )
}

export default StoreList


const GET_STORES = gql`
  query getStores{
    getStores{
      storeName
      id
      imageUrl
    }
  }`