import {
  borderColor,
  centerFadingAbsoluteLabel,
  fadingAbsoluteLabelSpan,
  idleActiveText,
  idleTextSize,
  leftInteractableEdgeStyle,
  postHoverOpacityTransition,
  preHoverOpacityTransition,
  searchOptionStyle,
} from "../../constants";
import BackToOptions from "./Buttons/BackToOptions";

export default function SearchByImage() {
  return (
    <div className={searchOptionStyle}>
      <label className={centerFadingAbsoluteLabel}>
        <span
          className={`${fadingAbsoluteLabelSpan} ${preHoverOpacityTransition}`}
        >
          Undergoing updates
        </span>
        <span
          className={`${fadingAbsoluteLabelSpan} ${postHoverOpacityTransition}`}
        >
          Delivering ASAP!
        </span>
      </label>
      <p
        className={`p-2 ${idleTextSize} ${idleActiveText} ${leftInteractableEdgeStyle} ${borderColor}`}
      >
        Coming soon...
      </p>
      <BackToOptions />
    </div>
  );
}
