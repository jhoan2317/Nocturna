<?php

namespace App\Http\Controllers;

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

        $user = User::where('email', $request->email)->first();
        
        // Generar un token temporal
        $token = Str::random(60);
        
        // Guardar el token en la base de datos
        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $request->email],
            ['token' => $token, 'created_at' => Carbon::now()]
        );

        // URL directa al frontend para cambiar la contraseña
        $resetUrl = "http://localhost:3000/reset-password?email=" . urlencode($request->email) . "&direct=true";

        // Enviar el correo con el enlace directo
        Mail::raw("Haz clic en el siguiente enlace para restablecer tu contraseña: <a href='" . $resetUrl . "'>LINK</a>", function ($message) use ($request) {
            $message->to($request->email)
                ->subject('Restablecimiento de contraseña');
            $message->getHeaders()->addTextHeader('Content-Type', 'text/html');
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
            'email' => 'required|email|exists:users,email',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        // Actualizar la contraseña del usuario directamente
        $user = User::where('email', $request->email)->first();
        $user->update(['password' => Hash::make($request->password)]);

        // Limpiar cualquier token existente
        DB::table('password_reset_tokens')->where('email', $request->email)->delete();

        return response()->json(['message' => 'Contraseña actualizada correctamente.'], 200);
    }
}
