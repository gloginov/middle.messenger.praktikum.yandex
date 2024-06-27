/* eslint-disable */
// @ts-nocheck
class Route {
  private _pathname: undefined;
  private readonly _blockClass: undefined;
  private _block: null;
  private readonly _props: undefined;

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
      // @ts-ignore @ts-expect-error
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
    // @ts-ignore @ts-expect-error
    this._block.show();
  }
}

export default Route;
