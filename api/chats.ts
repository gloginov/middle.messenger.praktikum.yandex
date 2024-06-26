import HTTPTransport from '../lib/HTTPTransport';
const backendApi = new HTTPTransport();

class ChatsApi {
  async getChats(data):Promise<XMLHttpRequest> {
    return backendApi.get(`${import.meta.env.VITE_API_URL}/chats`, {
      data: JSON.stringify(data)
    })
  }

  async createChat(data):Promise<XMLHttpRequest> {
    return backendApi.post(`${import.meta.env.VITE_API_URL}/chats`, {
      data: JSON.stringify(data)
    })
  }

  async deleteChat(data):Promise<XMLHttpRequest> {
    return backendApi.delete(`${import.meta.env.VITE_API_URL}/chats`, {
      data: JSON.stringify(data)
    })
  }

  async addUserInChat(data):Promise<XMLHttpRequest> {
    return backendApi.put(`${import.meta.env.VITE_API_URL}/chats/users`, {
      data: JSON.stringify(data)
    })
  }

  async deleteUserInChat(data):Promise<XMLHttpRequest> {
    return backendApi.delete(`${import.meta.env.VITE_API_URL}/chats/users`, {
      data: JSON.stringify(data)
    })
  }

  async connectChat(id):Promise<XMLHttpRequest> {
    return backendApi.post(`${import.meta.env.VITE_API_URL}/chats/token/${id}`)
  }
}


export const chatsApi = new ChatsApi()
