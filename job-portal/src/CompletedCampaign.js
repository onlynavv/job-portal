import React,{useState, useEffect} from 'react'
import { useGlobalContext } from './context'
import CampaignCard from './CampaignCard'

const CompletedCampaign = () => {

  const {userState, isUserLoggedIn, userDispatch} = useGlobalContext()

  useEffect(()=>{
      if(!userState.isUserAuthenticated){
        isUserLoggedIn()
      }
  },[])

  const [completedCampaign, setCompletedCampaign] = useState([])

  const getCompletedCampaignList = () => {
    fetch(`https://job-portal-node-app.herokuapp.com/job/joblisting/getCompletedCampaigns/${userState.user.email}`,{
            method:'GET',
            headers: { "Content-Type": "application/json", "x-auth-token":userState.user.token}}
            )
    .then((data)=> data.json())
    .then((item)=> setCompletedCampaign(item))
  }

  useEffect(()=>{
    getCompletedCampaignList()
  },[])

  console.log(completedCampaign)

  return (
    <section className='ongoingCampaign-section'>
        <div className='container'>
            <h1>Completed Campaigns</h1>
            {completedCampaign.length> 0 && completedCampaign.map((item)=>{
                return(
                    <CampaignCard key={item._id} {...item} getCompletedCampaignList={getCompletedCampaignList} />
                )
            })}
        </div>
    </section>
  )
}

export default CompletedCampaign