import React,{useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { useGlobalContext } from './context'
import "./AddProfile.css"

const AddProfile = () => {

    const [fileSelected, setFileSelected] = useState("")

    const {userState, isUserLoggedIn, userDispatch} = useGlobalContext()

    useEffect(()=>{
      if(!userState.isUserAuthenticated){
        isUserLoggedIn()
      }
  },[])

    const history = useHistory()

    const handleFileSelect = (e) => {
        setFileSelected(e.target.files[0])
    }

    const handleFileUpload = async(e) => {
        e.preventDefault()
        const data = new FormData()
        data.append("file", fileSelected)

        try{
            const resp = await fetch("https://job-portal-node-app.herokuapp.com/job/user/upload/resumePdf", {
            method:"PUT",
            headers: {"x-auth-token":userState.user.token},
            body: data
        })
        if(resp.ok){
                history.push("/")
            }
        }catch(error){
            console.warn(error.toString())
        }
    }

  return (
      <section className='addProfile-section'>
          <div className='container'>
            <h1>Add Profile</h1>
            <div className='addProfile-wrapper'>
                <form className='addProfile-form' enctype='multipart/form-data'>
                    <div className='form-control'>
                        <p>Choose Resume:</p>
                        <input  type="file" onChange={(e)=>handleFileSelect(e)}></input>
                    </div>
                    <div className='form-control'>
                        <button className='upload-resume' type="submit" onClick={handleFileUpload}>Upload Resume</button>
                    </div>
                </form>
            </div>
          </div>
      </section>
  )
}

export default AddProfile