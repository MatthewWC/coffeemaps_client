import React from 'react'

// ---- M-UI imports ----
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
// ---- M-UI imports ----

const useStyles = makeStyles(theme => ({
  paper: {
    margin: 'auto',
    marginTop: 5,
    padding: 10
  },
  imageLabel: {
    display: 'flex',
    flexDirection: 'column'
  },
  image: {
    margin: 'auto'
  },
  fileInput: {
    maxWidth: '200px'
  }
}))

function StoreImage ({ imageUrl, passUpImage }) {

  // M-UI styles instance
  const classes = useStyles()

  // refs
  const imageEle = React.useRef()
  const imageFile = React.useRef()

  // handles file display when uploaded
  function handleChange(event){
    // if file selected changes
    if(event.target.files[0]){
      let image = URL.createObjectURL(event.target.files[0])
      imageEle.current.src = image
      passUpImage(imageFile.current.files[0])
    }
  }

  return(
    <Paper className={classes.paper}>
      <label className={classes.imageLabel}>
        <img
          className={classes.image}
          alt='pic'
          src={imageUrl || 'default_image.png' }
          ref={imageEle}
          width='150px'
          height='150px'
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
    </Paper>
  )
}

export default StoreImage