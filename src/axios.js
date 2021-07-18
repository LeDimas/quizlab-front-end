import Axios from 'axios'



export const axios = Axios.create({ 
    withCredentials:true,
    baseURL: "http://localhost:5000"
});

axios.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

axios.interceptors.response.use((config)=>{
    return config
} , async (error) => {
    const originalRequest = error.config;
    if(error.response.status === 401 && error.config && !error.config._isRetry){
        originalRequest._isRetry = true;
        try{
            const response = await axios.get(`http://localhost/refresh` , {withCredentials:true})  
            localStorage.setItem('token' , response.data.accessToken)      
            return axios.request(originalRequest)
        }catch(e){
            console.log('not authorized')
        }

    }

    throw error
})
