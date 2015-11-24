<?php
require_once("./modules/model/User.class.php");
require_once("./modules/model/Users.class.php");

class YumDB {

    private $pdo = null;
    private $table_name = '';

    public function __construct() {
        $dsn = 'mysql:host=localhost;dbname=yumdb;charset=utf8;';
        $dbuser = 'root';
        $dbpass = 'root';

        try {
            $this->pdo = new PDO( $dsn, $dbuser, $dbpass );
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }

    public function selectUserWithTableID($table_id) {
        try {
            $sql = "SELECT * FROM user WHERE table_id = $table_id";
            $stmh = $this->pdo->prepare( $sql );
            $stmh->execute();
            $users = new Users();
            while ($row = $stmh->fetch(PDO::FETCH_ASSOC)) {
                $users->add( new User($row["id"], $row["name"], $row["age"], $row["icon"], $row["phone_number"], $row["comment"], $row["table_id"]) );
            }
            return $users;
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }

    public function selectUser( $id ) {
        try {
            $sql = "SELECT * FROM user WHERE id = :id";
            $stmh = $this->pdo->prepare( $sql );
            $stmh->bindValue( ":id", $id );
            $stmh->execute();
            $user = null;
            while ($row = $stmh->fetch(PDO::FETCH_ASSOC)) {
                $user = new User($row["id"], $row["name"], $row["age"], $row["icon"], $row["phone_number"], $row["comment"], $row["table_id"]);
            }
            return $user;
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }

    public function selectUsers( $ids ) {
        try {
            $split_ids = explode(",", $ids);
            $users = new Users();
            foreach ($split_ids as $id) {
                $users->add($this->selectUser(intval($id)));
            }
            return $users;
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }

    public function selectFriends( $myID ) {
        try {
            $sql = "SELECT * FROM user INNER JOIN (SELECT friend_id FROM friends WHERE id = :id) as friend WHERE user.id = friend.friend_id";
            $stmh = $this->pdo->prepare( $sql );
            $stmh->bindValue( ":id", $myID );
            $stmh->execute();
            $users = array();
            while ($row = $stmh->fetch(PDO::FETCH_ASSOC)) {
                $users[] = new User($row["id"], $row["name"], $row["age"], $row["icon"], $row["phone_number"], $row["comment"], $row["table_id"]);
            }
            return $users;
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }

    // public function add( $id, $name ) {
    //     try {
    //         $sql = "INSERT INTO $this->table_name VALUES(:id, :name)";
    //         $stmh = $this->pdo->prepare( $sql );
    //         $stmh->bindValue( ":id", $id );
    //         $stmh->bindValue( ":name", $name );
    //         $stmh->execute();
    //     } catch (Exception $e) {
    //         echo $e->getMessage();
    //     }
    // }

    // public function remove( $id ) {
    //     try {
    //         $sql = "DELETE FROM $this->table_name WHERE id = (:id)";
    //         $stmh = $this->pdo->prepare( $sql );
    //         $stmh->bindValue( ":id", $id );
    //         $stmh->execute();
    //     } catch (Exception $e) {
    //         echo $e->getMessage();
    //     }
    // }

    // public function edit( $id, $name ) {
    //     try {
    //         $sql = "UPDATE $this->table_name SET name = (:name) WHERE id = (:id)";
    //         $stmh = $this->pdo->prepare( $sql );
    //         $stmh->bindValue( ":id", $id );
    //         $stmh->bindValue( ":name", $name );
    //         $stmh->execute();
    //     } catch (Exception $e) {
    //         echo $e->getMessage();
    //     }
    // }

    public function debug_select() {
        $this->pdo->query( "SELECT * FROM $this->table_name" );
    }

    public function close() {
        $this->pdo = null;
    }

}
