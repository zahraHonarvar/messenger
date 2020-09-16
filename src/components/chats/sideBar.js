import React, { useContext } from "react";
import ReactDOM from "react-dom";

import Profile from "./profile";
import { AppContext, ReducerContext } from "../../App";
import { chatStarted } from "../../stateManager/actionCreator";
import { useSelector, useDispatch } from "react-redux";

function SideBar({ open, onClose }) {
  // const { contacts, name, userId } = useContext(AppContext);
  const { contacts, name, userId } = useSelector((state) => {
    return {
      contacts: state.contacts,
      name: state.name,
      userId: state.userId,
    };
  });
  // const dispatch = useContext(ReducerContext);
  const dispatch = useDispatch();

  function handleClickContact(contact) {
    console.log("contact clicked" + contact.id);
    console.log("contact login" + userId);
    fetch(`http://localhost:3000/chats/start/user`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ peer1: contact.id, peer2: userId }),
    })
      .then((x) => x.json())
      .then((response) => {
        // console.log(response)
        dispatch(chatStarted(response.result.id, contact.name));
        console.log(response.result);
      });
  }
  return ReactDOM.createPortal(
    <div
      className={"side-bar" + " " + (open ? "open" : "close")}
      onClick={() => onClose()}
    >
      {open &&
        ReactDOM.createPortal(
          <div
            className={"container" + " " + (open ? "open" : "close")}
            onClick={(e) => e.stopPropagation()}
          >
            <Profile
              name={name}
              contacts={contacts}
              clickContact={handleClickContact}
            />
          </div>,
          document.body
        )}
    </div>,
    document.body
  );
}

export default SideBar;
