import Link from "next/link";

export default function CompletionScreen() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Test Completed!</h1>
      <p className="text-lg text-gray-400 mb-4">
        Thank you for completing the test. We will review your answers and get back to you.
      </p>
      <button 
        onClick={() => alert("Test Submitted")}
        className="bg-blue-500 px-6 py-3 rounded-lg text-white hover:bg-blue-600"
      >
       <Link href="/"> Finish</Link>
      </button>
    </div>
  );
}
