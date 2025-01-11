import { useState } from "react";
import { registerSW } from "virtual:pwa-register";

export default function PWAUpdatePrompt() {
  const [isUpdatePresent, setIsUpdatePresent] = useState(false);
  const buttonClass =
    "text-sm pt-1 px-3 bg-neutral-800 border border-neutral-700/80 rounded-lg hover:bg-neutral-900 transition";

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
        <div className="grid p-3 border border-neutral-700/80 bg-neutral-900 rounded-lg">
          <h2 className="text-md text-center font-semibold">
            New update!
            <br />
            Refresh Service Worker
          </h2>
          <div className="pt-3 flex justify-center gap-2">
            <button
              className={buttonClass}
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
