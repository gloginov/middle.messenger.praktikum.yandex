import HTTPTransport from '../lib/HTTPTransport';
const backendApi = new HTTPTransport();

class ResourcesApi {
  async getResources(data: string):Promise<XMLHttpRequest> {
    return backendApi.get(`${import.meta.env.VITE_API_URL}/resources`, {
      data: data
    })
  }
}


export const resourcesApi = new ResourcesApi()
