// import { useEffect, useRef } from "react";

// export default function ScreenSharingPage() {
//   const videoRef = useRef(null);

//   const handleScreenSharing = async () => {
//     try {
//       // Request screen-sharing access
//       const stream = await navigator.mediaDevices.getDisplayMedia({
//         video: true,
//       });

//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }
//     } catch (err) {
//       console.error("Error accessing screen sharing:", err);
//     }
//   };

//   useEffect(() => {
//     handleScreenSharing();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
//       <h1 className="text-3xl font-bold mb-6">Screen Sharing</h1>

//       <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg">
       
//       </div>
//     </div>
//   );
// }
