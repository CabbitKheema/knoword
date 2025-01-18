import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { inputType } from "../../../enums/enums";
import { setInputType } from "../../../features/selectInputType/inputSelectionSlice";
import { SlOptions } from "react-icons/sl";
import {
  borderColor,
  hoverOrDisabledInteractableBG,
  idleInteractableBG,
  interactablePadding,
  rightInteractableEdgeStyle,
} from "../../../constants";

export default function BackToOptions({ isRecording }) {
  const dispatch = useDispatch();
  return (
    <button
      type="button"
      onClick={() => {
        dispatch(setInputType(inputType.NONE));
      }}
      className={`${interactablePadding}  ${
        isRecording ? hoverOrDisabledInteractableBG : idleInteractableBG
      } ${rightInteractableEdgeStyle} border-l-0  ${borderColor} `}
      disabled={isRecording}
    >
      <SlOptions />
    </button>
  );
}

// Prop validation
BackToOptions.propTypes = {
  isRecording: PropTypes.bool.isRequired, // Validate isRecording as a required boolean
};
