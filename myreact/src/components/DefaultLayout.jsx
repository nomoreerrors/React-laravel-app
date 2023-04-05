import React, { useEffect } from 'react'
import { Navigate, Outlet, Link } from 'react-router-dom'
import { useStateContext } from '../Contexts/ContextProvider'
import axiosClient from '../axios-client'



export default function DefaultLayout() {

  const {user, setUser, token, setToken} = useStateContext()

  if(!token) return <Navigate to="/login" />


 
  const onLogout = (event) => {
      event.preventDefault()
        axiosClient.post('/logout')
          .then(() => {
              setToken(null)
                setUser({})
                  })
  }


  useEffect(() => {
      axiosClient.get('/user')
         .then(({data}) => setUser(data))
              }, [])

 


  return (
    <div>
      <aside>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/users'>Users</Link>
      </aside>
      <header>
          <div>Header</div>
          <div>{user.name}
            <a href="#" onClick={onLogout}>Logout</a>
          </div>
      </header>
      <main>
      <Outlet />
      </main>
    </div>
  )
}
