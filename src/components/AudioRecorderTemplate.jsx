import { useState, useRef } from "react";
import { FiMic, FiUpload } from "react-icons/fi"; // Icons for buttons

const AudioRecorderTemplate = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [audioDuration, setAudioDuration] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/mpeg",
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudio({ url: audioUrl, blob: audioBlob });
        audioChunksRef.current = [];
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const handleAudioSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const audioUrl = URL.createObjectURL(file);
      const audio = new Audio(audioUrl);

      audio.onloadedmetadata = () => {
        setSelectedAudio({ url: audioUrl, file });
        setAudioDuration(audio.duration.toFixed(2));
      };
    }
  };

  const cancelRecordedAudio = () => {
    setRecordedAudio(null);
  };

  const cancelSelectedAudio = () => {
    setSelectedAudio(null);
    setAudioDuration(null);
  };

  return (
    <div className="flex-1 overflow-y-scroll bg-neutral-900 p-4  rounded-lg shadow-lg text-white">
      {/* Recording Section */}
      <div className="mb-4">
        <button
          onClick={() => (isRecording ? stopRecording() : startRecording())}
          className={`flex items-center justify-center px-4 py-2 w-full rounded border-2 ${
            isRecording
              ? "bg-red-500 border-red-500 hover:bg-red-600"
              : "bg-gray-900 border-gray-600 hover:bg-gray-700"
          }`}
        >
          <FiMic className="mr-2 text-red-500" />
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
        {recordedAudio && (
          <div className="mt-4">
            <audio controls src={recordedAudio.url} className="w-full"></audio>
            <button
              onClick={cancelRecordedAudio}
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* File Upload Section */}
      <div>
        <label
          htmlFor="audioFile"
          className="flex items-center justify-center px-4 py-2 w-full rounded border-2 bg-gray-900 border-gray-600 hover:bg-gray-700 cursor-pointer"
        >
          <FiUpload className="mr-2 text-red-500" />
          Select File
        </label>
        <input
          id="audioFile"
          type="file"
          accept="audio/*"
          onChange={handleAudioSelect}
          className="hidden"
        />
        {selectedAudio && (
          <div className="mt-4">
            <audio controls src={selectedAudio.url} className="w-full"></audio>
            <p className="text-sm text-gray-400 mt-1">
              Duration:{" "}
              {audioDuration ? `${audioDuration} seconds` : "Loading..."}
            </p>
            <button
              onClick={cancelSelectedAudio}
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioRecorderTemplate;
