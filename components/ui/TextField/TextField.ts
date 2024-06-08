import './TextField.scss'
import TextFieldModel from "../../../lib/models/TextFieldModel";
import {TextFieldType} from "../../../types/types";

export class TextField extends TextFieldModel {
  constructor(props: TextFieldType) {
    super({
      ...props
    });
  }

  protected render(): string {

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

