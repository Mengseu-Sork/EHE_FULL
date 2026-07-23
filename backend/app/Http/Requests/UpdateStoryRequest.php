<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Validation Rules
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',

            'publish_date' => 'required|date',

            'description' => 'nullable|string',

            'images' => 'nullable|array',

            'images.*' => 'image|mimes:jpg,jpeg,png,webp|max:10240',

            'attachment' => 'nullable|file|mimes:pdf,doc,docx|max:10240',
        ];
    }

    /**
     * Custom Messages
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Story title is required.',

            'publish_date.required' => 'Publication date is required.',

            'images.*.image' => 'Each uploaded file must be an image.',

            'images.*.mimes' => 'Images must be JPG, JPEG, PNG or WEBP.',

            'attachment.mimes' => 'Attachment must be PDF, DOC or DOCX.',

            'attachment.max' => 'Attachment must not exceed 10 MB.',
        ];
    }
}
