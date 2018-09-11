/*global chrome*/
import React, { Component } from 'react';

class App extends Component {
  startScreenRecording(){
    var runtimePort = chrome.runtime.connect({
         name: "Screen Recording Communication"
    });
    runtimePort.onMessage.addListener(function(message){
      if(!message){
        return;
      }
    })
    var isRecording = false;
    chrome.storage.sync.set({
      enableScreen: false,
      enableSpeakers: true,
      enableMicrophone: true,
      enableCamera: false
    }, function(){
      runtimePort.postMessage({
        isRecording: true
      });
    });
  }
  render() {
    return (
      <div className="App">
        <div style={{ width: '400px', height:'400px'}}>
          <button onClick={this.startScreenRecording}>
              Record a video
          </button>
        </div>
      </div>
    );
  }
}

export default App;
