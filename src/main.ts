import Handlebars from "handlebars";
import * as Pages from './pages';
import * as Layouts from './layouts';
import * as Containers from './containers';
import * as Components from './components';

import chatsJson from './mock/chats.json'
import selectedJson from './mock/selectedChat.json'

import './scss/main.scss'
const pages = {
  'many-chats': [ Pages.ChatsPage, { chats: [...chatsJson, ...chatsJson, ...chatsJson, ...chatsJson, ...chatsJson].map((item) => {
    item.active = false
    return item;
  } ) } ],
  'chats': [ Pages.ChatsPage, {
    chats: chatsJson,
    selectedChatPerson: chatsJson[0],
    selectedChat: selectedJson
  }],
  'registration': [ Pages.RegistrationPage ],
  'login': [ Pages.LoginPage ],
  'nav': [ Pages.NavigationPage ],
  'profile': [ Pages.ProfilePage ],
  'setting': [ Pages.ProfileSetting ],
  'loadimage': [ Pages.ProfileLoadImage ],
  '404': [ Pages.ErrorPage, { code: '404', message: "Не туда попали", backLink: 'chats', backLinkText: "Назад к чатам" } ],
  '500': [ Pages.ErrorPage, { code: '500', message: "Мы уже фиксим", backLink: 'chats', backLinkText: "Назад к чатам" } ]
};

// get current page from url
const routeFromUrl = () => {
  return window.location.pathname.replace('/', '')
}

Handlebars.registerHelper('isImage', function (value) {
  return value === 'image';
});

Handlebars.registerHelper('isYour', function (value) {
  return value === 'you';
});

Handlebars.registerHelper('isText', function (value) {
  return value === 'text';
});

Handlebars.registerHelper('getFirstLetter', function (value) {
  if (!!value && value.length) {
    return value[0]
  }
  return '';
})

// register Components
Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
});

// register Layouts
Object.entries(Layouts).forEach(([ name, layout ]) => {
  Handlebars.registerPartial(name, layout);
});

// register containers
Object.entries(Containers).forEach(([ name, container ]) => {
  Handlebars.registerPartial(name, container);
});

Handlebars.registerHelper('getPartial', function (value) {
  if (!!Handlebars.partials[value]) {
    return Handlebars.partials[value];
  }
  return null;
})

function navigate(page: string) {
  // @ts-ignore
  const [source, context] = pages[page];
  const container = document.getElementById('app')!;

  window.history.pushState({}, '', page);
  container.innerHTML = Handlebars.compile(source)(context);
}

if (pages[routeFromUrl()]) {
  document.addEventListener('DOMContentLoaded', () => navigate(routeFromUrl()));
} else {
  document.addEventListener('DOMContentLoaded', () => navigate('nav'));
}

document.addEventListener('click', e => {
  // @ts-ignore
  const page = e.target.getAttribute('data-page');
  if (page) {
    navigate(page);

    e.preventDefault()
    e.stopImmediatePropagation();
  }
});
