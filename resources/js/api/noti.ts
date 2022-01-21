import { defHttp } from 'app/utils/http';
const indexApi = '/noti';

export function getNotification(params: { id: number }) {
  return defHttp.get({
    url: indexApi + '/detail',
    params,
  });
}

export const getNotificationList = (params: { page: number }) =>
  defHttp.get({ url: indexApi + '/list', params });

export function getNotificationCount() {
  return defHttp.delete({
    url: indexApi + '/count-unread',
  });
}
