import React from 'react'

const ChatMassege = ({name,message}) => {
  return (
    <>
      <div className='flex items-center m-2' >
        <img  
        className='h-7 border rounded-full' 
        alt='profile' 
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhYHVdJT_dSqg0U4nhLN17DY9Rz9vb6mFyZRO77CFja8Wtw1nDyHCUVsgbBLDy9YVYruc&usqp=CAU'
        />
        <span className='font-bold px-2'>{name}</span>
        <span>{message}</span>
      </div>
    
    </>
  )
}

export default ChatMassege