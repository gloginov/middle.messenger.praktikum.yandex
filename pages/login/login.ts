import Block from '../../lib/models/Block.ts';

export default class LoginPage extends Block {
  constructor() {
    super();
  }

  protected render(): string {
    return `
      {{#> LayoutCentered}}
        {{#> FormContainer }}
          {{ FormLogin }}
        {{/FormContainer}}
      {{/LayoutCentered}}
    `
  }
}

