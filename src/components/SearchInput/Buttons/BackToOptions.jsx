import { useDispatch, useSelector } from "react-redux";
import { inputType, websiteAction } from "../../../enums/enums";
import { setInputType } from "../../../features/selectInputType/inputSelectionSlice";
import { SlOptions } from "react-icons/sl";
import {
  borderColor,
  hoverOrDisabledInteractableBG,
  idleInteractableBG,
  interactablePadding,
  rightInteractableEdgeStyle,
} from "../../../constants";

export default function BackToOptions() {
  const dispatch = useDispatch();
  const currentWebsiteAction = useSelector(
    (state) => state.websiteActionReducer.websiteAction
  );
  const isRecording = currentWebsiteAction == websiteAction.RECORDING;
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
