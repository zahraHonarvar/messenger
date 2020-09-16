import { ACTIONS } from "./actionCreator";
export const INIT_STATE = {
  name: "",
  userId: null,
  chatList: [],
  messages: [
    // { chatId: "1", id: "1", text: "hi", userId: "1" },
  ],
  selectedChatId: null,
  contacts: [],
};

export function reducer(state=INIT_STATE, action) {
  console.log(action);
  switch (action.type) {
    case ACTIONS.CHAT_SELECTED:
      const selectedChatIndex = state.chatList.findIndex(
        (x) => x.id === action.payload
      );

      console.log(selectedChatIndex);
      return {
        ...state,
        selectedChatId: action.payload,
        chatList: [
          ...state.chatList.slice(0, selectedChatIndex),
          {
            ...state.chatList[selectedChatIndex],
            unreadMessageCount: 0,
          },
          ...state.chatList.slice(selectedChatIndex + 1),
        ],
      };

    case ACTIONS.SUBMIT_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            chatId: state.selectedChatId,
            id: Math.random().toString(),
            text: action.payload,
            userId: state.userId,
            
          },
        ],
      };
    case ACTIONS.CLOSE_CHAT:
      return {
        ...state,
        selectedChatId: action.payload,
      };
    case ACTIONS.USER_SIGNED_IN:
      return {
        ...state,
        name: action.payload.name,
        userId: action.payload.id,
      };
    case ACTIONS.CONTACTS_LOADED: {
      return {
        ...state,
        contacts: action.payload.filter((item) => item.id !== state.userId),
      };
    }
    case ACTIONS.CHATS_LOADED: {
      return {
        ...state,
        chatList: action.payload,
      };
    }
    case ACTIONS.CHAT_STARTED: {
      let newChatList = state.chatList;
      if (!state.chatList.some((item) => item.id === action.payload.chatId)) {
        const newChat = {
          name: action.payload.name,
          id: action.payload.chatId,
          unreadMessageCount: 0,
          time: new Date(),
        };
        newChatList = [newChat, ...state.chatList];
      }
      return {
        ...state,
        selectedChatId: action.payload.chatId,
        chatList: newChatList,
      };
    }
    case ACTIONS.CHAT_MESSAGES_LOADED: {
      return {
        ...state,
        messages: [
          ...state.messages.filter(item=>item.chatId!==action.payload.chatId),
          ...action.payload.response.messages.map((item) => ({
            chatId: action.payload.chatId,
            id: item.id,
            text: item.content,
            userId: item.userId,
            time:item.date,
          })),
        ],
        selectedChatId: action.payload.chatId,
      };
    }
    case ACTIONS.NEW_USER_REGISTERED: {
      if (state.contacts.some(x => x.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        contacts: [
          ...state.contacts,
          { id: action.payload.id, name: action.payload.name },
        ],
      };
    }
    case ACTIONS.NEW_MESSAGE_RECEIVED:{
      const newChatMessage=[...state.chatList]
      if(!state.chatList.some(item=>item.id===action.payload.chatId)){
        const newChat={
          time:'',
          id:action.payload.id,
          unreadMessageCount:1,
          name:state.contacts.find(item=>item.id===action.payload.message.userId)
        }
newChatMessage.push(newChat)
      }
      return {
        ...state,
        messages:[...state.messages,{
          chatId:action.payload.chatId,
          id:action.payload.message.id,
          text:action.payload.message.content,
          userId:action.payload.message.userId,
          time:action.payload.message.time,
        }
      ]

        }
      }
    
  }

  return state;
}
