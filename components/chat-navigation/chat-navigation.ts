import './chat-navigation.scss'
import Block from "../../lib/models/Block";

export class ChatNavigation extends Block {

  constructor(props) {
    super({
      ...props,
      onClick: (e: Event) => {
        e.preventDefault();
        if (e.target.dataset.page) {
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
      <div class="chat-navigation">
        <div class="chat-navigation__wrap">
          <a href="#" class="chat-navigation__link-profile" data-page="/profile">
              Профиль{{> Chevron}}
          </a>
          {{> Search name="message" placeholder="Поиск" }}
        </div>
      </div>
    `;
  }
}

// export { default as ChatNavigation } from './chat-navigation.hbs?raw'
