var videoPlayers = [];
function recorderPlayer(stream){

	var videoPlayer = document.createElement('video');
	videoPlayer.src = URL.createObjectURL(stream);
	videoPlayer.play();
	videoPlayers.push(videoPlayer);
}