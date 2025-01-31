import { useState } from "react";
import { ToastContext } from "./ToastService";
import { BiX } from "react-icons/bi";
import PropTypes from "prop-types";
import {
  borderColor,
  hoverOrDisabledInteractableBG,
  idleActiveText,
  idleInteractableBG,
  idleTextSize,
  roundedInteractableEdgeStyle,
} from "../../constants";

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const open = (component, id, timeout = 5000) => {
    setToasts((toasts) => [{ id, component }, ...toasts]);

    if (timeout !== Infinity) setTimeout(() => close(id), timeout);
    return id;
  };
  const close = (id) =>
    setToasts((toasts) => toasts.filter((toast) => toast.id !== id));

  // Toasts
  const notificationToast = (response) => {
    const id = Date.now();
    open(
      <div
        className={`${response.borderColor} ${hoverOrDisabledInteractableBG} ${roundedInteractableEdgeStyle} flex gap-2 p-4 `}
      >
        <div>
          <h3 className="font-bold">{response.message[0]}</h3>
          <p className="text-sm">{response.message[1]}</p>
        </div>
      </div>,
      id
    );
  };
  const singlePromptToast = (response, installUpdatesCallback) => {
    const id = Date.now();
    open(
      <div
        className={`${response.borderColor} ${hoverOrDisabledInteractableBG} ${roundedInteractableEdgeStyle} flex gap-2 p-4 `}
      >
        <div>
          <h3 className="font-bold">{response.message[0]}</h3>
          <p className="text-sm">{response.message[1]}</p>
          <button
            onClick={() => {
              close(id);
              installUpdatesCallback();
            }}
            className={`py-1 px-3 mx-auto flex mt-2 ${idleTextSize} ${idleActiveText}  ${borderColor} ${roundedInteractableEdgeStyle} ${idleInteractableBG} `}
          >
            Update
          </button>
        </div>
      </div>,
      id,
      Infinity
    );
  };
  //

  return (
    <ToastContext.Provider
      value={{ open, close, notificationToast, singlePromptToast }}
    >
      {children}
      <div className="space-y-2 absolute top-20 right-4">
        {toasts.map(({ id, component }) => (
          <div key={id} className="relative flex justify-end">
            <button
              onClick={() => close(id)}
              className={`${idleTextSize} ${idleActiveText}  ${borderColor} ${roundedInteractableEdgeStyle} ${idleInteractableBG} absolute top-2 right-2 p-1 `}
            >
              <BiX size={16} />
            </button>
            {component}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// Define propTypes for the component
ToastProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate children as a React node
};
