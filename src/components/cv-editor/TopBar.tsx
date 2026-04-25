import React from "react";
import { ArrowLeft } from "lucide-react";

interface TopBarProps {
  onCancel: () => void;
  onSave: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onCancel, onSave }) => {
  return (
    <div
      className="flex items-center justify-between px-6 py-3.5 border-b"
      style={{
        backgroundColor: "#FFFFFF",
        borderColor: "#E5E7EB",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <div className="flex items-center gap-2">
        <button
          className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          onClick={onCancel}
        >
          <ArrowLeft size={16} />
          Edit CV
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onCancel}
          className="px-4 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          className="px-5 py-1.5 text-sm font-semibold text-white rounded-md transition-all active:scale-[0.97]"
          style={{ backgroundColor: "#E8364F" }}
          onMouseEnter={(e) =>
            ((e.target as HTMLButtonElement).style.backgroundColor = "#D02B43")
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLButtonElement).style.backgroundColor = "#E8364F")
          }
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default TopBar;
