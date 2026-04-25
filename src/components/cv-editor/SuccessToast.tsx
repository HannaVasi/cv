import React, { useState, useEffect } from "react";
import { CheckCircle, X } from "lucide-react";

interface SuccessToastProps {
  message: string;
  onDismiss: () => void;
}

const SuccessToast: React.FC<SuccessToastProps> = ({ message, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 3000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border"
      style={{
        backgroundColor: "#FFFFFF",
        borderColor: "#D1FAE5",
        animation: "toastIn 200ms ease-out",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        minWidth: "280px",
      }}
    >
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: "#D1FAE5" }}
      >
        <CheckCircle size={15} style={{ color: "#059669" }} />
      </div>
      <span className="text-sm font-medium text-gray-800 flex-1">{message}</span>
      <button
        onClick={onDismiss}
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default SuccessToast;
