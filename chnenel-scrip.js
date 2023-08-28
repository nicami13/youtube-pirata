//AIzaSyBBSyUz-5cJdhe-EfuRkflcOlvW5xP9RnE
//UC8fkwsjcI_MhralEX1g4OBw
const videoReproduce=document.querySelector('.reproduce-container')
const videoCardContainer = document.querySelector('.video-container');
const CHANNEL_ID = "UC8fkwsjcI_MhralEX1g4OBw"; // Canal "CreativeCode"
const API_KEY = "AIzaSyC6ENgRfZbe-KleICuYTeTze_0zWQr95HU";
const videosToShowReproduce = 1;
const videosToShow=20;

const video_http = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&order=date&part=snippet&type=video&maxResults=${videosToShow}`;

fetch(video_http)
.then(res => res.json())
.then(data => {
    data.items.forEach(item => {
        getVideoDetails(item.id.videoId);
    });
})
.catch(err => console.log(err));

const getVideoDetails = (videoId) => {
    fetch(`https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoId}&part=snippet`)
    .then(res => res.json())
    .then(data => {
        const videoData = data.items[0];
        getChannelIcon(videoData);
    });
}

const getChannelIcon = (video_data) => {
    const channelId = video_data.snippet.channelId;

    fetch(`https://www.googleapis.com/youtube/v3/channels?key=${API_KEY}&part=snippet&id=${channelId}`)
    .then(res => res.json())
    .then(data => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
    });
}


const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="video" onclick="storeVideoData('${data.id.videoId}', '${data.snippet.title}')">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="content">
            <a href="channel.html"><img src="${data.channelThumbnail}" class="channel-icon" alt=""></a>
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>
    `;
}

// channel.html
document.addEventListener('DOMContentLoaded', () => {
    const selectedVideoData = JSON.parse(sessionStorage.getItem('selectedVideo'));

    if (selectedVideoData) {
        const videoFrame = document.getElementById('videoFrame');
        videoFrame.src = `https://www.youtube.com/embed/${selectedVideoData.videoId}`;
        videoFrame.title = selectedVideoData.title;
    }
});


// search bar

const searchInput = document.querySelector('.b-search');
const searchBtn = document.querySelector('.search-btn');
const searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener('click', () => {
    if(searchInput.value.length){
        location.href = searchLink + encodeURIComponent(searchInput.value);
    }
});