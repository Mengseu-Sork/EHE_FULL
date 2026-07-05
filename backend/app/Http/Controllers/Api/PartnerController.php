<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Partner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PartnerController extends Controller
{
    /**
     * Display all partners
     */
    public function index()
    {
        $partners = Partner::latest()->get()->map(function ($partner) {
            return [
                'id' => $partner->id,
                'name' => $partner->name,
                'website' => $partner->website,
                'is_active' => $partner->is_active,
                'logo' => $partner->logo
                    ? asset('storage/' . $partner->logo)
                    : null,
                'created_at' => $partner->created_at,
            ];
        });

        return response()->json($partners);
    }

    /**
     * Store a new partner
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'      => 'required|string|max:255',
            'website'   => 'nullable|url|max:255',
            'is_active' => 'nullable|boolean',
            'logo'      => 'required|image|mimes:jpg,jpeg,png,webp,svg|max:2048',
        ]);

        if ($request->hasFile('logo')) {
            $validated['logo'] = $request
                ->file('logo')
                ->store('partners', 'public');
        }

        $partner = Partner::create([
            'name'      => $validated['name'],
            'website'   => $validated['website'] ?? null,
            'is_active' => $validated['is_active'] ?? true,
            'logo'      => $validated['logo'],
        ]);

        return response()->json([
            'message' => 'Partner created successfully.',
            'data'    => [
                'id' => $partner->id,
                'name' => $partner->name,
                'website' => $partner->website,
                'is_active' => $partner->is_active,
                'logo' => $partner->logo
                    ? asset('storage/' . $partner->logo)
                    : null,
            ],
        ], 201);
    }

    /**
     * Show one partner
     */
    public function show(int $id)
    {
        $partner = Partner::findOrFail($id);

        return response()->json([
            'id' => $partner->id,
            'name' => $partner->name,
            'website' => $partner->website,
            'is_active' => $partner->is_active,
            'logo' => $partner->logo
                ? asset('storage/' . $partner->logo)
                : null,
            'created_at' => $partner->created_at,
            'updated_at' => $partner->updated_at,
        ]);
    }

    /**
     * Update partner
     */
    public function update(Request $request, int $id)
    {
        $partner = Partner::findOrFail($id);

        $validated = $request->validate([
            'name'      => 'required|string|max:255',
            'website'   => 'nullable|url|max:255',
            'is_active' => 'nullable|boolean',
            'logo'      => 'nullable|image|mimes:jpg,jpeg,png,webp,svg|max:2048',
        ]);

        if ($request->hasFile('logo')) {

            if (
                $partner->logo &&
                Storage::disk('public')->exists($partner->logo)
            ) {
                Storage::disk('public')->delete($partner->logo);
            }

            $validated['logo'] = $request
                ->file('logo')
                ->store('partners', 'public');
        }

        $partner->update([
            'name'      => $validated['name'],
            'website'   => $validated['website'] ?? null,
            'is_active' => $validated['is_active'] ?? true,
            'logo'      => $validated['logo'] ?? $partner->logo,
        ]);

        return response()->json([
            'message' => 'Partner updated successfully.',
            'data'    => [
                'id' => $partner->id,
                'name' => $partner->name,
                'website' => $partner->website,
                'is_active' => $partner->is_active,
                'logo' => $partner->logo
                    ? asset('storage/' . $partner->logo)
                    : null,
            ],
        ]);
    }

    /**
     * Delete partner
     */
    public function destroy(int $id)
    {
        $partner = Partner::findOrFail($id);

        if (
            $partner->logo &&
            Storage::disk('public')->exists($partner->logo)
        ) {
            Storage::disk('public')->delete($partner->logo);
        }

        $partner->delete();

        return response()->json([
            'message' => 'Partner deleted successfully.'
        ]);
    }
}
