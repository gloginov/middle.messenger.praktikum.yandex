import Handlebars from 'handlebars';
import Block from "./models/Block";
import {HelperOptions} from "handlebars";

export function requireJsComponent(name: string, Component: typeof Block) {
  if (name in Handlebars.helpers) {
    throw `The ${name} component is already registered!`;
  }

  Handlebars.registerHelper(
    name,
function (this: unknown, {hash, data, fn}: HelperOptions
  ) {
    const component = new Component(hash);

    // @ts-ignore
    window.requireHelpers = {}
    window.requireHelpers[name] = component

    const dataAttribute = `data-id="${component.id}"`;

    (data.root.__children = data.root.__children || []).push({
      component,
      embed(fragment: DocumentFragment) {
        const stub = fragment.querySelector(`[${dataAttribute}]`);

        if (!stub) {
          return;
        }

        component.getContent()?.append(...Array.from(stub.childNodes));
        stub.replaceWith(component.getContent()!);
      }
    });

    const contents = fn ? fn(this) : '';

    const $el = `<div ${dataAttribute}>${contents}</div>`

    return new Handlebars.SafeString($el);
  });
}
