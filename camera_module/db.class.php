<?php
class dbClass {

	private $dsn = "mysql:host=localhost;dbname=yumdb;charset=utf8";
	private $dbuser = "root";
	private $dbpass = "root";
	private $pdo = null;

	public function __construct() {
		try {
			$this->pdo = new PDO($this->dsn, $this->dbuser, $this->dbpass);
			$this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$this->pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
		} catch(Exception $e) {
			echo $e->getMessage();
		}
	}

	/**
	 * ユーザーの名前とPeer接続IDを表示するメソッド
	 * @param unknown $id
	 */
	public function selectUser($id) {
		try {
			$sql = "SELECT name, phone_number FROM user WHERE id = ?";
			$stmh = $this->pdo->prepare($sql);
			$stmh->bindValue(1, $_GET["id"]);
			$stmh->execute();

			$result = $stmh->fetchAll(PDO::FETCH_ASSOC);
			foreach ($result as $row) {
				echo "<p>".$row["name"]."さん</p>";
				echo "<input type=\"hidden\" id=\"phone\" value=\"".$row["phone_number"]."\">";
				echo "<p id=\"peerId\">（Peer接続ID：".$row["phone_number"]."）</p>";
			}
		} catch (Exception $e) {
			echo $e->getMessage();
		}
	}
	/**
	 * ユーザーのPeer接続IDを返すメソッド
	 * @param unknown $id
	 */
	public function selectUserPhoneNumber($id) {
		try {
			$sql = "SELECT phone_number FROM user WHERE id = ?";
			$stmh = $this->pdo->prepare($sql);
			$stmh->bindValue(1, $_GET["id"]);
			$stmh->execute();

			return $stmh->fetchColumn(0);
		} catch (Exception $e) {
			echo $e->getMessage();
		}
	}


	/**
	 * 友達一覧を出力するメソッド
	 * @param ユーザーのID $id
	 */
	public function selectFriends($id) {
		try {
			$sql = "SELECT name, phone_number FROM user u JOIN friends f ON u.id = f.friend_id "
					."WHERE f.id = ?";
			$stmh = $this->pdo->prepare($sql);
			$stmh->bindValue(1, $_GET["id"]);
			$stmh->execute();

			$result = $stmh->fetchAll(PDO::FETCH_ASSOC);
			echo "<form id=\"callFor\">\n";
			foreach ($result as $row) {
				echo "<input type=\"button\" class=\"callToName\" value=\"".$row["name"]."\" onclick=\"makeCall('".$row["phone_number"]."')\">\n";
			}
			echo "</form>\n";
		} catch (Exception $e) {
			echo $e->getMessage();
		}
	}
}