import React,{useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { useGlobalContext } from './context'
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import "./AddProfile.css"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const AddProfile = () => {

    const [fileSelected, setFileSelected] = useState("")

    const {userState, isUserLoggedIn, userDispatch} = useGlobalContext()

    console.log(userState)

    useEffect(()=>{
      if(!userState.isUserAuthenticated){
        isUserLoggedIn()
      }
  },[])

    const history = useHistory()

    const [userBio, setUserBio] = useState("")

    const [workExperience, setWorkExperience] = useState([{jobTitle:"", company:"", city:"", startDate:"", endDate:"", workDescription:""}])

    const [education, setEducation] = useState([{eduLevel:"", educationType:"", fieldStudy:"", clg:"", location:"", startDate:"", endDate:""}])

    const [skills,setSkills] = useState([{skill:""}])

    const [portfolio, setPortfolio] = useState("")

    const [project, setProject] = useState([{projectTitle:"", projectUrl:"", projectDesc:""}])

    // ----------------------------------------------------------------------------

    const handleWorkExpChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...workExperience];
        list[index][name] = value;
        setWorkExperience(list);
    };

  // handle click event of the Remove button
  const handleWorkExpRemove = index => {
    const list = [...workExperience];
    list.splice(index, 1);
    setWorkExperience(list);
  };

  // handle click event of the Add button
  const handleWorkExpAdd = () => {
    setWorkExperience([...workExperience, {jobTitle:"", company:"", city:"", startDate:"", endDate:"", workDescription:""}]);
  };

  console.log(workExperience)

//   --------------------------------------------------------------------------------

const handleEduChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...education];
        list[index][name] = value;
        setEducation(list);
    };

  // handle click event of the Remove button
  const handleEduRemove = index => {
    const list = [...education];
    list.splice(index, 1);
    setEducation(list);
  };

  // handle click event of the Add button
  const handleEduAdd = () => {
    setEducation([...education, {eduLevel:"", educationType:"", fieldStudy:"", clg:"", location:"", startDate:"", endDate:""}]);
  };

  console.log(education)

//   --------------------------------------------------------------------------------

  // requirement field
  const handleSkillsChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...skills];
    list[index][name] = value;
    setSkills(list);
  };

  // handle click event of the Remove button
  const handleSkillsRemove = index => {
    const list = [...skills];
    list.splice(index, 1);
    setSkills(list);
  };

  // handle click event of the Add button
  const handleSkillsAdd = () => {
    setSkills([...skills, { skill: ""}]);
  };

  console.log(skills)

//   ----------------------------------------------------------------------

const handleProjectChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...project];
        list[index][name] = value;
        setProject(list);
    };

  // handle click event of the Remove button
  const handleProjectRemove = index => {
    const list = [...project];
    list.splice(index, 1);
    setProject(list);
  };

  // handle click event of the Add button
  const handleProjectAdd = () => {
    setProject([...project, {projectTitle:"", projectUrl:"", projectDesc:""}]);
  };

  console.log(project)

