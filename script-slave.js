// Copyright 2019 Titus Ramsarran. All rights reserved. No section of this work should be copied, edited or reproduced in any way.
console.log('Updated 4:42 pm 11/30/2019');
var logs = document.getElementById('logs');
var screenCall;
let screenshare = null;
var screenShareReady = false;
var call;
var video = document.getElementById('streams');
var videochannel_master = document.getElementById('videochannel-master');
var videochannel_slave = document.getElementById('videochannel-slave');
var idLoader = document.getElementById('admincode');
var currentStatus = document.getElementById('currentstatus');
var currentStep = document.getElementById('steps');
var currentStatus2 = document.getElementById('currentstatus2');
var peer = new Peer({key: 'lwjd5qra8257b9',debug: 3});
async function waitForStream() {

  try {
    screenshare = await navigator.mediaDevices.getDisplayMedia();
    screenShareReady = true;
    videochannel_slave.className = 'warning';
  videochannel_slave.textContent = 'READY';
  screenshare.getVideoTracks()[0].addEventListener('ended', () => stopStream());
    logs.className = 'good';
  logs.textContent = 'Screensharing started.';
  } catch(err) {
    console.error("Error: " + err);
        screenShareReady = false;
        videochannel_slave.className = 'error';
  }
}
function stopStream() {
  screenShareReady = false;
  videochannel_slave.className = 'error';
  videochannel_slave.innerHTML = '<a href="#!" style="color: white;"onclick="waitForStream()">CLICK</a>';
  logs.className = 'error';
  logs.textContent = 'Screensharing stopped.';
}
function connectCall() {
  var slaveCode = document.getElementById('slavecode').value;
  logs.className = 'good';
  logs.textContent = 'Think I connected. Dont know. Ask friend .';
  // Call a peer, providing our mediaStream
  try {
call = peer.call(slaveCode,screenshare);
call.on('stream', function(stream) {
video.srcObject = stream;
video.play();
logs.textContent = 'Connected video from master.';
});
  } catch (err) {
    console.error(err);
    logs.className = 'error';
    logs.textContent = 'FATAL ERROR: unable to connect. Try again later.';
  }
}
async function webcamAlt() {


  try {
    screenshare = await window.navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,

    });
    /* use the stream */
  } catch(err) {
    console.error(err);
    logs.className="error";
    logs.textContent = 'Failed to get webcam. Err:' + err;
  }
}
