import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toggleMenu } from '../Utils/appSlice'

const Sidebar = () => {

  const appSlice = useSelector((store)=>store.app.isMenuOpen) 

  // Early return 
  if(!appSlice) return null



  return (
    <div className='p-5 shadow-lg w-44'>
      
      <ul className='py-5'>
        <Link to="/"><li>Home</li></Link>
        <li>shorts</li>
        <li>subcribtions</li>
        <li>youtube Music</li>
      </ul>

      <h1 className='font-bold my-1'>subcribtions</h1>
      <ul className='py-1'>
        <li>sample</li>
        <li>sample</li>
        <li>sample</li>
        <li>sample</li>
      </ul>

      <h1 className='font-bold mt-4 my-2'>Explore</h1>
      <ul>
         <li>Trending</li>
         <li>Shopping</li>
         <li>Music</li>
         <li>Live</li>
      </ul>

    </div>
  )
}

export default Sidebar