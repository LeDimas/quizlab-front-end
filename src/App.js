import {BrowserRouter} from 'react-router-dom'
import {useEffect} from 'react'
import {useRoutes} from './routes'
import {useAuth} from './hooks/auth.hook'
import {AuthContext} from './context/authContext'
import {NavBar} from './components/Navbar'
import Modal from 'react-modal';
import {Loader} from './components/Loader'
import {Footer} from './components/Footer'
import { useDispatch , useSelector } from 'react-redux'
import { checkAuth , setLoading } from './redux/userSlice'
import {useHistory} from 'react-router-dom'

import 'materialize-css'

// Modal.setAppElement('#root');
const App = () => {

  const {login,logout,token,userId ,ready , userName } = useAuth();
  const isAuthenticated  = !!token
  const history = useHistory()
  const dispatch = useDispatch()
  const userState = useSelector((state) => state.user)
  const routes = useRoutes(userState.isAuth);

  
  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(setLoading(true))
      dispatch(checkAuth())  
    }
  }, [])

  
  if(userState.isLoading){
    return <Loader/>
  }
  
 

  return (

      <BrowserRouter>
        {userState.isAuth && <NavBar/>}
        <div className="container">
          {routes}
        </div>
        <Footer/>
      </BrowserRouter>

    
  );
}

export default App;
