import React,{useState, useEffect} from 'react';
import { useGlobalContext } from './context';

const RecruiterDashboard = () => {
  const {userState, isUserLoggedIn, userDispatch} = useGlobalContext()

    useEffect(()=>{
      if(!userState.isUserAuthenticated){
        isUserLoggedIn()
      }
  },[])
  return <div>
      hai from recruiter dashboard
  </div>;
};

export default RecruiterDashboard;
