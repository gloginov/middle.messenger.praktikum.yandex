import './form-registration.scss'
import Block from "../../lib/models/Block";
import {validateEmail, validateName, validateLength, validatePhone, validateLogin} from "../../helpers/validate";
import {formToJson} from "../../helpers/formToJson";

export class FormRegistration extends Block {
  constructor() {
    super({
      validateEmail: validateEmail,
      validateName: validateName,
      validateLength: validateLength,
      validatePhone: validatePhone,
      validateLogin: validateLogin,
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
    return `
      <form class="form__form form__form_registration">
        <div class="form__content">
          {{> Text style="font-size:20px;font-weight:500;color:var(--color-black);" text="Регистрация" className="form__title" }}
  
          {{ TextFieldLabel label="Почта" type="text" name="email" validate=validateEmail}}
          {{ TextFieldLabel label="Логин" type="text" value="ivanivanov" name="login" validate=validateLogin}}
          {{ TextFieldLabel label="Имя" type="text"  name="first_name" validate=validateName}}
          {{ TextFieldLabel label="Фамилия" type="text"  name="second_name" validate=validateName}}
          {{ TextFieldLabel label="Телефон" type="number"  name="phone" validate=validatePhone }}
          {{ TextFieldLabel label="Пароль" type="password"  name="password" validate=validateLength}}
          {{ TextFieldLabel label="Пароль (еще раз)" type="password"  name="password_repeat" validate=validateLength}}
        </div>
    
        <div class="form__footer">
          {{ Button text="Зарегистрироваться" view="primary" width="full" type="submit"}}
          {{ Button text="Войти" view="clear" width="full" size="small"  href="/login"}}
        </div>
      </form>
    `;
  }
}

