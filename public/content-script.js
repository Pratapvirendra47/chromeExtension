chrome.extension.onMessage.addListener(function(msg, sender, sendResponse){
	// console.log(msg);
	// var recorder;
	// var audioRawData = [];
	// var supported = navigator.mediaDevices.getSupportedConstraints();
	// console.log(supported);
	console.log(msg);
	var constraints = {
		audio: true
	}
	navigator.getUserMedia(constraints, function(stream){
		console.log(stream);
		chrome.runtime.sendMessage({type: "setCount", count:stream});

	},function(err){
		return err;
	})
})




// console.log('hello audio stream',stream);
// recorder = new MediaRecorder(stream);
// recorder.streams = [stream];
// console.log(recorder);
// recorder.start(10);
// recorder.ondataavailable = function(e){
// 	audioRawData.push(e.data);
// 	if(audioRawData.length > 200){
// 		console.log(audioRawData);
// 		stream.getTracks()[0].stop();
// 		// recorder.stop();
// 		var blobData = new Blob(audioRawData,{
// 			type: 'audio/webm'
// 		});
// 		var downloadUrl = URL.createObjectURL(blobData);
// 		var downloadLink = document.createElement('a');
// 	    document.body.appendChild(downloadLink);
// 	    downloadLink.style = 'display: none';
// 	    downloadLink.href = downloadUrl;
// 	    downloadLink.download = 'test.webm';
// 	    downloadLink.click();
// 	    window.URL.revokeObjectURL(downloadUrl);
// 	}
// }
