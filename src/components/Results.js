import React, { useEffect, useState } from 'react';
import { SEARCH_RESULTS } from '../Utils/config';
import { Link, useParams } from 'react-router-dom';
import ResultsCard from './ResultsCard';
import { useSelector } from 'react-redux'

const Results = () => {
    let { id } = useParams();
    // console.log(id);
    const [searchData, setSearchData] = useState([]);
    const appSlice = useSelector((store)=>store.app.isMenuOpen) 

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`${SEARCH_RESULTS}+${id}`);
            const json = await data.json();
            // console.log(json.items[0])
            setSearchData(json.items);
        };

        fetchData();
    }, [id]);

    // console.log(searchData[0]?.id?.videoId)

    return (
        <>
        <div className={`mt-20 ${appSlice ? 'ml-44' : 'ml-24'} `}>
         {searchData && searchData?.map((item)=>
           (
            <Link to={"/watch?v="+item.id.videoId} key={item.id.videoId}>
              <ResultsCard item={item}/>           
            </Link>
           ))}

        </div>
          
        </>
    );
}

export default Results;
