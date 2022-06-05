import { $authApi } from './index';

export const signUp = async (email: string, password: string, name: string) => {
  const response = await $authApi.post(`/api/ab/register`, {email, password, name, confirm_password: password})
  return response
}

export const signIn = async (email: string, password: string) => {
  const response = await $authApi.post(`/api/ab/login`, {email, password})
  return response
}

export const getToken = async () => {
  const response = await $authApi.post(`/competitions/api/auth/login-by-cookie`)
  return response
}
