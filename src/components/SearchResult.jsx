import { BiX } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { clearTextResult } from "../features/searchword/textResultSlice";
import {
  borderColor,
  idleActiveText,
  idleInteractableBG,
  idleTextSize,
} from "../constants";

export default function SearchResult() {
  const textResult = useSelector((state) => state.textResultReducer.textResult);
  const dispatch = useDispatch();
  return (
    <div className={`px-8 pb-6 ${textResult.length === 0 && "pt-[30vh]"}`}>
      {textResult.length > 0 && (
        <div className="sticky top-0 pb-1 flex justify-center">
          <button
            type="button"
            onClick={() => {
              dispatch(clearTextResult());
            }}
            className={` rounded-b-lg ${idleInteractableBG} px-6 py-0.5 border border-t-0 ${borderColor}`}
          >
            <BiX />
          </button>
        </div>
      )}
      {/*text-neutral-300 text-xs*/}
      <div
        className={` ${idleTextSize} ${idleActiveText}  bg-neutral-900 lg:text-lg`}
        style={{ whiteSpace: "pre-line" }}
      >
        {Array.from({ length: 0 }).map((_, i) => (
          <p key={i}>Placeholder content for scrolling (item {i + 1})</p>
        ))}
        {textResult}
      </div>
    </div>
  );
}
