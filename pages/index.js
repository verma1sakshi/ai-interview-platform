import { useEffect, useRef } from "react";

export default function Instructions() {
  const videoRef = useRef(null);

  useEffect(() => {
    //access user camera
    async function getCameraFeed() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream; // Set the video stream to the video element
        }
      } catch (error) {
        console.error("Error accessing the camera:", error);
      }
    }

    getCameraFeed();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-gray-800">
        <div className="text-2xl font-bold">
          ZEKO<span className="text-blue-400">AI</span>
        </div>
        <button className="text-sm text-blue-400 border border-blue-400 px-4 py-1 rounded hover:bg-blue-400 hover:text-white">
          Login / SignUp
        </button>
      </header>
      <main className="flex flex-row items-center justify-center h-[calc(100vh-72px)] px-6">
        {/* Side-camera */}
        <div className="flex-1 bg-gray-800 flex items-center justify-center rounded-md h-full max-h-[70vh] mr-4">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Rightside- instructions */}
        <div className="flex-1 bg-gray-800 p-6 rounded-md max-w-lg">
          <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
          <ul className="text-sm space-y-3">
            <li>1. Ensure stable internet and choose a clean, quiet location.</li>
            <li>2. Permission for access of camera, microphone, entire screen sharing is required.</li>
            <li>3. Be in professional attire and avoid distractions.</li>
            <li>4. Give a detailed response, providing as much information as you can.</li>
            <li>5. Answer the question with examples and projects you’ve worked on.</li>
          </ul>

          <p className="mt-6 text-blue-400 text-sm">
            <a href="#" className="underline hover:text-blue-300">
              Click here
            </a>{" "}
            to try a mock interview with Avya, our AI interviewer, and build your confidence before the main interview!
          </p>

          <button
            className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            onClick={() => window.location.href = "/permission-check"}
          >
            Start Now
          </button>
        </div>
      </main>
    </div>
  );
}
