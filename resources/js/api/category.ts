import { defHttp } from '/@/utils/http'
import { CreateCategoryParam, CategoryModel } from './models/categoryModel'
import { PaginationParams } from './models/paginationModel'
const indexApi = '/admin/category'

export function getCategories(params: PaginationParams) {
  return defHttp.get({
    url: indexApi,
    params,
  })
}

export const createCategory = (params: CreateCategoryParam) =>
  defHttp.post<CategoryModel>({
    url: indexApi,
    params,
  })
