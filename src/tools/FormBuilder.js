import React from 'react'
import axios from 'axios'

// ---- M-UI imports ----
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import FormHelperText from '@material-ui/core/FormHelperText'
// ---- M-UI imports ----

import validator from './validator'

// M-UI styles
const useStyles = makeStyles(theme => ({
  builderRoot: {
    maxWidth: '400px',
    marginTop: '80px'
  },
  paper: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center'
  },
  textField: {
    margin: 5,
    width: '80%'
  },
  fileInput: {
    display: 'none'
  },
  imageContainer: {
    marginTop: 5,
    display: 'flex',
    justifyContent: 'center'
  },
  errors: {
    margin: theme.spacing(2)
  }
}))

function FormBuilder({
  formName,
  fields,
  imageUpload = false,
  mutation,
  props,
  defaultFields = 'none'
}){

  // M-UI styles instance
  const classes = useStyles()

  //refs
  const formRef = React.useRef()
  const imageEle = React.useRef()
  const imageFile = React.useRef()
  const errorText = React.useRef()

  // image handler
  async function handleSubmit(props){
    
    let variables = {}
    // reset error message
    errorText.current.innerHTML = ''

    try{
      validator(formRef.current)
      // map form to build object correctly
      Object.keys(fields).map(field => {
        switch(formRef.current[field].type){
          case 'text':
            return variables[field] = formRef.current[field].value
          case 'number': 
            return variables[field] = parseFloat(formRef.current[field].value)
          default:
            return null
        }
      })

      if(imageUpload && imageFile.current.files[0]){
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
      const results = await props.client.mutate({
        mutation: mutation,
        variables: variables
      })
      
      if(formName === 'Login Form'){
        localStorage.setItem('token', results.data.login.token)
        localStorage.setItem('email', results.data.login.user.email)
        localStorage.setItem('role', results.data.login.user.role)
        props.history.push('/')
      }
      if(formName === 'Register Form'){
        window.setTimeout(() => props.history.push('/'), 4000)
      }
    }
    catch (error) {
      let errMsg
      // handle unsuccessful response
      errMsg = error.toString().lastIndexOf(':') + 1
      errorText.current.innerHTML = error.toString().substring(errMsg, 75)
    }
  }

  // handles file display when uploaded
  function handleChange(event){
    // if file selected changes
    if(event.target.files[0]){
      let image = URL.createObjectURL(event.target.files[0])
      imageEle.current.src = image
    }
  }

  return(
    <Grid 
      container  
      justify='center'
      className={classes.builderRoot}>
      <Paper className={classes.paper}>
        <Typography>
          {formName}
        </Typography>
        {imageUpload ? 
          <Grid  container className={classes.imageContainer}>
            <label>
              <img
                className={classes.image}
                alt='pic'
                src={defaultFields.imageUrl || 'default_image.png' }
                ref={imageEle}
                width='100px'
                height='100px'
              />
            <input 
              ref={imageFile}
              className={classes.fileInput} 
              type='file'
              accept="image/*"
              onChange={(event) => {
                handleChange(event)
              }}/>
            </label>
          </Grid> : null 
        }
        <form
          name={formName}
          ref={formRef}
          className={classes.formRoot}
        >
          {Object.keys(fields).map(field => {
            switch(fields[field]){
              case 'String':
                return <TextField
                  key={field}
                  className={classes.textField}
                  name={field}
                  label={field}
                  variant='outlined'
                  defaultValue={defaultFields[field] || ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  type='text'
                  /> 
              case 'Float':
                return <TextField
                  key={field}
                  className={classes.textField}
                  name={field}
                  label={field}
                  variant='outlined'
                  defaultValue={defaultFields[field] || ''}
                  inputProps={{ step: 'any' }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  type='number'
                  step='any'
                  />
              default:
                return null
            }})
          }
          <FormHelperText
            className={classes.errors}
            ref={errorText}
            error={true}
          >
          </FormHelperText>
          <Button
            onClick={() => {
              handleSubmit(props)
            }}
            variant='contained'>
            SUBMIT
          </Button>
        </form>
      </Paper>
    </Grid>
  )
}

export default FormBuilder