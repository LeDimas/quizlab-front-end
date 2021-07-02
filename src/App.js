import {BrowserRouter} from 'react-router-dom'
import {useRoutes} from './routes'
import {useAuth} from './hooks/auth.hook'
import {AuthContext} from './context/authContext'
import {NavBar} from './components/Navbar'
import Modal from 'react-modal';
import {Loader} from './components/Loader'
import {Footer} from './components/Footer'
import 'materialize-css'

Modal.setAppElement('#root');
function App() {

  const {login,logout,token,userId ,ready , userName } = useAuth();
  const isAuthenticated  = !!token
  const routes = useRoutes(isAuthenticated);
  

  if(!ready){
    return <Loader/>
  }

  return (
    <AuthContext.Provider value={{token , login ,logout , userName , userId , isAuthenticated}}>
      <BrowserRouter>
        {isAuthenticated && <NavBar/>}
        <div className="container">
          {routes}
        </div>
        {/* <Footer/> */}
      </BrowserRouter>
    </AuthContext.Provider>
    
  );
}

export default App;
