import { useState } from "react";
import { registerSW } from "virtual:pwa-register";
import {
  borderColor,
  hoverOrDisabledInteractableBG,
  idleActiveText,
  idleInteractableBG,
  idleTextSize,
  roundedInteractableEdgeStyle,
} from "../constants/index";

export default function PWAUpdatePrompt() {
  const [isUpdatePresent, setIsUpdatePresent] = useState(false);

  // Use a flag to prevent multiple invocations
  const updateSW = registerSW({
    onNeedRefresh() {
      // if (!isUpdatePresent) {
      // Ensure state updates only once
      console.log("Update is available");
      setIsUpdatePresent(true);
      // }
    },
    onOfflineReady() {},
  });

  const handleRefresh = () => {
    try {
      console.log("Build and SW updated");
      updateSW();
      setIsUpdatePresent(false); // Hide prompt after update
    } catch (error) {
      console.error("Error updating service worker:", error);
    }
  };

  // const handleCancel = () => {
  //   console.log("Build and SW update canceled");
  //   setIsUpdatePresent(false); // Properly reset the state
  // };

  return (
    <section className="absolute top-20 right-8">
      {isUpdatePresent && (
        <div
          className={`grid p-3 ${borderColor} ${hoverOrDisabledInteractableBG} ${roundedInteractableEdgeStyle}`}
        >
          <h2 className="text-md text-center font-semibold">
            New update!
            <br />
            Refresh Service Worker
          </h2>
          <div className="pt-3 flex justify-center gap-2">
            <button
              className={`py-1 px-3 ${idleTextSize} ${idleActiveText}  ${borderColor} ${roundedInteractableEdgeStyle} ${idleInteractableBG}`}
              onClick={handleRefresh}
              aria-label="Refresh the service worker"
            >
              Refresh
            </button>
            {/* <button
              className={buttonClass}
              onClick={handleCancel}
              aria-label="Cancel the refresh action"
            >
              Cancel
            </button> */}
          </div>
        </div>
      )}
    </section>
  );
}
