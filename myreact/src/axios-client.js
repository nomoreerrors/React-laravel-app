import axios from 'axios'
import router from './router'

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})

 

axiosClient.interceptors.request.use((config) => {
        const token = localStorage.getItem('ACCESS_TOKEN')
        config.headers.Authorization = `Bearer ${token}`
        return config
        
})


 
axiosClient.interceptors.response.use((response) => {
        return response
        }, 
         
        (err) => {
            
            if(err.response && err.response.status === 401) {
                router.navigate('/login')
                localStorage.removeItem('ACCESS_TOKEN')
                return err
            }
            throw err
        } 
        )


export default axiosClient