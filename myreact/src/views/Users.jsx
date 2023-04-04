import React, { useEffect, useState } from 'react'
import axiosClient from '../axios-client'
import { Link } from 'react-router-dom'
 
 export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)


  useEffect(() => {
        getUsers()
           }, [])

           console.log(users)

    const onDelete = (i) => {
        if(window.confirm('Are you sure you want to delete this user?'))
          axiosClient.delete(`/users/${i.id}`)
            .then(() => {
                getUsers()
                  })
                    }


    const getUsers = () => {
            setLoading(true)
              axiosClient.get('/users')
                .then(({data}) => {
                    setLoading(false)
                      setUsers(data.data)
                        })
                          }       



   return (
     <div>
        <h1>Users</h1>
        <Link to="/users/new">Add new</Link>
        <div>
          <table >
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(i => (
              <tr key={i.id}>
                <td>{i.id}</td>
                <td>{i.name}</td>
                <td>{i.email}</td>
                <td>{i.created_at}</td>
                <td>
                <Link to={'/users/' + i.id}>Edit</Link>
                <button onClick={() => onDelete(i)}>Delete</button>
                </td>
              </tr>
              ))}

            </tbody>
          </table>
        </div>
     </div>
   )
 }
 