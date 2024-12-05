import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

const questionsSet = [
  "What is HTML?",
  "What is CSS?",
  "What is JavaScript?",
  "What is React.js?",
  "What is Next.js?",
];

export default function QuestionPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const router = useRouter();

  const playQuestionAudio = () => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(questionsSet[currentQuestionIndex]);
    synth.speak(utterance);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        const videoURL = URL.createObjectURL(blob);
        console.log(`Answer for question ${currentQuestionIndex + 1}:`, videoURL);
        chunksRef.current = [];
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      console.error("Error accessing camera and microphone:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }

    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  const handleNextQuestion = () => {
    stopRecording();
    if (currentQuestionIndex < questionsSet.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      router.push("/loader"); // move to Loader Screen 
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Question {currentQuestionIndex + 1}</h1>
      <p className="text-lg mb-4">{questionsSet[currentQuestionIndex]}</p>
      <div className="flex space-x-4 mb-6">
        <button
          onClick={playQuestionAudio}
          className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600"
        >
          Play Audio
        </button>
      </div>
      <div className="mb-4">
        <video ref={videoRef} autoPlay muted className="w-full max-w-md bg-black rounded-lg"></video>
      </div>
      <div className="flex space-x-4">
        {!recording && (
          <button
            onClick={startRecording}
            className="bg-green-500 px-6 py-3 rounded-lg text-white hover:bg-green-600"
          >
            Start Recording
          </button>
        )}
        {recording && (
          <button
            onClick={stopRecording}
            className="bg-red-500 px-6 py-3 rounded-lg text-white hover:bg-red-600"
          >
            Stop Recording
          </button>
        )}
        <button
          onClick={handleNextQuestion}
          className="bg-gray-700 px-6 py-3 rounded-lg text-white hover:bg-gray-800"
        >
          Next Question
        </button>
      </div>
    </div>
  );
}
