<?php

namespace App\Http\Controllers;

use App\Http\Requests\ApiLoginRequest;
use App\Traits\ApiResponses;
use Illuminate\Http\Request;

class AuthController extends Controller {
    use ApiResponses;

    public function login(ApiLoginRequest $request) {
        return $this->ok($request->get('email'));
    }

    public function register(ApiLoginRequest $request) {
        return $this->ok('hi register');
    }
}
