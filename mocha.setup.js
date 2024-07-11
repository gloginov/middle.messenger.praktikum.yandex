// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { JSDOM } from 'jsdom';
import Sinon from 'sinon';

const { window } = new JSDOM('<div id="app"></div>');

global.window = window;
global.document = window.document;
global.Node = window.Node;
global.MouseEvent = window.MouseEvent;
global.XMLHttpRequest = Sinon.useFakeXMLHttpRequest();
