import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import { Tooltip , IconButton } from '@material-ui/core'
import {Link} from 'react-router-dom'
import {useState} from 'react'
import {MyDialog} from '../components/Dialog'



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

    


    const [deleteDialog , setDeleteDialog] = useState(false)
    const [createGameDialog , setCreateGameDialog] = useState(false)

    const handleOpenCreateGameDialog = () => {
        setCreateGameDialog(true)
    }

    const handleCloseCreateGameDialog = () => {
        setCreateGameDialog(false)
    }

    const handleOpenDeleteDialog = ()=>{
        setDeleteDialog(true);
    }

    const handleCloseDeleteDialog = () => {
        setDeleteDialog(false);
    };
    
    const deleteQuizHandler = async () =>{

        try{
            console.log(quizId)
            setDeleteDialog(false);
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
                        <IconButton onClick={handleOpenCreateGameDialog} aria-label="edit" style={{ paddingTop:'0px' , backgroundColor:'transparent'}}>
                                <VideogameAssetIcon color='primary' style={{marginLeft:'20px'}} />
                        </IconButton>
                    </Tooltip>
                    
                    <Tooltip title="Delete quiz">
                        <IconButton onClick={handleOpenDeleteDialog} aria-label="edit" style={{ paddingTop:'0px', marginLeft:'10px' , backgroundColor:'transparent'}}>
                            <DeleteIcon color='primary'  />
                        </IconButton>    
                    </Tooltip>

                    <MyDialog dialogOpen={deleteDialog}  handleCloseDialog={handleCloseDeleteDialog} 
                     title={'Warning'} body={' Are you sure you want to delete this quiz? It will remove quiz permamently'}  onAgree={deleteQuizHandler} />

                    <MyDialog quizId={quizId} secondInputLabel={'Enter Maximal participant amount'} quizName={quizName}  inputMode={true} inputLabel={"Invitation code"} dialogOpen={createGameDialog}  handleCloseDialog={handleCloseCreateGameDialog} 
                     title={'Game Create'} body={' Please enter invitation code and max available amount of people for this game'}  onAgree={() => {console.log('creating game')}} />
             

                </div>
               
            
            </li>
       
    )
}