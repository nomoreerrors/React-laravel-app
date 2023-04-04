import React from 'react'
import { Outlet, Navigate} from 'react-router-dom'
import { useStateContext } from '../Contexts/ContextProvider'



export default function GuestLayout() {

  const {token} = useStateContext()
 
  if(token) return <Navigate to="/" />
 
  

  return (
    <div>
      <div>For guest users only</div>
      <div>For guest users only</div>
      <div>For guest users only</div>
      <div>For guest users only</div>
      <div>For guest users only</div>
      <Outlet />
    </div>
  )
}
