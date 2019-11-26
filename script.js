// Copyright 2019 Titus Ramsarran. All rights reserved. No section of this work should be copied, edited or reproduced in any way.
var logs = document.getElementById('logs');
var innerLogCount = 0;
let screenshare = null;
var video = document.getElementById('streams');
var screenShareReady = false;
var videochannel_master = document.getElementById('videochannel-master');
var videochannel_slave = document.getElementById('videochannel-slave');
var idLoader = document.getElementById('admincode');
var currentStatus = document.getElementById('currentstatus');
var currentStep = document.getElementById('steps');
var peer = new Peer({key: 'lwjd5qra8257b9',debug: 3});
peer.on('open', function(id) {
  idLoader.textContent = id;
  currentStatus.textContent = 'READY';
  currentStatus.className = 'warning';
  currentStep.textContent = '3';
  logs.className = 'good';
  logs.textContent = 'Got Slave Code.';
});

async function waitForStream() {

  try {
    screenshare = await navigator.mediaDevices.getDisplayMedia();
    screenShareReady = true;
    videochannel_master.className = 'warning';
  videochannel_master.textContent = 'READY';
  screenshare.getVideoTracks()[0].addEventListener('ended', () => stopStream());
    logs.className = 'good';
  logs.textContent = 'Screensharing started.';
  } catch(err) {
    console.error("Error: " + err);
        screenShareReady = false;
        videochannel_master.className = 'error';
  }
}
function stopStream() {
  screenShareReady = false;
  videochannel_master.className = 'error';
  videochannel_master.innerHTML = '<a href="#!" style="color: white;"onclick="waitForStream()">CLICK</a>';
  logs.className = 'error';
  logs.textContent = 'Screensharing stopped.';
}


peer.on('call', function(call) {

  call.answer();
  console.log('Recieved call!');
  logs.className='good';
  logs.textContent = 'SUCESSFULLY connected to slave.';
  call.on('stream', function(stream) {
video.srcObject = stream;
video.play();
logs.textContent = 'Got stream YAYAYAYAYAYAYYAYAYYAAYYAA Egg!';
});
});