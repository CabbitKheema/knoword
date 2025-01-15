import { useEffect, useRef, useState } from "react";
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
  idleActiveText,
  idleDisabledText,
  idleInteractableBG,
  idleTextSize,
  interactablePadding,
  labelSpanIconStyle,
  leftInteractableEdgeStyle,
  middleInteractableEdgeStyle,
  rightInteractableEdgeStyle,
  searchOptionStyle,
} from "../../constants";

import { useToast } from "../Toast/ToastService";

export default function SearchByVoice() {
  const currentWebsiteAction = useSelector(
    (state) => state.websiteActionReducer.websiteAction
  );
  const isRecording = currentWebsiteAction == websiteAction.RECORDING;
  const isSearching = currentWebsiteAction == websiteAction.SEARCHING;
  const isTranscribing = currentWebsiteAction == websiteAction.TRANSCRIBING;

  const [inputText, setInputText] = useState("");
  const [recordedAudio, setRecordedAudio] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const dispatch = useDispatch();
  const toast = useToast();

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

  const stopRecording = async () => {
    await mediaRecorderRef.current.stop();
    dispatch(setWebsiteAction(websiteAction.IDLE));
  };

  const cancelRecordedAudio = () => {
    setInputText("");
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

  // Define the async function
  const convertVoiceToText = () => {
    console.log("Converting voice to text...");
    dispatch(setWebsiteAction(websiteAction.TRANSCRIBING));

    VoiceNoteToText(recordedAudio.blob)
      .then((response) => {
        setInputText(response.data);
        toast.notificationToast(response);
      })
      .catch((response) => {
        console.error("Error recognizing voice:", response.error);
        toast.notificationToast(response);
        cancelRecordedAudio();
      })
      .finally(() => {
        dispatch(setWebsiteAction(websiteAction.IDLE));
      });
  };

  // Call the function when audio has been recorded
  useEffect(() => {
    if (recordedAudio && recordedAudio.blob) {
      convertVoiceToText();
    }
  }, [recordedAudio]);

  const findInputTextMeaning = () => {
    console.log("Searching word...");
    dispatch(setWebsiteAction(websiteAction.SEARCHING));
    FindWordMeaning(inputText)
      .then((response) => {
        toast.notificationToast(response);
        dispatch(setTextResult(response.data)); // Update the state with the resolved result
        cancelRecordedAudio();
      })
      .catch((response) => {
        console.error("Error fetching word meaning:", response.error);
        toast.notificationToast(response);
      })
      .finally(() => {
        dispatch(setWebsiteAction(websiteAction.IDLE));
      });
  };

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
            isPlaying ||
            recordedAudio === null ||
            isRecording ||
            isSearching ||
            isTranscribing
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
        <span
          className={`${fadingAbsoluteLabelSpan} ${
            isTranscribing ? "opacity-100" : "opacity-0"
          } `}
        >
          Transcribing audio...
        </span>
      </label>

      {/*Audio recording/stop button*/}
      <button
        type="button"
        onClick={() => (isRecording ? stopRecording() : startRecording())}
        className={`${interactablePadding} ${leftInteractableEdgeStyle} ${
          isPlaying || isSearching || isTranscribing
            ? hoverOrDisabledInteractableBG
            : idleInteractableBG
        } ${borderColor} `}
        disabled={isPlaying || isSearching || isTranscribing}
      >
        {isRecording ? <IoStopOutline /> : <FiMic />}
      </button>

      {recordedAudio === null ? (
        /*Open all options button*/
        <BackToOptions />
      ) : (
        <>
          {/*Recorded audio play/pause button*/}
          <button
            type="button"
            onClick={togglePlay}
            className={`${interactablePadding}  ${
              isRecording || isSearching || isTranscribing
                ? hoverOrDisabledInteractableBG
                : idleInteractableBG
            }  ${middleInteractableEdgeStyle} ${borderColor}`}
            disabled={isRecording || isSearching || isTranscribing}
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
          {/*Transcription*/}
          <input
            type="text"
            id="word"
            value={inputText}
            className={`p-2 ${middleInteractableEdgeStyle} ${idleTextSize} ${
              isRecording || isSearching || isTranscribing
                ? idleDisabledText
                : idleActiveText
            }   ${borderColor} w-full focus:outline-none`}
            placeholder="..."
            disabled={true}
          />
          {/*Recorded audio deletion button*/}
          <button
            type="button"
            onClick={cancelRecordedAudio}
            className={`absolute bottom-0.5 p-1.5 ${circularInteractableEdgeStyle} ${
              isRecording || isPlaying || isSearching || isTranscribing
                ? hoverOrDisabledInteractableBG
                : idleInteractableBG
            }  ${borderColor}`}
            disabled={isPlaying || isRecording || isSearching || isTranscribing}
          >
            <FiTrash className="size-3" />
            {/* This is the vertical line connecting delete and play button */}
            <div className="absolute left-2.5 bottom-4 -z-10 text-neutral-600">
              |
            </div>
          </button>
          {/*Recorded audio search button*/}
          <button
            type="button"
            onClick={findInputTextMeaning}
            className={`${interactablePadding} ${rightInteractableEdgeStyle} ${
              isRecording || isPlaying || isSearching || isTranscribing
                ? hoverOrDisabledInteractableBG
                : idleInteractableBG
            }   ${borderColor}`}
            disabled={isPlaying || isRecording || isSearching || isTranscribing}
          >
            <FiSearch />
          </button>
        </>
      )}
    </div>
  );
}
