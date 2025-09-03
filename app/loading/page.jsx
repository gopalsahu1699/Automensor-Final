'use client';

export default function LoadingPage() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-300 h-16 w-16 mb-4"></div>
      <p className="text-gray-700 text-lg font-medium tracking-wide">Loading Automensor...</p>

      <style jsx>{`
        .loader {
          border-top-color: #2563eb; /* Tailwind blue-600 */
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
