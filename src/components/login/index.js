import React, { useState, useEffect, useContext, useRef } from "react";
import { AppContext, ReducerContext } from "../../App";

import { useHistory } from "react-router-dom";
import { userSingedIn } from "../../stateManager/actionCreator";
import { useSelector, useDispatch } from "react-redux";

export default function Index() {
  const [name, setName] = useState("");
  // const { userId } = useContext(AppContext);
  const { userId } = useSelector((state) => {
    return {
      userId: state.userId,
    };
  });
  // const dispatch = useContext(ReducerContext);
  const dispatch = useDispatch();
  const history = useHistory();
  const input = useRef(null);
  function handleSignIn() {
    fetch("http://localhost:3000/users", {
      method: "POST", // or 'PUT'
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    })
      .then((x) => x.json())
      .then((response) => {
        if (response.success) {
          dispatch(userSingedIn(response.result));
        }
      });
  }
  function signInkey(e) {
    if (e.keyCode === 13) {
      handleSignIn();
    }
  }
  useEffect(() => {
    console.log(userId);
    input.current.focus();
    if (userId) {
      history.push("/chat");
    }
  }, [userId]);

  return (
    <div className="login-box">
      <input
        type="text"
        value={name}
        ref={input}
        onKeyUp={signInkey}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSignIn}>Sign in</button>
    </div>
  );
}
