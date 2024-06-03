import './TextFieldLabel.scss'
import TextFieldModel from "../../../lib/models/TextFieldModel";

export class TextFieldLabel extends TextFieldModel {
  constructor(props) {
    super(props)
  }

  protected render(): string {
    return `
    <div class="custom-text-field-label custom-text-field-label_{{ view }} {{ className }}">
      <label>
        <input class="{{# if showError  }}invalid{{/if}}" type="{{ type }}" value="{{ value }}" required {{!-- if required }} required {{/if --}} name="{{name}}">
        {{# if label }}<span class="custom-text-field-label__label {{ className }}__label">{{ label }}</span>{{/if}}
        <span class="custom-text-field-label__error-message {{ className }}__error-message">{{# if showError }} {{showMessage}} {{/if}}</span>
      </label>
    </div>
    `;
  }
}