//   --------------------------------------------------------------------------------

    const handleFileSelect = (e) => {
        setFileSelected(e.target.files[0])
    }

    const handleFileUpload = async(e) => {
        e.preventDefault()
        const data = new FormData()
        data.append("file", fileSelected)

        try{
            const resp = await fetch("http://localhost:9000/job/user/upload/resumePdf", {
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

    // ----------------------------------------------------------------------------------
    const handleProfileSubmit = async(e) => {
        e.preventDefault()
        console.log({userBio:userBio, workExperience:workExperience, education:education, skills:skills, portfolio:portfolio, project:project})

        try{
            const resp = await fetch('http://localhost:9000/job/user/editUserProfile', {
            method:'PUT',
            headers: { "Content-Type": "application/json", "x-auth-token":userState.user.token},
            body: JSON.stringify({userBio:userBio, workExperience:workExperience, education:education, skills:skills, portfolio:portfolio, project:project})
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
            <div className='user-info'>
                <h1>Welcome, {userState.user.username}</h1>
                <p>{userState.user.location}</p>
            </div>
            <div className='addProfile-wrapper'>
                <div className='addProfile-left'>
                    <form className='addProfile-form'>
                        <div className='form-control'>
                            <InputLabel id="demo-simple-select-standard-label" style={{fontWeight:"900"}} className="userinput">Enter your Bio</InputLabel>
                            <TextareaAutosize
                                aria-label="empty textarea"
                                placeholder="Tell us about yourself.."
                                className="userinput"
                                minRows={5}
                                id="userbio" name="userbio" value={userBio} onChange={(e)=>{setUserBio(e.target.value)}}
                                />
                        </div>
                        
                        <div className='form-control'>
                            <InputLabel id="demo-simple-select-standard-label" style={{fontWeight:"900"}} className="userinput">Work Experience</InputLabel>
                            {workExperience.map((item,index)=>{
                                return(
                                    <div className='workExperience-div' key={index}>
                    
                                        <TextField className="userinput" label='Job Title' name="jobTitle" placeholder="Enter Job Title" value={item.jobTitle} onChange={e => handleWorkExpChange(e, index)}  multiline variant="standard" />

                                        <TextField className="userinput" label='Company Name' name="company" placeholder="Enter Company Name" value={item.company} onChange={e => handleWorkExpChange(e, index)}  multiline variant="standard" />

                                        <TextField className="userinput" label='City' name="city" placeholder="Enter City" value={item.city} onChange={e => handleWorkExpChange(e, index)}  multiline variant="standard" />

                                        <div className='job-period'>
                                            <div className='start-date'>
                                                <InputLabel id="demo-simple-select-standard-label" className="userinput">Start Year</InputLabel>
                    
                                                <TextField className="userinput" label='Enter Start Year' name="startDate" placeholder="ex: 2016" value={item.startDate} onChange={e => handleWorkExpChange(e, index)}  multiline variant="standard" />
                                            </div>
                                            <div className='end-date'>
                                                <InputLabel id="demo-simple-select-standard-label" className="userinput">End Year</InputLabel>

                                                <TextField className="userinput" label='Enter End Year' name="endDate" placeholder="ex: 2016" value={item.endDate} onChange={e => handleWorkExpChange(e, index)}  multiline variant="standard" />
                                            </div>

                                            <InputLabel style={{fontWeight:"900"}} id="demo-simple-select-standard-label" className="userinput">Work Description</InputLabel>
                                            <TextareaAutosize
                                                aria-label="empty textarea"
                                                placeholder="Work Description"
                                                className="userinput"
                                                minRows={5}
                                                id="workDescription" name="workDescription" value={item.workDescription} onChange={e => handleWorkExpChange(e, index)}
                                                />
                                        </div>
                                        
                                        <div className="btn-box">
                                            {workExperience.length !== 1 && (
                                            <button className='removeBtn' onClick={() => handleWorkExpRemove(index)}>Remove <HighlightOffIcon /></button> 
                                            )}
                                            {workExperience.length - 1 === index && <button className='addMore' onClick={handleWorkExpAdd}>Add <AddCircleIcon /></button>}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className='form-control'>
                            <InputLabel style={{fontWeight:"900"}} id="demo-simple-select-standard-label" className="userinput">Education</InputLabel>
                            {education.map((item,index)=>{
                                return(
                                    <div className='education-div' key={index}>

                                        <InputLabel id="demo-simple-select-standard-label" className="userinput">Level of Education</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="eduLevel"
                                            name="eduLevel"
                                            label="Education Level"
                                            value={item.eduLevel}
                                            onChange={e => handleEduChange(e, index)}
                                            className="select-education"
                                            >
                                            <MenuItem value="">
                                                <em>Select an Option</em>
                                            </MenuItem>
                                            <MenuItem value="secondary">
                                                Secondary (10th Pass)
                                            </MenuItem>
                                            <MenuItem value="higherSecondary">
                                                Hgher Secondary (12th Pass)
                                            </MenuItem>
                                            <MenuItem value="diplomo">
                                                Diplomo
                                            </MenuItem>
                                            <MenuItem value="bachelor">
                                                Bachelor's
                                            </MenuItem>
                                            <MenuItem value="master">
                                                Master's
                                            </MenuItem>
                                            <MenuItem value="doctorate">
                                                Doctorate
                                            </MenuItem>
                                        </Select>
                    
                                        <TextField className="userinput" label='Education Type' name="educationType" placeholder="Ex: B.E" value={item.educationType} onChange={e => handleEduChange(e, index)}  multiline variant="standard" />

                                        <TextField className="userinput" label='Field of Study' name="fieldStudy" placeholder="Enter Field Study" value={item.fieldStudy} onChange={e => handleEduChange(e, index)}  multiline variant="standard" />

                                        <TextField className="userinput" label='college / university' name="clg" placeholder="Enter College / University" value={item.clg} onChange={e => handleEduChange(e, index)}  multiline variant="standard" />

                                        <TextField className="userinput" label='Location' name="location" placeholder="College / University Location" value={item.location} onChange={e => handleEduChange(e, index)}  multiline variant="standard" />

                                        <div className='job-period'>
                                            <div className='start-date'>
                                                <InputLabel id="demo-simple-select-standard-label" className="userinput">Enter Start Year</InputLabel>
                    
                                                <TextField className="userinput" label='Start Year' name="startDate" placeholder="ex: 2016" value={item.startDate} onChange={e => handleEduChange(e, index)}  multiline variant="standard" />
                                            </div>
                                            <div className='end-date'>
                                                <InputLabel id="demo-simple-select-standard-label" className="userinput">Enter End Year</InputLabel>

                                                <TextField className="userinput" label='End Year' name="endDate" placeholder="ex: 2016" value={item.endDate} onChange={e => handleEduChange(e, index)}  multiline variant="standard" />
                                            </div>
                                        </div>
                                        
                                        <div className="btn-box">
                                            {education.length !== 1 && (
                                            <button className='removeBtn' onClick={() => handleEduRemove(index)}>Remove <HighlightOffIcon /></button> 
                                            )}
                                            {education.length - 1 === index && <button className='addMore' onClick={handleEduAdd}>Add <AddCircleIcon /></button>}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className='form-control'>
                            <InputLabel style={{fontWeight:"900"}} id="demo-simple-select-standard-label" className="userinput">Skills</InputLabel>
                            {skills.map((item,index)=>{
                                return(
                                    <div className='skills-div' key={index}>
                                        <TextField className="userinput" label='Enter a Skill' placeholder='ex: Javascript' id="skill" name="skill" value={item.skill} onChange={e => handleSkillsChange(e, index)} multiline variant="standard" />
                                        
                                        <div className="btn-box">
                                            {skills.length !== 1 && (
                                            <button className='removeBtn' onClick={() => handleSkillsRemove(index)}>Remove <HighlightOffIcon /></button> 
                                            )}
                                            {skills.length - 1 === index && <button className='addMore' onClick={handleSkillsAdd}>Add <AddCircleIcon /></button>}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className='form-control'>
                            <InputLabel style={{fontWeight:"900"}} id="demo-simple-select-standard-label" className="userinput">Online Portfolio</InputLabel>
                            <TextField className="userinput" label='Enter Online Portfolio' placeholder='Ex: https://www.digitalportfolio.com' id="portfolio" name="portfolio" value={portfolio} onChange={(e)=>{setPortfolio(e.target.value)}}  multiline variant="standard" />
                        </div>

                        <div className='form-control'>
                            <InputLabel style={{fontWeight:"900"}} id="demo-simple-select-standard-label" className="userinput">Projects</InputLabel>
                            {project.map((item,index)=>{
                                return(
                                    <div className='projects-div' key={index}>
                    
                                        <TextField className="userinput" label='Project Title' name="projectTitle" placeholder="Enter Project Title" value={item.projectTitle} onChange={e => handleProjectChange(e, index)}  multiline variant="standard" />

                                        <TextField className="userinput" label='URL' name="projectUrl" placeholder="Enter Project URL" value={item.projectUrl} onChange={e => handleProjectChange(e, index)}  multiline variant="standard" />

                                        <InputLabel id="demo-simple-select-standard-label" className="userinput">Project Description</InputLabel>
                                        <TextareaAutosize
                                            aria-label="empty textarea"
                                            placeholder="Enter Project Description"
                                            className="userinput"
                                            minRows={5}
                                            id="projectDesc" name="projectDesc" value={item.projectDesc} onChange={e => handleProjectChange(e, index)}
                                            />
                                        
                                        <div className="btn-box">
                                            {project.length !== 1 && (
                                            <button className='removeBtn' onClick={() => handleProjectRemove(index)}>Remove <HighlightOffIcon /></button> 
                                            )}
                                            {project.length - 1 === index && <button className='addMore' onClick={handleProjectAdd}>Add <AddCircleIcon /></button>}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className='form-control'>
                            <button className='upload-resume' type="submit" onClick={handleProfileSubmit}>Edit Profile</button>
                        </div>
                    </form>
                </div>
                <div className='addProfile-right'>
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
          </div>
      </section>
  )
}

export default AddProfile