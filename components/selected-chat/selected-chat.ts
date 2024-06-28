// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Block from "../../lib/models/Block";
import './selected-chat.scss'
import { formToJson } from '../../helpers/formToJson';
import {validateRequire} from "../../helpers/validate";
import {Callback, SelectedChatType, SelectedChatPersonType} from "../../types/types";
import dateFormat from "../../helpers/dateFormat";
import {chatsApi} from "../../api/chats";
// import socket from "../../api/socket";

interface IProps {
  selectedChatPerson: () => SelectedChatPersonType,
  // selectedChat: () => SelectedChatType[],
}

export class SelectedChat extends Block {
  constructor(props: IProps & Callback) {
    super({
      ...props,
      validateRequire: validateRequire,
      selectedChatPerson: props.selectedChatPerson(),
      selectedChat: props.selectedChat,
      dateFormat: dateFormat,
      showDotsPopup: false,

      showAddUserModal: false,
      showDeleteUserModal: false,

      onShowAddUserModal: (e: Event) => {
        e.preventDefault();
        this.setProps({
          showAddUserModal: true
        })
      },
      onShowDeleteUserModal: (e: Event) => {
        e.preventDefault();
        this.setProps({
          showDeleteUserModal: true
        })
      },
      onShowPopupDots: (e: Event) => {
        console.log('Click', this, self)
        e.preventDefault();
        this.setProps({
          showDotsPopup: true
        })
      },
      onClick: (e: Event) => {
        e.preventDefault();
        if (e.target instanceof Element) {
          this.props.onSendMessage(formToJson(e.target))

          e.target.reset()
        }
      },
      checkFrom: (id) => {
        return sessionStorage.getItem('userId') === id
      },
      onAddUserInChat: (e: Event) => {
        e.preventDefault();
        if (e.target instanceof Element) {
          const formData = formToJson(e.target)

          chatsApi.addUserInChat({
            chatId: this.props.selectedChatJson.id,
            users: [formData.users]
          })
            .then((resp) => {

            })
            .catch((error) => {
              // window.router.go('error')
              console.error(error.response)
            })
        }
      },
      onDeleteUserInChat: (e: Event) => {
        e.preventDefault();
        if (e.target instanceof Element) {
          const formData = formToJson(e.target)

          chatsApi.deleteUserInChat({
            chatId: this.props.selectedChatJson.id,
            users: [formData.users]
          })
            .then((resp) => {

            })
            .catch((error) => {
              // window.router.go('error')
              console.error(error.response)
            })
        }
      }
    });
  }

  protected init(): void {
    this.props.events = {
      submit: this.props.onClick
    }
  }

  protected render(): string {
    const { checkFrom } = this.props;

    return (`
      <div class="selected-chat">
      
        {{#if showAddUserModal }}
          {{#> LayoutCentered showOverlay=true position="fixed"}}
          {{#* inline "centerContent"}}
           {{#> FormContainer}}
            {{#*inline "formContent"}}
            {{ FormAddUsers onSubmit=onAddUserInChat }}
            {{/inline}}
            {{/FormContainer}}
            {{/inline}}
          {{/LayoutCentered}}
        {{/if}}
        
        {{#if showDeleteUserModal }}
          {{#> LayoutCentered showOverlay=true position="fixed"}}
            {{#*inline "centerContent"}}
              {{#> FormContainer }}
                {{#*inline "formContent"}}
                  {{ FormDeleteUsers onSubmit=onDeleteUserInChat }}
                {{/inline}}
              {{/FormContainer}}
            {{/inline}}
          {{/LayoutCentered}}
        {{/if}}
        
        <div class="selected-chat__header">
          {{{ Avatar width="47px" height="47px" className="chat-item__avatar" name=selectedChatJson.title }}}
          {{> Text style="font-size:13px;font-weight:600;color:var(--color-black);" text=selectedChatJson.title className="" }}
          <div class="selected-chat__controls">
            {{ Button iconLeft="Dots" view="clear" onClick=onShowPopupDots }}
            
            {{# if showDotsPopup}}
              {{#> Popup className="selected-chat__popup selected-chat__popup_top"}}
                {{#*inline "popupContent"}}
                  {{ Button iconLeft="CirclePlus" view="clear" className="" text="Добавить пользователя" colorText="black" onClick=onShowAddUserModal }}
                  {{ Button iconLeft="CircleCross" view="clear" className="" text="Удалить пользователя" colorText="black" onClick=onShowDeleteUserModal}}
                {{/inline}}            
              {{/Popup}}
           {{/if}}
            
          </div>
        </div>
        
        <div class="selected-chat__dialog">
          {{#each selectedChat}}
            <span class="selected-chat__date">{{ this.date }}</span>

              <div class="selected-chat__balloon
                      selected-chat__balloon_{{# if (isYour user_id) }}you{{/if}}
                      selected-chat__balloon_{{ this.type }}"
              >
                {{{ this.content }}}

<!--                {{#if (isText this.type)}}-->
<!--                {{else if (isImage this.type)}}-->
<!--                    <img src="{{ this.message }}" alt="">-->
<!--                {{/if}}-->

              <div class="selected-chat__balloon-footer">
                <span class="selected-chat__time">
                    {{ dateFormat  this.time }}
                </span>
                  {{# if (isYour user_id)}}
                    {{> Check readed=this.read }}
                  {{/if}}
                </div>
              </div>


          {{/each}}
        </div>
        
        <form class="selected-chat__footer">
          <div class="selected-chat__attach-action">
<!--            {{{ Button iconLeft="Clip" view="clear" className="selected-chat__attach" }}}-->
<!--            {{#> Popup className="selected-chat__popup selected-chat__popup_bottom"}}-->
<!--              {{#* inline "popupContent"}}-->
<!--                {{{ Button iconLeft="Media" view="clear" className="" text="Фото или Видео" colorText="black" }}}-->
<!--                {{{ Button iconLeft="File" view="clear" className="" text="Файл" colorText="black" }}}-->
<!--                {{{ Button iconLeft="Location" view="clear" className="" text="Локация" colorText="black" }}}-->
<!--              {{/inline}}-->
<!--            {{/Popup}}-->
          </div>
            
          {{{ TextField 
              type="text" 
              placeholder="Сообщение"
              name="message" 
              className="selected-chat__send-message"
              validate=validateRequire
          }}}
          
          {{{ Button iconLeft="Arrow" view="primary" form="round" className="selected-chat__send" type="submit" }}}
        </form>
        
      </div>
    `)
  }
}

