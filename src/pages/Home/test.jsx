import axios from '../../api/api'
import React from 'react'

const Test = () => {

    axios.get("/test", {withCredentials:true})
  return (
    <div>Test</div>
  )
}

export default Test