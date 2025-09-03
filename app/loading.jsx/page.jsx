"use client";

export default function LoadingPage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      <style jsx>{`
        .loader {
          border-top-color: #3b82f6; /* blue-500 */
          animation: spinner 1s linear infinite;
        }
        @keyframes spinner {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
    </div>
  );
}
