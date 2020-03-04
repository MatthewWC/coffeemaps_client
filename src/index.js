import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import axios from 'axios'

let authHeader = 'Bearer'
axios.defaults.headers.common['Authorization'] = authHeader.concat(' ', localStorage.getItem('token'))

ReactDOM.render(<App/>, document.getElementById('root'))