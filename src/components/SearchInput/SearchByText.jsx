import { FiSearch } from "react-icons/fi";
import BackToOptions from "./Buttons/BackToOptions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTextResult } from "../../features/searchword/textResultSlice";
import { FindWordMeaning } from "../../apis/FindWordMeaning";
import { websiteAction } from "../../enums/enums";
import { setWebsiteAction } from "../../features/websiteActions/websiteActionSlice";
import {
  borderColor,
  leftFadingAbsoluteLabel,
  fadingAbsoluteLabelSpan,
  hoverOrDisabledInteractableBG,
  idleInteractableBG,
  searchOptionStyle,
  leftInteractableEdgeStyle,
  rightInteractableEdgeStyle,
  interactablePadding,
  idleActiveText,
  idleDisabledText,
  idleTextSize,
} from "../../constants";

export default function SearchByText() {
  const currentWebsiteAction = useSelector(
    (state) => state.websiteActionReducer.websiteAction
  );
  const isSearching = currentWebsiteAction == websiteAction.SEARCHING;
  const [inputText, setInputText] = useState("");
  const isTyping = inputText.trim().length;

  const dispatch = useDispatch();

  async function textSubmitted() {
    console.log("Text submitted.");
    try {
      dispatch(setWebsiteAction(websiteAction.SEARCHING));
      const result = await FindWordMeaning(inputText); // Await the asynchronous function
      setInputText("");
      dispatch(setTextResult(result)); // Update the state with the resolved result
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

  return (
    <div className={searchOptionStyle}>
      <label className={leftFadingAbsoluteLabel}>
        <span
          className={`${fadingAbsoluteLabelSpan} ${
            isTyping || (isTyping && !isSearching) ? "opacity-0" : "opacity-100"
          }`}
        >
          Type the word
        </span>

        <span
          className={`${fadingAbsoluteLabelSpan} ${
            isTyping && !isSearching ? "opacity-100" : "opacity-0"
          }`}
        >
          Enter/Click arrow to find meaning
        </span>
        <span
          className={`${fadingAbsoluteLabelSpan} ${
            isSearching ? "opacity-100" : "opacity-0"
          }`}
        >
          Searching...
        </span>
      </label>
      <input
        type="text"
        id="word"
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
        }}
        className={`p-2 ${leftInteractableEdgeStyle} ${idleTextSize} ${
          isSearching ? idleDisabledText : idleActiveText
        }   ${borderColor} w-full focus:outline-none`}
        placeholder="e.g. providence"
        onKeyDown={(event) => {
          if (event.key === "Enter" && isTyping) {
            textSubmitted();
          }
        }}
        disabled={isSearching}
      />
      {isTyping ? (
        <button
          type="button"
          className={`${
            isSearching ? hoverOrDisabledInteractableBG : idleInteractableBG
          } ${interactablePadding} ${borderColor} ${rightInteractableEdgeStyle} border-l-0`}
          onClick={textSubmitted}
          disabled={isSearching}
        >
          <FiSearch />
        </button>
      ) : (
        <BackToOptions />
      )}
    </div>
  );
}
