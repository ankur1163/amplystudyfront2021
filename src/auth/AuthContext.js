import React, {createContext,useContext,useState} from "react";
import {useHistory,Route,Redirect} from 'react-router-dom';

export const authContext = createContext(null);

export function AuthProvider({children}){
    const [isUserSignedIn,setIsUserSignedIn] = useState(!!localStorage.getItem("user_token"))
    const history = useHistory();
    const signout = ()=>{
        localStorage.removeItem("user_token")
        setIsUserSignedIn(false);
        history.push("/signin")
    
    }

    return <authContext.Provider value ={{
            isUserSignedIn,
            setIsUserSignedIn,
            signout
    }}>
        {children}
        </authContext.Provider>
}

export function ProtectedRoute({children,props}){
            const context = useContext(authContext);
            return <Route {...props}>
                {context?.isUserSignedIn ? children : <Redirect to='/signin'></Redirect>}
            </Route>
}