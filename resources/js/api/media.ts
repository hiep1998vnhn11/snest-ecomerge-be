import { defHttp } from 'app/utils/http';
import { Post, PostParams, CreatePostParams } from './models/postModel';

const indexApi = '/media';

export function getMedias(params: PostParams) {
  return defHttp.get<Post[]>({
    url: indexApi,
    params,
  });
}

export const getMediaDetail = (params: CreatePostParams) =>
  defHttp.get({ url: indexApi + '/' + 'slug', params });

export function createMedia(params: CreatePostParams) {
  return defHttp.post({
    url: indexApi + '/create',
    params,
  });
}

export function uploadMedia(params: PostParams) {
  return defHttp.post<Post[]>({
    url: indexApi + '/upload',
    params,
  });
}
