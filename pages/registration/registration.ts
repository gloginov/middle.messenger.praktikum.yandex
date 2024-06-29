import Block from '../../lib/models/Block';

export default class RegistrationPage extends Block {
  constructor() {
    super();
  }

  protected render(): string {
    return `
    {{#> LayoutCentered}}
        {{#*inline "centerContent"}}
          {{#> FormContainer }}
            {{#*inline "formContent"}}
              {{ FormRegistration }}
            {{/inline}}
          {{/FormContainer}}
        {{/inline}}
      {{/LayoutCentered}}
    `;
  }

}

