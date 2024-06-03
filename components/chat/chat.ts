import './chat.scss'
import Block from '../../lib/models/Block.ts';

class ChatList extends Block {

  constructor(props) {
    super({
      ...props,
      chats: props.chats()
    });
  }

  protected render(): string {
    const { chats } = this.props;

    return `
      <div class="chat-list">
        {{#each chats}}
          {{ ChatItem chat=this }}
        {{/each}}
      </div>
    `
  }
}

class ChatItem extends Block {

  constructor(props) {
    super(props);
  }

  protected render(): string {
    const { chat } = this.props

    return `
      <div class="chat-item {{#if chat.active}} active {{/if}}">
        <div class="chat-item__wrap">
          {{> Avatar width="47px" height="47px" className="chat-item__avatar" name=chat.name }}
          <div class="chat-item__content">

            <div class="chat-item__content-header">
              <span class="chat-item__name">
                  {{ chat.name }}
                  {{{ Button iconLeft="Trash" view="clear" text=""className="chat-item__icon" }}}
              </span>
              <span class="chat-item__date">{{ chat.date }}</span>
            </div>

            <div class="chat-item__content-footer">
              <span class="chat-item__text">
                  {{# if chat.youLast }}<span class="chat-item__text_you">Вы:</span>{{/if}}
                  {{ chat.text }}
              </span>
              {{#if newMessage includeZero=0 }}<span class="chat-item__new-message">{{ newMessage }}</span>{{/if}}
            </div>
          </div>
        </div>
    </div>
    `
  }
}

export {
  ChatItem,
  ChatList
}