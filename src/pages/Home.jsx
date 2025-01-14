import { useEffect, useRef } from "react";
import SearchResult from "../components/SearchResult";
import SearchInput from "../components/SearchInput";
import { borderColor } from "../constants";

export default function Home() {
  const scrollContainerRef = useRef(null);
  useEffect(() => {
    // Scroll to the bottom of the scrollable container
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, []);

  return (
    <main
      className="flex-1 overflow-y-scroll bg-neutral-900"
      ref={scrollContainerRef}
    >
      <div
        className={`max-w-xs md:max-w-md lg:max-w-4xl mx-auto border-x ${borderColor}`}
      >
        <SearchResult />
        <SearchInput />
      </div>
    </main>
  );
}
