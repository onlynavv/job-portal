import React,{useEffect} from "react"
import AuthPage from "./AuthPage";
import { useGlobalContext } from "./context";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import User from "./User";
import Admin from "./Admin";

function App() {

  const {userState, isUserLoggedIn} = useGlobalContext()

  const {user} = userState
  console.log(user)

  // useEffect(()=>{
  //     if(!userState.isUserAuthenticated){
  //       isUserLoggedIn()
  //     }
  // },[])

  return (
    <div className="App">
      {!userState.isUserAuthenticated ? ( 
        <Router>
          <Route exact path="/">
            <AuthPage />
          </Route>
        </Router>) : (
          (user && user.role === "jobseeker" && <User />) || (user && user.role === "recruiter" && <Admin />)
        )
      }
    </div>
  );
}

export default App;
