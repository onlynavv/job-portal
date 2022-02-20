import React,{useState} from 'react';
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
// import {nanoid} from "nanoid"

const validateFormSchema = yup.object({
    jobtitle: yup.string().required('Please fill the Job Title'),
    workexperience: yup.string().required('Please fill the Work Experience'),
    salary: yup.string().required('Please fill the Salary'),
    jobtype: yup.string().required("Please fill the Job Type"),
    applicants: yup.string().required("Please fill the No of Applicants to apply"),
    positions: yup.string().required("Please fill the no of positions called for")
})

const AddJobListing = () => {

    const [dateValue, setDateValue] = useState(new Date())
    const [skillsetList,setSkillsetList] = useState([{skillname:"", experience:""}])

    const handleDateChange = (e) => {
        setDateValue(e)
  }

  const handleSkillChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...skillsetList];
    list[index][name] = value;
    setSkillsetList(list);
  };

  // handle click event of the Remove button
  const handleSkillRemove = index => {
    const list = [...skillsetList];
    list.splice(index, 1);
    setSkillsetList(list);
  };

  // handle click event of the Add button
  const handleSkillAdd = () => {
    setSkillsetList([...skillsetList, { skillname: "", experience: "" }]);
  };

     const {handleBlur, handleChange, handleSubmit, errors, values, touched} = useFormik(
        {
            initialValues:{jobtitle:"", workexperience:"", salary:"", jobtype:"none", applicants:"", positions:""},
            validationSchema: validateFormSchema,
            onSubmit: (values) => {
                createJob(values)
            }
        }
    )

    const createJob = (values) => {
    console.log({...values, deadline: moment(dateValue).unix(), skillset: skillsetList.pop()})
    // fetch('https://fitness-logger-node-app.herokuapp.com/workouts/user/signup', {
    //     method:'POST',
    //     headers: { "Content-Type": "application/json"},
    //     body: JSON.stringify(values)
    // })
  }

  return (
    <div className='addJobListing'>
        <h1>Add Job Listings</h1>
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
                <InputLabel id="demo-simple-select-standard-label" className="userInput">Required Skillset</InputLabel>
                {skillsetList.map((item,index)=>{
                    return(
                        <div className='skill-div' key={index}>
                            <input name="skillname" placeholder="Enter Skill Name" value={item.skillname} onChange={e => handleSkillChange(e, index)} />
                            
                            <input name="experience" placeholder="Enter Experience Required" value={item.experience} onChange={e => handleSkillChange(e, index)} />
                            
                            <div className="btn-box">
                                {skillsetList.length !== 1 && (
                                <button onClick={() => handleSkillRemove(index)}>Remove</button> 
                                )}
                                {skillsetList.length - 1 === index && <button onClick={handleSkillAdd}>Add</button>}
                            </div>
                        </div>
                    )
                })}
            </div>
            <Button className="submitBtn" variant="contained" size="medium"  type="submit">Add Job</Button>
        </form>
    </div>
)
};

export default AddJobListing;
