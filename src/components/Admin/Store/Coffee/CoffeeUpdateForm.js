import React from 'react'
import gql from 'graphql-tag'
import axios from 'axios'

// ---- M-UI imports ----
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Button from '@material-ui/core/Button'
import FormHelperText from '@material-ui/core/FormHelperText'
import Typography from '@material-ui/core/Typography'
// ---- M-UI imports ----

import validator from '../../../../tools/validator'

// M-UI styles
const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10
  },
  title: {
    marginBottom: 5,
    margin: 'auto',
    textDecoration: 'underline'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
   // set height for proper spacing
  },
  textField: { 
  },
  errors: {
    margin: theme.spacing(2)
  },  
  button: {
  }
}))

function CoffeeUpdateForm ({ imageFile, coffeeInfo, props}) { 

  // M-UI styles instance 
  const classes = useStyles()

  // refs
  const formRef = React.createRef()
  const errorRef = React.createRef()

  async function handleSubmit(event){
    event.preventDefault()
    // reset error text
    errorRef.current.innerHTML = ''
    let variables = {}
    variables.storeName = coffeeInfo.storeName
    if(imageFile.current.files[0]){
      // instantiate new form data
      const data = new FormData()
      // build header before sending to server
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      // append the file to form data
      data.append('file', imageFile.current.files[0])
      // attempt to send file to backend, and AWS S3 bucket
      let imageUrl = await axios.post(
        'https://cmapi.matthewwcook.com/upload', 
        data, 
        config)
      
      variables.imageUrl = imageUrl.data
    }

    try{
      validator(formRef.current)
      // INSERT MUTATION LOGIC
      Object.keys(formRef.current).map(field => {
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
        mutation: UPDATE_COFFEE,
        variables: variables
      })
      props.history.push('/admin')
    }
    catch(error){
      let errMsg
      // handle unsuccessful response
      errMsg = error.toString().lastIndexOf(':') + 1
      errorRef.current.innerHTML = error.toString().substring(errMsg, 75)
    }
  }
  
  return( 
    <Paper className={classes.paper}>
      <Typography variant='h4' className={classes.title}>
        Update Coffee Form
      </Typography>
      <form
        ref={formRef}
        name='Update Coffee Form'
        className={classes.form}>
        <Card className={classes.card}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell> Coffee Name: </TableCell>
                <TableCell>
                  <TextField
                    key='coffeeName'
                    className={classes.textField}
                    name='coffeeName'
                    variant='outlined'
                    type='text'
                    defaultValue={coffeeInfo.coffeeName}
                  /> 
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell> Description: </TableCell>
                <TableCell>
                  <TextField
                    key='description'
                    className={classes.textField}
                    name='description'
                    variant='outlined'
                    type='text'
                    defaultValue={coffeeInfo.description}
                  /> 
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      <FormHelperText
        className={classes.errors}
        ref={errorRef}
        error={true}>
      </FormHelperText>
      <Button
        className={classes.button}
        variant='contained'
        onClick={(event) => {
          handleSubmit(event)
        }}>
        Update Store
      </Button>
    </form>
  </Paper>
  )
}

export default CoffeeUpdateForm

const UPDATE_COFFEE = gql`
  mutation updateCoffee($coffeeName: String!, $imageUrl: String!, $description: String!){
    updateCoffee(coffeeName: $coffeeName, imageUrl: $imageUrl, description: $description){
      coffeeName
      imageUrl
      description
    }
  }`