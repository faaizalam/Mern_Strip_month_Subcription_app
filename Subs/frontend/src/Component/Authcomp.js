import React, { createContext, useEffect, useState } from 'react'

const Authcontext=createContext(null)

export const Authcomp = ({children}) => {
    const [user,setuser]=useState({})
    

    // const =localStorage.getItem("userinfo")?JSON.parse(localStorage.getItem("userinfo")):{})
    useEffect(()=>{
      setuser(localStorage.getItem("userinfo")?JSON.parse(localStorage.getItem("userinfo")):{})
        
      // }
    
      
    },[])
    console.log(user)
    

  return (
    <Authcontext.Provider value={{user,setuser}}>
        {children}
    </Authcontext.Provider>
  )
}

export default Authcontext