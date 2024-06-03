import Block from "../../../lib/models/Block";
import {validateEmail, validateName, validateLength, validatePhone, validateLogin} from "../../../helpers/validate";
import {formToJson} from "../../../helpers/formToJson";

export default class ProfileSetting extends Block {
  constructor(props) {
    super({
      ...props,
      validateEmail: validateEmail,
      validateName: validateName,
      validateLength: validateLength,
      validatePhone: validatePhone,
      validateLogin: validateLogin,
      onClick: (e: Event) => {
        e.preventDefault();
        console.log('Submit form, value:', formToJson(e.target));
      }
    });
  }

  protected init(): void {
    this.props.events = {
      submit: this.props.onClick
    }
  }

  protected render(): string {
    return `
      {{#> LayoutGrid}}
        <div   class="profile">
          {{#*inline "leftContent" }}
            <div class="profile__back">
              {{ Button iconLeft="Arrow" view="primary" form="round" className="profile__go-back" }}
            </div>
          {{/inline}}
    
          {{#*inline "rightContent" }}
            <div class="profile__content">
              <div class="profile-avatar">
                <label for="">
                  {{> Avatar avatar="https://i.pravatar.cc/300" width="130px" height="130px" }}
                  <input type="file"  name="avatar">
                  <span class="profile-avatar__upload">
                    <span class="profile-avatar__upload-text">
                      Upload image...
                    </span>
                  </span>
                </label>
              </div>
  
              <form class="profile-info">
                {{ TextFieldLabel label="Почта" type="text" value="ivanivanov@mm.rr" name="email" className="profile-info-field inline " validate=validateEmail}}
                {{ TextFieldLabel label="Логин" type="text" value="ivanivanov" name="login" className="profile-info-field inline " validate=validateLogin}}
                {{ TextFieldLabel label="Имя" type="text" value="Василий" name="first_name" className="profile-info-field inline " validate=validateName}}
                {{ TextFieldLabel label="Фамилия" type="text" value="Пупкин" name="second_name" className="profile-info-field inline " validate=validateName}}
                {{ TextFieldLabel label="Имя в чате" type="text" value="ivanivanov" name="display_name" className="profile-info-field inline " validate=validateLogin}}
                {{ TextFieldLabel label="Телефон" type="tel" value="+7(999)999-99-99" name="phone" className="profile-info-field inline " validate=validatePhone}}
  
                <div class="profile-info__buttons">
                  {{ Button text="Сохранить" view="primary" width="full" type="submit"}}
                </div>
  
              </form>
            </div>
          {{/inline}}
        </div>
      {{/LayoutGrid}}
    `;
  }
}

