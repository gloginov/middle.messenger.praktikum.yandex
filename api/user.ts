import HTTPTransport from '../lib/HTTPTransport';
const backendApi = new HTTPTransport();

class UserApi {
  async updateUser(data: {
    "first_name": string,
    "second_name": string,
    "display_name": string,
    "login": string,
    "email": string,
    "phone": string
  }):Promise<XMLHttpRequest> {
    return backendApi.put(`${import.meta.env.VITE_API_URL}/user/profile`, {
      data: JSON.stringify(data)
    })
  }
  async changePassword(data: {
    "oldPassword": string,
    "newPassword": string
  }):Promise<XMLHttpRequest>  {
    return backendApi.put(`${import.meta.env.VITE_API_URL}/user/password`, {
      data: JSON.stringify(data)
    })
  }
  async changeAvatar(data: string):Promise<XMLHttpRequest>  {
    return backendApi.put(`${import.meta.env.VITE_API_URL}/user/profile/avatar`, {
      data: data
    }, 'multipart/form-data')
  }
  async searchUserByLogin(data: {
    login: string
  }):Promise<XMLHttpRequest> {
    return backendApi.post(`${import.meta.env.VITE_API_URL}/auth/search`, {
      data: JSON.stringify(data)
    })
  }
}


export const userApi = new UserApi()
