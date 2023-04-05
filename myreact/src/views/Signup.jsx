import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useStateContext } from '../Contexts/ContextProvider'



export default function Signup() {
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmRef = useRef()

    const {setUser, setToken} = useStateContext()
    const [errors, setErrors] = useState(null)


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
                .catch(err => setErrors(err.response.data.errors))

    }
          






  return (
   
    <div>
     {errors && Object.keys(errors).map(key => (
                    <p style={{color: 'red'}} key={key}>{errors[key][0]}</p>   
                      ))}
              
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
