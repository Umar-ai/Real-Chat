import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../ReduxToolkit/authSlice'
import { useContext } from 'react'
import Contextcreator from '../Context/Context'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Logout() {
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  const { sockets,setsocket } = useContext(Contextcreator)
  const onlogout = async () => {
    try {
      await axios.post('http://localhost:8000/api/v1/users/logout', {}, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      dispatch(logout())
         sockets.disconnect()
         Navigate('/login')
       
    } catch (error) {
      console.log("Error is ocurred while logging out", error)
    }
  }
  return (
    <div>
      <button onClick={onlogout}>Logout</button>
    </div>
  )
}

export default Logout
