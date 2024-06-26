import {chatsApi} from "./chats";
import isJsonString from "../helpers/isJson";
import {a} from "vite/dist/node/types.d-aGj9QkWt";
let socketInstance = null;

async function socketConnection({ USER_ID, CHAT_ID  }) {
  // new WebSocket(`${import.meta.env.VITE_WS_URL}/auth/signup`)
  return chatsApi.connectChat(CHAT_ID)
    .then(({response}) => {
      const responseJSON = isJsonString(response) ? JSON.parse(response) : null;

      socketInstance = new WebSocket(`${import.meta.env.VITE_WS_URL}/${USER_ID}/${CHAT_ID}/${responseJSON.token}`);

      return socketInstance
    })

}

export { socketConnection, socketInstance };
