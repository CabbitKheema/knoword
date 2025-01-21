import { useToast } from "../Toast/ToastService";
import { FcAcceptDatabase } from "react-icons/fc";

export default function ApiTestReport() {
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
      className="flex items-center w-36 h-10 rounded-md bg-gradient-to-r from-orange-500 to-orange-800 text-white shadow hover:from-orange-600 hover:to-orange-900 focus:outline-none "
      onClick={fetchBackendApiReport}
      aria-label="Fetch API report"
    >
      <FcAcceptDatabase className="w-10 h-5 px-2 border-r" />
      <p className="text-sm mx-auto font-medium">API Report</p>
    </button>
  );
}
