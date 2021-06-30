import {Switch,Route , Redirect} from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import {ProfilePage} from './pages/ProfilePage';
import { QuizGamePage } from './pages/QuizGame';
import {QuizManagmentPage} from './pages/QuizMagmentPage';
import {RegisterPage} from './pages/RegisterPage';
import {CreateQuizPage} from './pages/CreateQuiz';

export const useRoutes = isAuthenticated =>{
    if(isAuthenticated){
        return(
            <Switch>
                <Route path="/profile" exact>
                    <ProfilePage />
                </Route>
                <Route path="/quizGame/:id" exact>
                    <QuizGamePage />
                </Route>
                <Route path="/quizManagment/:quizId" exact>
                    <QuizManagmentPage />
                </Route>
                <Route path="/create">
                    <CreateQuizPage/>
                </Route>
                <Redirect to="/profile"/>
            </Switch>
        )
    }
    
    return(
        <Switch>
            <Route path="/" exact>
                <LoginPage/>
            </Route>
            <Route path="/register" exact>
                <RegisterPage/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}