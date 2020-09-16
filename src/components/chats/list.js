import React, { useState, useEffect, useContext } from "react";
import { AppContext, ReducerContext } from "../../App";
import { chatsLoaded } from "../../stateManager/actionCreator";
import { useDispatch, useSelector } from "react-redux";

function List({ onClick }) {
  // const {
  //   selectedChatId,
  //   messages,
  //   chatList,
  //   userId,
  //   name,
  //   contacts,
  // } = useContext(AppContext);
  const {
    selectedChatId,
    messages,
    chatList,
    userId,
    name,
    contacts,
  } = useSelector((state) => state);
  // const dispatch = useContext(ReducerContext);
  const dispatch = useDispatch();
  function handleShowDetails(id) {
    onClick(id);
    // console.log(id);
  }

  useEffect(() => {
    fetch(`http://localhost:3000/chats/recent/user/${userId}`)
      .then((x) => x.json())
      .then((response) => {
        dispatch(chatsLoaded(response.result));
        console.log(response.result + "ok");
      });
  }, [userId]);

  return (
    <div>
      {chatList.map((item) => {
        const lastMessage = messages.filter((x) => x.chatId === item.id);
        if (lastMessage.length > 0) {
          var lastText = lastMessage[lastMessage.length - 1].text;
        }

        console.log(lastMessage);
        return (
          <div
            className="list-contact"
            key={item.id}
            name={item.name}
            time={item.time}
            unreadMessageCount={item.unreadMessageCount}
            onClick={() => handleShowDetails(item.id)}
          >
            {selectedChatId == item.id ? (
              <div
                className="count"
                style={{ backgroundColor: "#FFF25C", color: "#0bbcdf" }}
              >
                {" "}
                <div className="name-list">{item.name}</div>
                {lastMessage && lastMessage.length > 0 ? (
                  <div>{lastText}</div>
                ) : (
                  ""
                )}
                {/* <p> {item.time.toUTCString()}</p> */}
                {!!item.unreadMessageCount && (
                  <span>{item.unreadMessageCount}</span>
                )}
              </div>
            ) : (
              <div className="count">
                {" "}
                <div className="name-list">{item.name}</div>
                {lastMessage && lastMessage.length > 0 ? (
                  <div>{lastText}</div>
                ) : (
                  ""
                )}
                {/* <p> {item.time.toUTCString()}</p> */}
                {!!item.unreadMessageCount && (
                  <span>{item.unreadMessageCount}</span>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default List;
