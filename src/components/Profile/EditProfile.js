import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import Grid from '@material-ui/core/Grid'

import FormBuilder from '../../tools/FormBuilder'

function EditProfile (props) {

  const { loading, error, data } = useQuery(
      GET_USER, 
      { variables: { email: localStorage.getItem('email') }})

      if(loading){
        return(
          <div></div>
        )
      }

      if(error){
        return(
          <div>

          </div>
        )
      }
      console.log(data)
      return(
        <Grid container justify='center'>
          <FormBuilder
            formName={'Update Profile Form'}
            fields={{
              firstName: 'String',
              lastName: 'String',
              email: 'String',
            }}
            imageUpload={true}
            mutation={UPDATE_USER}
            props={props}
            defaultFields={data.getUser}
            />
        </Grid>
      )
}

export default EditProfile

const GET_USER = gql`
  query getUser($email: String!){
    getUser(email: $email){
      imageUrl
      firstName 
      lastName
      email
    }
  }`

const UPDATE_USER = gql`
  mutation updateUser($imageUrl: String, $firstName: String, $lastName: String){
    updateUser(imageUrl: $imageUrl, firstName: $firstName, lastName: $lastName){
      token 
      user{
        imageUrl
        firstName 
        lastName
      }
    }
  }`