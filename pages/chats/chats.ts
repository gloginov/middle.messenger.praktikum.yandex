/* eslint-disable */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import './chats.scss'
import chatsJson from '../../mock/chats.json'
// import selectedJson from '../../mock/selectedChat.json'
// import socket from "../../api/socket";
import isAuth from "../../middleware/isAuth";
import {chatsApi} from "../../api/chats";
import { socketConnection, socketInstance} from "../../api/socket";
import findAncestor from "../../helpers/finder";
import {formToJson} from "../../helpers/formToJson";

let socketInstance;
export default class ChatsPage extends isAuth {

  constructor(props: undefined) {
    super({
      ...props,
      selectedChatId: null,
      selectedChatJson: null,
      selectedChat: [],
      // selectedChat: () => selectedJson,
      selectedChatPerson: () => chatsJson[0],
      // chats: () => chatsJson
      showCreateChatModal: false,
      onShowCreateChatModal: (e: Event) => {
        e.preventDefault();
        this.setProps({showCreateChatModal: true})
      },
      onSelectChat: async (e: Event) => {
        e.preventDefault();
        const dataChild = findAncestor(e.target, '.chat-item')?.getAttribute('data-chatId');
        if (e.target instanceof Element && !!dataChild) {
          const chatId = findAncestor(e.target, '.chat-item')?.getAttribute('data-chatId');
          await socketConnection({
            "USER_ID": sessionStorage.getItem('userId'),
            "CHAT_ID": chatId
          })
            .then((instance) => {
              socketInstance = instance;

              instance.addEventListener('open', event => {
                console.log('Соединение установлено');

                instance.send(JSON.stringify({
                  content: '0',
                  type: 'get old',
                }));

                this.setProps({
                  selectedChat: [],
                  selectedChatId: chatId,
                  selectedChatJson: this.props.chats.find(chat => +chat.id === +chatId )
                })
                // instance.send(JSON.stringify({
                //   content: 'Моё какое-то сообщение миру!',
                //   type: 'message',
                // }));

              })

              instance.addEventListener('message', event => {
                console.log('Получены данные', event.data);

                // instance.send(JSON.stringify({
                //   content: '0',
                //   type: 'get old',
                // }));
                const data = JSON.parse(event.data);
                this.setProps({
                  selectedChat:
                    Array.isArray(data) ?
                      data.reverse()
                        :
                    this.props.selectedChat.concat(data)

                //

                })
              })

              instance.addEventListener('close', event => {
                  if (event.wasClean) {
                    console.log('Соединение закрыто чисто');
                  } else {
                    console.log('Обрыв соединения');
                  }

                this.setProps({
                  selectedChat: [],
                  selectedChatId: null,
                  selectedChatJson: null
                })

                  console.log(`Код: ${event.code} | Причина: ${event.reason}`);
              })

              instance.addEventListener('error', event => {
                console.log('Ошибка', event.message);
              });

            })
            .catch((error) => {
              // window.router.go('error')
              console.error(error.response)
            })


        }
      },
      onSendMessage: (data) => {
        if (socketInstance instanceof WebSocket) {
          socketInstance.send(JSON.stringify({
            content: data.message,
            type: 'message',
          }));
        }
      },
      onCreateChat: (e: Event) => {
        e.preventDefault();
        if (e.target instanceof Element) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const _self = this

          const formData = formToJson(e.target)
          chatsApi.createChat(formData)
            .then((resp) => {
              chatsApi.getChats().then(({response}) => {
                _self.setProps({chats: JSON.parse(response)})
              })
              _self.setProps({showCreateChatModal: false})
            })
            .catch((error) => {
              // window.router.go('error')
              console.error(error.response)
            })
        }
      },
      onDeleteChat: (e: Event) => {
        e.preventDefault();
        const dataChild = findAncestor(e.target, '.chat-item')?.getAttribute('data-chatId');
        if (e.target instanceof Element && !!dataChild) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const _self = this

          chatsApi.deleteChat({ chatId: dataChild })
            .then(() => {
              chatsApi.getChats().then(({response}) => {
                _self.setProps({chats: JSON.parse(response)})
              })
            })
            .catch((error) => {
              // window.router.go('error')
              console.error(error.response)
            })
        }
      },
      chats: []
    });


    // chatsApi.createChat({
    //     title: "Second chat"
    //   }
    // )
    //   .then(() => {
    //
    //   })

    // chatsApi.addUserInChat({
    //     users: [1032],
    //     chatId: 12577
    //   }
    // )
    //   .then(() => {
    //
    //   })
  }

  protected init(): void {
    chatsApi.getChats()
      .then(({response}) => {this.setProps({chats: JSON.parse(response)})
        // chatsApi.createChat({
        //     title: "Second chat"
        //   }
        // )
        //   .then(() => {
        //
        //   })

        // chatsApi.addUserInChat({
        //     users: [1032],
        //     chatId: 12720
        //   }
        // )
        //   .then(() => {
        //
        //   })
      })
      .catch((error) => {
        // window.router.go('error')
        console.error(error.response)
      })
  }

  protected render(): string {
    return `
      <div class="chats-wrap">
        {{#if showCreateChatModal }}
          {{#> LayoutCentered showOverlay=true position="fixed"}}
            {{#*inline "centerContent"}}
              {{#> FormContainer }}
                {{#*inline "formContent"}}
                  {{ FormAddChat onSubmit=onCreateChat }}
                {{/inline}}
              {{/FormContainer}}
            {{/inline}}
          {{/LayoutCentered}}
        {{/if}}
        {{#> LayoutGrid  }}      
          {{#*inline "leftContent" }}
            {{ ChatNavigation}}
            {{ ChatList 
                chats=chats 
                onSelectChat=onSelectChat 
                onDeleteChat=onDeleteChat 
            }}
            {{ Button className="chat-add" text="Создать чат" view="secondary" onClick=onShowCreateChatModal }}
          {{/inline}}
          {{#*inline "rightContent" }}
            {{#if selectedChatId}}
              {{{ SelectedChat
                selectedChatJson=selectedChatJson
                selectedChat=selectedChat 
                selectedChatPerson=selectedChatPerson
                onSendMessage=onSendMessage
              }}}
            {{else}}
              <span class="chats-stub">Выберите чат чтобы отправить сообщение</span>
            {{/if}}
          {{/inline}}
        {{/LayoutGrid}}
      </div>
    `
  }
}

