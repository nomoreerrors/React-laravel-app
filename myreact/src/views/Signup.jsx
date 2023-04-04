import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useStateContext } from '../Contexts/ContextProvider'



export default function Signup() {
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmRef = useRef()

    const {user, setUser, setToken} = useStateContext()


  const onSubmit = (event) => {
        event.preventDefault()
        const payload = {
          name:  nameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          password_confirmation: confirmRef.current.value,
        }
        


        axiosClient.post('/signup', payload)
        .then(({data}) => {
          setUser(data.user)
            setToken(data.token)
        })
        .catch(err => {
            console.log(err)
            const {response} = err
            if(response && response.status === 422) {
              console.log(response.data.errors)
            }})
}





  return (
   
    <div>
      <form onSubmit={onSubmit}>
          <input ref={nameRef} type="text" placeholder='full name' />
          <input ref={emailRef} type="email" placeholder='email' />
          <input ref={passwordRef} type="password" placeholder='password' />
          <input ref={confirmRef} type="password" placeholder='confirm password' />
          <button>Signup</button>
          <p>Already registered?  <Link to="/login">Sign in</Link></p>
      </form>


    </div>
  )
}
