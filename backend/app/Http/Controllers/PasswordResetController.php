<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Str;

class PasswordResetController extends Controller
{
    // 1️⃣ Enviar correo con el token de restablecimiento
    public function sendResetLink(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        // Generar token y guardarlo
        $token = Str::random(60);
        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $request->email],
            ['token' => $token, 'created_at' => Carbon::now()]
        );

        // Simulación de envío de correo (aquí puedes integrar un servicio real)
        Mail::raw("Tu token de restablecimiento es: $token", function ($message) use ($request) {
            $message->to($request->email)
                ->subject('Restablecimiento de contraseña');
        });

        return response()->json(['message' => 'Correo de restablecimiento enviado.'], 200);
    }

    // 2️⃣ Verificar el token
    public function verifyToken(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:password_reset_tokens,email',
            'token' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $reset = DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->where('token', $request->token)
            ->first();

        if (!$reset) {
            return response()->json(['error' => 'Token inválido o expirado.'], 400);
        }

        return response()->json(['message' => 'Token válido.'], 200);
    }

    // 3️⃣ Restablecer la contraseña
    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:password_reset_tokens,email',
            'token' => 'required|string',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $reset = DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->where('token', $request->token)
            ->first();

        if (!$reset) {
            return response()->json(['error' => 'Token inválido o expirado.'], 400);
        }

        // Actualizar la contraseña del usuario
        $user = User::where('email', $request->email)->first();
        $user->update(['password' => Hash::make($request->password)]);

        // Eliminar el token de la BD
        DB::table('password_reset_tokens')->where('email', $request->email)->delete();

        return response()->json(['message' => 'Contraseña actualizada correctamente.'], 200);
    }
}
