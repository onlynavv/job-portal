import React,{useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Register from './Register';
import { useGlobalContext } from './context';
import { useHistory } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import "./Login.css"
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Login = () => {

    const {userState, isUserLoggedIn, userDispatch} = useGlobalContext()

    const history = useHistory()

    const [singleUser,setSingleUser] = useState({email:'',password:''})
    const [showRegisterForm,setShowRegisterForm] = useState(false)

    const [show, setShow] = useState(false)

    const demoShow = {
        display: show ? 'block' : 'none'
    }

    const expandMoreStyle = {
        transform: !show ? 'rotate(0deg)' : 'rotate(180deg)',
        transition: 'all 0.5s ease'
    }

    const demoUserLogin = (e) => {
        e.preventDefault()
        setSingleUser({email:"naveen@gmail.com", password:"Password@123"})
    }

    const demoAdminLogin = (e) => {
        e.preventDefault()
        setSingleUser({email:"tester@gmail.com", password:"Welcome@123"})
    }

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setSingleUser({...singleUser, [name]:value})
    }

    const setUser = (userFromDB) => {
    userDispatch({type:"SET_USER", payload:{userFromDB}})
  }

    const handleLogin = async() => {
        try{
            const resp = await fetch('https://job-portal-node-app.herokuapp.com/job/user/login', {
            method:'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(singleUser)
                })

        const data = await resp.json()

        console.log(data)
        
        setSingleUser(data.userFromDB.email)

        if(resp.ok){
            const {userFromDB} = data
            localStorage.setItem("token", JSON.stringify(userFromDB.token))
            localStorage.setItem("user", JSON.stringify(userFromDB))
            localStorage.setItem("role", JSON.stringify(userFromDB.role))
            console.log(userFromDB)
            setUser(userFromDB)
            history.push("/")
            setSingleUser({email:'',password:''})
            console.log("login success")

        }else{
            throw new Error(data.msg)
        }
        }

        catch(error){
            console.warn(error.toString())
        }
    }

  return (
      <>
      {showRegisterForm ? (
          <Register showRegisterForm={showRegisterForm} setShowRegisterForm={setShowRegisterForm} />
      ) : (
    <section className='userLogin-section'>
        <div className='container userLogin-wrapper'>
        <Card className="form-card">
            <CardContent className="form-cardContent">
            <h1>Login In</h1>
            <form className='form-wrapper'>
                <div className='form-control form-login'>
                    <label>Enter Email Address</label>
                    <input type="email" className='userLogin' placeholder="enter your email address" value={singleUser.email} onChange={handleChange} id="email" name="email"></input>
                </div>
                <div className="form-control form-login">
                    <label>Enter Password</label>
                    <input type="password" className='passwordLogin' placeholder="enter your password" value={singleUser.password} onChange={handleChange} id="password" name="password"></input>
                </div>
                <Button className="submitBtn" variant="contained" size="medium" onClick={handleLogin}>login</Button>
            </form>
            <h4>
                <span className='signup-gray'>New to Job Portal?</span>
                <span className='signup-link' onClick={()=>setShowRegisterForm(!showRegisterForm)}> Sign Up!!</span>
            </h4>
            <div className='demo-credentials'>
                <div className='demo-credentials-header'>
                    <h4>Demo Credentials</h4>
                    <IconButton onClick={()=>{setShow(!show)}}>
                        <ExpandMoreIcon style={expandMoreStyle} />
                    </IconButton>
                </div>
                <div style={demoShow}>
                    <Button onClick={(e)=>demoUserLogin(e)}>User Login</Button>
                    <Button onClick={(e)=>demoAdminLogin(e)}>Admin Login</Button>
                </div>
            </div>
            </CardContent>
        </Card>
        </div>
    </section>
      )
    }
    </>
)
};

export default Login;
