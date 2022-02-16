import React,{useContext, useReducer, useState} from "react";
import { UserReducer } from "./UserReducer";
import { UsersState } from "./UsersState";

const AppContext = React.createContext()

const AppProvider = ({children}) => {

    const [jobfeed, setJobfeed] = useState([])

    // user functions
    const isUserLoggedIn = () => {
        const token = JSON.parse(localStorage.getItem("token"))
        if(token){
            const userFromDB = JSON.parse(localStorage.getItem("user"))
            userDispatch({type:"SET_USER", payload:{token, userFromDB}})
        }
    }

    const getJobListing = () => {
        fetch('http://localhost:9000/job/joblisting/getUserJobListing', {
            method:'GET',
            headers: { "Content-Type": "application/json"}})
    .then((data)=> data.json())
    .then((item)=> setJobfeed(item))
    }

    // user useReducer
    const [userState, userDispatch] = useReducer(UserReducer, UsersState)

    console.log(userState)

    return(
        <AppContext.Provider value={{userState, userDispatch, isUserLoggedIn, getJobListing, jobfeed}}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppProvider}