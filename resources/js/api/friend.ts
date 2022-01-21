import { defHttp } from 'app/utils/http';
import { Post } from './models/postModel';
import { FriendParams, GetFriendParams, Friend } from './models/friendModel';
const indexApi = '/friend';

export function getFriends(params: GetFriendParams) {
  return defHttp.get<Friend[]>({
    url: indexApi + '/list',
    params,
  });
}

export function sentRequestsFriend(params: FriendParams) {
  return defHttp.get<Post[]>({
    url: indexApi + '/sentRequests',
    params,
  });
}
export function addFriend(params: FriendParams) {
  return defHttp.post<null>({
    url: indexApi + '/add',
    params,
  });
}
export function acceptFriend(params: FriendParams) {
  return defHttp.post<Post[]>({
    url: indexApi + '/accept',
    params,
  });
}
export function denyFriend(params: FriendParams) {
  return defHttp.post<Post[]>({
    url: indexApi + '/deny',
    params,
  });
}
export function undoFriend(params: FriendParams) {
  return defHttp.post<Post[]>({
    url: indexApi + '/undo',
    params,
  });
}
export function unfriendFriend(params: FriendParams) {
  return defHttp.get<Post[]>({
    url: indexApi + '/unfriend',
    params,
  });
}
