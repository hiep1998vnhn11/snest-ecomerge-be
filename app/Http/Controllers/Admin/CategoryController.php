<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Category\CreateCategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $params = $request->all();
        $limit = Arr::get($params, 'limit', config('api.DEFAULT_PER_PAGE'));
        $limit = intval($limit) ?? config('api.DEFAULT_PER_PAGE');
        $sortType = Arr::get($params, 'sort_type', 'desc');
        $sortBy = Arr::get($params, 'sort_by', 'id');
        if (!in_array($sortType, ['asc', 'desc'])) {
            $sortType = 'desc';
        }
        if (!in_array($sortBy, ['id', 'name', 'slug', 'created_at', 'updated_at'])) {
            $sortBy = 'id';
        }
        $searchKey = Arr::get($params, 'search_key', '');
        $query = Category::query()
            ->with('parent');
        if ($searchKey) {
            $searchKey = strtolower($searchKey);
            $query = $query->where(function ($q) use ($searchKey) {
                $q->where(DB::raw('LOWER(name)'), 'LIKE', DB::raw("CONCAT('%', CONVERT('{$searchKey}', BINARY), '%')"))
                    ->orWhere(DB::raw('LOWER(description)'), 'LIKE', DB::raw("CONCAT('%', CONVERT('{$searchKey}', BINARY), '%')"))
                    ->orWhere('slug', 'LIKE', '%' . $searchKey . '%');
            });
        }
        $query = $query->orderBy($sortBy, $sortType)
            ->paginate($limit);
        return $this->sendRespondSuccess($query);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateCategoryRequest $request)
    {
        $params = $request->validated();
        $params['slug'] = $params['slug'] ?? Str::slug($params['name']);
        $params['created_by'] = auth()->user()->id;
        $params['updated_by'] = auth()->user()->id;
        $category = Category::create($params);
        return $this->sendRespondSuccess($category);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
