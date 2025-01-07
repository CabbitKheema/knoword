import { BiMicrophone } from "react-icons/bi";
import { RiSpeakFill } from "react-icons/ri";
import { useState } from "react";
export default function Home() {
  const [buttonClickedState, setButtonClickedState] = useState(false);
  function changeButtonState() {
    setButtonClickedState(!buttonClickedState);
  }
  return (
    <div className="mb-10 bg-neutral-900">
      {/* Placeholder for scrolling content */}
      <div className="text-neutral-300 px-6 pt-3 max-w-4xl mx-auto border border-t-0 border-neutral-700 text-sm">
        {Array.from({ length: 25 }).map((_, i) => (
          <p key={i} className="mb-4">
            Placeholder content for scrolling (item {i + 1})
          </p>
        ))}
      </div>
      <div className="sticky bottom-12 max-w-4xl mx-auto backdrop-blur-lg rounded-t-lg border border-neutral-700">
        <div className="flex p-8">
          <input
            type="text"
            id="word"
            className="p-2.5 w-full text-sm rounded-l-lg text-neutral-300 border border-neutral-700/80 bg-neutral-800 focus:outline-none"
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
  );
}
