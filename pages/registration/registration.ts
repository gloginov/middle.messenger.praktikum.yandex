import Block from '../../lib/models/Block';

export default class RegistrationPage extends Block {
  constructor() {
    super();
  }

  protected render(): string {
    return `
    {{#> LayoutCentered}}
      {{#> FormContainer }}
        {{ FormRegistration }}
      {{/FormContainer}}
    {{/LayoutCentered}}
    `;
  }

}

