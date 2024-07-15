// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { expect } from 'chai';
import Block from "../lib/models/Block.ts";
import Router from "./router.ts";
import Sinon from 'sinon';

describe('Тест роутера', () => {

  let TestBlock: typeof Block;
  let TestBlockSecond: typeof Block;

  const TestRouter = new Router('#app');

  before(() => {

    class Test extends Block {}
    class TestSecond extends Block {}

    TestBlock = Test;
    TestBlockSecond = TestSecond;
  })

  it('Добавление роута', () => {
    TestRouter.use('/test', TestBlock);
    expect(TestRouter.routes).to.have.lengthOf(1);
  });

  it('Переход к роуту', function () {
    const stub = Sinon.stub(window.history, 'pushState');

    TestRouter.use('/messenger', TestBlock);
    TestRouter.go('/messenger');

    expect(stub.calledWith({}, '', '/messenger')).to.be.true;

    stub.restore();
  });

  it('Возврат назад', function () {
    const stub = Sinon.stub(window.history, 'back');

    TestRouter.back();
    expect(stub.called).to.be.true;
    stub.restore();
  });
});
