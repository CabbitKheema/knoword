import Groq from "groq-sdk";
import { requestStatus } from "../enums/enums";

export function VoiceNoteToText(audioBlob) {
  return new Promise((resolve, reject) => {
    const groq = new Groq({
      apiKey: import.meta.env.VITE_GROQ_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    // Convert Blob to a File object (compatible with FormData)
    const audioFile = new File([audioBlob], "audio.m4a", { type: "audio/m4a" });

    // Use the File object directly with the Groq SDK
    groq.audio.transcriptions
      .create({
        file: audioFile,
        model: import.meta.env.VITE_GROQ_AUDIO_MODEL,
      })
      .then((transcription) => {
        const output = transcription.text;
        console.log(output);
        const response = {
          status: requestStatus.SUCCESS,
          message: [
            "Successful transcription!",
            "Voice transcription is completed",
          ],
          data: output,
        };
        resolve(response);
      })
      .catch((error) => {
        console.error("Error in transcription:", error);
        const response = {
          status: requestStatus.FAILURE,
          message: [
            "Transcription failed!",
            "Failed during voice transcription",
          ],
          error: error,
        };
        reject(response);
      });
  });
}
