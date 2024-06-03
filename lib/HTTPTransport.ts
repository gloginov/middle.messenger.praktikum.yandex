enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
};

type Options = {
  method: METHOD;
  data?: undefined;
};

// Тип Omit принимает два аргумента: первый — тип, второй — строка
// и удаляет из первого типа ключ, переданный вторым аргументом
type OptionsWithoutMethod = Omit<Options, 'method'>;
// Этот тип эквивалентен следующему:
// type OptionsWithoutMethod = { data?: any };

class HTTPTransport {
  get<TResponse>(url: string, options: OptionsWithoutMethod = {}): Promise<TResponse> {
    return this.request<TResponse>(url, {...options, method: METHOD.GET});
  };

  post<TResponse>(url: string, options: OptionsWithoutMethod = {}): Promise<TResponse> {
    return this.request<TResponse>(url, {...options, method: METHOD.POST});
  };

  patch<TResponse>(url: string, options: OptionsWithoutMethod = {}): Promise<TResponse> {
    return this.request<TResponse>(url, {...options, method: METHOD.PATCH});
  };

  put<TResponse>(url: string, options: OptionsWithoutMethod = {}): Promise<TResponse> {
    return this.request<TResponse>(url, {...options, method: METHOD.PUT});
  };

  delete<TResponse>(url: string, options: OptionsWithoutMethod = {}): Promise<TResponse> {
    return this.request<TResponse>(url, {...options, method: METHOD.DELETE});
  };

  request(url: string, options: Options = { method: METHOD.GET }): Promise<XMLHttpRequest> {
    const {method, data} = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onload = function() {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
