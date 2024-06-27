// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {chatsApi} from "./chats";
import isJsonString from "../helpers/isJson";
let socketInstance = null;

async function socketConnection({ USER_ID, CHAT_ID }: {USER_ID: string, CHAT_ID: string}) {
  return chatsApi.connectChat(CHAT_ID)
    .then(({response}) => {
      const responseJSON = isJsonString(response) ? JSON.parse(response) : null;
      socketInstance = new WebSocket(`${import.meta.env.VITE_WS_URL}/${USER_ID}/${CHAT_ID}/${responseJSON.token}`);

      return socketInstance
    })

}

export { socketConnection, socketInstance };
