const api_key = "AIzaSyAyC3kMqci77hMdVmgK37ICH99p0jQqSKA"

const YOUTUBE_API = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=${api_key}`;

export default YOUTUBE_API;
