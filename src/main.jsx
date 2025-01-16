import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import PWAUpdatePrompt from "./components/pwaUpdatePrompt";
import { Provider } from "react-redux";
import { store } from "./app/store";
import ToastProvider from "./components/Toast/ToastProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <App />
      </ToastProvider>
      <PWAUpdatePrompt />
    </Provider>
  </StrictMode>
);
