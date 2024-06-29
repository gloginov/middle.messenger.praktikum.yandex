// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import HTTPTransport from '../lib/HTTPTransport';
const backendApi = new HTTPTransport();

class ChatsApi {
  async getChats():Promise<XMLHttpRequest> {
    return backendApi.get(`${import.meta.env.VITE_API_URL}/chats`)
  }

  async createChat(data: {
    title: string;
  }):Promise<XMLHttpRequest> {
    return backendApi.post(`${import.meta.env.VITE_API_URL}/chats`, {
      data: JSON.stringify(data)
    })
  }

  async deleteChat(data: {
    chatId: number;
  }):Promise<XMLHttpRequest> {
    return backendApi.delete(`${import.meta.env.VITE_API_URL}/chats`, {
      data: JSON.stringify(data)
    })
  }

  async addUserInChat(data: {
    users: number[],
    chatId: number;
  }):Promise<XMLHttpRequest> {
    return backendApi.put(`${import.meta.env.VITE_API_URL}/chats/users`, {
      data: JSON.stringify(data)
    })
  }

  async deleteUserInChat(data: {
    users: number[],
    chatId: number;
  }):Promise<XMLHttpRequest> {
    return backendApi.delete(`${import.meta.env.VITE_API_URL}/chats/users`, {
      data: JSON.stringify(data)
    })
  }

  async connectChat(id: string):Promise<XMLHttpRequest> {
    return backendApi.post(`${import.meta.env.VITE_API_URL}/chats/token/${id}`)
  }
}


export const chatsApi = new ChatsApi()
