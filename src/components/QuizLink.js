import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import { Tooltip , IconButton } from '@material-ui/core'
import {Link} from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'
import {useState , useContext} from 'react'

import { useHttp } from "../hooks/http.hook";
import {AuthContext} from '../context/authContext';

const styles ={
    roundedAvatar:{
   
        height: '25px',
        width: '25px',
        backgroundColor: 'rgb(66, 135, 245)',
        borderRadius: '50%',
        display: 'inline-block',
}
}



export const QuizLink = ({quizId , quizName , cbRemoveQuizFromQuizList}) => {

    

    const auth = useContext(AuthContext)
    const {loading , error, request , clearError } = useHttp();
    const [dialogOpen , setDialogOpen] = useState(false)

    const handleOpenDeleteDialog = ()=>{
        setDialogOpen(true);
    }

    const handleCloseDeleteDialog = () => {
        setDialogOpen(false);
    };
    
    const deleteQuizHandler = async () =>{

        try{
            console.log(quizId)
            setDialogOpen(false);
            cbRemoveQuizFromQuizList(quizName)

            // const data = await request(`api/quiz` , 'DELETE'  ,
            // { quizName : quizName} , {Authorization: `Bearer ${auth.token}` })

        }catch(e){
            console.log(e)
        }
               
            
    }

    return(

            
        
              <li className="collection-item black-text hover-darken valign-wrapper"  >
                  
                <div className="valign-wrapper" style={{width:'350px'}}>

                    {/* future avatar */}
                    <div style={styles.roundedAvatar}/>
                    {/* future avatar */}
                    
                    {/* <i className="material-icons circle red">play_arrow</i> */}
                    <span className="title " style={{marginLeft:'5px'}}>{quizName}</span>
                </div>
                
                <div style={{paddingTop:'5px'}}>


              
                    <Tooltip title="Edit quiz">
                        <Link to={`/quizManagment/${quizId}`}>
                            <EditIcon color='primary' />
                        </Link>
                    </Tooltip>

                    <Tooltip title="Start game">
                        <Link>
                            <VideogameAssetIcon color='primary' style={{marginLeft:'20px'}} />
                        </Link>
                    </Tooltip>
                    
                    <Tooltip title="Delete quiz">
                        <IconButton onClick={(handleOpenDeleteDialog)} aria-label="edit" style={{ paddingTop:'0px', marginLeft:'10px' , backgroundColor:'transparent'}}>
                            <DeleteIcon color='primary'  />
                        </IconButton>    
                    </Tooltip>

                    <Dialog
                        open={dialogOpen}
                        onClose={handleCloseDeleteDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Wanring"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this quiz? It will remove quiz permamently
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <button className="btn-small waves-effect  red darken-1" onClick={handleCloseDeleteDialog} color="primary">
                            Cancel
                        </button>
                        <button className="btn-small waves-effect  green darken-1" onClick={deleteQuizHandler} color="primary" autoFocus>
                            Agree
                        </button>
                        </DialogActions>
                    </Dialog>

                </div>
               
            
            </li>
       
    )
}