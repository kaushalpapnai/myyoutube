import React, { useEffect } from 'react'
import ChatMassege from './ChatMassege'
import { useDispatch, useSelector } from 'react-redux'
import { addMessages } from '../Utils/chatSlice'
import { generate, makeString } from '../Utils/helper'

const LiveChat = () => {
   const dispatch = useDispatch()
   const chatMessages = useSelector((store)=>store.chat.messages)

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
    <div 
     className='ml-2 p-2 w-full h-[550px] border border-black bg-gray-300 rounded-lg overflow-y-scroll flex flex-col-reverse'
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
  )
}

export default LiveChat