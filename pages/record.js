import { useRef, useState } from "react";

export default function Record() {
  const videoRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    videoRef.current.srcObject = stream;
    videoRef.current.play();

    const recorder = new MediaRecorder(stream);
    recorder.start();
    setMediaRecorder(recorder);
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    mediaRecorder.ondataavailable = (e) => {
      const blob = new Blob([e.data], { type: "video/webm" });
      console.log(blob);
      alert("Recording complete!");
    };
    setRecording(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Record Your Answer</h1>
      <video ref={videoRef} className="w-1/2 mb-4 border" autoPlay muted></video>
      {!recording ? (
        <button className="px-6 py-2 bg-blue-500 text-white rounded" onClick={startRecording}>
          Start Recording
        </button>
      ) : (
        <button className="px-6 py-2 bg-red-500 text-white rounded" onClick={stopRecording}>
          Stop Recording
        </button>
      )}
    </div>
  );
}
