<?php

class Auth_model extends CI_Model
{
    public function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->load->model('user_model');
    }

    public function generate_token($user_id) {
        $token = md5("123456". $user_id);
        $this->delete_token($token);
        return $token;
    }


    public function set_token($data)
    {
        $this->db->insert('auth_tokens', $data);
        $insert_id = $this->db->insert_id();
        return  $insert_id;
    }


    public function delete_token($token)
    {
        return $this->db->delete('auth_tokens', array('token' => $token));
    }

    public function verify($username, $token)
    {

        //return TRUE;

        $this->db->where('username', $username);
        $query = $this->db->get('users');

        //If a user id found then set the user_id
        if($query->num_rows()>0) {
            $user = $query->row();
            $user_id = $user->id;
        }
        else{
            return FALSE;
        }

        //Check the auth_tokens table and ensure the token provided matches the username
        $this->db->where('user_id', $user_id);
        $this->db->where('token', $token);
        $query = $this->db->get('auth_tokens');
        if($query->num_rows()>0) {
            return TRUE;
        }
        else{
            return FALSE;
        }
    }

    public function verify_admin($username, $token)
    {
        $this->db->where('username', $username);
        $query = $this->db->get('users');

        //If a user id found then set the user_id
        if($query->num_rows()>0) {
            $user = $query->row();
            $user_id = $user->id;
        }
        else{
            return FALSE;
        }

        //Check the auth_tokens table and ensure the token provided matches the username
        $this->db->where('user_id', $user_id);
        $this->db->where('token', $token);
        $query = $this->db->get('auth_tokens');
        if($query->num_rows()>0) {
            if($query->row()->isAdmin){
                return TRUE;
            }
            else{
                return False;
            }
        }
        else{
            return FALSE;
        }
    }

    public function is_admin($token){
        $this->db->where('token', $token);
        $query = $this->db->get('auth_tokens');

        foreach ($query->result() as $row)
        {
            if($row->isAdmin==true) {
                return TRUE;
            }
            else{
                return FALSE;
            }
        }
    }


}
