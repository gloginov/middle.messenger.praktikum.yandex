import './navigation.scss'
import Block from "../../lib/models/Block";

export default class NavigationPage extends Block {
  constructor() {
    super();
  }

  protected render(): string {
    return `
      <nav class="navigation">
        {{> Text style="font-size:20px;font-weight:500;color:var(--color-black);" text="Список страниц"  }}
    
        <ul class="navigation-list">
          <li>
              <a href="/login">Форма входа</a>
          </li>
          <li>
              <a href="/sign-up">Форма регистрации</a>
          </li>
          <li>
              <a href="/messenger">Чаты</a>
          </li>
          <li>
              <a href="/profile">Профиль</a>
          </li>
          <li>
              <a href="/setting">Настройки</a>
          </li>
          <li>
              <a href="/loadimage">Загрузка картинки</a>
          </li>
          <li>
              <a href="/error">Страница ошибок</a>
          </li>
        </ul>
      </nav>
    `;
  }
}
