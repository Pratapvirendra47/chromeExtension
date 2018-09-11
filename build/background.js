'use strict';

var runtimePort;
var enableCamera = false;
var enableMicrophone = false;
var enableScreen = false;
var enableSpeakers = false;
var enableTabCaptureAPI = false;
var videoResolutions = '1280x720';
var cameraStream = false;
var recorder;
var videoRawData= [];

chrome.extension.onConnect.addListener(function(port){

	runtimePort = port;
	runtimePort.onMessage.addListener(function(message){
		if(!message)
			return;

		if(message.isRecording){
			// chrome.tabs.executeScript({
			// 	file: 'content-script.js'
			// });
			// cameraCapture();
			getConfiguration();
		}
	});
});


function getConfiguration(){
	
	chrome.storage.sync.get(null, function(mediaItems){
		
		if(mediaItems['enableCamera']){
			enableCamera = mediaItems['enableCamera'];
		}
		if(mediaItems['enableMicrophone']){
			enableMicrophone = mediaItems['enableMicrophone'];
		}
		if(mediaItems['enableSpeakers']){
			enableSpeakers = mediaItems['enableSpeakers'];
		}
		if(mediaItems['enableScreen']){
			enableScreen = mediaItems['enableScreen'];
		}
		if(mediaItems['enableTabCaptureAPI']){
			enableTabCaptureAPI = mediaItems['enableTabCaptureAPI'];
		}

		if(!enableScreen){
			enableMediaDevices(function(stream){
				gotStream(stream);
			});
			return;
		}


		// if(enableMicrophone || enableCamera){
		// 	// chrome.tabs.executeScript({
		// 	// 	file:'content-script.js'
		// 	// })
		// 	// captureDesktop();
		// 	chrome.tabs.query({ active: true, currentWindow: true}, function(tabs){
		// 		chrome.tabs.sendMessage(tabs[0].id, {action: 'hello_world'},function(response){
		// 			console.log('hello stream',response);
		// 		})
		// 	})
		// 	chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
		// 		console.log('hello',msg);
		// 	});
		// 	return;
		// }

		captureDesktop();
	});	
}

function gotStream(stream){
	console.log('gotStream',stream);

	var options = {
		type: 'video',
		disableLogs: false,
		recorderType: MediaRecorder
	};
	videoRawData = [];
	recorder = new MediaRecorder(stream,options);
	recorder.streams = [stream];

	console.log(recorder);
	recorder.start(10);
	onRecording();
	recorder.streams[0].oninactive = function(){
		stopScreenRecording();
	}
}

function onRecording(){
	console.log('hello');
	recorder.ondataavailable = function(e){
		videoRawData.push(e.data);
	}
}

function stopScreenRecording(){
	console.log(videoRawData);
	recorder.stop();
	var blobData = new Blob(videoRawData,{
		type: 'video/webm'
	});
	var downloadUrl = URL.createObjectURL(blobData);
	var downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);
    downloadLink.style = 'display: none';
    downloadLink.href = downloadUrl;
    downloadLink.download = 'test.webm';
    downloadLink.click();
    window.URL.revokeObjectURL(downloadUrl);
}

