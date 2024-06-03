import Block from '../../lib/models/Block.ts';

export default class RegistrationPage extends Block {
  constructor(props) {
    super(props);

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

