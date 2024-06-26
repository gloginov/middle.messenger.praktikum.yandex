import HTTPTransport from '../lib/HTTPTransport';
const backendApi = new HTTPTransport();

class AuthApi {
  async signUp(data):Promise<XMLHttpRequest> {
    // console.log(import.meta.env)
    return backendApi.post(`${import.meta.env.VITE_API_URL}/auth/signup`, {
      data: JSON.stringify(data)
    })
  }
  async logout():Promise<XMLHttpRequest>  {
    return backendApi.post(`${import.meta.env.VITE_API_URL}/auth/logout`)
  }
  async signIn(data):Promise<XMLHttpRequest>  {
    return backendApi.post(`${import.meta.env.VITE_API_URL}/auth/signIn`, {
      data: JSON.stringify(data)
    })
  }
  async getUser() {
    return backendApi.get(`${import.meta.env.VITE_API_URL}/auth/user`)
  }
}


export const authApi = new AuthApi()
