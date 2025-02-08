import { useState, useEffect } from "react";
import { useToast } from "./Toast/ToastService";
import {
  generateFailureToastMessage,
  generateSuccessToastMessage,
} from "./Toast/generateToastMessage";
import { PiGlobe, PiGlobeX } from "react-icons/pi";

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const toast = useToast();

  useEffect(() => {
    const handleOffline = () => {
      setIsOnline(false);
      console.log("You are now offline!");
      toast.notificationToast(
        generateFailureToastMessage([
          "You're Offline!",
          "You have lost internet connection",
        ])
      );
    };

    const handleOnline = () => {
      setIsOnline(true);
      console.log("You are back online!");
      toast.notificationToast(
        generateSuccessToastMessage([
          "You're Online!",
          "Internet connection restored",
        ])
      );
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, [toast]);

  return (
    <div className="absolute top-16 left-0 ">
      {isOnline ? (
        <PiGlobe className="w-10 h-10 text-green-900" />
      ) : (
        <PiGlobeX className="w-10 h-10 text-red-900" />
      )}
    </div>
  );
};

export default NetworkStatus;
