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

//DataConnectionオブジェクト
var connObject;

//MultiPartyオブジェクト
var multiparty = null;

//MediaオブジェクトのURL
var mediaObjectURL;

//通話要求に対する応答
var callPermit = false;

//カウントダウン用の変数
var timer = 10;

//カウントのfunctionを格納する変数
var timerFunc;

var callToPhoneNumber;

/**
 * 通話のためのピアを設定するメソッド
 * @param id
 */
function setUpPeer() {
	// Peerオブジェクトに任意のIDを振る
	var name = document.getElementById("myPeerID").value;
	peer = new Peer(name, {
		key : '77196e40-7803-4e99-ac69-e0b133e711e9',
		debug : 3
	});

	//PeerServerへの接続ができたときに呼ばれる
	peer.on('open', function() {
		console.log("My ID : " + peer.id);
	});

	//通話要求を受信したときに呼ばれる
//	peer.on('call', function(call) {
//		var width = screen.width - 285;
//		var height = (screen.height - 100) / 5.4;
//		window.open('callReceive.php?from=' + call.peer,
//					'電話が来ました。',
//					'width=250,height=100' + ',left=' + width + ',top=' + height);
//
//		callObject = call;
//	});

	//エラー発生時に呼ばれる
	peer.on('error', function(err) {
		alert(err.message);
		console.log('つながりませんでした。');
		return;
	});

	peer.on('connection', function(conn) {
		var width = screen.width - 285;
		var height = (screen.height - 100) / 5.4;
		window.open('callReceive.php?from=' + conn.peer,
					'電話が来ました。',
					'width=250,height=100' + ',left=' + width + ',top=' + height);
		connObject = conn;
	});

//	navigator.getUserMedia({
//		audio : true,
//		video : true
//	}, function(stream) {
//		// Set your video displays
//		window.localStream = stream;
//		console.log('getUserMediaは正常です。');
//	}, function(err) {
//		console.log('getUserMediaでエラーです。致命的。 : ' + err);
//	});
}

/**
 * 別ウィンドウでの通話要求に対する応答を受け取るメソッド
 */
function callPermitCheck(callFrom) {
	//console.log("callPermit:", callPermit);

	//応答が「出る」だった場合
	if (callFrom != null) {
		connObject.send('call-ok');
		//window.localStream.active = true;
		//callObject.answer(window.localStream);
		$('#friends-wrap').hide();
		//answerCall(callObject);
//		if (multiparty != null) {
//			multiCallProcess();
//			console.log('MultiCallProcess');
//		} else {
//			setUpAndMultiCall();
//			console.log('setUpMultiCall');
//		}
		setUpAndMultiCall();

	//応答が「出ない」だった場合
	} else {
		backToCall();
		//window.localStream.active = false;
		//callObject.answer();
		//answerCall(callObject);
		//callObject.close();
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

	//callObject = call;

	//応答があった場合呼び出される
	callObject.on('stream', function(stream) {
		setUpAndMultiCall();
		$('#preloader, #call-load').hide();
	});

	callObject.on('error', function(err) {
		console.log('つながりませんでした。');
	});
}

/**
 * 複数人通話の開始
 */
function setUpAndMultiCall() {
	multiparty = new MultiParty ({
		"key":"77196e40-7803-4e99-ac69-e0b133e711e9",
		"debug":2
	});

	console.log('MultiParty Start!!!!!!!!');

	multiCallProcess();

	callObject = null;
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
		$(vNode).appendTo('#streams');

		console.log('Add my video.');
	}).on('peer_ms', function(video) {
		//通話相手のビデオを表示
		var vNode = MultiParty.util.createVideoNode(video);
		vNode.flamerate = 15;
		$(vNode).appendTo('#streams');

		console.log('Add their video.');
	}).on('ms_close', function(peerId) {
		//相手との接続が切れたら、その相手のビデオを削除する
		$('#' + peerId).remove();

		console.log('now Peer is : ' + countMulticallPeers());

		//ビデオ削除時に自分しか残らなかったら、通話終了
		if (countMulticallPeers() == 0) {
			endCall();
		}
	});

	$('#endCallButton').show();
}

/**
 * 複数人通話中のピアの数を返すメソッド
 *
 * @returns {Number}
 */
function countMulticallPeers() {
	var peerCount = 0;
	multiparty.listAllPeers(function (lists) {
		for(var i = 0;i < lists.length;i++) {
			peerCount++;
		}
	});

	return peerCount;
}

/**
 * かけるボタンを押された場合のメソッド<br>
 * 応答用メソッドを呼び出す
 */
function makeCall(callTo) {
	//旧バージョン
//	var call = peer.call(callTo, window.localStream);
//	console.log(callTo + "さんにかけます。");
//	cntDownStart(call);

	//新バージョン
	var conn = peer.connect(callTo);
	console.log(callTo + "さんにかけます。");
	cntDownStart(conn);
}

/**
 * 通話を終了するメソッド<br>
 * 接続を終了し、前画面に戻る
 */
function endCall() {
	multiparty.close();
	backToCall();
}

/**
 * 応答待ちのカウントダウンを開始するメソッド
 */
function cntDownStart(call) {
	console.log('スタート時点で : ' + timer);
	timerFunc = setInterval('cntDown()', 1000);

	//応答があった場合呼び出される
	call.on('stream', function(stream) {
		clearInterval(timerFunc);

		if (multiparty) {
			multiCallProcess();
			console.log('MultiCallProcess');
		} else {
			setUpAndMultiCall();
			console.log('setUpMultiCall');
		}

		$('#preloader, #call-load').hide();
	});
}

function cntDownStart(conn) {
	timerFunc = setInterval('cntDown()', 1000);

	conn.on('data', function(data) {
		clearInterval(timerFunc);

//		if (multiparty != null) {
//			multiCallProcess();
//			console.log('MultiCallProcess');
//		} else {
//			setUpAndMultiCall();
//			console.log('setUpMultiCall');
//		}
		//multiCallProcess();
		setUpAndMultiCall();

		$('#preloader, #call-load').hide();
	});
}

/**
 * カウントダウンを実行するメソッド
 *
 * @returns {Number}
 */
//function cntDown() {
//	timer--;
//	console.log('Now timer is : ' + timer);
//
//	if (timer < 0) {
//		clearInterval(timerFunc);
//		var width = screen.width / 2;
//		var height = screen.height / 2;
//		$('#could-not-call').css('margin-left', width);
//		$('#could-not-call').css('margin-top', height);
//		$('#could-not-call, #backToCall').show();
//		$('#preloader, #call-load').hide();
//	}
//
//	return timer;
//}

/**
 * カウントダウンを実行するメソッド
 *
 * @returns {Number}
 */
function cntDown() {
	timer--;
	console.log('Now timer is : ', timer);
	console.log('callPermit', callPermit);

	if (timer < 0) {
		clearInterval(timerFunc);
		var width = screen.width / 2;
		var height = screen.height / 2;
		$('#could-not-call').css('margin-left', width);
		$('#could-not-call').css('margin-top', height);
		$('#could-not-call, #backToCall').show();
		$('#preloader, #call-load').hide();
	}

	return timer;
}

function backToCall() {
	var id = document.getElementById('myID').value;
	location.href = "call.php?id=" + id + "&menuAnim=true";
}