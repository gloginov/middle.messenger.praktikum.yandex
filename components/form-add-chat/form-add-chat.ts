import './form-add-chat.scss'
import Block from '../../lib/models/Block';
import {validateRequire} from "../../helpers/validate";

export class FormAddChat extends Block {
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
      <form class="form__form form__form_add-chat">
        <div class="form__content">
          {{> Text style="font-size:20px;font-weight:500;color:var(--color-black);" text="Создать чат" className="form__title" }}
          {{ TextFieldLabel label="Название" type="text" validate=validateRequire name="title"}}
        </div>
    
        <div class="form__footer">
          {{ Button text="Создать" view="primary" width="full" type="submit"}}
        </div>
    </form>
    `
  }
}
