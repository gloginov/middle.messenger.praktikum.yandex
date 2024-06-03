import './form-login.scss'
import Block from '../../lib/models/Block.ts';
import {formToJson} from "../../helpers/formToJson";
import {validateRequire} from "../../helpers/validate";

export class FormLogin extends Block {
  constructor() {
    super({
      validateRequire: validateRequire,
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
      <form class="form__form form__form_login">
        <div class="form__content">
          {{> Text style="font-size:20px;font-weight:500;color:var(--color-black);" text="Вход" className="form__title" }}
    
          {{ TextFieldLabel label="Логин" type="text" validate=validateRequire value="ivanivanov" name="login"}}
          {{ TextFieldLabel label="Пароль" type="password" validate=validateRequire name="password"}}
        </div>
    
        <div class="form__footer">
          {{ Button text="Войти" view="primary" width="full" type="submit"}}
          {{ Button text="Нет аккаунта?" view="clear" width="full" size="small" data-page="registration"}}
        </div>
    </form>
    `
  }
}
