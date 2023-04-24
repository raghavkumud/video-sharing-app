import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { persistor, store } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  transition: transitions.SCALE,
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AlertProvider template={AlertTemplate} {...options}>
          <App />
        </AlertProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
