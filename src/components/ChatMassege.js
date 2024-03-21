import React from 'react'

const ChatMassege = ({name,message}) => {
  return (
    <>
      <div className='flex  m-2 ' >
        <img  
        className='h-6 border rounded-full' 
        alt='profile' 
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhYHVdJT_dSqg0U4nhLN17DY9Rz9vb6mFyZRO77CFja8Wtw1nDyHCUVsgbBLDy9YVYruc&usqp=CAU'
        />
        <span className='text-gray-400 font-medium px-2 ml-1 text-sm'>{name}</span>
        <span className='text-sm font-normal text-gray-800'> {message}</span>
      </div>
    
    </>
  )
}

export default ChatMassege