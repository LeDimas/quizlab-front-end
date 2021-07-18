import {useState,useCallback,useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token,setToken] = useState(null)
    const [ready , setReady] = useState(false)
    const [userId , setUserId] = useState(null)
    const [userName , setUserName] = useState(null)
    const [ expiresIn , setExpiresIn ] = useState(null)

    const login = useCallback((jwtToken , id , userName , jwtExpiresInH)=>{
        setToken(jwtToken)
        setUserId(id)
        setUserName(userName)
        // setExpiresIn()

        let date = new Date()
        let date2 = new Date(date)
        console.log('logged at',date)
        date2.setMinutes((date.getMinutes() + 5))
        // expireDate = Date(expireDate * 1000)
        console.log('+ 5 min:' , date2)

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
        setExpiresIn(null)
        localStorage.removeItem(storageName)
    } , [])


  
    // useEffect(()=>{
    //     // console.log('checking logout')
    //     const expirationDate = Date.parse(logoutDate)
    //     if(Date.now() < expirationDate){
    //         console.log('now' , Date.now())
    //         console.log('expires at',expirationDate)
            
    //         logout()}
    // },[ logoutDate])

    
    // useEffect(() =>{
    //     console.log('seting up timer for logout')
    //     if(expiresIn !== null){
    //         console.log('!!!!seting up timer for logout')
    //         setTimeout(() => {
    //             logout()
    //         } , 1000 * expiresIn )
    //     }


    // } , [])


    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem(storageName)) 
        
        if(data && data.token)
            login(data.token , data.userId , data.userName)
        
        setReady(true)
    } ,[login])

    return {login , logout , token , userId , ready , userName}
}