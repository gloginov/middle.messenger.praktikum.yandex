import Block from "../../lib/models/Block";
import './selected-chat.scss'
import { formToJson } from '../../helpers/formToJson';
import {validateRequire} from "../../helpers/validate";
import {Callback, SelectedChatType, SelectedChatPersonType} from "../../types/types";

interface IProps {
  selectedChatPerson: () => SelectedChatPersonType,
  selectedChat: () => SelectedChatType[],
}

export class SelectedChat extends Block {
  constructor(props: IProps & Callback) {
    super({
      ...props,
      validateRequire: validateRequire,
      selectedChatPerson: props.selectedChatPerson(),
      selectedChat: props.selectedChat(),
      onClick: (e: Event) => {
        e.preventDefault();
        if (e.target instanceof Element) {
          console.log('Submit form, value:', formToJson(e.target));
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

    return (`
      <div class="selected-chat">
        <div class="selected-chat__header">
          {{> Avatar width="47px" height="47px" className="chat-item__avatar" name=selectedChatPerson.name avatar=selectedChatPerson.avatar }}
          {{> Text style="font-size:13px;font-weight:600;color:var(--color-black);" text=selectedChatPerson.name className="" }}
          <div class="selected-chat__controls">
            {{{ Button iconLeft="Dots" view="clear" }}}
            
            {{#> Popup className="selected-chat__popup selected-chat__popup_top"}}
              {{{ Button iconLeft="CirclePlus" view="clear" className="" text="Добавить пользователя" colorText="black" }}}
              {{{ Button iconLeft="CircleCross" view="clear" className="" text="Удалить пользователя" colorText="black" }}}
            {{/Popup}}
            
          </div>
        </div>
        
        <div class="selected-chat__dialog">
          {{#each selectedChat}}
            <span class="selected-chat__date">{{ this.date }}</span>
            {{#each this.messages }}
              <div class="selected-chat__balloon
                      selected-chat__balloon_{{ this.from }}
                      selected-chat__balloon_{{ this.type }}"
              >
                {{#if (isText this.type)}}
                    {{{ this.message }}}
                {{else if (isImage this.type)}}
                    <img src="{{ this.message }}" alt="">
                {{/if}}

                <div class="selected-chat__balloon-footer">
                <span class="selected-chat__time">
                    {{this.time}}
                </span>
                  {{# if (isYour this.from)}}
                    {{> Check readed=this.read }}
                  {{/if}}
                </div>
              </div>
            {{/each}}

          {{/each}}
        </div>
        
        <form class="selected-chat__footer">
          <div class="selected-chat__attach-action">
            {{{ Button iconLeft="Clip" view="clear" className="selected-chat__attach" }}}
            {{#> Popup className="selected-chat__popup selected-chat__popup_bottom"}}
              {{{ Button iconLeft="Media" view="clear" className="" text="Фото или Видео" colorText="black" }}}
              {{{ Button iconLeft="File" view="clear" className="" text="Файл" colorText="black" }}}
              {{{ Button iconLeft="Location" view="clear" className="" text="Локация" colorText="black" }}}
            {{/Popup}}
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

