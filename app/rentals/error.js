"use client";

import { AlertCircle } from "lucide-react";

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100
          animate-fade-in-up"
      >
        <div className="text-center">
          <div
            className="inline-block p-3 bg-red-50 rounded-full mb-4
              animate-scale-in"
          >
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>

          <h2
            className="text-2xl font-bold text-gray-900 mb-3
              animate-fade-in [animation-delay:200ms]"
          >
            Oops! Something went wrong
          </h2>

          <p
            className="text-gray-600 mb-6
              animate-fade-in [animation-delay:300ms]"
          >
            {error.message || "An unexpected error occurred. Please try again."}
          </p>

          <button
            onClick={reset}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg
              font-medium shadow-md hover:shadow-lg transition-all duration-200 ease-in-out
              hover:-translate-y-0.5 active:translate-y-0
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              animate-fade-in [animation-delay:400ms]"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
