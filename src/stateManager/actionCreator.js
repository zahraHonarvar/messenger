export const ACTIONS = {
  CHAT_SELECTED: "CHAT_SELECTED",
  SUBMIT_MESSAGE: "SUBMIT_MESSAGE",
  CLOSE_CHAT: "CLOSE_CHAT",
  SHOW_CONTACTS: "SHOW_CONTACTS",
  USER_SIGNED_IN: "USER_SIGNED_IN",
  CONTACTS_LOADED: "CONTACTS_LOADED",
  CHATS_LOADED: "CHATS_LOADED",
  CHAT_STARTED: "CHAT_STARTED",
  CHAT_MESSAGES_LOADED: "CHAT_MESSAGES_LOADED",
  NEW_USER_REGISTERED:'NEW_USER_REGISTERED',
  NEW_MESSAGE_RECEIVED:'NEW_MESSAGE_RECEIVED',
};

export function chatSelected(id) {
  return {
    type: ACTIONS.CHAT_SELECTED,
    payload: id,
  };
}
export function submitMessage(text) {
  return {
    type: "SUBMIT_MESSAGE",
    payload: text,
  };
}
export function closeChat() {
  return {
    type: ACTIONS.CLOSE_CHAT,
    payload: null,
  };
}
export function userSingedIn(user) {
  return {
    type: ACTIONS.USER_SIGNED_IN,
    payload: user,
  };
}
export function contactsLoaded(contacts) {
  return {
    type: ACTIONS.CONTACTS_LOADED,
    payload: contacts,
  };
}
export function chatsLoaded(chats) {
  return {
    type: ACTIONS.CHATS_LOADED,
    payload: chats,
  };
}
export function chatStarted(chatId, name) {
  return {
    type: ACTIONS.CHAT_STARTED,
    payload: { chatId, name },
  };
}
export function chatMessagesLoaded(chatId, response) {
  return {
    type: ACTIONS.CHAT_MESSAGES_LOADED,
    payload: { chatId, response }
  };
}
export function newUserRegsitered({id,name}){
  
  return {
    type:ACTIONS.NEW_USER_REGISTERED,
    payload:{id,name}
  }
}
export function newMessageReceived({chatId,message}){
  return {
    type:ACTIONS.NEW_MESSAGE_RECEIVED,
    payload:{chatId,message}
  }
}