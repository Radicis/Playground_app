<?php

class Playground_model extends CI_Model
{
    public function __construct()
    {
        // Construct the parent class
        parent::__construct();
    }

    public function get_all()
    {
        $query = $this->db->get('playgrounds');
        return $query->result();
    }


    function create($data)
    {
        $this->db->insert('playgrounds', $data);
        $insert_id = $this->db->insert_id();
        return  $insert_id;
    }


    function update($id, $data)
    {
        $this->db->where('id', $id);
        $this->db->update('playgrounds', $data);

    }
    function delete($id)
    {
        return $this->db->delete('playgrounds', array('id' => $id));
    }

}