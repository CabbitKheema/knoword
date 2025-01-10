import { useEffect, useRef } from "react";
import { FaMicrophone } from "react-icons/fa";
// import { RiSpeakFill } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import { FindWordMeaning } from "../apis/FindWordMeaning";
import { FaKeyboard } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import { BiX } from "react-icons/bi";

export default function Home() {
  // const [buttonClickedState, setButtonClickedState] = useState(false);
  const [activelyTyping, setActivelyTyping] = useState(false);
  const [resultText, setResultText] = useState("");
  const [inputText, setInputText] = useState("");

  // Active states of type of inputs
  const [inputOptionActiveState, setInputOptionActiveState] = useState(true);
  const [keyboardActiveState, setKeyboardActiveState] = useState(false);
  const [micActiveState, setMicActiveState] = useState(false);
  const [cameraActiveState, setCameraActiveState] = useState(false);

  const scrollContainerRef = useRef(null);

  function onInputOptionActive() {
    setInputOptionActiveState(true);
    setKeyboardActiveState(false);
    setMicActiveState(false);
    setCameraActiveState(false);
  }
  function onKeyboardActive() {
    setInputOptionActiveState(false);
    setKeyboardActiveState(true);
  }
  function onMicActive() {
    setInputOptionActiveState(false);
    setMicActiveState(true);
  }
  function onCameraActive() {
    setInputOptionActiveState(false);
    setCameraActiveState(true);
  }

  async function textSubmitted() {
    console.log("Text submitted.");
    try {
      const result = await FindWordMeaning(inputText); // Await the asynchronous function
      setInputText("");
      setActivelyTyping(false);
      setResultText(result); // Update the state with the resolved result
    } catch (error) {
      console.error("Error fetching word meaning:", error);
      setResultText(
        "Error fetching the meaning of the word. Please try again."
      );
    }
  }

  const handleInputChange = (event) => {
    // Check if there is any content in the input field
    const isWordPresent = event.target.value.trim().length > 0;
    setActivelyTyping(isWordPresent);
    setInputText(event.target.value);
  };

  // function changeButtonState() {
  //   setButtonClickedState(!buttonClickedState);
  // }

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
        className={`max-w-xs md:max-w-md lg:max-w-4xl mx-auto border-x   border-neutral-700 ${
          resultText === "" && "pt-[30vh]"
        } `}
      >
        {resultText !== "" && (
          <div className="sticky top-0 w-full flex justify-center">
            <button
              type="button"
              onClick={() => {
                setResultText("");
              }}
              className="absolute  px-8 py-1 rounded-b-lg  bg-neutral-800 hover:bg-neutral-900   border border-t-0 border-neutral-700 "
            >
              <BiX />
            </button>
          </div>
        )}
        {/* Placeholder for scrolling content */}
        <div
          className="text-neutral-300 px-8 py-6  text-xs md:text-sm lg:text-lg"
          style={{ whiteSpace: "pre-line" }}
        >
          {Array.from({ length: 0 }).map((_, i) => (
            <p key={i}>Placeholder content for scrolling (item {i + 1})</p>
          ))}
          {resultText}
        </div>
        <div className="sticky bottom-0 w-full backdrop-blur-lg rounded-t-lg border-y border-neutral-700">
          {inputOptionActiveState && (
            <div className="relative group flex justify-center px-8 pb-8 pt-10">
              <label className="absolute top-2 text-neutral-400 w-full flex justify-center text-center">
                <span className="absolute transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0 group-focus-within:opacity-0 truncate">
                  What word is bothering you?
                </span>
                <span className="absolute transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 truncate">
                  Search by Text, Voice or image.
                </span>
              </label>
              <button
                type="button"
                onClick={onKeyboardActive}
                className="px-4  py-2.5 rounded-l-lg bg-neutral-800 hover:bg-neutral-900 border border-neutral-700/80 outline-neutral-700"
              >
                <FaKeyboard />
              </button>

              <button
                type="button"
                onClick={onMicActive}
                className="px-4  py-2.5  bg-neutral-800 hover:bg-neutral-900 border-y border-neutral-700/80 outline-neutral-700 "
              >
                <FaMicrophone />
              </button>

              <button
                type="button"
                onClick={onCameraActive}
                className="px-4  py-2.5 rounded-r-lg bg-neutral-800 hover:bg-neutral-900 border border-neutral-700/80 outline-neutral-700 "
              >
                <FaCamera />
              </button>
            </div>
          )}

          {keyboardActiveState && (
            <div className="relative group flex justify-center px-8 pb-8 pt-10">
              <label className="absolute top-2 left-8 text-neutral-400 w-full">
                <span
                  className={`absolute transition-opacity duration-500 ease-in-out ${
                    activelyTyping ? "opacity-0" : "opacity-100"
                  } truncate`}
                >
                  Type the word
                </span>

                <span
                  className={`absolute transition-opacity duration-500 ease-in-out  truncate ${
                    activelyTyping ? "opacity-100" : "opacity-0"
                  } `}
                >
                  Enter/Click arrow to find meaning.
                </span>
              </label>
              <input
                type="text"
                id="word"
                value={inputText}
                className="w-full p-2 text-sm rounded-l-lg text-neutral-300 border border-neutral-700/80 bg-neutral-800 focus:outline-none"
                placeholder="e.g. providence"
                onChange={handleInputChange} // Trigger state change while typing
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    textSubmitted();
                  }
                }}
              />
              {activelyTyping && (
                <button
                  type="button"
                  className="px-4  py-2.5 rounded-r-lg bg-neutral-800 hover:bg-neutral-900 border border-neutral-700/80 outline-neutral-700"
                  onClick={textSubmitted}
                >
                  <FaArrowRight />
                </button>
              )}
              {!activelyTyping && (
                <button
                  type="button"
                  onClick={onInputOptionActive}
                  className="px-4  py-2.5 rounded-r-lg bg-neutral-800 hover:bg-neutral-900 border border-l-0 border-neutral-700/80 outline-neutral-700"
                >
                  <SlOptions />
                </button>
              )}
            </div>
          )}

          {/**/}
        </div>
      </div>
    </main>
  );
}
