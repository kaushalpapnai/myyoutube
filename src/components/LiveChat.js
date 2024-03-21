import React, { useEffect , useState} from 'react'
import ChatMassege from './ChatMassege'
import { useDispatch, useSelector } from 'react-redux'
import { addMessages } from '../Utils/chatSlice'
import { generate, makeString } from '../Utils/helper'

const LiveChat = () => {
   const dispatch = useDispatch()
   const chatMessages = useSelector((store)=>store.chat.messages)
   const [myMessage,setMyMessage] = useState("")
   const [liveChatToggle,setLiveChatToggle] = useState(false)

   const handleChange=(e)=>{
     setMyMessage(e.target.value)
   }

   const handleChatToggle=()=>{
      if(liveChatToggle == false){
        setLiveChatToggle(true)
      }
      else if(liveChatToggle == true){
        setLiveChatToggle(false)
      }
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
   { liveChatToggle ? <div className='w-[26rem] relative rounded-2xl rounded-tr-2xl shadow-sm  ml-3'>
       <div className='left-0 right-0 absolute flex justify-between h-13  bg-white border border-b-gray-300  rounded-tl-2xl rounded-tr-2xl text-lg'>
          <span className='ml-6 mt-3'>Chat</span>
          <button onClick={()=>handleChatToggle()}>
            <img 
             className='h-10 w-10 m-2'
             src='https://static.thenounproject.com/png/3015892-200.png'
             >
             </img>
          </button>
       </div>
       <div 
        className=' p-2 h-[32rem] overflow-y-scroll flex flex-col-reverse border rounded-t-2xl'
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
      <div className=' p-2 flex items-cente border-t-gray-300 border justify-center items-center'>
        <input className='w-[20rem] m-2 border bg-red-50  rounded-full focus:outline-none h-[2.3rem] p-3' type='text' value={myMessage} placeholder='Chat...' onChange={(e)=>handleChange(e)}></input>
        <button className='px-2 mx-2 hover:bg-red-50 rounded-full h-10 w-10 flex justify-center items-center' onClick={()=>handleClick()}>
            <img  
            src='https://static-00.iconduck.com/assets.00/send-icon-2048x1863-u8j8xnb6.png' 
            alt='image'
            className='h-5 w-5'
            >
            </img>
        </button>
      </div> 

    </div> : <button className='w-[26rem] border border-gray-300   h-9 hover:bg-red-50 rounded-2xl rounded-tr-2xl shadow-sm  ml-3'
      onClick={()=>handleChatToggle()}
      >show chat
    </button>
    }
    
    </>
  )
}

export default LiveChat