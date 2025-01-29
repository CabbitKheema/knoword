import { useCallback, useRef } from "react";
import { registerSW } from "virtual:pwa-register";
import { useToast } from "./Toast/ToastService";

export default function PWAUpdatePrompt() {
  const updatePromptRef = useRef(false);
  const toast = useToast();

  // Use a flag to prevent multiple invocations
  const updateSW = registerSW({
    onNeedRefresh() {
      // Ensure state updates only once
      if (!updatePromptRef.current) {
        updatePromptRef.current = true;
        console.log("Update is available");
        toast.singlePromptToast(
          {
            message: ["Update available!", "Click 'Update' to install updates"],
          },
          handleRefresh
        );
      }
    },
    onOfflineReady() {},
  });

  const handleRefresh = useCallback(() => {
    try {
      console.log("Build and SW updated");
      updateSW();
    } catch (error) {
      console.error("Error updating service worker:", error);
      toast.notificationToast({
        message: ["Error!", "Error updating service worker"],
      });
    }
  }, [toast, updateSW]);
}
