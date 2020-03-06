import React from 'react'
import { Link } from 'react-router-dom'
// ---- M-UI imports ----
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
// ---- M-UI imports ----

// M-UI styles
const useStyles = makeStyles(theme => ({
  panelRoot: {
    marginRight: '10px',
    margin: 'auto'
  },
  button: {
    padding: 0
  }
}))

function UserPanel () {

  // M-UI styles instance
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState(null)

  // open menu 
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  // close menu
  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <Grid className={classes.panelRoot}>
      <IconButton
        className={classes.button}
        onClick={handleClick}>
        <AccountCircleIcon fontSize='large'/>
      </IconButton>
      {localStorage.getItem('token') ? 
        (<Menu
          id='simple-menu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem 
            onClick={() => {
            localStorage.removeItem('token')
            localStorage.removeItem('email')
            localStorage.removeItem('role')
            handleClose()
            }}
            component={Link}
            to='/login'>
            Logout
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose()
            }}
            component={Link}
            to='/profile'>
            Profile
          </MenuItem>
        </Menu>) 
        : 
        (<Menu
          className={classes.menu}
          id='simple-menu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem 
            onClick={() => handleClose()} 
            component={Link} to='/login'>
          Login
          </MenuItem>
          <MenuItem 
            onClick={() => handleClose()}
            component={Link} to='/register'>
          Register
          </MenuItem>
        </Menu>)
      }
    </Grid>
  )
}

export default UserPanel