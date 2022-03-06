import React,{useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Register from './Register';
import { useGlobalContext } from './context';
import { useHistory } from 'react-router-dom';

const Login = () => {

    const {userState, isUserLoggedIn, userDispatch} = useGlobalContext()

    const history = useHistory()

    useEffect(()=>{
      if(!userState.isUserAuthenticated){
        isUserLoggedIn()
      }
  },[])

    const [singleUser,setSingleUser] = useState({email:'',password:''})
    const [showRegisterForm,setShowRegisterForm] = useState(false)

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
        
        setSingleUser(data.userFromDB.email)

        if(resp.ok){
            const {userFromDB} = data
            localStorage.setItem("token", JSON.stringify(userFromDB.token))
            localStorage.setItem("user", JSON.stringify(userFromDB.email))
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
          <div>
            <h1>Login In</h1>
            <form className='form-wrapper'>
                <div className='form-control'>
                    <label>Enter Email Address</label>
                    <input type="email" placeholder="enter your email address" value={singleUser.email} onChange={handleChange} id="email" name="email"></input>
                </div>
                <div className="form-control">
                    <label>Enter Password</label>
                    <input type="password" placeholder="enter your password" value={singleUser.password} onChange={handleChange} id="password" name="password"></input>
                </div>
                <Button className="submitBtn" variant="contained" size="medium" onClick={handleLogin}>login</Button>
            </form>
            <h4>
                <span className='signup-gray'>New to Job Portal?</span>
                <span className='signup-link' onClick={()=>setShowRegisterForm(!showRegisterForm)}> Sign Up!!</span>
            </h4>
        </div>
      )
    }
    </>
)
};

export default Login;
