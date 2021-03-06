/**
 * 複数人通話用JavaScript
 */
// ブラウザごとのUserMediaを取得する
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
		|| navigator.mozGetUserMedia;

//Peerオブジェクト
var peer;

//Callオブジェクト
var callObject;

//MultiPartyオブジェクト
var multiparty = null;

//MediaオブジェクトのURL
var mediaObjectURL;

//通話要求に対する応答
var callPermit = false;

/**
 * 通話のためのピアを設定するメソッド
 * @param id
 */
function setUpPeer() {
	// Peerオブジェクトに任意のIDを振る
	var name = document.getElementById("peerId").value;
	peer = new Peer(name, {
		key : '77196e40-7803-4e99-ac69-e0b133e711e9',
		debug : 3
	});

	//PeerServerへの接続ができたときに呼ばれる
	peer.on('open', function() {
		console.log("My ID : " + peer.id);
	});

	//通話要求を受信したときに呼ばれる
	peer.on('call', function(call) {
		//var returnAnswer = confirm(call.peer + "さんからかかってきた。");
		//var width = (screen.width - 250) / 2;
		var width = screen.width - 285;
		var height = (screen.height - 100) / 5.4;
		//console.log("width : " + width);
		//console.log("height : " + height);
		window.open('callReceive.php?from=' + call.peer,
					'電話が来ました。',
					'width=250,height=100' + ',left=' + width + ',top=' + height);

		callObject = call;
//		//OKボタンを押して通話する場合、応答にメディアストリームをセットする
//		if (callPermit) {
//			call.answer(window.localStream);
//			answerCall(call);
//
//		//キャンセルして出ない場合は、強制的に通話終了
//		} else {
//			call.close();
//		}
	});

	//エラー発生時に呼ばれる
	peer.on('error', function(err) {
		alert(err.message);
		return;
	});

	navigator.getUserMedia({
		audio : true,
		video : true
	}, function(stream) {
		// Set your video displays
		window.localStream = stream;
	}, function() {
		return;
	});
}

/**
 * 別ウィンドウでの通話要求に対する応答を受け取るメソッド
 */
function callPermitCheck() {
	console.log("callPermit:" + callPermit);

	//応答が「出る」だった場合
	if (callPermit) {
		callObject.answer(window.localStream);
		answerCall(callObject);

	//応答が「出ない」だった場合
	} else {
		callObject.close();
	}
}

/**
 * 通話要求に対する応答メソッド
 * @param call
 */
function answerCall(call) {
	// Hang up on an existing call if present
	if (window.existingCall) {
		window.existingCall.close();
	}

	callObject = call;

	//応答があった場合呼び出される
	callObject.on('stream', function(stream) {
		//メディアストリームが提供された場合（通話に出た）
		if (stream != null) {
			//相手の画面を表示する
			setUpAndMultiCall();
		}
	});

	//相手のメディアストリームがアクティブか
	//通話を要求した方が、相手の応答を確認するための処理
	if (callObject.open) {
		setUpAndMultiCall();
	}
}

/**
 * 複数人通話の開始
 */
function setUpAndMultiCall() {
	multiparty = new MultiParty ({
		"key":"77196e40-7803-4e99-ac69-e0b133e711e9",
		"debug":3
	});

	multiCallProcess();

	multiparty.start();
}

/**
 * 複数人通話の具体的な処理をするメソッド
 */
function multiCallProcess() {
	multiparty.on('my_ms', function(video) {
		//自分のビデオを表示
		var vNode = MultiParty.util.createVideoNode(video);
		vNode.volume = 0;
		vNode.flamerate = 15;
		vNode.class = "web-cam";
		$(vNode).appendTo('#streams');
	}).on('peer_ms', function(video) {
		//通話相手のビデオを表示
		var vNode = MultiParty.util.createVideoNode(video);
		$(vNode).appendTo('#streams');
	}).on('ms_close', function(peerId) {
		//相手との接続が切れたら、その相手のビデオを削除する
		$('#' + peerId).remove();
	});
}

/**
 * かけるボタンを押された場合のメソッド<br>
 * 応答用メソッドを呼び出す
 */
function makeCall(callTo) {
	callObject = peer.call(callTo, window.localStream);
	console.log(callTo + "さんにかけます。");

	if (multiparty != null) {
		multiCallProcess();
	} else {
		answerCall(callObject);
	}
}

/**
 * 通話を終了するメソッド<br>
 * 接続を終了し、前画面に戻る
 */
function endCall() {
	multiparty.close();

	//戻る場所書く（今は適当）
	location.href = "index.php";
}