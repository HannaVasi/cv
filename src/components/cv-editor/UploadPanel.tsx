import React, { useState } from "react";
import { Upload, FileText } from "lucide-react";

const UploadPanel: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div
      className="flex flex-col"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <div
        className="rounded-xl border-2 border-dashed p-8 flex flex-col items-center justify-center gap-3 transition-colors"
        style={{
          borderColor: isDragging ? "#E8364F" : "#DDE1EA",
          backgroundColor: isDragging ? "#FFF5F6" : "#FAFBFC",
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
        }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#F3F4F6" }}
        >
          <Upload size={20} style={{ color: "#9AA3B2" }} />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-gray-700">
            Drag &amp; Drop to Upload file
          </p>
          <p className="text-xs mt-1" style={{ color: "#9AA3B2" }}>
            or
          </p>
        </div>
        <button
          className="px-4 py-1.5 text-sm font-semibold rounded-md border transition-all active:scale-[0.97] hover:bg-[#E8364F] hover:text-white"
          style={{ borderColor: "#E8364F", color: "#E8364F" }}
        >
          Browse file
        </button>
        <p className="text-xs" style={{ color: "#9AA3B2" }}>
          PDF, DOCX up to 10MB
        </p>
      </div>

      {/* CV Preview stub */}
      <div className="mt-4">
        <div className="flex items-center gap-2 mb-3">
          <FileText size={15} style={{ color: "#9AA3B2" }} />
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            CV Preview
          </span>
        </div>
        <div
          className="rounded-lg border p-4 space-y-2"
          style={{ borderColor: "#E5E7EB", backgroundColor: "#FFFFFF" }}
        >
          <div className="h-3 rounded bg-gray-100 w-3/4" />
          <div className="h-2.5 rounded bg-gray-100 w-full" />
          <div className="h-2.5 rounded bg-gray-100 w-5/6" />
          <div className="h-2.5 rounded bg-gray-100 w-4/6" />
          <div className="h-px bg-gray-100 my-2" />
          <div className="h-3 rounded bg-gray-100 w-1/2" />
          <div className="h-2.5 rounded bg-gray-100 w-full" />
          <div className="h-2.5 rounded bg-gray-100 w-5/6" />
          <div className="h-2.5 rounded bg-gray-100 w-3/4" />
          <div className="h-2.5 rounded bg-gray-100 w-full" />
        </div>
      </div>
    </div>
  );
};

export default UploadPanel;
