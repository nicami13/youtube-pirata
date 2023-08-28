//AIzaSyBBSyUz-5cJdhe-EfuRkflcOlvW5xP9RnE
//UC8fkwsjcI_MhralEX1g4OBw
const videoCardContainer = document.querySelector('.video-container');
const CHANNEL_ID = "UC8fkwsjcI_MhralEX1g4OBw"; // Canal "CreativeCode"
const API_KEY = "AIzaSyC0GyhRxe-DYmppser-Qpp3H33FF25yLfM";
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
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
        <img src="img/history.png" class="" alt="">
        <div class="content">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
            </div>
            <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        </div>
        <img src="img/flecha.png" class="icon-2" alt="">

    </div>
    `;
}