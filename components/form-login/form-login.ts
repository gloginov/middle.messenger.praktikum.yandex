// @ts-nocheck
import './form-login.scss'
import Block from '../../lib/models/Block';
import {formToJson} from "../../helpers/formToJson";
import {validateRequire} from "../../helpers/validate";
import {authApi} from "../../api/auth";
import isJsonString from '../../helpers/isJson';
export class FormLogin extends Block {
  constructor() {
    super({
      validateRequire: validateRequire,
      onClick: (e: Event) => {
        e.preventDefault();
        if (e.target instanceof Element) {
          const formData = formToJson(e.target)
          authApi.signIn(formData)
            .then((resp) => {
              const responseJSON = isJsonString(resp.response) ? JSON.parse(resp.response) : null;
console.log(resp)
              if (responseJSON && responseJSON.reason) {
                console.error(responseJSON.reason)
                switch (responseJSON.reason) {
                  case 'User already in system':
                    authApi.logout()
                    break;
                }
              } else {
                if (resp.status === 200) {
                  authApi.getUser()
                    .then(({response}) => {
                      console.log(response)
                      const responseJSON = isJsonString(response) ? JSON.parse(response) : null;

                      sessionStorage.setItem('userId', responseJSON.id)
                      window.router.go('/messenger')
                    })
                }
              }
            })
        }
      }
    });
  }

  protected init(): void {
    if (sessionStorage.getItem('userId')) {
      window.location.href = window.location.origin + '/messenger'
    }

    this.props.events = {
      submit: this.props.onClick
    }
  }

  protected render(): string {

    return `
      <form class="form__form form__form_login">
        <div class="form__content">
          {{> Text style="font-size:20px;font-weight:500;color:var(--color-black);" text="Вход" className="form__title" }}
    
          {{ TextFieldLabel label="Логин" type="text" validate=validateRequire name="login"}}
          {{ TextFieldLabel label="Пароль" type="password" validate=validateRequire name="password"}}
        </div>
    
        <div class="form__footer">
          {{ Button text="Войти" view="primary" width="full" type="submit"}}
          {{ Button text="Нет аккаунта?" view="clear" width="full" size="small" href="sign-up"}}
        </div>
    </form>
    `
  }
}
