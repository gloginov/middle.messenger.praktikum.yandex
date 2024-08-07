/* eslint-disable */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
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
  get(url: string, options?: {}): Promise<XMLHttpRequest> {
    return this.request(url, {...options, method: METHOD.GET});
  };

  post(url: string, options?: { data: string }): Promise<XMLHttpRequest> {
    return this.request(url, {...options, method: METHOD.POST});
  };

  patch(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, {...options, method: METHOD.PATCH});
  };

  put(url: string, options?: { data: string }, requestHeader?: string): Promise<XMLHttpRequest> {
    return this.request(url, {...options, method: METHOD.PUT}, requestHeader);
  };

  delete(url: string, options?: { data: string }): Promise<XMLHttpRequest> {
    return this.request(url, {...options, method: METHOD.DELETE});
  };

  request(url: string, options: Options = { method: METHOD.GET }, requestHeader?: string): Promise<XMLHttpRequest> {
    const {method, data} = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      if (requestHeader) {
        // xhr.setRequestHeader('Content-type', requestHeader);

      } else {
        xhr.setRequestHeader('Content-type', 'application/json');
      }
      xhr.withCredentials = true;

//       xhr.setRequestHeader('Access-Control-Allow-Origin','http://ya.docker');
//       xhr.setRequestHeader('Access-Control-Allow-Credentials', 'true');
//       // xhr.setRequestHeader('Cookie', cookie);
//       xhr.setRequestHeader('Cookie', "key=value");
//
//       const allCookies = document.cookie;
// console.log(allCookies)
//       xhr.setRequestHeader('Cookie', allCookies)

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
  addInterceptor() {
    const oldXHROpen = window.XMLHttpRequest.prototype.send;
    window.XMLHttpRequest.prototype.send = function(method, url, async, user, password) {
      // do something with the method, url and etc.
      this.addEventListener('load', function() {
        if (this.status === 401) {
          sessionStorage.clear();
          window.router.go('/');
        } else {
          // createCookie('authCookie', )
        }
      });

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return oldXHROpen.apply(this, arguments);
    }
  }
}
export default HTTPTransport;
