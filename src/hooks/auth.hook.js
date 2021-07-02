import {useState,useCallback,useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token,setToken] = useState(null)
    const [ready , setReady] = useState(false)
    const [userId , setUserId] = useState(null)
    const [userName , setUserName] = useState(null)

    const login = useCallback((jwtToken , id , userName , jwtExpiresInH)=>{
        setToken(jwtToken)
        setUserId(id)
        setUserName(userName)


        localStorage.setItem(storageName , JSON.stringify({
            userId:id , token:jwtToken , userName:userName
        }))

        localStorage.setItem('userId' , JSON.stringify({
            userId:id
        }))

        localStorage.setItem('userName' , JSON.stringify({
            userName:userName
        }))

    } , [])

    const logout = useCallback(()=>{
        setToken(null)
        setUserId(null) 
        setUserName(null)
        localStorage.removeItem(storageName)
    } , [])


    //to refactor
    // const runLogoutTimer = (timer) => {
    //     setTimeout(()=>{
    //         logout()
    //     } , timer)
    // }



    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem(storageName)) 
        
        if(data && data.token){
            console.log(data.userName)
            login(data.token , data.userId , data.userName)
        }
        setReady(true)
    } ,[login])

    return {login , logout , token , userId , ready , userName}
}