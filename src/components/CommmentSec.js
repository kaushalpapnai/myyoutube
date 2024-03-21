import React, { useEffect, useState } from 'react';
import { api_key } from '../Utils/config';

const CommmentSec = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getComments();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  const getComments = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${api_key}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const json = await response.json();

      // Check if there are any comments before data destructuring
      if (json.items && json.items.length > 0) {
        // Destructuring and conditional rendering
        const commentData = json.items.map((item) => ({
          authorDisplayName: item.snippet.topLevelComment.snippet.authorDisplayName,
          publishedAt: item.snippet.topLevelComment.snippet.publishedAt,
          authorProfileImageUrl: item.snippet.topLevelComment.snippet.authorProfileImageUrl,
          textDisplay: item.snippet.topLevelComment.snippet.textDisplay,
        }));
        setComments(commentData);
      } else {
        setComments([]); // Set empty array for no comments
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching comments:', error);
      // Handle errors gracefully, e.g., display an error message or fallback content
    }
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="flex m-5 ">
              <img
                src={comment.authorProfileImageUrl}
                className="border rounded-full w-10 h-10"
                alt="image"
              />
              <div className="flex flex-col list-none ml-2">
                <ul className="flex items-center">
                  <li className="text-gray-700 text-sm">{comment.authorDisplayName}</li>
                  <li className="text-gray-500 text-xs ml-1 mt-1">
                    {new Date(comment.publishedAt).toLocaleString()}
                  </li>
                </ul>
                <li
                  className="text-gray-900 text-sm"
                  dangerouslySetInnerHTML={{ __html: comment.textDisplay }}
                />
              </div>
            </div>
          ))
        ) : (
          <div>No comments found.</div> // Display message if no comments
        )
      )}
    </>
  );
};

export default CommmentSec;
