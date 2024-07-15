// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import HTTPTransport from '../lib/HTTPTransport.ts';
import Sinon, { SinonFakeXMLHttpRequest } from 'sinon';
import { expect } from 'chai';
import {nanoid} from "nanoid";

describe('Тест HTTPTransport', () => {
  const xhr = Sinon.useFakeXMLHttpRequest();
  const http = new HTTPTransport();
  let fakeRequests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      fakeRequests.push(request);
    };
  });

  afterEach(() => {
    fakeRequests = [];
  });

  it('Тест GET запрос', () => {
    http.get('/auth/user', {});
    expect(fakeRequests[0].method).to.eq('GET');
  });

  it('Тест POST запрос', () => {
    http.post('/chats', {
      data: {
        "title": "Тестовый чат №" + nanoid(6)
      }
    });
    expect(fakeRequests[0].method).to.eq('POST');
  });

  it('Тест DELETE запрос', () => {
    http.delete('/chats', {
      data: {
        "chatId": 1
      }
    });
    expect(fakeRequests[0].method).to.eq('DELETE');
  });
})
