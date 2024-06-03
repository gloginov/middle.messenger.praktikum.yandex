import './TextField.scss'
import TextFieldModel from "../../../lib/models/TextFieldModel";

export class TextField extends TextFieldModel {
  constructor(props) {
    super(props);
  }

  protected render(): string {
    const {
      view,
      className,
      type,
      value,
      placeholder,
      errorMessage,
      required
    } = this.props;

    return `
      <div class="custom-text-field custom-text-field_{{ view }} {{ className }} {{# if showError }} custom-text-field_error {{/if}}">
        <label>
          <input class="{{# if showError  }}invalid{{/if}}" type="{{ type }}" value="{{ value }}" placeholder="{{ placeholder }}"  required {{!-- if required }} required {{/if --}} name="{{name}}">
          <span class="custom-text-field__error-message {{ className }}__error-message">{{# if showError }} {{showMessage}} {{/if}}</span>
        </label>
      </div>
    `
  }
}

