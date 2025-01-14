import Groq from "groq-sdk";

export async function VoiceNoteToText(audioBlob) {
  const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  // Convert Blob to a File object (compatible with FormData)
  const audioFile = new File([audioBlob], "audio.m4a", { type: "audio/m4a" });

  // Use the File object directly with the Groq SDK
  const transcription = await groq.audio.transcriptions.create({
    file: audioFile, // Use the File object
    model: import.meta.env.VITE_GROQ_AUDIO_MODEL,
  });

  const output = transcription.text;
  console.log(output);
  return output;
}
