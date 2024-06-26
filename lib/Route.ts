class Route {
  private _pathname: any;
  private readonly _blockClass: any;
  private _block: null;
  private readonly _props: any;

  constructor(pathname, view, props) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      // @ts-ignore
      this._block.hide();
    }
  }

  match(pathname) {
    return pathname === this._pathname;
  }

  _renderDom(query, block) {
    const root = document.querySelector(query);
    root.append(block.getContent());
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass({});
      this._renderDom(this._props.rootQuery, this._block);
      return;
    }
    // @ts-ignore
    this._block.show();
  }
}

export default Route;
