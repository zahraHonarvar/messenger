import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider, connect } from "react-redux";
import  store  from "./stateManager/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
// function mapStateToProps(state){
//   return {
//     state:state,
//   }
// }
// function mapDispatchToProps(dispatch) {
//   return {
//     onClickLoaded: ({id, data}) =>dispatch(chatMessagesLoaded(id, data.result)),
//     onChangeInput: (e) =>
//       dispatch({ type: "CHANGE_INPUT", payload: e.target.value }),
//     onDeleteItem: (id) => dispatch({ type: "DELETE_ITEM", payload: id }),
//     onCompletedItem: (id) => dispatch({ type: "COMPLETED_ITEM", payload: id }),
//   };
// }
// const ChatWithRedux = connect(mapStateToProps, mapDispatchToProps)(Chat);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
