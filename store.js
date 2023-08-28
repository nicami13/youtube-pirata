
function storeVideoData(videoId, title) {
    sessionStorage.setItem('selectedVideo', JSON.stringify({ videoId, title }));
    console.log(videoId)
}
