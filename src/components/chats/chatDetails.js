import React, {
  useRef,
  useEffect,
  useState,
  useContext,
  useReducer,
} from "react";
import Messages from "./messages";
import Header from "./header";
import { INIT_STATE } from "../../stateManager/reducer";
import { findAllByDisplayValue } from "@testing-library/react";
import { ReducerContext, AppContext } from "../../App";
import { current } from "immer";
import { getChatMessages } from "../../services/main";
import { chatMessagesLoaded } from "../../stateManager/actionCreator";
import { useDispatch, useSelector } from "react-redux";

function ChatDetails({
  selectedChatId,
  handleClose,
  onSubmit,
  name,
  messages,
}) {
  const [text, setText] = useState("");
  // const dispatch = useContext(ReducerContext);
  const dispatch = useDispatch();
  // const { userId } = useContext(AppContext);
  const { userId } = useSelector((state) => {
    return {
      userId: state.userId,
    };
  });
  const input = useRef(null);
  const messageContainer = useRef(null);
  const MessagebottomSctoll = useRef(null);
  function addMessage(e) {
    setText(e.target.value);
  }
  useEffect(
    function handleSubmitMessage() {
      input.current.focus();
      if (MessagebottomSctoll.current) {
        MessagebottomSctoll.current.scrollIntoView({ behavior: "smooth" });
      }
    },
    [selectedChatId]
  );
  useEffect(() => {
    function handleScroll() {
      console.log("dd");
      if (messageContainer.current.scrollTop == 0) {
        alert("ok");
      }
    }
    messageContainer.current.addEventListener("scroll", handleScroll);

    return () => {
      messageContainer.current.removeEventListener("scroll", handleScroll);
    };
    //  return ()=>{
    //    messageContainer,current.removeEventListener('scroll',handleScroll)
    //  }
  }, [selectedChatId, messages[-1], userId]);
  function handleSubmitMessage() {
    onSubmit(text);
    setText("");
    console.log(text);
    input.current.focus();
  }

  function handleKeyUp(e) {
    if (e.keyCode === 13) {
      handleSubmitMessage();
    }
  }

  return (
    <div className={"show-details" + " " + (selectedChatId ? "show" : "")}>
      <div ref={messageContainer}>
        {selectedChatId && (
          <Header
            name={name}
            handleClose={handleClose}
            selectedChatId={selectedChatId}
          />
        )}
        {selectedChatId && (
          <div className="messages-panel">
            {messages.map((item, index) => {
              console.log(messages);
              if ([messages.length] - 1 === index) {
                return (
                  <div
                    key={index}
                    ref={MessagebottomSctoll}
                    className={"message-content" + " " + (item.me ? "me" : "")}
                  >
                    {item.text}
                    <p>{!!item.time && item.time.toString()}</p>
                  </div>
                );
              }
              return (
                <div
                  className={"message-content" + " " + (item.me ? "me" : "")}
                >
                  {item.text}
                  <p>{!!item.time && item.time.toString()}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {selectedChatId && (
        <>
          <input
            ref={input}
            type="text"
            value={text}
            onKeyUp={handleKeyUp}
            onChange={addMessage}
            className="text-input"
          />

          <span className="icon-send" onClick={handleSubmitMessage}>
            <i className="fa fa-send" />
          </span>
        </>
      )}
    </div>
  );
}

export default ChatDetails;
