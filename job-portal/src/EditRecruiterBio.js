import React,{useState, useEffect} from 'react'
import { useGlobalContext } from './context'
import TextField from '@mui/material/TextField';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import "./EditRecruiterBio.css"

const EditRecruiterBio = () => {
    const {userState, isUserLoggedIn, userDispatch} = useGlobalContext()

    useEffect(()=>{
      if(!userState.isUserAuthenticated){
        isUserLoggedIn()
      }
  },[])

    const [recruiterBio, setRecruiterBio] = useState("")

    const history = useHistory()

    console.log(recruiterBio)

    const handleEditBio = async(e) => {
        e.preventDefault()
        try{
            const resp = await fetch('https://job-portal-node-app.herokuapp.com/job/user/editRecruiterBio', {
            method:'PUT',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({recruiterBio:recruiterBio, recruiterId:userState.user._id})
                })
            if(resp.ok){
                history.push("/")
            }
        }catch(error){
            console.warn(error.toString())
        }
    }

  return (
      <section className='editRecruiterBio-section'>
          <div className='container'>
            <h1>Welcome, {userState.user.username}</h1>
            <div className='editRecruiter-wrapper'>
                <form>
                    <div className='form-control'>
                        <TextField
                            className='userInput'
                            disabled
                            id="outlined-disabled"
                            label="Recruiter Name"
                            defaultValue={userState.user.username}
                            />
                    </div>
                    <div className='form-control'>
                        <TextField
                            className='userInput'
                            disabled
                            id="outlined-disabled"
                            label="Recruiter Email"
                            defaultValue={userState.user.email}
                            />
                    </div>
                    <div className='form-control'>
                        <TextField
                            className='userInput'
                            disabled
                            id="outlined-disabled"
                            label="Recruiter Location"
                            defaultValue={userState.user.location}
                            />
                    </div>
                    <div className='form-control'>
                        <TextField
                            className='userInput'
                            id="outlined-multiline-static"
                            label="Bio"
                            placeholder='Enter Bio'
                            multiline
                            rows={6}
                            value={userState.user.bio || recruiterBio}
                            onChange={(e)=>{setRecruiterBio(e.target.value)}}
                        />
                    </div>
                    <Button className="submitBtn" variant="contained" size="medium"  type="submit" onClick={handleEditBio}>Save Bio</Button>
                </form>
            </div>
          </div>
      </section>
  )
}

export default EditRecruiterBio