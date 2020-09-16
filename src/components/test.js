import React, { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "CLICKED_BUTTONS":
      return { color: "green", name: "maryam" }
    case "CHANGE_INPUT":
      return {  color: "red", name: action.payload}
    default:
      return state;
  }
};
function Test() {
  const [state, dispatch] = useReducer(reducer, {
    color: "red",
    name: "zahra",
  });
  function handleClick() {
    dispatch({
      type: "CLICKED_BUTTONS",
      payload: undefined,
    });
  }
  function handleChange(e) {
    dispatch({
      type: "CHANGE_INPUT",
      payload: e.target.value,
    });
  }
  return (
    <div>
      <input type="text" onChange={handleChange} />
      <p>{state.name}</p>
      <button onClick={handleClick} style={{ color: state.color }}>
        click
      </button>
    </div>
  );
}

export default Test;
