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
    <div className='w-fit border  relative rounded-tl-2xl rounded-tr-2xl shadow-lg'>
       <div className='left-0 right-0 absolute h-14  bg-white border border-b-gray-300  rounded-tl-2xl rounded-tr-2xl'>hello</div>
       <div 
        className='ml-2 p-2 h-[550px] z-0  shadow-lg  overflow-y-scroll flex flex-col-reverse'
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
      <div className='w- p-2 ml-2 border border-black'>
        <input className='w-96 ' type='text' value={myMessage} onChange={(e)=>handleChange(e)}></input>
        <button className='px-2 mx-2 bg-red-200' onClick={()=>handleClick()}>Send</button>
      </div>
    </div>
    
    </>
  )
}

export default LiveChat