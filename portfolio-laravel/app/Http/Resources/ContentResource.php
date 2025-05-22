<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ContentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'technologies' => is_string($this->technologies) ? json_decode($this->technologies) : $this->technologies,
            'image_url' => $this->image ? asset('storage/' . $this->image) : null,
            'images' => $this->images ? array_map(function($img) {
                return asset('storage/' . $img);
            }, json_decode($this->images, true)) : [],
            'user_id' => $this->user_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}