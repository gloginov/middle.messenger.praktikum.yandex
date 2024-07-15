// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Block from "./Block.ts";
import { expect } from 'chai';
import Router from "../../helpers/router.ts";
import {before} from "mocha";
import Sinon from "sinon";

describe ('Тестирование класса Block', () => {

  let renderComponent = false;
  let componentDidUpdatedProps = false;
  let TestBlock: typeof Block;

  const TestRouter = new Router('#app');

  before(() => {

    class TestBlockComponent extends Block {
      constructor(props) {
        super({
          ...props,
          componentDidUpdated: componentDidUpdatedProps
        });
      }

      init () {
        this.setProps({componentDidUpdated: true})
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
      }

      protected render(props) : string {
        if (this.props.componentDidUpdated) {
          componentDidUpdatedProps = true
        }

        renderComponent = true
        return `<div></div>`;
      }
    }

    TestBlock = new TestBlockComponent({});
  })


  it('Добавление роута', () => {
    TestRouter.use('/', TestBlock);
    expect(TestRouter.routes).to.have.lengthOf(3);
  });
  it('Тестирование "render"', () => {
    expect(renderComponent).to.be.true;
  })

  it('Тестирование "setProps"', () => {
    const stub = Sinon.stub(window.history, 'pushState');

    TestRouter.use('/messenger', TestBlock);
    TestRouter.go('/messenger');

    expect(componentDidUpdatedProps).to.be.true;
    stub.restore();
  })
})
