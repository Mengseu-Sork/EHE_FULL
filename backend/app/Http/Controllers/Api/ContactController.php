<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMail;

class ContactController extends Controller
{
    public function send(Request $request)
    {
        $data = $request->validate([
            'firstName' => 'required|string|max:100',
            'lastName'  => 'required|string|max:100',
            'email'     => 'required|email',
            'phone'     => 'nullable|string|max:50',
            'message'   => 'nullable|string',
        ]);

        Mail::to('eheo.kgthom@gmail.com')->send(new ContactMail($data));

        return response()->json([
            'success' => true,
            'message' => 'Message sent successfully.'
        ]);
    }
}
