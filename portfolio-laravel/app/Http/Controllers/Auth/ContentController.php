<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Content;
use App\Http\Requests\StoreContentRequest;
use App\Http\Resources\ContentResource;
use App\Services\ContentService;

class ContentController extends Controller
{
    public function __construct(protected ContentService $contentService) {}

    public function getContent(Request $request)
    {
        $user = $request->user();
        if (!$user) return response()->json(['error' => 'User not authenticated'], 401);

        $contents = $this->contentService->listUserContents($user);

        return ContentResource::collection($contents);
    }

    public function storeContent(StoreContentRequest $request)
    {
        $content = $this->contentService->createContent($request);
        return new ContentResource($content);
    }

    public function showContent(Content $content)
    {
        return new ContentResource($content);
    }

    public function updateContent(Request $request, Content $content)
    {
     
        if ($request->user()->id !== $content->user_id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $content = $this->contentService->updateContent($request, $content);
        return new ContentResource($content);
    }

    public function destroyContent(Content $content)
    {
       
        if (request()->user()->id !== $content->user_id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $this->contentService->deleteContent($content);
        return response()->json(['message' => 'Deleted successfully']);
    }
}
