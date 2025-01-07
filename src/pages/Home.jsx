import { useEffect, useRef } from "react";
import { BiMicrophone } from "react-icons/bi";
import { RiSpeakFill } from "react-icons/ri";
import { useState } from "react";

export default function Home() {
  const [buttonClickedState, setButtonClickedState] = useState(false);
  const scrollContainerRef = useRef(null);

  function changeButtonState() {
    setButtonClickedState(!buttonClickedState);
  }

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
      <div className="max-w-xs md:max-w-md lg:max-w-4xl mx-auto border border-t-0 border-neutral-700">
        {/* Placeholder for scrolling content */}
        <div className="text-neutral-300 px-8 pt-4  text-xs md:text-sm lg:text-lg">
          {Array.from({ length: 10 }).map((_, i) => (
            <p key={i} className="mb-4">
              Placeholder content for scrolling (item {i + 1})
            </p>
          ))}
        </div>
        <div className="sticky bottom-0 w-full backdrop-blur-lg rounded-t-lg border-t border-neutral-700">
          <div className=" px-9 pt-8 pb-2"></div>
          <div className="relative group flex p-8 pt-0">
            <label className="absolute -top-7 left-8 text-neutral-400 w-full">
              <span className="absolute transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0 group-focus-within:opacity-0 truncate">
                What word is bothering you?
              </span>
              <span className="absolute transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 truncate">
                Search by Text or Voice.
              </span>
            </label>
            <input
              type="text"
              id="word"
              className="w-full text-sm rounded-l-lg text-neutral-300 border border-neutral-700/80 bg-neutral-800 focus:outline-none"
              placeholder="e.g. providence"
            />
            <button
              type="button"
              className={`px-4  py-2.5 rounded-r-lg bg-neutral-800 border border-neutral-700/80 outline-neutral-700 ${
                buttonClickedState ? "outline" : ""
              }`}
              onClick={changeButtonState}
            >
              {buttonClickedState ? <RiSpeakFill /> : <BiMicrophone />}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
