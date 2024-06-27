// @ts-nocheck
import './Button.scss'
import {ButtonType} from '../../../types/types'
import Block from "../../../lib/models/Block";

class Button extends Block {
  constructor(props: ButtonType) {

    super({
      ...props
    });
  }

  protected init(): void {
    super.init()
    this.props.events = {
      click: this.props.onClick
    }
  }

  protected render(): string {

    return (`
      {{# if href}}
        <a href="{{ href }}" target="{{ target }}"
           class="
              custom-button
              custom-button_{{ view }}
              custom-button_{{ form }}
              custom-button_{{ width }}
              custom-button_{{# if size}}{{ size }}{{else}}default{{/if}}
              custom-button_{{ colorText }}-text
              {{ className }}
           "
           style={{ style }}
        >
          {{# if iconLeft}} {{{getPartial iconLeft}}} {{/if}}
          {{# if text}}<span class="custom-button__text">{{ text }}</span>{{/if}}
          {{# if iconRigth}} {{{getPartial iconRigth}}} {{/if}}
        </a>
      {{else if data-page}}
        <a href="#"
          class="
            custom-button
            custom-button_{{ view }}
            custom-button_{{ form }}
            custom-button_{{ width }}
            custom-button_{{# if size}}{{ size }}{{else}}default{{/if}}
            custom-button_{{ colorText }}-text
            {{ className }}
          "
          style={{ style }}
        >
          {{# if iconLeft}} {{{getPartial iconLeft}}} {{/if}}
          {{# if text}}<span data-page="{{ data-page }}" class="custom-button__text">{{ text }}</span>{{/if}}
          {{# if iconRigth}} {{{getPartial iconRigth}}} {{/if}}
        </a>
      {{else}}
        <button class="
            custom-button
            custom-button_{{ view }}
            custom-button_{{ form }}
            custom-button_{{ width }}
            custom-button_{{# if size}}{{ size }}{{else}}default{{/if}}
            custom-button_{{ colorText }}-text
            {{ className }}
          "
          style={{ style }}
          {{# if type}} type="{{type}}" {{/if}}
        >
          {{# if iconLeft}} {{{getPartial iconLeft}}} {{/if}}
          {{# if text}}<span class="custom-button__text">{{ text }}</span>{{/if}}
          {{# if iconRigth}} {{{getPartial iconRigth}}} {{/if}}
        </button>
      {{/if}}
    `)
  }
}

export { Button }
