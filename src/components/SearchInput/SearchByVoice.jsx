import { useRef, useState } from "react";
import { setTextResult } from "../../features/searchword/textResultSlice";
import { FindWordMeaning } from "../../apis/FindWordMeaning";
import { useDispatch, useSelector } from "react-redux";
import { VoiceNoteToText } from "../../apis/VoiceNoteToText";
import { FiMic, FiPause, FiPlay, FiSearch, FiTrash } from "react-icons/fi";
import { IoStopOutline } from "react-icons/io5";
import BackToOptions from "./Buttons/BackToOptions";
import { websiteAction } from "../../enums/enums";
import { setWebsiteAction } from "../../features/websiteActions/websiteActionSlice";
import {
  borderColor,
  centerFadingAbsoluteLabel,
  circularInteractableEdgeStyle,
  fadingAbsoluteLabelSpan,
  hoverOrDisabledInteractableBG,
  idleInteractableBG,
  interactablePadding,
  labelSpanIconStyle,
  leftInteractableEdgeStyle,
  middleInteractableEdgeStyle,
  rightInteractableEdgeStyle,
  searchOptionStyle,
} from "../../constants";

export default function SearchByVoice() {
  const currentWebsiteAction = useSelector(
    (state) => state.websiteActionReducer.websiteAction
  );
  const isRecording = currentWebsiteAction == websiteAction.RECORDING;
  const isSearching = currentWebsiteAction == websiteAction.SEARCHING;

  const [recordedAudio, setRecordedAudio] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const dispatch = useDispatch();

  async function setResult(text) {
    const result = await FindWordMeaning(text); // Await the asynchronous function

    dispatch(setTextResult(result)); // Update the state with the resolved result
  }

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
      // dispatch(setIsRecording(true));
      dispatch(setWebsiteAction(websiteAction.RECORDING));
    } catch (error) {
      console.error("Error accessing microphone:", error);
      dispatch(
        setTextResult("Error accessing the microphone. Please try again.")
      );
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    dispatch(setWebsiteAction(websiteAction.IDLE));
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

  async function audioSubmitted() {
    console.log("audio submitted.");
    try {
      dispatch(setWebsiteAction(websiteAction.SEARCHING));
      const word = await VoiceNoteToText(recordedAudio.blob); // Await the asynchronous function
      await setResult(word);
      cancelRecordedAudio();
    } catch (error) {
      console.error("Error fetching word meaning:", error);
      dispatch(
        setTextResult(
          "Error fetching the meaning of the word. Please try again."
        )
      );
    } finally {
      dispatch(setWebsiteAction(websiteAction.IDLE));
    }
  }
  {
    /*End Mic recroding section*/
  }

  return (
    <div className={searchOptionStyle}>
      <label className={centerFadingAbsoluteLabel}>
        <span
          className={`${fadingAbsoluteLabelSpan}  ${
            isRecording || recordedAudio !== null ? "opacity-0" : "opacity-100"
          }`}
        >
          <FiMic className={labelSpanIconStyle} /> to record voice
        </span>

        <span
          className={`${fadingAbsoluteLabelSpan}  ${
            isRecording ? "opacity-100" : "opacity-0"
          } `}
        >
          <IoStopOutline className={labelSpanIconStyle} /> to stop recording
        </span>
        <span
          className={`${fadingAbsoluteLabelSpan}  ${
            isPlaying || recordedAudio === null || isRecording || isSearching
              ? "opacity-0"
              : "opacity-100"
          }`}
        >
          <FiPlay className={labelSpanIconStyle} /> to replay recording
        </span>

        <span
          className={`${fadingAbsoluteLabelSpan} ${
            isPlaying ? "opacity-100" : "opacity-0"
          } `}
        >
          <FiPause className={labelSpanIconStyle} /> to pause replay
        </span>
        <span
          className={`${fadingAbsoluteLabelSpan} ${
            isSearching ? "opacity-100" : "opacity-0"
          } `}
        >
          Searching...
        </span>
      </label>
      {/*Audio recording/stop button*/}
      <button
        type="button"
        onClick={() => (isRecording ? stopRecording() : startRecording())}
        className={`${interactablePadding} ${leftInteractableEdgeStyle} ${
          isPlaying || isSearching
            ? hoverOrDisabledInteractableBG
            : idleInteractableBG
        } ${borderColor} `}
        disabled={isPlaying || isSearching}
      >
        {isRecording ? <IoStopOutline /> : <FiMic />}
      </button>

      {/*Recorded audio play/pause button*/}
      {recordedAudio !== null && (
        <button
          type="button"
          onClick={togglePlay}
          className={`${interactablePadding}  ${
            isRecording || isSearching
              ? hoverOrDisabledInteractableBG
              : idleInteractableBG
          }  ${middleInteractableEdgeStyle} ${borderColor}`}
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
          className={`absolute bottom-0.5 p-1.5 ${circularInteractableEdgeStyle} ${
            isRecording || isPlaying || isSearching
              ? hoverOrDisabledInteractableBG
              : idleInteractableBG
          }  ${borderColor}`}
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
          className={`${interactablePadding} ${rightInteractableEdgeStyle} ${
            isRecording || isPlaying || isSearching
              ? hoverOrDisabledInteractableBG
              : idleInteractableBG
          }   ${borderColor}`}
          disabled={isPlaying || isRecording || isSearching}
        >
          <FiSearch />
        </button>
      )}

      {/*Open all options button*/}
      {recordedAudio === null && <BackToOptions />}
    </div>
  );
}
