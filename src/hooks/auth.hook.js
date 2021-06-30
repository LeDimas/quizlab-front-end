import {useState,useCallback,useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token,setToken] = useState(null)
    const [ready , setReady] = useState(false)
    const [userId , setUserId] = useState(null)

    const login = useCallback((jwtToken , id , jwtExpiresInH)=>{
        setToken(jwtToken)
        setUserId(id)


        // runLogoutTimer(1000*3600*jwtExpiresInH);

        // console.log(jwtExpiresInH)

        localStorage.setItem(storageName , JSON.stringify({
            userId:id , token:jwtToken
        }))
    } , [])

    const logout = useCallback(()=>{
        setToken(null)
        setUserId(null) 
        localStorage.removeItem(storageName)
    } , [])


    //to refactor
    const runLogoutTimer = (timer) => {
        setTimeout(()=>{
            logout()
        } , timer)
    }



    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem(storageName)) 

        if(data && data.token){
            login(data.token , data.userId)
        }
        setReady(true)
    } ,[login])

    return {login , logout , token , userId , ready}
}