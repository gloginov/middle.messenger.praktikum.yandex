import Handlebars from "handlebars";
import * as Pages from './pages';
import * as Layouts from './layouts';
import * as Containers from './containers';
import * as Components from './components';

import chatsJson from './mock/chats.json'
import testImage from './public/test-image.png'

import './scss/main.scss'
const pages = {
  'many-chats': [ Pages.ChatsPage, { chats: [...chatsJson, ...chatsJson, ...chatsJson, ...chatsJson, ...chatsJson] } ],
  'chats': [ Pages.ChatsPage, {
    chats: chatsJson,
    selectedChat:[
      {
        date: '19 july',
        messages: [
          {id: 1, from: 'stranger', type: 'text', message: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.', time: '12:01' },
          {id: 2, from: 'stranger', type: 'image', message: testImage, time: '12:11' },
          {id: 3, from: 'you', type: 'text', message: 'Круто!', time: '12:21' }
        ]
      }
    ]
  }],
  'registration': [ Pages.RegistrationPage ],
  'login': [ Pages.LoginPage ],
  'nav': [ Pages.NavigationPage ]
};

// get current page from url
const routeFromUrl = () => {
  return window.location.pathname.replace('/', '')
}

Handlebars.registerHelper('isImage', function (value) {
  return value === 'image';
});

Handlebars.registerHelper('isText', function (value) {
  return value === 'text';
});

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
