<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\UserNotDefinedException;

class UserController extends Controller
{
    //
     /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    
    public function register() {
        $validator = Validator::make(request()->all(),[
            'name' =>  'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'phone' => 'required|digits_between:8,15'
        ]);

        if($validator->fails()){
            $message = $validator->messages()->all();
            return response()->json([
                'success' => false,
                'code' => 400,
                'message' => $message
            ], 400);
        }

        $user = User::create([
            'name' => request('name'),
            'email' => request('email'),
            'password' => Hash::make(request(('password'))),
            'phone' => request('phone')
        ]);

        if($user) {
           return response()->json([
            'success' => true,
            'code' => 201,
            'message' => 'Register successfull',
            'data' => [
                'user' => [
                    $user
                ]
            ]
           ], 201);
        } else {
            return response(400)->json([
                'success' => false,
                'code' => 400,
                'message' => 'Register failed'
            ], 400);
        }

    }

    public function login()
    {
        $validator = Validator::make(request()->all(),[
            'email' =>  'required',
            'password' => 'required',
        ]);

        if($validator->fails()){
            $message = $validator->messages()->all();
            return response()->json([
                'success' => false,
                'code' => 400,
                'message' => $message
            ], 400);
        }
        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json([
                'success' => false,
                'code' => 401,
                'message' => 'Email or password is wrong'
            ], 401);
        }

        $user = auth()->user();

         // Filter data yang ingin Anda kirimkan
        // $userData = [
        //     'name' => $user->name,
        //     'email' => $user->email
        // ];

        return response()->json([
            'success' => true,
            'code' => 200,
            'message' => 'Login successful',
            'data' => [
                'user' => $user,
                'token' => $token,
                'token_expires_in' => auth()->factory()->getTTL() * 60
                    
                ,
                
            ],
           
        ], 200);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        $user = auth()->user();

        if(!$user){
            return response()->json([
                'success' => false,
                'code' => 401,
                'messsage' => "Unauthorized"
            ]);
        } 

        return response()->json([
            'success' => true,
            'code' => 200,
            'message' => "Successfully get current user data",
            'data' => [
                'user' => $user
            ]

        ]);
    }

    public function all() {
        
        $users = User::all();
        
        return response()->json([
            'success' => true,
            'code' => 200,
            'message' => 'Successfully get all user data',
            'data' => [
                'users' => $users,
                'token_expires_in' => auth()->factory()->getTTL() * 60
            ]
        ], 200);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json([
            'message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
      
        $newToken = auth()->refresh();
        $user = auth()->user();

        // return response()->json([$newToken], 200);
        return response()->json([
            'success' => true,
            'code' => 200,
            'message' => 'Refresh token successful',
            'data' => [
                'user' => [
                    'email' => $user
                ],
                'token' => $newToken,
                'token_expires_in' => auth()->factory()->getTTL() * 60
            ],
           
        ], 200);
       
        // return $this->respondWithToken(auth()->refresh())
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
