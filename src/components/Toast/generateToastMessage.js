import { EBorderColorByStatus } from "../../constants";

export const generateFailureToastMessage = (message) => ({
  borderColor: EBorderColorByStatus.FAIL,
  message: message,
});

export const generateSuccessToastMessage = (message) => ({
  borderColor: EBorderColorByStatus.PASS,
  message,
});

export const generatePromptToastMessage = (message) => ({
  borderColor: EBorderColorByStatus.PROMPT,
  message,
});
