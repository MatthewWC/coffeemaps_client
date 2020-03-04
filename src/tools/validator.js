import validator from 'validator'

const validate = (form) => {
  let formFields = form

  switch(formFields.name){
    case 'Update Profile Form':
      // check for random character if field isnt empty
      Object.keys(formFields).forEach(function (item){
        // check for empty fields
        if(formFields[item].type === 'text'){
          if(validator.isEmpty(formFields[item].value)){
            throw new Error('Fields cannot be empty.')
          }
        }
        // email check
        if(formFields[item].name === 'email'){
          if(validator.isEmail(formFields[item].value) === false){
            throw new Error('Thats not a real email.')
          }
        }

        if(formFields[item].type === 'text' && formFields[item].value !== ''){
          if(validator.isAlphanumeric(formFields[item].value) === false && formFields[item].name !== 'email'){
            throw new Error('Fields can only contain letters A-Z & numbers 0-9.')
          }
        }
      })
      break
    case 'Login Form':
      Object.keys(formFields).forEach(function (item){
        // check for empty fields
        if(formFields[item].type === 'text'){
          if(validator.isEmpty(formFields[item].value)){
            throw new Error('Fields cannot be empty.')
          }
        }
        // email check
        if(formFields[item].name === 'email'){
          if(validator.isEmail(formFields[item].value) === false){
            throw new Error('Thats not a real email.')
          }
        }
      })
      // check if email is valid
      break
    case 'Register Form':
      Object.keys(formFields).forEach(function (item){
        // check for empty fields
        if(formFields[item].type === 'text'){
          if(validator.isEmpty(formFields[item].value)){
            throw new Error('Fields cannot be empty.')
          }
        }
        // email check
        if(formFields[item].name === 'email'){
          if(validator.isEmail(formFields[item].value) === false){
            throw new Error('Thats not a real email.')
          }
        }
      })
      if(formFields['confirmPassword'].value !== formFields['password'].value){
        throw new Error('Passwords do not match.')
      }
      break
    case 'Create Store Form':
      // check for empty fields
      Object.keys(formFields).forEach(function (item){
        if(formFields[item].type === 'text'){
          if(validator.isEmpty(formFields[item].value)){
            throw new Error('Fields cannot be empty')
          }
        }
      })
      break
    case 'Create Coffee Form':
        // check for empty fields
        Object.keys(formFields).forEach(function (item){
          if(formFields[item].type === 'text'){
            if(validator.isEmpty(formFields[item].value)){
              throw new Error('Fields cannot be empty')
            }
          }
        })
      break
    case 'Update Store Form':
      Object.keys(formFields).forEach(function (item){
        // check for empty fields
        if(formFields[item].type === 'text'){
          if(validator.isEmpty(formFields[item].value)){
            throw new Error('Fields cannot be empty')
          }
        }
        // email check
        if(formFields[item].name === 'email'){
          if(validator.isEmail(formFields[item].value) === false){
            throw new Error('Thats not a real email.')
          }
        }
      })
      break
      case 'Update Coffee Form':
        // check for empty fields
        Object.keys(formFields).forEach(function (item){
          if(formFields[item].type === 'text'){
            if(validator.isEmpty(formFields[item].value)){
              throw new Error('Fields cannot be empty')
            }
          }
        })
      break
    default:
      // if user somehow changed form name
      throw new Error('Something bad happened. Contact support.') 
  }
}

export default validate