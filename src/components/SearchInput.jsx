import { useSelector } from "react-redux";
import InputOption from "./SearchInput/InputOption";
import { inputType } from "../enums/enums";
import SearchByImage from "./SearchInput/SearchByImage";
import SearchByText from "./SearchInput/SearchByText";
import SearchByVoice from "./SearchInput/SearchByVoice";
import { borderColor } from "../constants";

export default function SearchInput() {
  const currentInputSelection = useSelector(
    (state) => state.inputSelectionReducer.currentInput
  );

  return (
    <div
      className={`sticky bottom-0 w-full backdrop-blur-lg rounded-t-lg border-y ${borderColor}`}
    >
      {currentInputSelection == inputType.NONE && <InputOption />}
      {currentInputSelection == inputType.TEXT && <SearchByText />}
      {currentInputSelection == inputType.VOICE && <SearchByVoice />}
      {currentInputSelection == inputType.IMAGE && <SearchByImage />}
    </div>
  );
}
