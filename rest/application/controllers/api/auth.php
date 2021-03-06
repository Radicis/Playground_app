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
        $this->load->model('auth_model');
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

        $isAdmin = $this->auth_model->is_admin($token);

        $message = [
            'message' => $isAdmin
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
            $this->set_response($test, REST_Controller::HTTP_BAD_REQUEST); 
        }
    }
	
	public function auth_delete()
    {

        $token = $this->delete('token');	
		

        if($token!=null){

            $this->auth_model->delete($token);

            $this->set_response("Deleted", REST_Controller::HTTP_ACCEPTED); 
        }
		else{
			$this->set_response($token, REST_Controller::HTTP_BAD_REQUEST);
		}
    }
}
