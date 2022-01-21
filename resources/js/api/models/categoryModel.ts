export interface CreateCategoryParam {
  name: string
  description?: string
  parent_id?: number
  image: string
  order?: number
  slug?: string
}

export interface CategoryModel extends Record<string, any> {
  id: number
  name: string
  description: string
  parent_id: number
  image: string
  order: number
  slug: string
  is_active: boolean
  created_at: string
  updated_at: string
}
