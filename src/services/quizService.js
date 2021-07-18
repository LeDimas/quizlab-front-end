
import {axios} from '../axios'


export default class QuizService{

    static async fetchQuizes(){
         return axios.get('/api/myQuizList')
    }

    static async deleteQuiz(quizName){
        axios.delete('api/quiz/' , { data: { quizName: quizName }} )
    }

    static async createQuiz({quizForm , questionForm}){
        
        const response = await axios.post('api/quiz' ,  quizForm )
        const quizId = response.data._id;
        for await (const _ of questionForm.map(
            question => axios.post(`api/quiz/${quizId}/question`  , {...question})
            )){}

         return {_id:{name:response.data.name , id:quizId}}
    }


    static async fetchQuizById(quizId){
        return axios.get(`/api/quiz/${quizId}`)
 
    }

    static async updateQuestionAsync({quizId , payload}){
        return axios.put(`api/quiz/${quizId}/question` , payload)
    }

    static async removeQuestionAsync({quizId , description}){
        await axios.delete(`api/quiz/${quizId}/question` ,
               { data: { questionDescription: description } }  )
    }

    static async createQuestionAsync({quizId , description , correctAnwser ,options}){
        const alternatives = options.map((option) => {
            return {text:option, isCorrect: option === correctAnwser}
        })

       return axios.post(`api/quiz/${quizId}/question`  , {description , alternatives} )

            
    }


}