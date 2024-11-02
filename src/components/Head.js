import React, { useEffect, useState, useRef } from "react";
import { toggleMenu } from "../Utils/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { cacheResults } from "../Utils/searchSlice";
import { Link, useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";

const Head = () => {
  const history = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef(null);


  const searchCache = useSelector((store) => store.search);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleMenu());
  };

  const searchButton = () => {
    if (searchQuery) {
      history(`/results/${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowSuggestions(!!query);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false); 
    history(`/results/${suggestion}`);
  };
  

  const handleOutsideClick = (e) => {
    if (suggestionRef.current && !suggestionRef.current.contains(e.target)) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
        
      } else {
        searchSuggestion();
      }
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const searchSuggestion = async () => {
    try {
      const response = await fetch(`https://myyoutube-o2t2.onrender.com/api/suggestions?q=${searchQuery}`);
      const json = await response.json();
      console.log(json);
      setSuggestions(json[1]); // Assuming the format remains the same
      dispatch(
        cacheResults({
          [searchQuery]: json[1],
        })
      );
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };
  
  

  return (
    <>
      <div className="flex justify-between items-center fixed w-full h-14 px-3 bg-white z-50 ">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <img
            onClick={handleClick}
            className="h-4 sm:h-6 cursor-pointer"
            alt="menu"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/800px-Hamburger_icon.svg.png"
          />
          <img
            className="h-3 sm:h-6"
            alt="youtube-logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png"
          />
        </div>
        <div className="relative w-2/3 sm:w-1/2">
          <div className="flex items-center">
            <input
              value={searchQuery}
              onChange={handleSearchChange}
              className="border border-gray-300 p-1 sm:p-2 rounded-l-full w-full text-xs sm:text-sm focus:outline-none"
              type="text"
              placeholder="Search"
            />
            <button
              className="border border-gray-300 h-[1.6rem] sm:h-[2.4rem] md:h-[2.4rem] w-8 sm:w-12 flex items-center justify-center rounded-r-full bg-gray-50 hover:bg-gray-100"
              onClick={searchButton}
            >
              <BiSearch className="text-gray-600 text-sm sm:text-base" />
            </button>
          </div>
          {suggestions.length > 0 && showSuggestions && (
            <div
              ref={suggestionRef}
              className="absolute top-full mt-1 bg-white rounded-lg border p-2 w-full shadow-lg"
            >
              {suggestions.map((suggestion, index) => (
                <Link to={`/results/${suggestion}`} key={index}>
                  <div
                    className="py-1 sm:py-2 hover:bg-gray-100 px-2 sm:px-3 cursor-pointer text-xs sm:text-sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center">
          <img
            className="h-5 sm:h-6 lg:mr-5 cursor-pointer"
            onClick={() => console.log("hello")}
            alt="profile"
            src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
          />
        </div>
      </div>
    </>
  );
};

export default Head;
