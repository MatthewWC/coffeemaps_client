import React from 'react'
import Button from '@material-ui/core/Button'

function CreateCoffeeButton ({ props, storeName }) {
  return(
    <Button
      variant='contained'
      onClick={() => {
        props.history.push({
          pathname: './createCoffee',
          state: { storeName: storeName }
        })
      }}>
      Create New Coffee
    </Button>
  )
}

export default CreateCoffeeButton