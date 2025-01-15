import { createContext, useContext } from "react";

export const ToastContext = createContext();
export const useToast = () => useContext(ToastContext);
