import { useState } from "react";
import { useRouter } from "next/router";

export default function PermissionPage() {
  const [cameraPermission, setCameraPermission] = useState(false);
  const [micPermission, setMicPermission] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handlePermission = async () => {
    try {
      // Req camera-microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      // Set true if  granted
      setCameraPermission(true);
      setMicPermission(true);

      // Stop all tracks after permissions are granted
      stream.getTracks().forEach((track) => track.stop());
    } catch (err) {
      setError("NOTE: Unable to access camera and microphone. Please allow permissions.");
      console.error(err);
    }
  };

  const handleNext = () => {
    if (cameraPermission && micPermission) {
      // move to question page
      router.push("/question");
    } else {
      setError("NOTE: Please grant camera and microphone permissions before proceeding.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Permission Check</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Please allow the following permissions:</h2>

        <div className="mb-4">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={cameraPermission}
              onChange={() => {}}
              disabled
              className="form-checkbox h-5 w-5 text-blue-500"
            />
            <span>Camera Access</span>
          </label>
        </div>

        <div className="mb-4">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={micPermission}
              onChange={() => {}}
              disabled
              className="form-checkbox h-5 w-5 text-blue-500"
            />
            <span>Microphone Access</span>
          </label>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          onClick={handlePermission}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Grant Permissions
        </button>

        <button
          onClick={handleNext}
          className="w-full bg-gray-700 text-white py-2 mt-4 rounded hover:bg-gray-800"
        >
          Next
        </button>
      </div>
    </div>
  );
}
