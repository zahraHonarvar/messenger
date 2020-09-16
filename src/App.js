import React, { createContext, useReducer, Suspense } from "react";
import logo from "./logo.svg";
import "./App.css";
// import Chat from "./components/chats/index";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { routes } from "./routes/main";
import { INIT_STATE } from "./stateManager/reducer";
import Login from "./components/login/index";
import { reducer } from "./stateManager/reducer";
import { useSelector, useDispatch } from "react-redux";
export const AppContext = createContext({});
export const ReducerContext = createContext({});
const Chat = React.lazy(() => import("./components/chats/index"));

function App() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  // const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const authenticated = state.userId !== null;

  console.log(authenticated);
  return (
    // <ReducerContext.Provider value={dispatch}>
    //   <AppContext.Provider value={state}>
    <Router>
      <Switch>
        {routes.map((item, index) => {
          if (item.private) {
            return (
              <Route
                key={index}
                path={item.path}
                component={
                  authenticated
                    ? item.component
                    : () => <p className="please">Please login first</p>
                }
              />
            );
          } else {
            return (
              <Route
                key={index}
                path={item.path}
                render={(route) => (
                  <Login component={item.component} route={route} />
                )}
              />
            );
          }
        })}
      </Switch>
    </Router>
    //   </AppContext.Provider>
    // </ReducerContext.Provider>
  );
}

export default App;
