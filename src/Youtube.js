const API_KEY = "AIzaSyCA9bUF-_tW7XUV4kA1J1tQntVgF6vqAhM";
const DEV_KEY = "AIzaSyDFcc2e6q2sx4ve2EWH_NyG7XqlHXK8BTg";
const CLIENT_ID =
  "319625395821-cut7ch6i98bm7t4u0om7felr61ktok66.apps.googleusercontent.com";

export const getLiveStreamFromChannel = async (channelId) => {
  const searchUrl = new URL("https://youtube.googleapis.com/youtube/v3/search");
  searchUrl.search = new URLSearchParams({
    part: ["snippet"],
    channelId: channelId,
    eventType: "live",
    type: ["video"],
    key: DEV_KEY,
  });
  const response = await fetch(searchUrl.toString());
  if (!response.ok) {
    return null;
  }
  const data = await response.json();
  for (const item of data.items) {
    console.log(item);
    return `https://www.youtube.com/embed/${item.id.videoId}?autoplay=1`;
  }
  return null;
};
