<?php

class Review_model extends CI_Model
{
    public function __construct()
    {
        // Construct the parent class
        parent::__construct();
    }

    public function get_all()
    {
        $query = $this->db->get('reviews');
        return $query->result();
    }

    public function get($id=null){
        if (!$id)
        {
            $query = $this->db->get('reviews');
            return $query->result_array();
        }
        $query = $this->db->get_where('reviews', array('id' => $id));
        return $query->row_array();
    }


    function create($data)
    {
        $this->db->insert('reviews', $data);
        $insert_id = $this->db->insert_id();
        return  $insert_id;
    }


    function update($id, $data)
    {
        $this->db->where('id', $id);
        $this->db->update('reviews', $data);

    }
    function delete($id)
    {
        return $this->db->delete('reviews', array('id' => $id));
    }

}