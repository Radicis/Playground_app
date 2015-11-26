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

    public function get($id=null){
        if (!$id)
        {
            $query = $this->db->get('playgrounds');
            return $query->result_array();
        }
        $query = $this->db->get_where('playgrounds', array('id' => $id));
        return $query->row_array();
    }


    function create($data)
    {
        $this->db->insert('playgrounds', $data);
        $insert_id = $this->db->insert_id();
        return  $insert_id;
    }

	function setRating($id, $reviews){
		$currentRating = 0;
		$total = 0;
		foreach($reviews as $review){
			$currentRating += $review['rating'];
			$total+=1;
		}

		$data = array(
			'rating'=>($currentRating/$total)
		);
		$this->db->where('id', $id);
        $this->db->update('playgrounds', $data);
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