import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import PWAUpdatePrompt from "./components/pwaUpdatePrompt";
import { Provider } from "react-redux";
import { store } from "./app/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <PWAUpdatePrompt />
    </Provider>
  </StrictMode>
);
