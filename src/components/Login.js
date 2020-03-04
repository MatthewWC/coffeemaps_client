import React from 'react'
import gql from 'graphql-tag'

import Grid from '@material-ui/core/Grid'

import FormBuilder from '../tools/FormBuilder'

//TODO: add register link

function Login (props) {

  return(
    <Grid container justify='center'>
      <FormBuilder
        formName={'Login Form'}
        fields={{
          email: 'String',
          password: 'String'
        }}
        mutation={LOGIN}
        props={props}/>
    </Grid>
  )
}

export default Login

const LOGIN = gql`
  mutation login($email: String!, $password: String!){
    login(email: $email, password: $password){
      token,
      user{
        email
        role
      }
    }
  }`