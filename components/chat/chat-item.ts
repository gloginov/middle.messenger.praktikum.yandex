// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Block from "../../lib/models/Block";
import dateFormat from "../../helpers/dateFormat";

class ChatItem extends Block {

  constructor(props: {
    onHandlerDeleteChat: (e: Event) => void;
    dateFormatted: string;
    onSelectChat: undefined;
    onDeleteChat: undefined;
    name: string;
    youLast: boolean;
    date: string;
    text: string;
    chat: {
      title: string;
      last_message?: {
        time: string;
        content: string;
      }
    }
  } ) {
    super({
      ...props,
      onHandlerDeleteChat: (e: Event) => {
        if (e) {
          e.preventDefault();
          e.stopPropagation()
          props.onDeleteChat(e)
        }
      },
      dateFormatted: props.chat.last_message ? dateFormat(props.chat.last_message.time) : ''
    })
  }

  protected render(): string {

    return `
      <div class="chat-item {{#if chat.active}} active {{/if}}" data-chatId="{{chat.id}}">
        <div class="chat-item__wrap">
          {{{ Avatar width="47px" height="47px" className="chat-item__avatar" name=chat.title }}}
          <div class="chat-item__content">

            <div class="chat-item__content-header">
              <span class="chat-item__name">
                {{ chat.title }}
                {{{ Button iconLeft="Trash" view="clear" text="" className="chat-item__icon" onClick=onHandlerDeleteChat }}}
              </span>
              <span class="chat-item__date">{{ dateFormatted }}</span>
            </div>

            <div class="chat-item__content-footer">
              <span class="chat-item__text">
                {{# if chat.youLast }}<span class="chat-item__text_you">Вы:</span>{{/if}}
                {{ chat.last_message.content }}
              </span>
              {{#if unread_count includeZero=0 }}<span class="chat-item__new-message">{{ newMessage }}</span>{{/if}}
            </div>
          </div>
        </div>
    </div>
    `
  }
}
export { ChatItem }
