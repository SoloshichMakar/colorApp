import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import createSagaMiddleware from "redux-saga";
import {applyMiddleware, createStore} from "redux";
import MainReducer from "./store/reducers/MainReducer";
import rootSaga from "./store/saga/rootSaga";
import {Provider} from "react-redux";
const sagaMiddleware = createSagaMiddleware();
const store = createStore(MainReducer,applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const app =
    <Provider store={store}>
        <App />
    </Provider>;

ReactDOM.render(app, document.getElementById("root") as HTMLElement);
serviceWorker.unregister();
