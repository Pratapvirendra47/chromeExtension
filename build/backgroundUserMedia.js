var microphoneDevice = false;
var cameraDevice = false;

function enableMediaDevices(callback,defaultDevices){

	var supported = navigator.mediaDevices.getSupportedConstraints();
	// console.log('defaultDevices',enableMicrophone);
	var constraints = {
		audio: true
	}
	// if(enableCamera){
	// 	if(videoResolutions!='default' && videoResolutions.length){
	// 		var width = videoResolutions.split('x')[0];
	// 		var height = videoResolutions.split('x')[1];

	// 		if(width && height){
	// 			constraints.video = {
	// 				width: {
	// 					ideal: width
	// 				},
	// 				height: {
	// 					ideal: height
	// 				}
	// 			};
	// 		}
	// 	}
	// }
	// if(enableMicrophone){
		constraints.audio={};	
	// }
	// navigator.mediaDevices.enumerateDevices().then((devices) => {
	//    console.log(devices);
	// });
	
	// constraints.audio.deviceId = 'dc16951c7c1d2a1ac5aee45953189714657bf4ac6d2742a536ad76e41eba23b3';
	// if(supported.aspectRatio){
	// 	constraints.video.aspectRatio=1.7777778;
	// }
	navigator.getUserMedia(constraints, function(stream){
		console.log(stream);
	},function(err){
		console.log(err)
	})
	// navigator.mediaDevices.getUserMedia(constraints).then(function(stream){
	// 	console.log('audio Stream',stream);
	// }).catch(function(error){
	// 	console.log(error)
	// })
}