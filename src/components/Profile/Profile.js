//TODO: profile page
import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

// ---- material-ui imports ----
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
// -----------------------------

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '90vh',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '1024px',
    padding: '5%'
  },
  profile: {
    textAlign: 'center'
  },
  imageContainer: {
    margin: 'auto'
  },
  imageOuterContainer: {
    float: 'left',
    textAlign: 'center' 
  },
  button: {
    margin: theme.spacing(2)
  }
}))

function Profile (props) {
  // material-ui instance
  const classes = useStyles()
  // graphql query hook
  const { loading, error, data } = useQuery(GET_USER, { variables: { email: localStorage.getItem('email') }})
  
  if(loading) {
    return(
      <div className={classes.root}>
        <h1>Loading....</h1>
      </div>
    )
  }

  if(error){
    return(
      <div className={classes.root}>
        <h1>Something bad happend. Contact support.</h1>
      </div>
    )
  }
  
  return(
    <div className={classes.root}>
      <div className={classes.imageOuterContainer}>
        <div className={classes.imageContainer}>
          <img src={data.getUser.imageUrl ||'profile_basic.png'} alt='profile' height='auto' width='100%'/>
        </div>
        <Typography
          variant='h5'>
          {`${data.getUser.firstName || 'User' } ${data.getUser.lastName || ''}`}
        </Typography>
        <Button
          className={classes.button}
          variant='contained'
          href={'/edit_profile'}>
          Edit Profile
        </Button>
      </div>
    </div>
  )
}

export default Profile

const GET_USER = gql`
  query getUser($email: String!){
    getUser(email: $email){
      imageUrl
      firstName 
      lastName
      email
    }
  }
`