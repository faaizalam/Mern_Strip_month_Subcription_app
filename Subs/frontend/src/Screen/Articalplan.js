import  Axios  from 'axios'
import React, { useEffect, useState } from 'react'

export const Articalplan = () => {
  const [email,setemail]=useState('')
  const [mg,setmg]=useState('')
  const [datas,setdata]=useState([])
  const [scren,setscreen]=useState(false)
  const emailhand=(async(e)=>{
    e.preventDefault()
    setscreen(true)
    try {
      const {data}=await Axios.post('/postman/subsend',{email})
      if (data) {
       setdata(data)
       console.log(data)
      }else{
       console.log("no")
      }
      
    } catch (error) {
      setmg(error.response?error.response.data.message:error.message)
      
    }
  })

  return (
    <div className='mains'>
      
          
        
          {!scren &&
        <form >
          <fieldset>

          <legend>
           Email to get Subscriptions
          </legend>
          <input type='email' placeholder='enter the name' onChange={(e)=>setemail(e.target.value)}></input>
          </fieldset>
         
          <button onClick={(e)=>emailhand(e)} >Click</button>

          
        </form>
}
        
        {
          scren&&mg?(<div>{mg}</div>):datas?(
            datas.map((x)=>(
              <div key={x._id} className="maincat">
                <ul>
                 <li>{x.access}</li> 
                 <li><img src={x.imageUrl} alt="pic" ></img></li> 
                 <li>{x.content}</li> 

                  </ul>
                </div>

            ))
          ):<div>no data</div>
        } 
        
      </div>
    
  )
}
