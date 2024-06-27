/* eslint-disable */
// @ts-nocheck
import Handlebars from "handlebars";
import * as Pages from './pages';
import * as Layouts from './layouts';
import * as Containers from './containers';
import * as Components from './components';
import { requireJsComponent } from './lib/requireJsComponent';
import './scss/main.scss';
import Router from './helpers/router';
import HTTPTransport from "./lib/HTTPTransport";

import dateFormat from "./helpers/dateFormat";

const backendApi = new HTTPTransport();
backendApi.addInterceptor();
//
Handlebars.registerHelper('isImage', function (value) {
  return value === 'image';
});
//
Handlebars.registerHelper('isYour', function (value) {
  return value === +sessionStorage.getItem('userId');
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

Handlebars.registerHelper('dateFormat', function (date) {
  return dateFormat(date)
})

Handlebars.registerHelper('notNull', function(value, options) {
  if((value instanceof Window) == false) {
    return options.fn(this);
  }
  return options.inverse(this);
});

Object.entries(Components).forEach(([ name, component ]) => {
  if([
    'SelectedChat',
    'ChatList',
    'ChatItem',
    'Button',
    'TextField',
    'FormLogin',
    'FormAddUsers',
    'FormDeleteUsers',
    'FormRegistration',
    'FormAddChat',
    'FormLoadImage',
    'TextFieldLabel',
    'Avatar',
    'LoadAvatar',
    'FormContainer'
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

const router = new Router('#app');
// @ts-ignore
window.router = router;

router
  .use('/', Pages.LoginPage)
  .use('/sign-up', Pages.RegistrationPage)
  .use('/setting', Pages.ProfileSetting)
  .use('/setting/password', Pages.ProfileChangePassword)
  .use('/messenger', Pages.ChatsPage)
  .use('/nav', Pages.NavigationPage)
  .use('/profile', Pages.ProfilePage)
  .use('/loadimage', Pages.ProfileLoadImage)
  .use('*', Pages.ErrorPage)
  .start();

// router.go('/nav')
