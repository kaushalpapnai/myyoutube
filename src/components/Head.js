import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleMenu } from '../Utils/appSlice';

const Head = () => {
    const dispatch = useDispatch();
    const handleClick=()=>{
       dispatch(toggleMenu())
    }
  return (
    <>  
    <div className='grid grid-flow-col p-2 m-2 shadow-lg'>
     <div className='flex col-span-1 '>
         <img 
         onClick={()=>{handleClick()}}
         className='h-8 mx-4 cursor-pointer' 
         alt='menu' 
         src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/800px-Hamburger_icon.svg.png'
         />
         <img  className='h-8' alt='youtube-logo' src='https://t3.ftcdn.net/jpg/05/07/46/84/240_F_507468479_HfrpT7CIoYTBZSGRQi7RcWgo98wo3vb7.jpg'/>

     </div>
     <div className='col-span-10 flex justify-center'>
          <input
             className='w-1/2 border border-gray-400 p-2 rounded-l-full'
             type='text'
             placeholder='search'
          />
          <button className='border border-gray-400 p-2 rounded-r-full bg-gray-100'>search</button>
     </div>
     <div className='col-span-1 flex justify-center'>
        <img  className='h-8' alt='profile' src='https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo.png'/>
     </div>

    </div>
    </>
  )
}

export default Head