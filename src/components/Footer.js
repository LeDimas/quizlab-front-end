import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useState } from 'react'
import { useTranslation } from 'react-i18next';

export const Footer = () =>{

  const { i18n } = useTranslation();
  const [language, setLanguage] = useState('en');

  const handleChangeLanguage = (event) => {
    setLanguage(event.target.value);
    i18n.changeLanguage(event.target.value);
  };

    return(
        <footer style={{marginTop:'700px'}} className="page-footer">

          <div className="footer-copyright">
            <div className="container">
            © 2021 Copyright Dmitry Meckers
            <a className="grey-text text-lighten-4 right" href="https://github.com/LeDimas">Github</a>
            <FormControl style={{marginLeft:'30px'}} >
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={language}
                            onChange={handleChangeLanguage}
                            >
                            <MenuItem value={'en'}>English</MenuItem>
                            <MenuItem value={'ru'}>Russian</MenuItem>
                            <MenuItem value={'lv'}>Latvian</MenuItem>
                            <MenuItem value={'nl'}>Nederlands</MenuItem>
                        </Select>
              </FormControl>
            </div>
          </div>
        </footer>
    )
}