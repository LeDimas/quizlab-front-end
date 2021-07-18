
import {axios} from '../axios'


export default class GameService{

    static async fetchGame(gameLink){
         return axios.get(`/api/game/joinGame/${gameLink}`)
    }

    static async deleteQuiz(quizName){
        axios.delete('api/quiz/' , { data: { quizName: quizName }} )
    }

    // static async createQuiz({quizForm , questionForm}){
        
    //     const response = await axios.post('api/quiz' ,  quizForm )
    //     const quizId = response.data._id;
    //     for await (const _ of questionForm.map(
    //         question => axios.post(`api/quiz/${quizId}/question`  , {...question})
    //         )){}

    //      return {_id:{name:response.data.name , id:quizId}}
    // }


    // static async fetchQuizById(quizId){
    //     return axios.get(`/api/quiz/${quizId}`)
 
    // }



}