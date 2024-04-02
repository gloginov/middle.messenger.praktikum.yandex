import Handlebars from "handlebars";
import * as Pages from './pages';
import * as Components from './components';
import * as Layouts from './layouts';
import './scss/main.scss'
const pages = {
  'login': [ Pages.LoginPage, {test: '123'} ],
  'nav': [ Pages.NavigationPage ]
};

// get current page from url
const routeFromUrl = () => {
  return window.location.pathname.replace('/', '')
}
// register Components
Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
});

// register Layouts
Object.entries(Layouts).forEach(([ name, layout ]) => {
  Handlebars.registerPartial(name, layout);
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
