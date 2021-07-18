import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {axios} from '../axios'
import {useState, useContext} from 'react';
import {AuthContext} from '../context/authContext';
import {Loader} from '../components/Loader'
import {useMessage} from '../hooks/message.hook'
import {Link} from 'react-router-dom'


export const MyDialog = ({quizId  ,dialogOpen ,inputLabel ,twoInputs=true, secondInputLabel , handleCloseDialog , title ,body , onAgree ,  inputMode=false}) => {

    const auth = useContext(AuthContext)
    const [fetched , setFetched] = useState(null)
    const [invitationPass , setInvitationPass] = useState('')
    const [participantMaxAmount , setParticipantMaxAmount] = useState(0)
    const [loading , setLoading] = useState(false)
    const message = useMessage()

  

    const handleInvitationChange = event =>{
        setInvitationPass(event.target.value)
    }

    const handlePartMaxAmountChange = event =>{
        setParticipantMaxAmount(event.target.value)
    }

    const handleProceed = async() =>{
        try{

        if(invitationPass.length < 4){
            message('Invitation code is to short (5 characters minimum)')
            return
        }

        if(!parseInt(participantMaxAmount)){
            message('Participant amount must be a number!')
            return
        }
        const max = parseInt(participantMaxAmount);

        if(max > 20){
            message('20 players per quiz only!')
            return
        }

        const response = await axios.post(`/api/game/createGame` ,  {maxParticipants:max , invitationCode:invitationPass  , quizId:quizId} , {
            headers: {
              Authorization: `Bearer ${auth.token}`
            }})
        
        setLoading(true)
        setLoading(false)
        setFetched(response.data)
  
         }catch(e){
            message(e)
         }
    }

    if(fetched)
        return(
            <div>
               <Dialog
                        open={dialogOpen}
                        onClose={handleCloseDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">Congratulations!</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Your game is succescfully created!
                            Share this invitation link - <Link to={`/quizGame/${fetched.gameLink}`} > http://localhost:3000/quizGame/{fetched.gameLink} </Link>
                            To let you and people to enter room
                            Don't forget to share your invitation code! - {fetched.invitationCode}
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <button className="btn-small waves-effect  red darken-1" onClick={handleCloseDialog} color="primary">
                            Got it!
                        </button>
                        </DialogActions>
                    </Dialog>
            </div>
        )

    if(inputMode)
        return(
            <div>
                <Dialog fullWidth={true} open={dialogOpen} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
                    {!loading ?
                    <>
                        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                        {body}
                        </DialogContentText>
                    
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label={inputLabel}
                            type="text"
                            fullWidth
                            onChange={handleInvitationChange}
                        />
                        {twoInputs && 
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label={secondInputLabel}
                            type="text"
                            fullWidth
                            onChange={handlePartMaxAmountChange}
                        />
                        }
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleProceed} color="primary">
                            Proceed
                        </Button>
                        </DialogActions> 
                    </>
                    :
                    <Loader/>
                    
                }
                    



                    <br/>
                    <br/>
                </Dialog>
                </div>
        )

    return(
        <div>
               <Dialog
                        open={dialogOpen}
                        onClose={handleCloseDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {body}
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <button className="btn-small waves-effect  red darken-1" onClick={handleCloseDialog} color="primary">
                            Cancel
                        </button>
                        <button className="btn-small waves-effect  green darken-1" onClick={onAgree} color="primary" autoFocus>
                            Agree
                        </button>
                        </DialogActions>
                    </Dialog>
        </div>
    )
}