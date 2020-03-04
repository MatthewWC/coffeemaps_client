import React from 'react'
import gql from 'graphql-tag'

import Grid from '@material-ui/core/Grid'

import FormBuilder from '../tools/FormBuilder'

function Register (props) {
  return(
    <Grid container justify='center'>
      <FormBuilder
        formName={'Register Form'}
        fields={{
          email: 'String',
          password: 'String',
          confirmPassword: 'String'
        }}
        imageUpload={false}
        mutation={REGISTER}
        props={props}
      />
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