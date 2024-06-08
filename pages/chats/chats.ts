import './chats.scss'
import Block from '../../lib/models/Block';
import chatsJson from '../../mock/chats.json'
import selectedJson from '../../mock/selectedChat.json'

export default class ChatsPage extends Block {

  constructor() {
    super({
      selectedChat: () => selectedJson,
      selectedChatPerson: () => chatsJson[0],
      chats: () => chatsJson
    });
  }

  protected render(): string {

    return `
      {{#> LayoutGrid  }}
        {{#*inline "leftContent" }}
          {{> ChatNavigation}}
          {{ ChatList chats=chats }}
        {{/inline}}
        {{#*inline "rightContent" }}
          {{#if selectedChat}}
            {{{ SelectedChat
              selectedChat=selectedChat 
              selectedChatPerson=selectedChatPerson
              testProps='1'
              testPropsSecond='1'
            }}}
          {{else}}
            <span class="chats-stub">Выберите чат чтобы отправить сообщение</span>
          {{/if}}
        {{/inline}}
      {{/LayoutGrid}}
    `
  }
}

