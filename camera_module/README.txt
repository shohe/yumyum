（Skywayの設定）
https://nttcom.github.io/skyway/からログインする。

アドレス：yuta.suzuki.428.vsw@gmail.com
パスワード：Shousa0623

設定変更から利用可能ドメインにPCのIPアドレスを設定する。

それ以外は変更厳禁。

＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

（multiTalk.jsを使った通話実装）
https://nttcom.github.io/skyway/docs/#JS
https://github.com/nttcom/SkyWay-MultiParty

以上のサイトも参考にしてくれ。

通話の流れとしては、
１、クラウド上のサーバーに接続してPeerオブジェクトを生成
２、相手を指定して通話要求を出す
３、通話要求を受け取ったら応答する
４、通話に出たらMultiPartyオブジェクトを生成して複数人通話開始

現状、１と４のところでカメラとマイクの確認ダイアログが出る。
これについては色々やったが修正不可。

＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

（１、クラウド上のサーバーに接続してPeerオブジェクトを生成）
まず、setUpPeer関数を呼ぶ。オブジェクトが生成できればカメラの確認ダイアログ出るよ。


（２、相手を指定して通話要求を出す）
makeCall関数を呼び出して通話要求を出す。この時、引数でphone_number渡す。


（３、通話要求を受け取ったら応答する）
通話要求を受け取るとpeer.on('call', function(call) {...が呼ばれる。
この関数内では、通話要求が来たことを知らせる別ウィンドウを開いている（callReceive.php）。
callReceive.phpではmultiTalk.jsのcallPermitに許可・拒否を設定し、
callPermitCheck関数を呼んでいる。応答が「出る」だったら、メディアストリームをセットし、
answerCall関数を呼ぶ。


（４、通話に出たらMultiPartyオブジェクトを生成して複数人通話開始）
answerCall関数から呼ばれるsetUpMultiCall関数で複数人通話用オブジェクトを生成する。
この関数内でさらに、multiCallProcess関数を呼び具体的な処理をする。
最後のmultiparty.start()でサーバーに接続し通話開始。
multiCallProcess関数でやってることはリファレンス見ればまんま載ってる。


multiTalk.jsの一番下にあるendCall関数で通話終了＆前のページに戻る。


ちなみに、このjsファイルを使うにはpeer.js　→　multiparty.js　→　multiTalk.js
の順で読み込んで。

あと、dbからデータ取ってくるのにdb.class.phpっての作ったけど、何のデータ取ってんのか
わかんなければ参考にして。ついでに、でもページも上げとくからそれも参考程度に。


