import React,{useContext, useReducer, useState} from "react";
import { UserReducer } from "./UserReducer";
import { UsersState } from "./UsersState";

const AppContext = React.createContext()

const AppProvider = ({children}) => {

    // user functions
    const isUserLoggedIn = () => {
        const token = JSON.parse(localStorage.getItem("token"))
        console.log(token)
        if(token){
            const userFromDB = JSON.parse(localStorage.getItem("user"))
            console.log(userFromDB)
            userDispatch({type:"SET_USER", payload:{userFromDB}})
        }
    }

    // user useReducer
    const [userState, userDispatch] = useReducer(UserReducer, UsersState)

    console.log(userState)

    return(
        <AppContext.Provider value={{userState, userDispatch, isUserLoggedIn}}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppProvider}