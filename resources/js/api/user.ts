import { defHttp } from 'app/utils/http';
import { UserParams, User, UserPostParams } from './models/userModel';
import { Post } from './models/postModel';
const indexApi = '/customer';

export function getUser(params: UserParams) {
  return defHttp.get<User>({
    url: indexApi + '/profile',
    params,
  });
}
export function getUserOrder(params: UserParams) {
  return defHttp.get<Nullable<Post[]>>({
    url: indexApi + '/list-order',
    params,
  });
}
export function getUserOrderDetail(params: UserParams) {
  return defHttp.get<User>({
    url: indexApi + '/order-detail',
    params,
  });
}
export function getUserNewFeed(params: UserPostParams) {
  return defHttp.get<Post[]>({
    url: indexApi + '/newfeed',
    params,
  });
}
export function updateUser(params: UserParams) {
  return defHttp.post<User>({
    url: indexApi + '/update',
    params,
  });
}

export const getCurrentUser = () => defHttp.get({ url: '/user' });
