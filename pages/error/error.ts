// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import './error.scss'
import Block from "../../lib/models/Block";

export default class ErrorPage extends Block {
  constructor() {
    super({
      code: '404',
      message: "Не туда попали",
      backLink: 'messenger',
      backLinkText: "Назад к чатам"
    });
  }

  protected render(): string {

    return `
      <div class="error-page">
        <div class="error-page__wrap">
          {{> Text style="font-size:40px;font-weight:500;color:var(--color-black);" text=code className="error-page__title" }}
          {{> Text style="font-size:20px;font-weight:500;color:var(--color-black);" text=message className="error-page__text" }}
          <a href={{ backLink }}>
            {{> Text style="font-size:11px;font-weight:500;" text=backLinkText className="error-page__backUrl" }}
          </a>
        </div>
      </div>
    `;
  }
}

