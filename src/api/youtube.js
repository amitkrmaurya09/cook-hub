import axios from "axios";

const YT_KEY = "YOUR_YOUTUBE_API_KEY";

export const fetchCookingVideos = async (query = "indian cooking recipe") => {
  const res = await axios.get(
    "https://www.googleapis.com/youtube/v3/search",
    {
      params: {
        part: "snippet",
        maxResults: 12,
        q: query,
        key: YT_KEY,
        type: "video",
      },
    }
  );

  return res.data.items;
};