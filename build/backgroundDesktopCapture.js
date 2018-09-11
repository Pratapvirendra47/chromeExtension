function captureDesktop(){
	 var screenSources = ['screen', 'window', 'audio', 'tab'];
	 if(enableSpeakers==false){
	 	screenSources=['screen','window'];
	 }
	 chrome.desktopCapture.chooseDesktopMedia(screenSources,onDesktopCapture);
}

function onDesktopCapture(chromeMediaSourceId, opts){

	var constraints = {
		audio: {
			mandatory: {
				chromeMediaSource: 'desktop',
				chromeMediaSourceId: chromeMediaSourceId
			}
		},
		video: {
			mandatory: {
				chromeMediaSource: 'desktop',
				chromeMediaSourceId: chromeMediaSourceId
			}
		}
	}
	navigator.webkitGetUserMedia(constraints,function(stream){
		// recorderPlayer(stream);
		gotStream(stream);
	},function(err){ console.log(err); });
}