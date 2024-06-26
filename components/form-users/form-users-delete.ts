import './form-users.scss'
import Block from '../../lib/models/Block';
import {validateRequire} from "../../helpers/validate";

export class FormDeleteUsers extends Block {
  constructor(props) {
    super({
      ...props,
      validateRequire: validateRequire,
    });
  }

  protected init(): void {
    super.init()

    this.props.events = {
      submit: this.props.onSubmit
    }
  }

  protected render(): string {

    return `
      <form class="form__form form__form_users">
        <div class="form__content">
          {{> Text style="font-size:20px;font-weight:500;color:var(--color-black);" text="Удалить пользователя" className="form__title" }}
          {{ TextFieldLabel label="Id пользователя" type="text" validate=validateRequire name="users"}}
        </div>
    
        <div class="form__footer">
          {{ Button text="Удалить" view="primary" width="full" type="submit"}}
        </div>
    </form>
    `
  }
}
