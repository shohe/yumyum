<?php
class Users implements IteratorAggregate {

    private $users = array();

    public function add( User $user ) {
        $this->users[] = $user;
    }

    public function getIterator() {
        return new ArrayIterator( $this->users );
    }

}
