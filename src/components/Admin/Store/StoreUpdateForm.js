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

import validator from '../../../tools/validator'

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

function StoreUpdateForm ({ imageFile, storeInfo, props}) { 

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
    variables.storeName = storeInfo.storeName
    if(imageFile){
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
        mutation: UPDATE_STORE,
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
        Update Store Form
      </Typography>
      <form
        ref={formRef}
        name='Update Store Form'
        className={classes.form}>
        <Card className={classes.card}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell> Latitude: </TableCell>
                <TableCell>
                  <TextField
                    key='latitude'
                    className={classes.textField}
                    name='latitude'
                    variant='outlined'
                    defaultValue={storeInfo.latitude}
                    inputProps={{ step: 'any' }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    type='number'
                    step='any'
                  />
                </TableCell>
                <TableCell> Longitude: </TableCell>
                <TableCell>
                  <TextField
                    key='longitude'
                    className={classes.textField}
                    name='longitude'
                    variant='outlined'
                    defaultValue={storeInfo.longitude}
                    inputProps={{ step: 'any' }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    type='number'
                    step='any'
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell> Address: </TableCell>
                <TableCell>
                  <TextField
                    key='addressOne'
                    className={classes.textField}
                    name='addressOne'
                    variant='outlined'
                    type='text'
                    defaultValue={storeInfo.addressOne}
                  /> 
                </TableCell>
                <TableCell> Phone Number: </TableCell>
                <TableCell>
                  <TextField
                    key='phoneNumber'
                    className={classes.textField}
                    name='phoneNumber'
                    variant='outlined'
                    type='text'
                    defaultValue={storeInfo.phoneNumber}
                  /> 
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell> Email: </TableCell>
                <TableCell>
                  <TextField
                    key='email'
                    className={classes.textField}
                    name='email'
                    variant='outlined'
                    type='text'
                    defaultValue={storeInfo.email}
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

export default StoreUpdateForm

const UPDATE_STORE = gql`
  mutation updateStore($storeName: String!, $latitude: Float, $longitude: Float,
    $addressOne: String, $phoneNumber: String, $email: String){
      updateStore(storeName: $storeName, latitude: $latitude, longitude: $longitude,
        addressOne: $addressOne, phoneNumber: $phoneNumber, email: $email){
          storeName
          latitude
          longitude
          addressOne
          phoneNumber
          email
          imageUrl
        }
    }`