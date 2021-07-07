import {NavLink , useHistory} from 'react-router-dom'
import {useContext , useState } from 'react'
import {AuthContext} from '../context/authContext'
import { useTranslation } from 'react-i18next'



export const NavBar = () => {

    const auth = useContext(AuthContext)
    const history = useHistory();

    const logoutHandler = event =>{
        event.preventDefault();
        auth.logout()
        history.push('/')
    }

    const  { t } = useTranslation()



    return(
        <nav>
            <div className="nav-wrapper blue-grey darken-1" style={{padding:'0 2rem'}}>
                <span className="brand-logo">{t('nav_title')}</span>
                 <ul id='nav-mobile' className="right hide-on-med-and-down">
                     <li><NavLink activeClassName="activeNavLink" to="/create">{t('nav_create')}</NavLink></li>
                     <li><NavLink activeClassName="activeNavLink" to="/profile">{t('nav_profile')}</NavLink></li>
                     <li><a href="/" onClick={logoutHandler}>{t('nav_logout')}</a></li>
                     <li style={{marginTop:'18px' }} >
            
                     </li>
                 </ul>
            </div>
        </nav>
    )    
}