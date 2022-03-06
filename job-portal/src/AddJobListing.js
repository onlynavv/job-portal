import React,{useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik'
import * as yup from 'yup';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import { useGlobalContext } from './context';
import { useHistory } from 'react-router-dom';
import "./AddJobListing.css"

const validateFormSchema = yup.object({
    jobtitle: yup.string().required('Please fill the Job Title'),
    workexperience: yup.string().required('Please fill the Work Experience'),
    salary: yup.string().required('Please fill the Salary'),
    jobtype: yup.string().required("Please fill the Job Type"),
    applicants: yup.string().required("Please fill the No of Applicants to apply"),
    positions: yup.string().required("Please fill the no of positions called for")
})

const AddJobListing = () => {

    const {userState, isUserLoggedIn, userDispatch} = useGlobalContext()

    useEffect(()=>{
      if(!userState.isUserAuthenticated){
        isUserLoggedIn()
      }
  },[])

    const history = useHistory()

    const [dateValue, setDateValue] = useState(new Date())
    const [skillsetValues, setSkillsetValues] = useState([]);
    const [skillsInitial, setSkillsInitial] = useState([])

    useEffect(()=>{
    fetch("https://job-portal-node-app.herokuapp.com/job/skillset/getSkills")
    .then((data)=> data.json())
    .then((item)=> setSkillsInitial(item))
  },[])

    const handleDateChange = (e) => {
        setDateValue(e)
  }

  const handleSkillChange = (e) => {
    setSkillsetValues(
      typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value,
    )
  }

     const {handleBlur, handleChange, handleSubmit, errors, values, touched} = useFormik(
        {
            initialValues:{jobtitle:"", workexperience:"", salary:"", jobtype:"none", applicants:"", positions:""},
            validationSchema: validateFormSchema,
            onSubmit: (values) => {
                createJob(values)
            }
        }
    )

    const createJob = async(values) => {
    // console.log({...values, deadline: moment(dateValue).unix(), personList:skillsetValues})
    // fetch('https://job-portal-node-app.herokuapp.com/job/joblisting/addJobListing', {
    //     method:'POST',
    //     headers: { "Content-Type": "application/json"},
    //     body: JSON.stringify({...values, deadline: moment(dateValue).unix(), personList:skillsetValues})
    // })
    try{
            const resp = await fetch('https://job-portal-node-app.herokuapp.com/job/joblisting/addJobListing', {
            method:'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({...values, deadline: moment(dateValue).unix(), skillsets:skillsetValues,recruiterName: userState.user.username, recruiterEmail: userState.user.email, recruiterLocation: userState.user.location})
                })
            if(resp.ok){
                
                history.push("/")
            }
        }catch(error){
            console.warn(error.toString())
        }
  }

  return (
      <section className='addJobListing-section'>
          <div className='container'>
            <h1>Add Job Listings</h1>
            <div className='addJobListing'>
            <form className='form-wrapper' onSubmit={handleSubmit}>
                    <div className='form-control'>
                        <TextField className="userInput" label='Job Title' placeholder='Enter Job Title' id="jobtitle" name="jobtitle" value={values.jobtitle} error={errors.jobtitle && touched.jobtitle} helperText={errors.jobtitle && touched.jobtitle && errors.jobtitle} onChange={handleChange} onBlur={handleBlur}  multiline variant="standard" />
                    </div>
                    <div className='form-control'>
                        <TextField className="userInput" label='Work Experience' placeholder='Experience ex: 5' id="workexperience" name="workexperience" value={values.workexperience} error={errors.workexperience && touched.workexperience} helperText={errors.workexperience && touched.workexperience && errors.workexperience} onChange={handleChange} onBlur={handleBlur}  multiline variant="standard" />
                    </div>
                    <div className='form-control'>
                        <TextField className="userInput" label='Salary' placeholder='Salary ex: 15000' id="salary" name="salary" value={values.salary} error={errors.salary && touched.salary} helperText={errors.salary && touched.salary && errors.salary} onChange={handleChange} onBlur={handleBlur}  multiline variant="standard" />
                    </div>
                    <div className="form-control">
                        <InputLabel id="demo-simple-select-standard-label" className="userInput">Choose Job Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="jobtype"
                            name="jobtype"
                            label="Job Type"
                            value={values.jobtype}
                            onChange={handleChange}
                            error={errors.jobtype && touched.jobtype}
                            onBlur={handleBlur}
                            >
                            <MenuItem value="none">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="fulltime">
                                Full Time
                            </MenuItem>
                            <MenuItem value="parttime">
                                Part Time
                            </MenuItem>
                            <MenuItem value="wfh">
                                Work From Home
                            </MenuItem>
                        </Select>
                    </div>
                    <div className='form-control'>
                        <TextField className="userInput" label='Max no of Applicants' placeholder='no of Applicants ex: 30' id="applicants" name="applicants" value={values.applicants} error={errors.applicants && touched.applicants} helperText={errors.applicants && touched.applicants && errors.applicants} onChange={handleChange} onBlur={handleBlur}  multiline variant="standard" />
                    </div>
                    <div className='form-control'>
                        <TextField className="userInput" label='Available no of positions' placeholder='available positions ex: 30' id="positions" name="positions" value={values.positions} error={errors.positions && touched.positions} helperText={errors.positions && touched.positions && errors.positions} onChange={handleChange} onBlur={handleBlur}  multiline variant="standard" />
                    </div>
                    <div className='form-control'>
                        <InputLabel id="demo-simple-select-standard-label" className="userInput">Deadline for Application</InputLabel>
                        <Calendar value={dateValue} name="date" onChange={handleDateChange}/>
                        <label>Date: {moment(dateValue).format('dddd, MMMM Do YYYY, h:mm:ss a')}</label>
                    </div>
                    
                    <div className='form-control'>
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="demo-multiple-chip-label">Required Skillset</InputLabel>
                            <Select
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            value={skillsetValues}
                            onChange={handleSkillChange}
                            input={<OutlinedInput id="select-multiple-chip" label="Select Skills" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                                </Box>
                            )}
                            
                            >
                            {skillsInitial && skillsInitial.map((item) => (
                                <MenuItem
                                key={item._id}
                                value={item.name}
                                >
                                {item.name}
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                    </div>
                    <Button className="submitBtn" variant="contained" size="medium"  type="submit">Add Job</Button>
                </form>
            </div>
          </div>
      </section>
)
};

export default AddJobListing;
