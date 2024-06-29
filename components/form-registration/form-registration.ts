// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import './form-registration.scss'
import Block from "../../lib/models/Block";
import {validateEmail, validateName, validateLength, validatePhone, validateLogin} from "../../helpers/validate";
import {formToJson} from "../../helpers/formToJson";
import {authApi} from '../../api/auth'

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

          const formData = formToJson(e.target);
          const data = {
            "first_name": formData['first_name'],
            "second_name": formData['second_name'],
            "login": formData['login'],
            "email": formData['email'],
            "password": formData['password'],
            "phone": formData['phone']
          }

          authApi.signUp(data)
            .then((resp) => {
              console.log('response', resp)

              if (resp.status === 200) {
                sessionStorage.setItem('userId', resp.id)
                window.router.go('/messenger')
              }
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
    return `
      <form class="form__form form__form_registration">
        <div class="form__content">
          {{> Text style="font-size:20px;font-weight:500;color:var(--color-black);" text="Регистрация" className="form__title" }}
  
          {{ TextFieldLabel label="Почта" type="text" name="email" validate=validateEmail}}
          {{ TextFieldLabel label="Логин" type="text" name="login" validate=validateLogin}}
          {{ TextFieldLabel label="Имя" type="text"  name="first_name" validate=validateName}}
          {{ TextFieldLabel label="Фамилия" type="text"  name="second_name" validate=validateName}}
          {{ TextFieldLabel label="Телефон" type="number"  name="phone" validate=validatePhone }}
          {{ TextFieldLabel label="Пароль" type="password"  name="password" validate=validateLength}}
          {{ TextFieldLabel label="Пароль (еще раз)" type="password"  name="password_repeat" validate=validateLength}}
        </div>
    
        <div class="form__footer">
          {{ Button text="Зарегистрироваться" view="primary" width="full" type="submit"}}
          {{ Button text="Войти" view="clear" width="full" size="small"  data-page="/"}}
        </div>
      </form>
    `;
  }
}

