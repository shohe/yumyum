<?php
	$dsn = "mysql:host=localhost;dbname=yumdb;charset=utf8";
	$dbuser = "root";
	$dbpass = "root";
	$pdo = null;

	try {
		$pdo = new PDO($dsn, $dbuser, $dbpass);
		$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

		if (isset($_GET["id"])) {
			$sql = "SELECT COUNT(*), id FROM user WHERE id = ?";
			$stmh = $pdo->prepare($sql);
			$stmh->bindValue(1, $_GET["id"]);
			$stmh->execute();

			$cnt = 0;
			$id = "";

			$result = $stmh->fetchAll(PDO::FETCH_ASSOC);
			foreach ($result as $row) {
				$cnt = $row["COUNT(*)"];
				$id = $row["id"];
			}

			if ($cnt == 0) {
				echo "<p>いねーよ</p>";
				$stmh = null;
				$pdo = null;
			} else {
				$location = "multi.php?id=".$id;
				$stmh = null;
				$pdo = null;
				header("Location:".$location);
				exit;
			}
		}

	} catch(Exception $e) {
		echo $e->getMessage();
	}
?>
<!DOCTYPE html>
<html>
<head>
	<title>仮ログイン</title>
</head>
<body>
	<form action="index.php" method="get">
		<label>ID：<input type="text" name="id"></label>
		<input type="submit" name="login" value="ログイン">
	</form>
</body>
</html>