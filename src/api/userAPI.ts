import { $authApi } from './index';

export const getUserData = async () => {
  const response = await $authApi.get(`/competitions/api/auth/me?contest_id=10`)
  return response
}
