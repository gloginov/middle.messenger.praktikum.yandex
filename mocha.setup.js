// import {JSDOM} from 'jsdom'
// import * as Components from './components';
// import {requireJsComponent} from './lib/requireJsComponent';
//
// Object.entries(Components).forEach(([componentName, component]) => requireJsComponent(componentName, component))
//
// // jsdom
// const jsdom = new JSDOM(`<body></body>`);
//
// global.window = jsdom.window;
// global.document = jsdom.window.document;
// global.Node = jsdom.window.Node;
// global.MouseEvent = jsdom.window.MouseEvent;
import { JSDOM } from 'jsdom';
import Sinon from 'sinon';

const { window } = new JSDOM('<div id="app"></div>');

global.window = window;
global.document = window.document;
global.Node = window.Node;
global.MouseEvent = window.MouseEvent;
global.XMLHttpRequest = Sinon.useFakeXMLHttpRequest();
