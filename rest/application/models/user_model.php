<?php

class User_model extends CI_Model
{
    public function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->load->model('auth_model');
    }

    public function is_owner($id, $username)
    {
        //Check if user is owner of this user id to enable editing of profile/settings
        return true;
    }

    public function logout() {
        //Delete key entry from Db
     }

    public function login($username, $password)
    {

        $this->db->where('username', $username);
        $this->db->where('password', md5($password));
        $query = $this->db->get('users');

        if($query->num_rows()>0)
        {

            $user = $query->row();
            $user_id = $user->id;
            $token = $this->auth_model->generate_token($user_id);
            $isAdmin = $user->isAdmin;
            if($token!=Null){
                $data = array(
                    'user_id' => $user_id,
                    'token' => $token,
                    'isAdmin' => $isAdmin,
                );
                $this->auth_model->set_token($data);
                return $token;
            }
        }
        return false;
    }


    public function get_all()
    {
        $query = $this->db->get('users');
        return $query;

    }

    public function get($id=null){
        if (!$id)
        {
            $query = $this->db->get('users');
            return $query->result_array();
        }
        $query = $this->db->get_where('users', array('id' => $id));
        return $query->result();
    }

    public function getByUsername($username){

        $this->db->where('username', $username);
        $query = $this->db->get('users');
        return $query->row_array();
    }


    function create($data)
    {
        $this->db->insert('users', $data);
        $insert_id = $this->db->insert_id();
        return  $insert_id;
    }

    function exists($username) {
        $this->db->select('id');
        $this->db->where('username', $username);
        $query = $this->db->get('users');

        if ($query->num_rows() > 0) {
            return true;
        } else {
            return false;
        }
    }


    function update($id, $data)
    {
        $this->db->where('id', $id);
        $this->db->update('users', $data);

    }
    function delete($id)
    {
        return $this->db->delete('users', array('id' => $id));
    }

}
