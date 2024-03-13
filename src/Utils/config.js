export const api_key = "AIzaSyDCpnht6MargcVvX_DC6IVtisNtpsTzJp4"

export const YOUTUBE_API = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=${api_key}`;

export const COMMENT_API = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=VIDEO_ID&key=${api_key}`

export const SEARCH_SUGGESION_API = `http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=`

export const SEARCH_RESULTS = `https://www.googleapis.com/youtube/v3/search?key=${api_key}&maxResults=50&type=video&part=snippet&q=`

export const CHAT_COUNT = "25"
