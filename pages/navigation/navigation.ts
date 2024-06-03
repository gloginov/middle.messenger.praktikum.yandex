import './navigation.scss'
import Block from "../../lib/models/Block";

export default class NavigationPage extends Block {
  constructor(props) {
    super(props);

  }

  protected render(): string {
    return `
      <nav class="navigation">
        {{> Text style="font-size:20px;font-weight:500;color:var(--color-black);" text="Список страниц"  }}
    
        <ul class="navigation-list">
          <li>
              <a href="#" data-page="login">Форма входа</a>
          </li>
          <li>
              <a href="#" data-page="registration">Форма регистрации</a>
          </li>
          <li>
              <a href="#" data-page="chats">Чаты</a>
          </li>
          <li>
              <a href="#" data-page="profile">Профиль</a>
          </li>
          <li>
              <a href="#" data-page="setting">Настройки</a>
          </li>
          <li>
              <a href="#" data-page="loadimage">Загрузка картинки</a>
          </li>
          <li>
              <a href="#" data-page="error">Страница ошибок</a>
          </li>
        </ul>
      </nav>
    `;
  }
}
