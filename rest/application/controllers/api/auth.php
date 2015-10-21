<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . '/libraries/REST_Controller.php';

class Auth extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();

        $this->load->model('user_model');
    }

    public function auth_get()
    {

        $this->set_response("Unrecognised method", REST_Controller::HTTP_BAD_REQUEST);
    }


    public function auth_post()
    {
        $this->set_response("Unrecognised method", REST_Controller::HTTP_BAD_REQUEST);
    }

    //Logs in user and returns auth token
    public function auth_put()
    {
        //check for valid login

        $username = $this->put('username');
        $password = $this->put('password');

        $token = $this->user_model->login($username, $password);
        if($token!=FALSE){

            //Return the token as JSON so the client can set a cookie.
            $message = [
                'message' => $token,
            ];

            $this->set_response($message, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
        }
        else{
            $this->set_response("Invalid Login", REST_Controller::HTTP_BAD_REQUEST); // CREATED (201) being the HTTP response co
        }
    }
}
