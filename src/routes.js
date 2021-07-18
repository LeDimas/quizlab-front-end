import {Switch,Route , Redirect} from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import {ProfilePage} from './pages/ProfilePage';
import { QuizEnterRoomPage } from './pages/QuizEnterRoomPage';
import {QuizManagmentPage} from './pages/QuizMagmentPage';
import {RegisterPage} from './pages/RegisterPage';
import {CreateQuizPage} from './pages/CreateQuizPage';
import {QuizGamePage} from './pages/QuizGamePage'
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import PasswordResetPage from './pages/PasswordResetPage'

export const useRoutes = isAuth =>{
    if(isAuth){
        return(
            <Switch>
                <Route path="/profile" exact>
                    <ProfilePage />
                </Route>
                <Route path="/quizGame/:gameLink" exact>
                    <QuizEnterRoomPage />
                </Route>
                <Route path="/room/:gameLink" exact  render={(props) => <QuizGamePage {...props} />} />
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
            <Route path="/forgotPassword" exact>
                <ForgotPasswordPage/>
            </Route>
            <Route path="/resetPassword/:userId/:token" exact>
                <PasswordResetPage  />
            </Route>
            <Route path="/register" exact>
                <RegisterPage/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}