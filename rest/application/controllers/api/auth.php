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

        $token = $this->get('token');
        $username = $this->get('username');


        $message = [
             'message' => $this->auth_model->verify($username, $token),
        ];

        $this->set_response($message, REST_Controller::HTTP_CREATED);
    }


    public function auth_post()
    {
        $token = $this->post('token');

        //$token = "aaa42296669b958c3cee6c0475c8093e";

        $isAdmin = $this->auth_model->is_admin($token);

        $message = [
            'message' => $isAdmin,
        ];

        $this->set_response($message, REST_Controller::HTTP_CREATED);
    }

    //Logs in user and returns auth token
    public function auth_put()
    {
        //check for valid login

        $username = $this->put('username');
        $password = $this->put('password');


        $token = $this->user_model->login($username, $password);
        $user = $this->user_model->getByUsername($username);
        $test = $token;
        //$isAdmin = $this->auth_model->verify_admin($username, $token);
        if($token!=FALSE){

            //Return the token as JSON so the client can set a cookie.
            $message = [
                'token' => $token,
                'userID' => $user['id']
            ];

            $this->set_response($message, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
        }
        else{
            $this->set_response($test, REST_Controller::HTTP_BAD_REQUEST); // CREATED (201) being the HTTP response co
        }
    }
}
