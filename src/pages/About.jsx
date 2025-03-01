import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import README from "../../README.md";
import { useEffect } from "react";
import { useState } from "react";
import { generateFailureToastMessage } from "../components/Toast/generateToastMessage";
import { useToast } from "../components/Toast/ToastService";

export default function About() {
  const [markdown, setMarkdown] = useState("");
  const toast = useToast();

  useEffect(() => {
    fetch(README) // Adjust the path as needed
      .then((res) => res.text())
      .then((md) => {
        setMarkdown(md);
      })
      .catch((error) => {
        toast.notificationToast(
          generateFailureToastMessage([
            "Error fetching README.md!",
            error.message || "Something went wrong.",
          ])
        );
      });
  }, [toast]);

  return (
    <div className="flex-1 overflow-y-scroll bg-neutral-900">
      <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
