// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import HTTPTransport from '../lib/HTTPTransport';
const backendApi = new HTTPTransport();

class AuthApi {
  async signUp(data: {
    "first_name": "string",
    "second_name": "string",
    "login": "string",
    "email": "string",
    "password": "string",
    "phone": "string"
  }):Promise<XMLHttpRequest> {
    return backendApi.post(`${import.meta.env.VITE_API_URL}/auth/signup`, {
      data: JSON.stringify(data)
    })
  }
  async logout():Promise<XMLHttpRequest>  {
    return backendApi.post(`${import.meta.env.VITE_API_URL}/auth/logout`)
  }
  async signIn(data: {
    "login": "string",
    "password": "string"
  }):Promise<XMLHttpRequest>  {
    return backendApi.post(`${import.meta.env.VITE_API_URL}/auth/signIn`, {
      data: JSON.stringify(data)
    })
  }
  async getUser() {
    return backendApi.get(`${import.meta.env.VITE_API_URL}/auth/user`)
  }
}


export const authApi = new AuthApi()
