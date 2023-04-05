
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../axios-client'



export default function UserForm() {

    const navigate = useNavigate()
    const {id} = useParams()
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)
    const [user, setUser] = useState({
              id: null,
              name: '',
              email: '',
              password: '',
              password_confirmation: ''
            })




    const onSubmit = (event) => {
        event.preventDefault()
        if(user.id) {
            axiosClient.put(`/users/${user.id}`, user)
            .then(() => navigate('/users'))
            .catch(err => setErrors(err.response.data.errors))
             

        
      } else {

             axiosClient.post(`/users`, user)
              .then(() => {
                 navigate('/users')
                    })
                    .catch(err => {
                          // console.log(err)
                              })
                            }
    }


    const onChange = (event) => {
          const {name, value} = event.target
                setUser({...user, [name]: value})
                
          
    }
      //2:30 закончил
      //2:30 закончил
      //2:30 закончил


     if(id) {
          useEffect(() => {
            setLoading(true)
            axiosClient.get(`/users/${id}`)
            .then(({data}) => {
                    setLoading(false)
                    setUser(data.data)
                })
            .catch(() => setLoading(false))
          }, [])
     }


  return (
     <>
        {user.id && <h1>Update User: {user.name}</h1> }
        {!user.id && <h1>New User</h1> }
        {loading && <div>Loading...</div> }
        {errors && Object.keys(errors).map(key => (
                    <p style={{color: 'red'}} key={key}>{errors[key][0]}</p>   
                    ))}

          {!loading && 
            <form onSubmit={onSubmit} action="">
                <input value={user.name} 
                      name='name' 
                      onChange={onChange} 
                      placeholder='Name' />
                <input value={user.email} 
                      name='email' 
                      type='email'
                      onChange={onChange} 
                      placeholder='Email' />
                <input 
                      onChange={onChange} 
                      type='password' 
                      name='password'
                      placeholder='Password' />
                <input 
                      onChange={onChange} 
                      type='password' 
                      name='password_confirmation'
                      placeholder='Confirm Password' />

                <button>Save</button>
            </form>
          }
     </>
  )
}
