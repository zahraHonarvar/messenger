import React, {
  useState,
  useRef,
  useEffect,
  useReducer,
  useMemo,
  useContext,
} from "react";
import List from "./list";
import io from "socket.io-client";
import ChatDetails from "./chatDetails";
import AppStatus from "./appStatus";
import produce from "immer";
import { AppContext, ReducerContext } from "../../App";
import "../../App.scss";
import { reducer, INIT_STATE } from "../../stateManager/reducer";
import {
  chatSelected,
  submitMessage,
  closeChat,
  contactsLoaded,
  chatMessagesLoaded,
  newUserRegsitered,
  newMessageReceived,
} from "../../stateManager/actionCreator";
import { getChatMessages } from "../../services/main";
import { baseUrl } from "../../routes/request";
import { useSelector, useDispatch } from "react-redux";
export default function Chat() {
  const { name, userId, chatList, messages, selectedChatId } = useSelector(
    (state) => {
      return {
        name: state.name,
        userId: state.userId,
        chatList: state.chatList,
        messages: state.messages,
        selectedChatId: state.selectedChatId,
      };
    }
  );
  // const dispatch = useContext(ReducerContext);
  const dispatch = useDispatch();
  const [color, setColor] = useState("red");

  const [selectmessages, setMessage] = useState();

  const selectedChat = chatList.find((item) => item.id === selectedChatId);

  console.log(selectedChat);

  const selectedChatMessages = messages.filter(
    (item) => item.chatId === selectedChatId
  );

  console.log(messages);

  function onClick(id) {
    getChatMessages(id, userId).then((data) => {
      // dispatch(chatSelected(id));
      dispatch(chatMessagesLoaded(id, data.result));
      // onClickLoaded(id, data.result);
    });

    // dispatch(chatSelected(id));
  }
  function handleClose() {
    dispatch(closeChat(""));
  }

  function handleSubmit(text) {
    fetch(`http://localhost:3000/chats/submit/user/:${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chatId: selectedChatId, message: text }),
    })
      .then((x) => x.json())
      .then((response) => {
        console.log(response);
        dispatch(submitMessage(response.result.content));
      });
  }
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((x) => x.json())
      .then((response) => {
        dispatch(contactsLoaded(response.result));
      });
  }, [userId]);

  // yek bar baayad vasl shim be yek web socket ye connection baazi ro negah darim
  // baad az oon etelaat beyne aanha rado badal she,,
  // dar in halat aserver ham mitoone ye chizi ro mostaghim baraye ma befreste

  // da http faghat address matrah ast vali da socket ye connection id ham matrah ast
  // ye shaksi be name ali ba 3 ta browser login mikone ma ye userim vali ba 3ta connection id
  // ma bayad connection id ha ro ne server befahmoonim ke in connection id haa male ye user ast
  // pas websocket 2 tarafas yani ham server mostaghim mitoone be client chizi bege ham client be server
  //  emit hamoon messagei ast ke user be server mifreste mige masalan man online shodam
  useEffect(() => {
    const socket = io("http://localhost:3000", {
      transports: ["websocket", "polling", "flashsocket"],
    });
    socket.emit("online", userId);
    socket.on("new-user", (data) => {
      dispatch(newUserRegsitered(data));
      console.log(data);
    });
    socket.on("new-message", (data) => {
      dispatch(newMessageReceived(data));
      console.log(data);
    });
  }, []);

  return (
    <>
      <div className="top-banner"></div>
      <div className="layout">
        <AppStatus
          messages={messages}
          name={name}
          userId={userId}
          chatList={chatList}
          onClick={onClick}
          selectedChatId={selectedChatId}
        />

        {selectedChatId && (
          <div className="details">
            <ChatDetails
              name={selectedChat.name}
              messages={selectedChatMessages.map((item) => {
                return {
                  id: item.id,
                  text: item.text,
                  me: item.userId === userId,
                  time: item.time,
                };
              })}
              onSubmit={handleSubmit}
              selectedChatId={selectedChatId}
              handleClose={handleClose}
            />
          </div>
        )}
      </div>
    </>
  );
}
