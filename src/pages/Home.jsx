import { useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import { FindWordMeaning } from "../apis/FindWordMeaning";
import { FaRegKeyboard } from "react-icons/fa";
import { FiCamera } from "react-icons/fi";
import { SlOptions } from "react-icons/sl";
import { BiX } from "react-icons/bi";
import { FiMic } from "react-icons/fi"; // Icons for buttons
import { FiPlay, FiPause } from "react-icons/fi";
import { IoStopOutline } from "react-icons/io5";
import { FiTrash } from "react-icons/fi";
import { VoiceNoteToText } from "../apis/VoiceNoteToText";

export default function Home() {
  // const [buttonClickedState, setButtonClickedState] = useState(false);
  const [activelyTyping, setActivelyTyping] = useState(false);
  const [resultText, setResultText] = useState("");
  const [inputText, setInputText] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Active states of type of inputs
  const [inputOptionActiveState, setInputOptionActiveState] = useState(true);
  const [keyboardActiveState, setKeyboardActiveState] = useState(false);
  const [micActiveState, setMicActiveState] = useState(false);
  const [cameraActiveState, setCameraActiveState] = useState(false);

  const scrollContainerRef = useRef(null);

  {
    /*Mic recording section*/
  }
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/m4a",
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudio({ url: audioUrl, blob: audioBlob });
        audioChunksRef.current = [];
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setResultText("Error accessing the microphone. Please try again.");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const cancelRecordedAudio = () => {
    setRecordedAudio(null);
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  {
    /*End Mic recroding section*/
  }
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

  async function setResult(text) {
    const result = await FindWordMeaning(text); // Await the asynchronous function
    setInputText("");
    setActivelyTyping(false);
    setResultText(result); // Update the state with the resolved result
  }

  async function textSubmitted() {
    console.log("Text submitted.");
    try {
      setIsSearching(true);
      await setResult(inputText);
      setIsSearching(false);
    } catch (error) {
      console.error("Error fetching word meaning:", error);
      setResultText(
        "Error fetching the meaning of the word. Please try again."
      );
      setIsSearching(false);
    }
  }

  async function audioSubmitted() {
    console.log("audio submitted.");
    try {
      setIsSearching(true);
      const word = await VoiceNoteToText(recordedAudio.blob); // Await the asynchronous function
      await setResult(word);
      cancelRecordedAudio();
      setIsSearching(false);
    } catch (error) {
      console.error("Error fetching word meaning:", error);
      setResultText(
        "Error fetching the meaning of the word. Please try again."
      );
      setIsSearching(false);
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
                <FaRegKeyboard />
              </button>

              <button
                type="button"
                onClick={onMicActive}
                className="px-4  py-2.5  bg-neutral-800 hover:bg-neutral-900 border-y border-neutral-700/80 outline-neutral-700 "
              >
                <FiMic />
              </button>

              <button
                type="button"
                onClick={onCameraActive}
                className="px-4  py-2.5 rounded-r-lg bg-neutral-800 hover:bg-neutral-900 border border-neutral-700/80 outline-neutral-700 "
              >
                <FiCamera />
              </button>
            </div>
          )}

          {keyboardActiveState && (
            <div className="relative group flex justify-center px-8 pb-8 pt-10">
              <label className="absolute top-2 left-8 text-neutral-400 w-full">
                <span
                  className={`absolute transition-opacity duration-500 ease-in-out ${
                    activelyTyping || (activelyTyping && !isSearching)
                      ? "opacity-0"
                      : "opacity-100"
                  } truncate`}
                >
                  Type the word
                </span>

                <span
                  className={`absolute transition-opacity duration-500 ease-in-out  truncate ${
                    activelyTyping && !isSearching ? "opacity-100" : "opacity-0"
                  } `}
                >
                  Enter/Click arrow to find meaning
                </span>
                <span
                  className={`absolute transition-opacity duration-500 ease-in-out ${
                    isSearching ? "opacity-100" : "opacity-0"
                  } truncate`}
                >
                  Searching...
                </span>
              </label>
              <input
                type="text"
                id="word"
                value={inputText}
                className={`w-full p-2 text-sm rounded-l-lg ${
                  isSearching
                    ? "text-neutral-400 bg-neutral-900"
                    : "text-neutral-300 bg-neutral-800"
                } border border-neutral-700/80 focus:outline-none`}
                placeholder="e.g. providence"
                onChange={handleInputChange} // Trigger state change while typing
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    textSubmitted();
                  }
                }}
                disabled={isSearching}
              />
              {activelyTyping && (
                <button
                  type="button"
                  className={`px-4  py-2.5 rounded-r-lg ${
                    isSearching
                      ? "bg-neutral-900"
                      : "bg-neutral-800 hover:bg-neutral-900"
                  }  border border-neutral-700/80 outline-neutral-700`}
                  onClick={textSubmitted}
                  disabled={isSearching}
                >
                  <FiSearch />
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

          {micActiveState && (
            <div className="relative group flex justify-center px-8 pb-8 pt-10">
              <label className="absolute top-2 w-full text-neutral-400">
                <span
                  className={`absolute flex w-full justify-center items-center transition-opacity duration-500 ease-in-out ${
                    isRecording || recordedAudio !== null
                      ? "opacity-0"
                      : "opacity-100"
                  } truncate`}
                >
                  <FiMic className="flex-shrink-0 mr-1" /> to record voice
                </span>

                <span
                  className={`absolute flex w-full justify-center items-center transition-opacity duration-500 ease-in-out  truncate ${
                    isRecording ? "opacity-100" : "opacity-0"
                  } `}
                >
                  <IoStopOutline className="flex-shrink-0 mr-1" /> to stop
                  recording
                </span>
                <span
                  className={`absolute flex w-full justify-center items-center transition-opacity duration-500 ease-in-out ${
                    isPlaying ||
                    recordedAudio === null ||
                    isRecording ||
                    isSearching
                      ? "opacity-0"
                      : "opacity-100"
                  } truncate`}
                >
                  <FiPlay className="flex-shrink-0 mr-1" /> to replay recording
                </span>

                <span
                  className={`absolute flex w-full justify-center items-center transition-opacity duration-500 ease-in-out  truncate ${
                    isPlaying ? "opacity-100" : "opacity-0"
                  } `}
                >
                  <FiPause className="flex-shrink-0 mr-1" /> to pause replay
                </span>
                <span
                  className={`absolute flex w-full justify-center items-center transition-opacity duration-500 ease-in-out  truncate ${
                    isSearching ? "opacity-100" : "opacity-0"
                  } `}
                >
                  Searching...
                </span>
              </label>
              {/*Audio recording/stop button*/}
              <button
                type="button"
                onClick={() =>
                  isRecording ? stopRecording() : startRecording()
                }
                className={`px-4  py-2.5 rounded-l-lg border ${
                  isPlaying || isSearching
                    ? "bg-neutral-900"
                    : "bg-neutral-800 hover:bg-neutral-900"
                } border-neutral-700/80 outline-neutral-700 `}
                disabled={isPlaying || isSearching}
              >
                {isRecording ? <IoStopOutline /> : <FiMic />}
              </button>

              {/*Recorded audio play/pause button*/}
              {recordedAudio !== null && (
                <button
                  type="button"
                  onClick={togglePlay}
                  className={`px-4  py-2.5  ${
                    isRecording || isSearching
                      ? "bg-neutral-900"
                      : "bg-neutral-800 hover:bg-neutral-900"
                  }  border-y border-neutral-700/80 outline-neutral-700`}
                  disabled={isRecording || isSearching}
                >
                  {isPlaying ? <FiPause /> : <FiPlay />}
                  {/* Hidden audio reference  */}
                  <audio
                    className="hidden"
                    ref={audioRef}
                    src={recordedAudio.url}
                    onEnded={() => {
                      setIsPlaying(false);
                    }}
                  />
                </button>
              )}

              {/*Recorded audio deletion button*/}
              {recordedAudio !== null && (
                <button
                  type="button"
                  onClick={cancelRecordedAudio}
                  className={`absolute bottom-0.5 p-1.5 rounded-full  ${
                    isRecording || isPlaying || isSearching
                      ? "bg-neutral-900"
                      : "bg-neutral-800 hover:bg-neutral-900"
                  } border border-neutral-700/80 outline-neutral-700`}
                  disabled={isPlaying || isRecording || isSearching}
                >
                  <FiTrash className="size-3" />
                  {/* This is the vertical line connecting delete and play button */}
                  <div className="absolute left-2.5 bottom-4 -z-10 text-neutral-600">
                    |
                  </div>
                </button>
              )}

              {/*Recorded audio search button*/}
              {recordedAudio !== null && (
                <button
                  type="button"
                  onClick={audioSubmitted}
                  className={`px-4  py-2.5 rounded-r-lg ${
                    isRecording || isPlaying || isSearching
                      ? "bg-neutral-900"
                      : "bg-neutral-800 hover:bg-neutral-900"
                  } border  border-neutral-700/80 outline-neutral-700`}
                  disabled={isPlaying || isRecording || isSearching}
                >
                  <FiSearch />
                </button>
              )}

              {/*Open all options button*/}
              {recordedAudio === null && (
                <button
                  type="button"
                  onClick={onInputOptionActive}
                  className={`px-4  py-2.5 rounded-r-lg ${
                    isRecording
                      ? "bg-neutral-900"
                      : "bg-neutral-800 hover:bg-neutral-900"
                  } border  border-neutral-700/80 outline-neutral-700`}
                  disabled={isRecording}
                >
                  <SlOptions />
                </button>
              )}
            </div>
          )}

          {cameraActiveState && (
            <div className="relative group flex justify-center px-8 pb-8 pt-10">
              <label className="absolute top-2 text-neutral-400 w-full flex justify-center text-center">
                <span className="absolute transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0 group-focus-within:opacity-0 truncate">
                  Undergoing updates
                </span>
                <span className="absolute transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 truncate">
                  Delivering ASAP!
                </span>
              </label>
              <p className="flex items-center text-sm text-neutral-300 border border-r-0 bg-neutral-800 rounded-l-lg border-neutral-700/80 py-2.5 px-4">
                Coming soon...
              </p>
              <button
                type="button"
                onClick={onInputOptionActive}
                className="px-4  py-2.5 rounded-r-lg bg-neutral-800 hover:bg-neutral-900 border  border-neutral-700/80 outline-neutral-700"
              >
                <SlOptions />
              </button>
            </div>
          )}

          {/**/}
        </div>
      </div>
    </main>
  );
}
