const inputType = Object.freeze({
  NONE: 0,
  TEXT: 1,
  VOICE: 2,
  IMAGE: 3,
});
const websiteAction = Object.freeze({
  IDLE: 0,
  RECORDING: 2,
  SEARCHING: 3,
  TRANSCRIBING: 4,
});
const requestStatus = Object.freeze({
  SUCCESS: 0,
  FAILURE: 1,
});

export { inputType, websiteAction, requestStatus };
