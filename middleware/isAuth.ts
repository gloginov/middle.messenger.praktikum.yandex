// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Block from "../lib/models/Block";

export default class isAuth extends Block {

  constructor(props) {
    super(props);

    if (!sessionStorage.getItem('userId')) {
      sessionStorage.clear()
      window.router.go('/')
    }
  }
}
