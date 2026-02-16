import React, { useState, useEffect } from 'react'
import api from "../services/api"
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const [isAuth, setisAuth] = useState(null);
    useEffect(() => {
      const checkAuth = async() =>{
        try{
            await api.get("/profile");//Protected
            setisAuth(true);
        }
        catch{
            setisAuth(false);
        }
      }
      checkAuth();
    }, [])
    if(isAuth ==null){
        return <h3>Loading...</h3>
    }
    return isAuth ? children :<Navigate to="/"/>
    
}

export default ProtectedRoute;