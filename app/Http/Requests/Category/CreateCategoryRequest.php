<?php

namespace App\Http\Requests\Category;

use Illuminate\Foundation\Http\FormRequest;

class CreateCategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|unique:categories,name',
            'description' => 'string',
            'parent_id' => 'numeric',
            'slug' => 'string|unique:categories,slug',
            'image' => 'string',
            'meta' => 'string',
            'order' => 'numeric',
            'is_active' => 'boolean',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Hãy nhập tên danh mục',
            'name.unique' => 'Tên danh mục đã tồn tại',
            'description.string' => 'Mô tả không đúng định dạng',
            'parent_id.numeric' => 'Danh mục cha không đúng định dạng',
            'slug.string' => 'Đường dẫn không đúng định dạng',
            'slug.unique' => 'Đường dẫn đã tồn tại',
            'image.string' => 'Ảnh không đúng định dạng',
            'meta.string' => 'Meta không đúng định dạng',
            'order.numeric' => 'Thứ tự không đúng định dạng',
            'is_active.boolean' => 'Trạng thái không đúng định dạng',
        ];
    }
}
