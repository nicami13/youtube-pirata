//AIzaSyBBSyUz-5cJdhe-EfuRkflcOlvW5xP9RnE
//UC8fkwsjcI_MhralEX1g4OBw
const videoCardContainer = document.querySelector('.video-container');
const CHANNEL_ID = "UC8fkwsjcI_MhralEX1g4OBw"; // Canal "CreativeCode"
const API_KEY = "AIzaSyC6ENgRfZbe-KleICuYTeTze_0zWQr95HU";
const videosToShow = 17;

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
    <div class="video" onclick="location.href = 'channel.html'">
        <img class="h-video"src="img/history.png" class="" alt="">
        <div class="content">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
            </div>
        </div>
        <div class="eMp">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        </div>
        <div class="ePm">
        <img src="img/flecha.png" class="icon-2" alt="">
        </div>


    </div>
    `;
}
const storeVideoData = (videoId, title) => {
    const videoData = {
        videoId: videoId,
        title: title
    };
    console.log(videoData); // Verificar los datos antes de almacenarlos
    localStorage.setItem('selectedVideo', JSON.stringify(videoData));
}
const searchInput = document.querySelector('.b-search');
    const searchBtn = document.querySelector('.button-s');
    const searchLink = "https://www.youtube.com/results?search_query=";
    
    searchBtn.addEventListener('click', () => {
        if(searchInput.value.length){
            location.href = searchLink + encodeURIComponent(searchInput.value);
        }
    });
