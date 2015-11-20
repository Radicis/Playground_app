<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . '/libraries/REST_Controller.php';

class Review extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->load->model('review_model');
        $this->load->model('playground_model');
        $this->load->model('auth_model');
    }

    public function reviews_get()
    {
        // Users from a data store e.g. database
        $reviews = $this->review_model->get_all();

        $id = $this->get('id');

        // If the id parameter doesn't exist return all the users

        if ($id === NULL)
        {
            // Check if the users data store contains users (in case the database result returns NULL)
            if ($reviews)
            {
                // Set the response and exit
                $this->response($reviews, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                // Set the response and exit
                $this->response([
                    'status' => FALSE,
                    'message' => 'No reviews were found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }

        // Find and return a single record for a particular user.

        $id = (int) $id;

        // Validate the id.
        if ($id <= 0)
        {
            // Invalid id, set the response and exit.
            $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
        }

        $review = array();

        if (!empty($reviews))
        {
            foreach ($reviews as $this_review)
            {
                if ($this_review->playgroundID == $id)
                {
                    $this_review->username = $this->user_model->getUsername($this_review->userID)[0]->username;
                    array_push($review, $this_review);
                }
            }
        }

        if (!empty($review))
        {
            $this->set_response($review, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
        }
        else
        {
            $this->set_response([
                'status' => FALSE,
                'message' => 'No reviews for playground id: ' . $id
            ], REST_Controller::HTTP_OK); // NOT_FOUND (404) being the HTTP response code
        }
    }

    public function reviews_post()
    {
        $id = $this->get('id');

        $username = $this->post('username');
        $token = $this->post('token');

        if ($this->auth_model->verify($username, $token)) {

            $data = [
                'name' => $this->post('name'),
                'county' => $this->post('county'),
                'geoLat' => $this->post('geoLat'),
                'isEnclosed' => $this->post('isEnclosed'),
                'geoLng' => $this->post('geoLng'),
                'surface' => $this->post('surface'),
                'description' => $this->post('description'),
            ];


            $playground = $this->playground_model->get($id);
            $user = $this->user_model->get($username);

            if($playground['id']) {

                $this->playground_model->update($id, $data);

                $this->set_response("updated", REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
            }
            else{
                $this->response("DENIED", REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code

            }
        }
        else{
            $this->response("DENIED", REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code

        }
    }

    public function reviews_put()
    {

        $username = $this->put('username');
        $token = $this->put('token');

        if ($this->auth_model->verify($username, $token)) {


            $data = [
                'name' => $this->put('name'),
                'county' => $this->put('county'),
                'geoLat' => $this->put('geoLat'),
                'isEnclosed' => $this->put('isEnclosed'),
                'geoLng' => $this->put('geoLng'),
                'surface' => $this->put('surface'),
                'description' => $this->put('description'),
                'userID' => $this->put('userID'),
            ];

            $this->playground_model->create($data);

            $this->set_response("Created!", REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
        }
        else{
            $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code

        }
    }

    public function reviews_delete()
    {
        $id = (int) $this->get('id');
        $username = $this->delete('username');
        $token = $this->delete('token');


        if($this->auth_model->verify_admin($username, $token)){
            // Validate the id.
            if ($id <= 0)
            {
                // Set the response and exit
                $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
            }

            $this->playground_model->delete($id);
            $message = [
                'id' => $id,
                'message' => 'Deleted the resource'
            ];
            $this->set_response($message, REST_Controller::HTTP_ACCEPTED); // NO_CONTENT (204) being the HTTP response

        }
        else{
            $message = [
                'id' => $id,
                'message' => 'Unauthorized: ' . $username
            ];
        }
        //$this->set_response($message, REST_Controller::HTTP_FORBIDDEN); // NO_CONTENT (204) being the HTTP response code
    }

}
