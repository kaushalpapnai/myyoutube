import React, { useEffect, useState, useRef } from "react";
import { toggleMenu } from "../Utils/appSlice";
import { SEARCH_SUGGESION_API } from "../Utils/config";
import { useDispatch, useSelector } from "react-redux";
import { cacheResults } from "../Utils/searchSlice";
import { Link, useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";

const Head = () => {
  const history = useNavigate(); // Get history from React Router
  const [searchQuery, setSearchQuery] = useState(""); // Initial empty state
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
      history(`/results/${encodeURIComponent(searchQuery)}`); // Update history
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    history(`/results/${suggestion}`); // Update history
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
      const response = await fetch(SEARCH_SUGGESION_API + searchQuery);
      const json = await response.json();
      setSuggestions(json[1]);
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
      <div className="flex justify-between fixed w-full h-16 align-middle p-3 bg-white z-50">
      <div className="flex">
          <img
            onClick={handleClick}
            className="h-8 mx-4 cursor-pointer"
            alt="menu"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/800px-Hamburger_icon.svg.png"
          />
          <img
            className="h-8"
            alt="youtube-logo"
            src="https://t3.ftcdn.net/jpg/05/07/46/84/240_F_507468479_HfrpT7CIoYTBZSGRQi7RcWgo98wo3vb7.jpg"
          />
        </div>
        <div className="relative w-[48%] border border-red-300">
          <div className="mr-20 flex items-center w-full">
            <input
              value={searchQuery}
              onChange={handleSearchChange}
              className="border border-gray-300 p-2 rounded-l-full w-full"
              type="text"
              placeholder="search"
            />
            <button
              className="border border-gray-300 h-[42px] w-16 flex items-center justify-center rounded-r-full hover:bg-red-50"
              onClick={searchButton}
            >
              <BiSearch />
            </button>
          </div>
          {suggestions.length > 0 && showSuggestions && (
            <div
              ref={suggestionRef}
              className="z-50 bg-white rounded-lg border p-3 w-[30rem] ml-2 border-grey-300"
            >
              {suggestions.map((suggestion, index) => (
                <Link to={`/results/${suggestion}`} key={index}>
                  <div
                    className="py-2 shadow-sm hover:bg-gray-100 pl-3 cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-center">
          <img
            className="h-8"
            onClick={() => console.log("hello")}
            alt="profile"
            src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo.png"
          />
        </div>
      </div>
    </>
  );
};

export default Head;
