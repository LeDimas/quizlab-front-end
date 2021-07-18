import {axios} from '../axios'


export default class AuthService{
    static async login({email , password}){
        return axios.post('api/auth/login' ,{email , password} )
    }

    static async registration({email , username , password}){
        return axios.post('api/auth/registration' , {email , username , password})
    }

    static async logout(){
        return axios.post('api/auth/logout')
    }
}

