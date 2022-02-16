import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useFormik } from 'formik'
import * as yup from 'yup';
import { useHistory } from 'react-router-dom'

const validateFormSchema = yup.object({
    username: yup.string().required('Please fill the Username'),
    email: yup.string().min(5,"need a longer email address").required('plz fill email address').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "pattern not matched"),
    password: yup.string().min(5, "need a longer password").max(12, "too much password").required("fill password!!"),
    location: yup.string().required("Please fill your location"),
    role: yup.string().required("Please select your role")
})

const Register = ({showRegisterForm,setShowRegisterForm}) => {

    const history = useHistory()

    const {handleBlur, handleChange, handleSubmit, errors, values, touched} = useFormik(
        {
            initialValues:{username:"",email:"",password:"",role:"", location:""},
            validationSchema: validateFormSchema,
            onSubmit: (values) => {
                registerUser(values)
            }
        }
    )

    const registerUser = async(values) => {

        try{
            const resp = await fetch('http://localhost:9000/job/user/signup', {
            method:'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(values)
        })
        if(resp.ok){
                    history.push("/")
                }
        }catch(error){
                console.warn(error.toString())
            }
        
        console.log(values)
  }

  return (
            <div>
                <h1>Register</h1>
                
                        <form className='form-wrapper' onSubmit={handleSubmit}>
                            <div className="form-control">
                                <TextField className="userInput" label='Username' placeholder='Enter Username' id="username" name="username" value={values.username} error={errors.username && touched.username} helperText={errors.username && touched.username && errors.username} onChange={handleChange} onBlur={handleBlur} multiline variant="standard" />
                            </div>
                            <div className="form-control">
                                <TextField className="userInput" label='Email Address' placeholder='Enter Email Address' id="email" name="email" value={values.email} error={errors.email && touched.email} helperText={errors.email && touched.email && errors.email} onChange={handleChange} onBlur={handleBlur} multiline variant="standard" />
                            </div>
                            <div className="form-control">
                                <TextField className="userInput" label='Password' placeholder='Enter Password' id="password" name="password" value={values.password} error={errors.password && touched.password} helperText={errors.password && touched.password && errors.password} onChange={handleChange} onBlur={handleBlur} multiline variant="standard" />
                            </div>
                            <div className="form-control">
                                <InputLabel id="demo-simple-select-standard-label" className="userInput">Choose Role</InputLabel>
                                <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="role"
                                        name="role"
                                        label="Role"
                                        value={values.role}
                                        onChange={handleChange}
                                        error={errors.role && touched.role}
                                        onBlur={handleBlur}
                                        >
                                        <MenuItem value="none">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="jobseeker">
                                            Job Seeker
                                        </MenuItem>
                                        <MenuItem value="recruiter">
                                            Recruiter
                                        </MenuItem>
                                    </Select>
                            </div>
                            <div className="form-control">
                                <TextField className="userInput" label='Location' placeholder='Enter Location' id="location" name="location" value={values.location} error={errors.location && touched.location} helperText={errors.location && touched.location && errors.location} onChange={handleChange} onBlur={handleBlur} multiline variant="standard" />
                            </div>
                            <Button className="submitBtn" variant="contained" size="medium"  type="submit">Create User</Button>
                        </form>
                
                <h4>
                    <span className='signup-gray'>Already have an account?</span>
                    <span className='signup-link' onClick={()=>setShowRegisterForm(!showRegisterForm)}>Sign In</span>
                </h4>
            </div>
)
};

export default Register;
