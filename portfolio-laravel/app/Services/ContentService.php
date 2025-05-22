<?php


namespace App\Services;

use App\Models\Content;
use App\Http\Requests\StoreContentRequest; 
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ContentService
{
    public function listUserContents($user)
    {
        return $user->contents()->latest()->get();
    }

    public function createContent(StoreContentRequest $request)
    {
        $user = $request->user();
        $validatedData = $request->validated();
        
        // Handle technologies - decode if it's already JSON
        $technologies = isset($validatedData['technologies']) ? 
            (is_string($validatedData['technologies']) ? json_decode($validatedData['technologies'], true) : $validatedData['technologies']) 
            : null;
        
        // Handle images
        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('contents', 'public');
                $imagePaths[] = $path;
            }
        }

        return $user->contents()->create([
            'title' => $validatedData['title'],
            'description' => $validatedData['description'],
            'technologies' => $technologies ? json_encode($technologies) : null,
            'image' => $imagePaths[0] ?? null,
            'images' => !empty($imagePaths) ? json_encode($imagePaths) : null,
        ]);
    }

    public function updateContent(StoreContentRequest $request, Content $content)
    {
     
        $validatedData = $request->validated();

     
        if (isset($validatedData['images'])) {
            $validatedData['images'] = json_encode($validatedData['images']);
        }

        if (isset($validatedData['technologies'])) {
            $validatedData['technologies'] = json_encode($validatedData['technologies']);
        }

      
        $content->update($validatedData);

        return $content;
    }

    public function deleteContent(Content $content)
    {
        DB::transaction(function () use ($content) {
            if ($content->images) {
                $images = json_decode($content->images);
                foreach ($images as $image) {
                    Storage::disk('public')->delete($image);
                }
            }
            $content->delete();
        });
    }
}
