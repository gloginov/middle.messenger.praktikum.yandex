// @ts-nocheck
import './chat.scss'
import Block from '../../lib/models/Block';

class ChatList extends Block {

  protected init(): void {
    this.props.events = {
      click: this.props.onSelectChat
    }
  }

  protected render(): string {
    const { onSelectChat, onDeleteChat, chats} = this.props;
    return `
      <div class="chat-list">
        {{#each chats}}
          {{ ChatItem chat=this onClick=../onSelectChat onDeleteChat=../onDeleteChat }}
        {{/each}}
      </div>
    `
  }
}

export { ChatList }
