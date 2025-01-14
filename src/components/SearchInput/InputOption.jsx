import { FaRegKeyboard } from "react-icons/fa";
import { FiCamera, FiMic } from "react-icons/fi";
import { inputType } from "../../enums/enums";
import { setInputType } from "../../features/selectInputType/inputSelectionSlice";
import { useDispatch } from "react-redux";
import {
  borderColor,
  centerFadingAbsoluteLabel,
  fadingAbsoluteLabelSpan,
  idleInteractableBG,
  interactablePadding,
  leftInteractableEdgeStyle,
  middleInteractableEdgeStyle,
  postHoverOpacityTransition,
  preHoverOpacityTransition,
  rightInteractableEdgeStyle,
  searchOptionStyle,
} from "../../constants";

export default function InputOption() {
  function onKeyboardActive() {
    dispatch(setInputType(inputType.TEXT));
  }

  function onMicActive() {
    dispatch(setInputType(inputType.VOICE));
  }
  function onCameraActive() {
    dispatch(setInputType(inputType.IMAGE));
  }

  const dispatch = useDispatch();

  return (
    <div className={searchOptionStyle}>
      <label className={centerFadingAbsoluteLabel}>
        <span
          className={`${fadingAbsoluteLabelSpan} ${preHoverOpacityTransition}`}
        >
          What word is bothering you?
        </span>
        <span
          className={`${fadingAbsoluteLabelSpan} ${postHoverOpacityTransition}`}
        >
          Search by Text, Voice or image.
        </span>
      </label>
      <button
        type="button"
        onClick={onKeyboardActive}
        className={`${interactablePadding} ${idleInteractableBG} ${borderColor} ${leftInteractableEdgeStyle}`}
      >
        <FaRegKeyboard />
      </button>

      <button
        type="button"
        onClick={onMicActive}
        className={`${interactablePadding} ${idleInteractableBG} ${borderColor} ${middleInteractableEdgeStyle}`}
      >
        <FiMic />
      </button>

      <button
        type="button"
        onClick={onCameraActive}
        className={`${interactablePadding} ${idleInteractableBG} ${borderColor} ${rightInteractableEdgeStyle}`}
      >
        <FiCamera />
      </button>
    </div>
  );
}
