import { defHttp } from 'app/utils/http';
import { PostParams } from './models/postModel';
import { City, GetCityParams } from './models/tourModel';
import {
  TourOrder,
  Order,
  GetOrderParams,
  TourDetail,
} from './models/tourModel';
const indexApi = '/tour';

export function getTours(params: PostParams) {
  return defHttp.get<TourDetail[]>({
    url: indexApi,
    params,
  });
}
export function getToursCity(params: GetCityParams) {
  return defHttp.get<City[]>({
    url: indexApi + '/get-city',
    params,
  });
}
export function getToursCountry(params: PostParams) {
  return defHttp.get<TourDetail[]>({
    url: indexApi + '/get-country',
    params,
  });
}
export function getToursDetail(params: { id: number }) {
  return defHttp.get<TourDetail>({
    url: indexApi + '/detail',
    params,
  });
}
export function orderTours(params: PostParams) {
  return defHttp.post<TourDetail[]>({
    url: indexApi + '/order',
    params,
  });
}
export function getToursOrder(params: GetOrderParams) {
  return defHttp.get<Order[]>({
    url: indexApi + '/list-order',
    params,
  });
}

export function getToursOrderDetail(params: { order_id: number }) {
  return defHttp.get<TourOrder>({
    url: indexApi + '/detail-order',
    params,
  });
}
