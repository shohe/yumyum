/**
 *
 */
// ブラウザごとのUserMediaを取得する
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
		|| navigator.mozGetUserMedia;
// PeerJSオブジェクト
var peer;

//Callオブジェクト
var call;

//アクティブなピアのリスト
var activePeers;

function setUpPeer() {
	// Peerオブジェクトに任意のIDを振る
	var myId = document.getElementById("myId").value;
	console.log(myId);
	peer = new Peer(myId, {
		key : '77196e40-7803-4e99-ac69-e0b133e711e9',
		debug : 3
	});

	//PeerServerへの接続ができたときに呼ばれる
	peer.on('open', function() {
		$('#my-id').text(peer.id);
		$('#my-id').show();
		viewActivePeers(peer);
	});

	//通話要求を受信したときに呼ばれる
	peer.on('call', function(call) {
		var returnAnswer = confirm(call.peer + "さんからかかってきた。");

		//OKボタンを押して通話する場合、応答にメディアストリームをセットする
		if (returnAnswer) {
			call.answer(window.localStream);
			step3(call);

		//キャンセルして出ない場合は、強制的に通話終了
		} else {
			window.existingCall.close();
			$('#step2').show();
		}
	});

	//エラー発生時に呼ばれる
	peer.on('error', function(err) {
		alert(err.message);
		// Return to step 2 if error occurs
		step2();
	});
}

// Click handlers setup
$(function() {
	$('#make-call').click(function() {
		//相手へかける
		call = peer.call($('#callto-id').val(), window.localStream);
		step3(call);
	});

	//通話終了時に呼ばれる
	$('#end-call').click(function() {
		window.existingCall.close();

		//home.htmlに戻る
		location.href = "home.html";
	});
	// Retry if getUserMedia fails
	$('#step1-retry').click(function() {
		$('#step1-error').hide();
		step1();
	});
	// Get things started
	step1();
});

/**
 * 自分が通話可能になった時に、ほかに通話可能な人のリストを表示する関数<br>
 * SkyWayのRestAPIのlistAllPeersを使う
 *
 * @param peer
 */
function viewActivePeers() {
	peer.listAllPeers(function(list) {
		var peersDiv = document.getElementById('activePeersList');
		peersDiv.innerHTML = "";
		for(var i = 0;i < list.length;i++) {
			//ページ内に通話可能な人のリストを追加していく
			var peersRow = document.createElement('p');
			peersRow.innerHTML = list[i] + "さん";
			peersDiv.appendChild(peersRow);
		}
	});
}

function step1() {
	// Get audio/video stream
	navigator.getUserMedia({
		audio : true,
		video : true
	}, function(stream) {
		// Set your video displays
		$('#my-video').prop('src', URL.createObjectURL(stream));
		window.localStream = stream;
		step2();
	}, function() {
		$('#step1-error').show();
	});
}
function step2() {
	$('#step1, #step3').hide();
	$('#step2').show();
}
function step3(call) {
	// Hang up on an existing call if present
	if (window.existingCall) {
		window.existingCall.close();
	}

	//応答があった場合呼び出される
	call.on('stream', function(stream) {
		//メディアストリームが提供された場合（通話に出た）
		if (stream != null) {
			//相手の画面を表示する
			$('#their-video').prop('src', URL.createObjectURL(stream));
			window.existingCall = call;
			$('#their-id').text(call.peer);
			$('#step1').hide();
			$('#step2,#step3').show();
			$('#bucchi').hide();
			$('#calling').show();
		}
	});
	console.log(peer.connections);
}

call.on('close', step2);