import {React, useRef}from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useStateContext } from '../Contexts/ContextProvider'




export default function Login() {

  const emailRef = useRef()
  const passwordRef = useRef()

  const {setUser, setToken} = useStateContext()



const onSubmit = (event) => {
      event.preventDefault()
      const payload = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }


      axiosClient.post('/login', payload)
      .then(({data}) => {
        setUser(data.user)
          setToken(data.token)
      })
      
      .catch(err => {
          const {response} = err
          if(response && response.status === 422) {
            console.log(response.data.errors)
          }})
}





  return (
    <div>
      <form onSubmit={onSubmit}>
          <input ref={emailRef} type="email" placeholder='email' />
          <input ref={passwordRef} type="password" placeholder='password' />
          <button>Login</button>
          <p>Not registered?  <Link to="/signup">Create an account</Link></p>

      </form>


    </div>
  )
}
