/* eslint-disable */
import Handlebars from "handlebars";
import * as Pages from './pages';
import * as Layouts from './layouts';
import * as Containers from './containers';
import * as Components from './components';

import { requireJsComponent } from './lib/requireJsComponent';

import './scss/main.scss'

const pages = {
  'chats': Pages.ChatsPage,
  'login':  Pages.LoginPage,
  'registration': Pages.RegistrationPage,
  'nav': Pages.NavigationPage,
  'profile': Pages.ProfilePage,
  'setting': Pages.ProfileSetting,
  'loadimage': Pages.ProfileLoadImage,
  'error': Pages.ErrorPage
};

// // get current page from url
const routeFromUrl = () => {
  return window.location.pathname.replace('/', '')
}
//
Handlebars.registerHelper('isImage', function (value) {
  return value === 'image';
});
//
Handlebars.registerHelper('isYour', function (value) {
  return value === 'you';
});
//
Handlebars.registerHelper('isText', function (value) {
  return value === 'text';
});
//
Handlebars.registerHelper('getFirstLetter', function (value) {
  if (!!value && value.length) {
    return value[0]
  }
  return '';
})

Object.entries(Components).forEach(([ name, component ]) => {
  if([
    'SelectedChat',
    'ChatList',
    'ChatItem',
    'Button',
    'TextField',
    'FormLogin',
    'FormRegistration',
    'FormLoadImage',
    'TextFieldLabel'
  ].includes(name)) {
    requireJsComponent(name, component);
    return;
  }
  // @ts-ignore
  Handlebars.registerPartial(name, component);
});
//
// register Layouts
Object.entries(Layouts).forEach(([ name, layout ]) => {
  Handlebars.registerPartial(name, layout);
});

// register containers
Object.entries(Containers).forEach(([ name, container ]) => {
  Handlebars.registerPartial(name, container);
});

Handlebars.registerHelper('getPartial', function (value) {
  if (Handlebars.partials[value]) {
    return Handlebars.partials[value];
  }
  return null;
})
//
function navigate(page: any) {
  const container = document.getElementById('app')!;

  //@ts-ignore
  const Component = pages[page]
  const component = new Component();

  // window[page] = component
  window.history.pushState({}, '', page);

  container.innerHTML = '';
  container.append(component.getContent()!);
}

//@ts-ignore
if (pages[routeFromUrl()]) {
  document.addEventListener('DOMContentLoaded', () => navigate(routeFromUrl()));
} else {
  document.addEventListener('DOMContentLoaded', () => navigate('nav'));
}
//
document.addEventListener('click', e => {
  // @ts-ignore
  const page = e.target.getAttribute('data-page');
  if (page) {
    navigate(page);
    e.preventDefault()
    e.stopImmediatePropagation();
  }
});
