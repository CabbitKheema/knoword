import { FiSearch } from "react-icons/fi";
import BackToOptions from "./Buttons/BackToOptions";
import { useDispatch } from "react-redux";
import { setTextResult } from "../../features/searchword/textResultSlice";
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
import { useToast } from "../Toast/ToastService";
import { useForm } from "react-hook-form";
import {
  generateFailureToastMessage,
  generateSuccessToastMessage,
} from "../Toast/generateToastMessage";

export default function SearchByText() {
  const dispatch = useDispatch();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const inputText = watch("inputText", "");
  const isTyping = inputText.trim().length > 0;

  const onSubmit = async (formData) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/find-word-definition",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (data.success === false) {
        console.error("Error fetching word meaning:", data.error);
        toast.notificationToast(generateFailureToastMessage(data.message));
      } else if (res.ok) {
        dispatch(setTextResult(data.data));
        toast.notificationToast(generateSuccessToastMessage(data.message));
        reset();
      } else if (res.status == 400) {
        toast.notificationToast(generateFailureToastMessage(data.message));
      }
    } catch (error) {
      toast.notificationToast(
        generateFailureToastMessage([
          "Error!",
          error.message || "Something went wrong.",
        ])
      );
    }
  };

  return (
    <form className={searchOptionStyle} onSubmit={handleSubmit(onSubmit)}>
      <label className={leftFadingAbsoluteLabel}>
        <span
          className={`${fadingAbsoluteLabelSpan} ${
            isTyping ||
            (isTyping && !isSubmitting) ||
            (errors.inputText && !(errors.inputText.type === "required"))
              ? "opacity-0"
              : "opacity-100"
          }`}
        >
          Type the word
        </span>

        <span
          className={`${fadingAbsoluteLabelSpan} ${
            isTyping && !isSubmitting && !errors.inputText
              ? "opacity-100"
              : "opacity-0"
          }`}
        >
          Enter/Click arrow to find meaning
        </span>
        <span
          className={`${fadingAbsoluteLabelSpan} ${
            isSubmitting ? "opacity-100" : "opacity-0"
          }`}
        >
          Searching...
        </span>
      </label>
      <input
        type="text"
        {...register("inputText", {
          maxLength: 100,
          required: true,
          validate: (value) =>
            value.trim().length > 0 || "Empty spaces are not allowed",
        })}
        className={`p-2 ${leftInteractableEdgeStyle} ${idleTextSize} 
        ${isSubmitting ? idleDisabledText : idleActiveText}   
        ${borderColor} 
        ${
          errors.inputText && !(errors.inputText.type === "required")
            ? "border-red-500"
            : ""
        } 
        w-full focus:outline-none `}
        placeholder="e.g. providence"
        disabled={isSubmitting}
      />
      {errors.inputText && !(errors.inputText.type === "required") && (
        <div className="absolute bottom-16 flex-1 justify-center items-center">
          <p className="max-w-52 text-xs text-center bg-neutral-900 border border-red-500 rounded-lg p-2">
            {errors.inputText.type === "maxLength" &&
              "Maximum of 100 letters allowed"}
            {errors.inputText.type === "required" && "This should not be empty"}
            {errors.inputText.message}
          </p>
          <div className="-mt-1 text-red-600 flex justify-center">|</div>
        </div>
      )}
      {isTyping ? (
        <button
          type="submit"
          className={`${
            isSubmitting ? hoverOrDisabledInteractableBG : idleInteractableBG
          } ${interactablePadding} ${borderColor} ${rightInteractableEdgeStyle} border-l-0`}
          disabled={isSubmitting}
        >
          <FiSearch />
        </button>
      ) : (
        <BackToOptions />
      )}
    </form>
  );
}
