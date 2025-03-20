const videoList = document.querySelector(".videos");
const titleArray = [];
const searchVideo = document.getElementById("searchVideo");

document.addEventListener("DOMContentLoaded", async function () {
  const url = "https://api.freeapi.app/api/v1/public/youtube/videos";

  const options = { method: "GET", headers: { accept: "application/json" } };
  const res = await fetch(url, options);
  const data = await res.json();

  const videoArray = data.data.data;
  console.log(videoArray[0]);

  displayVideos(videoArray);
});

function displayVideos(videoArray) {
  videoArray.forEach((video) => {
    // Fetching data from API data
    const vidTitle = video?.items?.snippet?.title || "No title available";
    const thumbnailLink =
      video?.items?.snippet?.thumbnails?.default?.url ||
      video?.items?.snippet?.thumbnails?.medium?.url ||
      "";
    const channelName =
      video?.items?.snippet?.channelTitle || "Unknown channel";
    const videoId = video?.items?.id;
    const youtubeVideoLink = `https://www.youtube.com/watch?v=${videoId}`;

    // Storing all title names in titleArray
    titleArray.push(vidTitle);

    // Creating HTML elements to push the fetched data
    const divTag = document.createElement("div");
    divTag.classList.add("video");

    const aTag = document.createElement("a");

    const thumbImageTag = document.createElement("img");
    thumbImageTag.classList.add("thumbnail");
    thumbImageTag.src = thumbnailLink;

    aTag.appendChild(thumbImageTag);
    aTag.href = youtubeVideoLink;

    const titleTag = document.createElement("p");
    titleTag.classList.add("title");
    titleTag.textContent = vidTitle;

    const channelNameTag = document.createElement("p");
    channelNameTag.classList.add("channelName");
    channelNameTag.textContent = channelName;

    divTag.appendChild(aTag);
    divTag.appendChild(titleTag);
    divTag.appendChild(channelNameTag);

    divTag.setAttribute("data-title", vidTitle);

    videoList.appendChild(divTag);
  });
}

searchVideo.addEventListener("input", function () {
  const videoContainer = document.querySelectorAll(".video");

  const searchValue = searchVideo.value.toLowerCase();
  videoContainer.forEach((video) => {
    const title = video.dataset.title.toLowerCase();

    if (title.includes(searchValue)) {
      video.style.display = "block";
    } else {
      video.style.display = "none";
    }
  });
});
