import Block from '../../lib/models/Block';

export default class LoginPage extends Block {
  constructor() {
    super();
  }

  protected render(): string {
    return `
      {{#> LayoutCentered}}
        {{#*inline "centerContent"}}
          {{#> FormContainer }}
            {{#*inline "formContent"}}
              {{ FormLogin }}
            {{/inline}}
          {{/FormContainer}}
        {{/inline}}
      {{/LayoutCentered}}
    `
  }
}

