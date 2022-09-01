import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { Artical } from '../Screen/Artical'
import Authcontext from './Authcomp'

export const ProtectedRouter = ({children}) => {
    const {user,setuser}=useContext(Authcontext)
  
     const rr= user.email?children:<Navigate to='/'></Navigate>
    return rr
}
