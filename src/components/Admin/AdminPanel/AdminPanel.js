import React from 'react'

import StoreList from '../Store/StoreList'

function AdminPanel (props) {
  return(
    <StoreList client={props.client} props={props} />
  )
}

export default AdminPanel