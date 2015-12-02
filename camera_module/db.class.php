<?php
class dbClass {

	private $dsn = "mysql:host=localhost;dbname=yumdb;charset=utf8";
	private $dbuser = "root";
	private $dbpass = "root";
	private $pdo = null;
	private $user = null;
	private $friendArray = null;

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
	 * @param ユーザーID $id
	 */
	public function selectUserById($id) {
		try {
			$sql = "SELECT name, phone_number FROM user WHERE id = ?";
			$stmh = $this->pdo->prepare($sql);
			$stmh->bindValue(1, $id);
			$stmh->execute();

			$result = $stmh->fetchAll(PDO::FETCH_ASSOC);
			$this->user = array();
			foreach ($result as $row) {
				$this->user["name"] = $row["name"];
				$this->user["peerId"] = $row["phone_number"];
			}
		} catch (Exception $e) {
			echo $e->getMessage();
		}
	}

	/**
	 * ユーザーの名前とPeer接続IDを表示するメソッド
	 * @param Peer接続ID $phone
	 */
	public function selectUserByPhone($phone) {
		try {
			$sql = "SELECT name, phone_number FROM user WHERE phone_number = ?";
			$stmh = $this->pdo->prepare($sql);
			$stmh->bindValue(1, $phone);
			$stmh->execute();

			$result = $stmh->fetchAll(PDO::FETCH_ASSOC);
			$this->user = array();
			foreach ($result as $row) {
				$this->user["name"] = $row["name"];
				$this->user["peerId"] = $row["phone_number"];
			}
		} catch (Exception $e) {
			echo $e->getMessage();
		}
	}

	public function returnUserInfo() {
		return $this->user;
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
	 * 友達一覧を検索し、通話ボタンにして出力するメソッド
	 * @param ユーザーのID $id
	 */
	public function selectFriendsForButton($id) {
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

	/**
	 * 友達一覧を検索し、連想配列に格納するメソッド
	 * @param ユーザーのID $id
	 */
	public function selectFriendsInList($id) {
		try {
			$sql = "SELECT name, phone_number FROM user u JOIN friends f ON u.id = f.friend_id "
					."WHERE f.id = ?";
			$stmh = $this->pdo->prepare($sql);
			$stmh->bindValue(1, $_GET["id"]);
			$stmh->execute();
			$result = $stmh->fetchAll(PDO::FETCH_ASSOC);
			$this->friendArray = array();

			foreach ($result as $row) {
				$this->friendArray[$row["name"]] = $row["phone_number"];
			}

		} catch (Exception $e) {
			echo $e->getMessage();
		}
	}

	public function returnFriendsList() {
		return $this->friendArray;
	}

	public function dbClose() {
		$this->pdo = null;
	}
}