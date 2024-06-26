import Route from '../lib/Route';

class Router {
  private static __instance: any;
  private routes: any[];
  private history: History;
  private _currentRoute: null;
  private readonly _rootQuery: any;

  constructor(rootQuery) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname, block) {
    const route = new Route(pathname, block, {rootQuery: this._rootQuery});
    this.routes.push(route);

    return this;
  }

  start() {
    // Реагируем на изменения в адресной строке и вызываем перерисовку
    window.onpopstate = event => {
      // @ts-ignore
      this._onRoute(event.currentTarget.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname) {
    const route = this.getRoute(pathname);

    if (!route) {
      const routeFallback = this.getRoute('*');

      routeFallback.render(routeFallback, 'error')
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      // @ts-ignore
      this._currentRoute.leave();
    }
    this._currentRoute = route;

    route.render(route, pathname);
  }

  go(pathname) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  getRoute(pathname) {
    return this.routes.find(route => route.match(pathname));
  }
}

export default Router;
