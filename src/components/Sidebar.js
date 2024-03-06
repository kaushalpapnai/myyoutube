import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toggleMenu } from '../Utils/appSlice'

const Sidebar = () => {

  const appSlice = useSelector((store)=>store.app.isMenuOpen) 

  // Early return 
  if(!appSlice) return null



  return (
    <div className='p-5 shadow-lg w-44  mt-14 fixed h-full bg-white'>
      
      <ul className='py-5'>
        <Link to="/"><li>Home</li></Link>
        <li className='my-2'>shorts</li>
        <li className='my-2'>subcribtions</li>
        <li className='my-2'>youtube Music</li>
      </ul>

      <h1 className='font-bold my-1'>subcribtions</h1>
      <ul className='py-1'>
        <li className='my-2'>sample</li>
        <li className='my-2'>sample</li>
        <li className='my-2'>sample</li>
        <li className='my-2'>sample</li>
      </ul>

      <h1 className='font-bold mt-4 my-2'>Explore</h1>
      <ul>
         <li className='my-2'>Trending</li>
         <li className='my-2'>Shopping</li>
         <li className='my-2'>Music</li>
         <li className='my-2'>Live</li>
      </ul>

    </div>
  )
}

export default Sidebar