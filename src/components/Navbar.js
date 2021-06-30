import {NavLink , useHistory} from 'react-router-dom'
import {useContext } from 'react'
import {AuthContext} from '../context/authContext'

export const NavBar = () => {

    const auth = useContext(AuthContext)
    const history = useHistory();

    const logoutHandler = event =>{
        event.preventDefault();
        auth.logout()
        history.push('/')
    }

    return(
        <nav>
            <div className="nav-wrapper blue-grey darken-1" style={{padding:'0 2rem'}}>
                <span className="brand-logo">Placeholder</span>
                 <ul id='nav-mobile' className="right hide-on-med-and-down">
                     <li><NavLink activeClassName="activeNavLink" to="/create">Create Quiz</NavLink></li>
                     <li><NavLink activeClassName="activeNavLink" to="/profile">Profile</NavLink></li>
                     <li><a href="/" onClick={logoutHandler}>Logout</a></li>
                 </ul>
            </div>
        </nav>
    )    
}