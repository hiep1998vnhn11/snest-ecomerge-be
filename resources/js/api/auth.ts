import { defHttp } from '/@/utils/http'
import { LoginParams, LoginResultModel } from './models/authModel'

enum Api {
  Login = '/auth/login',
  Logout = '/auth/logout',
  Register = '/auth/register',
  UpdateToken = '/updateToken',
  UpdateUser = '/updateUser',
  ChangePassword = '/change-password',
  GetUser = '/auth/me',
  ConfirmResetPassword = '/auth/confirm-reset-password',
  VerifySms = '/auth/verify-sms',
  FirstChangePassword = '/auth/first-change-password',
  ChangeUserInfo = '/auth/change-info',
  VerifyCode = '/auth/verify-code',
}
export function loginApi(params: LoginParams) {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      withToken: false,
    }
  )
}

export const logoutApi = () => defHttp.post({ url: Api.Logout })
export const updateToken = () => defHttp.post({ url: Api.UpdateToken })
export const updateUser = () => defHttp.put({ url: Api.UpdateUser })
export const getUser = () => defHttp.get({ url: Api.GetUser })

export const registerApi = (params: any) =>
  defHttp.post({ url: Api.Register, params })
