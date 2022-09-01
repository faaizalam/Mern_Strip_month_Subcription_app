import  Axios  from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Authcontext from '../Component/Authcomp'

export const Artical = () => {
  
  const {user,setuser}=useContext(Authcontext)
  const [packs,setpackages]=useState([])
  const [loadings,setloadings]=useState(false)
  const [err,seterror]=useState(null)
  const [m,setm]=useState("")
  const navigate=useNavigate()
  if (!user.email) {
    navigate('/')
    
  }
 
const logouts=(()=>{
  setuser({})
  localStorage.removeItem("userinfo")
  console.log("ll")

  navigate('/')
  
 })


 useEffect(()=>{
  const cardss=(async()=>{
    try {
      setloadings(true)
      const {data}=await Axios.get('/postman/prices')
      if (!data) {
        // console.log(data)
        console.log("no")

        
        // console.log(data)
        
      }else{
        setpackages(data)
       
        setloadings(false)
      }
      
    } catch (error) {
      setloadings(false)
      setm(error.response?error.response.data.message:error.message)
    
      
      
    }

  })

  cardss()

 },[])
 useEffect(()=>{
   console.log(packs)
 },[packs])


 const createsub=(async(price)=>{
  try {
    const {data}=await Axios.post('postman/session',{price,email:user.email})
    if (data) {
      console.log(data)
      window.location.href=data.url

    }
    
  } catch (error) {
    console.log(error)
    
  }
    
 })





 
  return (
    <div>
       articals
       <div style={{cursor:"pointer"}} onClick={logouts}>LOgoout</div>


       <div className='maincard'>
        {
          loadings?(<div>loadings...</div>):m?(<div>{m}</div>):(
            
            packs.map((x)=>(

              <div key={x.id} className='mainpack'>
                <ul>
                <div>${x.unit_amount / 100}
                </div>
                
                </ul>
               <li> {x.nickname}</li>
               <button onClick={()=>createsub(x.id)}>Buy now</button>
                </div>


            ))
          
         
          
          )

        }
     </div>

    </div>
    
  )
}
