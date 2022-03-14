import React,{useState, useEffect} from 'react';
import { useGlobalContext } from './context';
import "./RecruiterDashboard.css"

const RecruiterDashboard = () => {
  const {userState, isUserLoggedIn, userDispatch} = useGlobalContext()

  const [applicantsList, setApplicantsList] = useState([])

    useEffect(()=>{
      if(!userState.isUserAuthenticated){
        isUserLoggedIn()
      }
  },[])


  return(
    <section className='dashboard-section'>
          <div className='container'>
            <h1>Dashboard</h1>
          </div>
    </section>
  )
};

export default RecruiterDashboard;
