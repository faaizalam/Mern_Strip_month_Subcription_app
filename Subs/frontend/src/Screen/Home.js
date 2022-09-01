import React, { useState,useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Axios from 'axios'
import Authcontext from '../Component/Authcomp'

export const Home = () => {
    const [email,setemail]=useState('')
    const [password,setpass]=useState('')
    const [condition,setcon]=useState(false)
      const {user,setuser}=useContext(Authcontext)
    const navigate=useNavigate()
    // console.log(user)
   
 
    
    
   
   


   
    
    const submithandler=(async(e)=>{
        e.preventDefault()
       
        const {data}=await Axios.post('/postman/login',{email,password})
        if (data) {
          console.log(data)
           
          if (data.email) {
            setuser(data)
            localStorage.setItem("userinfo",JSON.stringify(data))
        
            
            
            
            
          }
          
        
          
        }else{
          console.log("no")
        }
        
    })
    
    useEffect(()=>{
      if (condition) {
        console.log(condition)
      }
      
    },[condition])
    
    useEffect(()=>{
      if (user.email) {
        navigate('/Artical')
        
      }
    },[user.email,navigate])
        
    
    const submitsig=(async(e)=>{
        e.preventDefault()
        const {data}=await Axios.post('/postman/signup',{email,password})
        if (data) {
           console.log("git")
           if (data.email) {
            
             localStorage.setItem("userinfo",JSON.stringify(data))
           }
           console.log(data)
          
          
        }else{
          console.log("no")
        }
        
    })
  
   
  return (
    <div className='mainhome'>
      
        {
            !condition?(
              <div>
  
     <form onSubmit={submithandler}>
    
        <input type="email" placeholder='type email' onChange={(e)=>setemail(e.target.value)}></input>
        <input type="password" placeholder='type password' onChange={(e)=>setpass(e.target.value)}></input>
        <button type='submit'>Login</button>

        <div onClick={()=>setcon((pre)=>!pre)}>Account alreday  dont have??</div>

        </form>
        </div>
     ):(
        <div className='logs'>

        <form onSubmit={submitsig}>
        <input type="email" placeholder='type email'  onChange={(e)=>setemail(e.target.value)}></input>
        <input type="password" placeholder='type password' onChange={(e)=>setpass(e.target.value)}></input>
        <button type='submit'>Login</button>

     <div onClick={()=>setcon((pre)=>!pre)} >already have account??</div>


     </form>
     </div>

     )
}




    </div>

  )
}
