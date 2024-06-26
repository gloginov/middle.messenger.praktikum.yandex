import './chat.scss'
import Block from '../../lib/models/Block';
import {Callback} from "../../types/types";
import {ChatItem} from "./chat-item";
// import dateFormat from "../../helpers/dateFormat";
// import {chatsApi} from "../../api/chats";
// import socket from "../../api/socket";
// import isJsonString from "../../helpers/isJson";
// import socketConnection from "../../api/socket";

type Chat = {
  onSelectChat: undefined;
  name: string;
  youLast: boolean;
  date: string;
  text: string;
}

interface IProps {
  chats: () => Chat[],
  onSelectChat: undefined;
}

class ChatList extends Block {

  constructor(props: IProps & Callback) {
    super(props);
  }

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
