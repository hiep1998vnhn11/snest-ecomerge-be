export interface UserParams {
  uid?: number;
}
export interface CurrentUser {
  id: number;
  email: Nullable<string>;
  username: string;
  phone: string;
  first_name: Nullable<string>;
  last_name: Nullable<string>;
  full_name: string;
  gender: number;
  google_id: Nullable<string>;
  google_url: Nullable<string>;
  google_token: Nullable<string>;
  facebook_id: Nullable<string>;
  facebook_url: Nullable<string>;
  image_id: Nullable<string>;
  birth_day: Nullable<string>;
  bio: Nullable<string>;
  address: Nullable<string>;
  status: number;
  last_login: string;
  type: number;
  coupon: number;
  created_at: string;
  updated_at: string;
  total_friend: Nullable<number>;
  language_code: Nullable<string>;
  avatar: Nullable<string>;
  cover: Nullable<string>;
}
export interface User {
  userInfo: UserInfo;
  listImage: any[];
  listFriend: Friend[];
  numberfriend: number;
  isFriend: Nullable<number>;
}

export interface Friend {
  id: number;
  name: string;
  avatar: string;
}

export interface UserInfo {
  userId: number;
  userName: string;
  avatar: string;
  cover: string;
}

export interface UserPostParams {
  uid?: number;
  page?: number;
}
