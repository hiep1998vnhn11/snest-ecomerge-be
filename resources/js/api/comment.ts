import { defHttp } from 'app/utils/http';
import { Post, PostParams } from './models/postModel';
import {
  Comment,
  GetCommentParams,
  DeleteCommentParams,
  CreateCommentParams,
} from './models/commentModel';

const indexApi = '/comment';

export function createComment(params: CreateCommentParams) {
  return defHttp.post<Comment>({
    url: indexApi + '/create',
    params,
  });
}
export function updateComments(params: DeleteCommentParams) {
  return defHttp.post<Comment>({
    url: indexApi + '/update',
    params,
  });
}
export function deleteComments(params: DeleteCommentParams) {
  return defHttp.post<Comment>({
    url: indexApi + '/destroy',
    params,
  });
}
export function getComments(params: GetCommentParams) {
  return defHttp.get<Comment[]>({
    url: indexApi + '/list',
    params,
  });
}
export function getCommentsChild(params: PostParams) {
  return defHttp.get<Post[]>({
    url: indexApi + '/get-child-cmt',
    params,
  });
}
export function likeComment(params: PostParams) {
  return defHttp.post<Post[]>({
    url: '/like',
    params,
  });
}
