<?php
class User {

    private $id;
    private $name;
    private $age;
    private $icon;
    private $phone_number;
    private $comment;
    private $table_id;

    function __construct( $id, $name, $age, $icon, $phone_number, $comment, $table_id ) {
        $this->id = $id;
        $this->name = $name;
        $this->age = $age;
        $this->icon = $icon;
        $this->phone_number = $phone_number;
        $this->comment = $comment;
        $this->table_id = $table_id;
    }

    public function getID() {
        return $this->id;
    }

    public function getName() {
        return $this->name;
    }

    public function getAge() {
        return $this->age;
    }

    public function getIcon() {
        return $this->icon;
    }

    public function getPhoneNumber() {
        return $this->phone_number;
    }

    public function getComment() {
        return $this->comment;
    }

    public function getTableId() {
        return $this->table_id;
    }

}
