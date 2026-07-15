<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Visitor;
use Illuminate\Http\Request;

class VisitorController extends Controller
{
    public function store(Request $request)
    {
        $ip = $request->ip();

        // Only count one visit per IP per day
        $exists = Visitor::where('ip_address', $ip)
            ->whereDate('created_at', today())
            ->exists();

        if (! $exists) {

            Visitor::create([
                'ip_address' => $ip,
            ]);
        }

        return response()->json([
            'success' => true,
        ]);
    }
}
