import { defHttp } from 'app/utils/http';
import {
  Post,
  PostParams,
  CreatePostParams,
  LikeParams,
  PostFriend,
  GetPostFriendParams,
} from './models/postModel';

const indexApi = '/posts';

export function getPosts(params: PostParams) {
  return defHttp.get<Post[]>({
    url: indexApi,
    params,
  });
}

export const createPostApi = (params: CreatePostParams) =>
  defHttp.post({ url: indexApi + '/create', params });

export function deletePostApi(params: any) {
  return defHttp.delete({
    url: indexApi + '/destroy',
    params,
  });
}

export function editPostApi(params: any) {
  return defHttp.post({
    url: indexApi + '/edit',
    params,
  });
}

export function likeApi(params: LikeParams) {
  return defHttp.post({
    url: '/like',
    params,
  });
}

export const createPostExperience = () =>
  defHttp.get({ url: indexApi + '/create_experience' });
export const updatePost = (params: any, id: number) =>
  defHttp.post({ url: indexApi + '/' + id, params });
export const getPostDetail = (params: LikeParams) =>
  defHttp.get({ url: indexApi + '/detail', params });
export const getPostExperienceDetail = (params: any) =>
  defHttp.get({ url: indexApi + '/detail-experience', params });
export const deletePostExperience = (params: any) =>
  defHttp.post({ url: indexApi + '/destroy-experience', params });

export const searchFriend = (params: GetPostFriendParams) =>
  defHttp.get<PostFriend[]>({ url: indexApi + '/search-friend', params });

export const searchExperience = (params: any) =>
  defHttp.get({ url: indexApi + '/search-experience', params });
