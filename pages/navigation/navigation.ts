import './navigation.scss'
import Block from "../../lib/models/Block";

export default class NavigationPage extends Block {
  constructor() {
    super({
      onClick: (e: Event) => {
        if (e.target.dataset.page) {
          e.preventDefault();
          window.router.go(e.target.dataset.page)
        }
      }
    });
  }

  protected init(): void {
    super.init()
    this.props.events = {
      click: this.props.onClick
    }
  }

  protected render(): string {
    return `
      <nav class="navigation">
        {{> Text style="font-size:20px;font-weight:500;color:var(--color-black);" text="Список страниц"  }}
    
        <ul class="navigation-list">
          <li>
              <a href="#" data-page="/">Форма входа</a>
          </li>
          <li>
              <a href="#" data-page="/sign-up">Форма регистрации</a>
          </li>
          <li>
              <a href="#" data-page="/messenger">Чаты</a>
          </li>
          <li>
              <a href="#" data-page="/profile">Профиль</a>
          </li>
          <li>
              <a href="#" data-page="/setting">Настройки</a>
          </li>
          <li>
              <a href="/error">Страница ошибок</a>
          </li>
        </ul>
      </nav>
    `;
  }
}
