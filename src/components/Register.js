import React from 'react'
import gql from 'graphql-tag'

import validator from '../tools/validator'

// ---- M-UI imports ----
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import { Typography } from '@material-ui/core'
import FormHelperText from '@material-ui/core/FormHelperText'
// ---- M-UI imports ----

// M-UI styles
const useStyles = makeStyles(theme => ({
  registerRoot: {
    flexDirection: 'column'
  },
  paper: {
    minWidth: '300px',
    display: 'flex',
    flexDirection: 'column',
    margin: 10,
    padding: 20,
  },
  title: {
    marginBottom: 20,
    margin: 'auto'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '300px' // set height for proper spacing
  },
  textField: {
    
  },
  errors: {

  },
  button: {
    backgroundColor: '#B36D17'
  }
}))

function Register (props) {

  // M-UI styles instance
  const classes = useStyles()

  //refs
  const errorRef = React.createRef()
  const formRef = React.createRef()

  async function handleSubmit(event) {
    event.preventDefault()
    // reset error text
    errorRef.current.innerHTML = ''
    let variables = {}

    try{
      validator(formRef.current)
      // INSERT MUTATION LOGIC
      Object.keys(formRef.current).map(field => {
        console.log(formRef.current[field].name)
        switch(formRef.current[field].type){
          case 'text':
            return variables[formRef.current[field].name] = formRef.current[field].value
          case 'password':
            return variables[formRef.current[field].name] = formRef.current[field].value
          case 'number': 
            return variables[formRef.current[field].name] = parseFloat(formRef.current[field].value)
          default:
            return null
        }
      })
      await props.client.mutate({
        mutation: REGISTER,
        variables: variables
      })
      window.setTimeout(() => props.history.push('/'), 3000)
    }
    catch(error){
      let errMsg
      // handle unsuccessful response
      errMsg = error.toString().lastIndexOf(':') + 1
      errorRef.current.innerHTML = error.toString().substring(errMsg, 75)
    }
  }

  return(
    <Grid
      container
      justify='center'>
      <Paper
        className={classes.paper}>
        <Typography
          className={classes.title}>
          Register
        </Typography>
        <form
          name='Register Form'
          className={classes.form}
          ref={formRef}>
          <TextField
            key='email'
            className={classes.textField}
            name='email'
            label='Email'
            variant='outlined'
            InputLabelProps={{
              shrink: true,
            }}
            type='text'
          /> 
          <TextField
            key='password'
            className={classes.textField}
            name='password'
            label='Password'
            variant='outlined'
            InputLabelProps={{
              shrink: true,
            }}
            type='password'
          /> 
          <TextField
            key='confirmPassword'
            className={classes.textField}
            name='confirmPassword'
            label='Confirm Password'
            variant='outlined'
            InputLabelProps={{
              shrink: true,
            }}
            type='password'
          />
          <FormHelperText
            className={classes.errors}
            ref={errorRef}
            error={true}
          >
          </FormHelperText>
          <Button
            onClick={(event) => {
              handleSubmit(event)
            }}
            className={classes.button}
            variant='contained'>
              Register
          </Button>
        </form>
      </Paper>
    </Grid>
  )
}

export default Register

const REGISTER = gql`
  mutation register($email: String!, $password: String!){
    register(email: $email, password: $password){
      email
    }
  }`