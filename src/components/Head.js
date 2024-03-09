import React, { useEffect, useState } from 'react'
import { toggleMenu } from '../Utils/appSlice';
import { SEARCH_SUGGESION_API } from '../Utils/config';
import { useDispatch, useSelector } from 'react-redux';
import { cacheResults } from '../Utils/searchSlice';
import { Link } from 'react-router-dom';

const Head = () => {
   const [searchQuery,setSearchQuery] = useState("");
   const [suggestions,setSuggestions] = useState([]);
   const [showSuggestions,setShowSuggestions] = useState(false)
 
   const searchCache = useSelector(store => store.search) 

   const searchButton=()=>{
      window.location.href = `/results/${encodeURIComponent(searchQuery)}`;
   }

    const dispatch = useDispatch();
    const handleClick=()=>{
       dispatch(toggleMenu())
    }
   //  console.log(searchQuery)
    
   // here we use De-Bouncing method to make less api calls 
    useEffect(()=>{
      // here we are first checking that if search query's data is present in searchCache than set Suggestions searchCache other wise make the api call 
      const timer = setTimeout(()=>{
         if(searchCache[searchQuery]){
            setSuggestions(searchCache[searchQuery])
         }else{
            searchSuggestion()
         }
      }, [200])
      return () =>{
         clearTimeout(timer)
      }
    },[searchQuery])
    
    const searchSuggestion = async () =>{
       const data = await fetch(SEARCH_SUGGESION_API + searchQuery);
       const json = await data.json();
       setSuggestions(json[1])

       //update cache
       dispatch(cacheResults({
         [searchQuery]: json[1],  // we put serachquery inside array because the value is not in array but json[1] is already in array form 
       }))
    }

  return (
    <>  
    <div className='flex justify-between fixed w-full h-16 align-middle p-3 bg-white' >
     <div className='flex  '>
         <img 
         onClick={()=>{handleClick()}}
         className='h-8 mx-4 cursor-pointer' 
         alt='menu' 
         src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/800px-Hamburger_icon.svg.png'
         />
         <img  className='h-8' alt='youtube-logo' src='https://t3.ftcdn.net/jpg/05/07/46/84/240_F_507468479_HfrpT7CIoYTBZSGRQi7RcWgo98wo3vb7.jpg'/>

     </div>
     <div className='relative' >
        <div className='mr-20'>
          <input
             onChange={(e)=> setSearchQuery(e.target.value)}
             className='w-[30rem] border border-gray-400 p-2 rounded-l-full'
             type='text'
             placeholder='search'
             onFocus={()=>setShowSuggestions(true)}
             onBlur={()=>setShowSuggestions(false)}
          />
          <button className='border border-gray-400 rounded-r-full p-2 hover:bg-gray-200 bg-gray-300' onClick={()=>searchButton()}>search</button>
        </div>
        {suggestions.length > 0 && showSuggestions ?
  <div className='z-50 bg-white rounded-lg border p-3 w-[30rem] ml-2 border-gray-300'>
      {suggestions.map((s, index) => (
        <div className='py-2 shadow-sm hover:bg-gray-100 pl-3' key={index}>
          <Link to={`/results/${s}`}>
            {s}
          </Link>
        </div>
      ))}
  </div> 
  : null
}

     </div>
     <div className='flex justify-center'>
        <img  className='h-8' alt='profile' src='https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo.png'/>
     </div>

    </div>
    </>
  )
}

export default Head