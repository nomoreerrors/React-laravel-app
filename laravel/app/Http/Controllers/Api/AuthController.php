<?php


 namespace App\Http\Controllers\Api;
use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request) 
    {

       $credentials = $request->validated();
       if(!Auth::attempt($credentials)) {
            return response([
                'message' => 'Provided email or password is incorrect'
            ]);
       }

       /** @var User $user */
       $user = Auth::user();
       $token = $user->createToken('main')->plainTextToken;

       return response([
        'user' => $user,
        'token' => $token,
        ]);

    }

    //05:46 ru
    //2:06 eng

    public function signup(SignupRequest $request) 
    {
         
        $data = $request->validated();
        /** @var User $user */
        $user = User::create([
                        'name' => $data['name'],
                        'email' => $data['email'],
                        'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;
        return response([
            'user' => $user,
            'token' => $token
        ]);


    }

    public function logout(Request $request) {
        //01:24
        /** @var User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);


    }
}
