import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "github-markdown-css/github-markdown.css";
import "./index.css";
import App from "./App.jsx";
import PWAUpdatePrompt from "./components/PWAUpdatePrompt.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store";
import ToastProvider from "./components/Toast/ToastProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <App />
        <PWAUpdatePrompt />
      </ToastProvider>
    </Provider>
  </StrictMode>
);
