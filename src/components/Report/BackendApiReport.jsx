import {
  borderColor,
  idleInteractableBG,
  roundedInteractableEdgeStyle,
} from "../../constants";
import { useToast } from "../Toast/ToastService";
import { FcAcceptDatabase } from "react-icons/fc";

export default function BackendApiReport() {
  const toast = useToast();

  const fetchBackendApiReport = async () => {
    const backendApiReportURL =
      import.meta.env.VITE_BACKEND_REPORT_URL + "/test-report";
    try {
      const res = await fetch(backendApiReportURL, {
        method: "GET",
      });

      const contentType = res.headers.get("Content-Type");

      if (!res.ok) {
        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          toast.notificationToast(data);
          console.error("Error response:", data);
        } else {
          toast.notificationToast({
            message: ["Error!", "An unexpected error occurred."],
          });
        }
      } else if (contentType && contentType.includes("text/html")) {
        // Handle the HTML content (e.g., display or render it)
        toast.notificationToast({
          message: ["Success!", "HTML file fetched successfully."],
        });
        // Open a new tab with the specified URL
        window.open(backendApiReportURL, "_blank");
      }
    } catch (error) {
      console.error("An error occurred:", error); // Log the error for debugging purposes
      toast.notificationToast({
        message: [
          "Error!",
          error.message || "An unexpected error occurred. Please try again.",
        ],
      });
    }
  };
  return (
    <button
      className={`fixed bottom-24 left-4 flex items-center ${roundedInteractableEdgeStyle} ${borderColor} ${idleInteractableBG} `}
      onClick={fetchBackendApiReport}
    >
      <span className={`px-2 py-0.5 shrink-0 border-r ${borderColor}  `}>
        <FcAcceptDatabase className="" />
      </span>
      <span className={`px-2 py-2 text-xs truncate`}>Backend api report</span>
    </button>
  );
}
