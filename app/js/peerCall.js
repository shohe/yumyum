 // ブラウザごとのUserMediaを取得する
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

// PeerJS object
var peer;

function setUpPeer(id){
	//Peerオブジェクトに任意のIDを振る
	peer = new Peer(id,
					{ key: '77196e40-7803-4e99-ac69-e0b133e711e9',
					  debug: 3
					});
    peer.on('open', function(){
      console.log('My Id : ' + peer.id);
    });
    // Receiving a call
    peer.on('call', function(call){
      // Answer the call automatically (instead of prompting user) for demo purposes
      call.answer(window.localStream);
      step3(call);
    });
    peer.on('error', function(err){
      alert(err.message);
    });

    $('#my-video').hide();
    $('#their-video').hide();
    $('#calling-error').hide();

    // Get audio/video stream
    navigator.getUserMedia({audio: true, video: true}, function(stream){
      // Set your video displays
      $('#my-video').prop('src', URL.createObjectURL(stream));
      window.localStream = stream;
    }, function(){ $('#step1-error').show(); });

    var call = peer.call($('#callto-id').val(), window.localStream);
    step3(call);
}

function step3 (call) {
  // Hang up on an existing call if present
  if (window.existingCall) {
    window.existingCall.close();
  }
  // Wait for stream on the call, then set peer video display
  call.on('stream', function(stream){
    $('#their-video').prop('src', URL.createObjectURL(stream));
  });
  // UI stuff
  window.existingCall = call;
  $('#their-id').text(call.peer);
}