import React, { useEffect , useState} from 'react'
import ChatMassege from './ChatMassege'
import { useDispatch, useSelector } from 'react-redux'
import { addMessages } from '../Utils/chatSlice'
import { generate, makeString } from '../Utils/helper'

const LiveChat = () => {
   const dispatch = useDispatch()
   const chatMessages = useSelector((store)=>store.chat.messages)
   const [myMessage,setMyMessage] = useState("")

   const handleChange=(e)=>{
     setMyMessage(e.target.value)
   }

   const handleClick=()=>{
     dispatch(addMessages({
        name: "kaushal",
        message: myMessage
     }))
     setMyMessage(" ")
   }

   useEffect(()=>{
     const i = setInterval(()=>{
           dispatch(
             addMessages({
                 name: generate(),
                 message: makeString(20)
             })
           )
      },2000)
      

      return ()=> clearInterval(i);
   },[])

  return (
    <>
    <div 
     className='ml-2 p-2 w-full h-[550px] border border-gray-200 shadow-lg rounded-2xl overflow-y-scroll flex flex-col-reverse'
    >
       
        {
            chatMessages.map((items,i)=>(
                <ChatMassege
                  key={i}
                  name={items.name}
                  message={items.message}
                />
            ))
        }
    </div>
    <div className='w-full p-2 ml-2 border border-black'>
        <input className='w-96 ' type='text' value={myMessage} onChange={(e)=>handleChange(e)}></input>
        <button className='px-2 mx-2 bg-red-200' onClick={()=>handleClick()}>Send</button>
     </div>
    
    </>
  )
}

export default LiveChat