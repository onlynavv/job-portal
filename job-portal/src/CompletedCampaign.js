import React,{useState, useEffect} from 'react'
import { useGlobalContext } from './context'

const CompletedCampaign = () => {

  const {userState, isUserLoggedIn, userDispatch} = useGlobalContext()

  const [completedCampaign, setCompletedCampaign] = useState([])

  useEffect(()=>{
    fetch(`http://localhost:9000/job/joblisting/getCompletedCampaigns/${userState.user.email}`,{
            method:'GET',
            headers: { "Content-Type": "application/json", "x-auth-token":userState.user.token}}
            )
    .then((data)=> data.json())
    .then((item)=> setCompletedCampaign(item))
  },[])

  console.log(completedCampaign)

  return (
    <div>CompletedCampaign</div>
  )
}

export default CompletedCampaign