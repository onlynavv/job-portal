import React,{useState, useEffect} from 'react'
import CampaignCard from './CampaignCard'
import { useGlobalContext } from './context'
import "./OngoingCampaign.css"

const OngoingCampaign = () => {

    const {userState, isUserLoggedIn, userDispatch} = useGlobalContext()

    useEffect(()=>{
      if(!userState.isUserAuthenticated){
        isUserLoggedIn()
      }
  },[])

    console.log(userState)

    console.log(userState.user.email)

    const [ongoingCampaign, setOngoingCampaign] = useState([])

    const getOngoingCampaignList = () =>{
        fetch(`http://localhost:9000/job/joblisting/getOngoingCampaigns/${userState.user.email}`,{
            method:'GET',
            headers: { "Content-Type": "application/json", "x-auth-token":userState.user.token}}
            )
    .then((data)=> data.json())
    .then((item)=> setOngoingCampaign(item))
    }

    useEffect(()=>{
        getOngoingCampaignList()
  },[])

  console.log(ongoingCampaign)

  return (
    <section className='ongoingCampaign-section'>
        <div className='container'>
            <h1>OngoingCampaigns</h1>
            {ongoingCampaign.length> 0 && ongoingCampaign.map((item)=>{
                return(
                    <CampaignCard key={item._id} {...item} getOngoingCampaignList={getOngoingCampaignList} />
                )
            })}
        </div>
    </section>
  )
}

export default OngoingCampaign