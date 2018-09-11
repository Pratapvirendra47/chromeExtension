/*global chrome*/
export function captureUserMedia(callback) {
	chrome.storage.sync.get(null,function(items){
		chrome.storage.sync.set({
			enableTabCaptureAPI: 'false',
			enableMicrophone: 'false',
			enableCamera: 'true',
			enableScreen: 'false',
			enableSpeakers: 'false'
		},function(){
			runtimePort.postMessage({
				messageFromContentScript1234: true,
				startRecording: true
			});
		});
	});
};

/*background-player.js*/

var videoPlayers = [];

function initVideoPlayer(stream){
	
	var videoPlayer = document.createElement('video');
	videoPlayer.muted = !enableTabCaptureAPI;
	videoPlayer.volume = !!enableTabCaptureAPI;
	videoPlayer.src = URL.createObjectUrl(stream);
	videoPlayer.play();
	videoPlayers.push(videoPlayer);
}

/*Desktop-Capture*/
function captureDesktop(){

	var screenSources = ['screen', 'window', 'audio'];
	if(enableSpeakers==false){
		screenSources = ['screen','window'];
	}
	chrome.desktopCapture.chooseDesktopMedia(screenSources,onAccessApproved);
}

function onAcessApproved(){
	var constraints = {
       audio: false,
       video: false
  	};
	navigator.getUserMedia(constraints, function(stream) {
	    initVideoPlayer(stream);
	}, function() {});
}