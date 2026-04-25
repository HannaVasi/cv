import React, { useState } from "react";
import { ChevronDown, ChevronRight, Trash2, Pencil } from "lucide-react";
import { Project } from "./types";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onEdit,
  onDelete,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const dateRange = project.untilNow
    ? `${project.startDate} - Now`
    : `${project.startDate}${project.endDate ? ` - ${project.endDate}` : ""}`;

  return (
    <div
      className="border rounded-lg overflow-hidden transition-all"
      style={{
        borderColor: "#E5E7EB",
        backgroundColor: "#FFFFFF",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Card header row */}
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
          {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </span>

        <div className="flex-1 min-w-0 grid grid-cols-[1fr_2fr] gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold text-gray-900 truncate">
                {project.projectName}
              </span>
              {project.is_manual && (
                <span
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                  style={{
                    backgroundColor: "#EAECF0",
                    color: "#6B7280",
                  }}
                >
                  Manual entry
                </span>
              )}
            </div>
            <div className="text-xs mt-0.5" style={{ color: "#9AA3B2" }}>
              {dateRange}
            </div>
            {project.company && (
              <div className="text-xs mt-0.5" style={{ color: "#9AA3B2" }}>
                {project.company}
              </div>
            )}
          </div>
          <div className="text-sm text-gray-500 truncate self-center">
            {project.description}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
          {project.is_manual && (
            <button
              onClick={() => onEdit(project)}
              className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
              title="Edit project"
            >
              <Pencil size={14} />
            </button>
          )}
          <button
            onClick={() => setConfirmDelete(true)}
            className="p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
            title="Delete project"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div
          className="px-10 pb-4 space-y-3 border-t"
          style={{ borderColor: "#F3F4F6" }}
        >
          <div className="pt-3">
            {project.description && (
              <div className="mb-3">
                <div
                  className="text-xs font-semibold uppercase tracking-wider mb-1"
                  style={{ color: "#9AA3B2" }}
                >
                  Description
                </div>
                <p className="text-sm text-gray-700">{project.description}</p>
              </div>
            )}
            {project.responsibilities && (
              <div className="mb-3">
                <div
                  className="text-xs font-semibold uppercase tracking-wider mb-1"
                  style={{ color: "#9AA3B2" }}
                >
                  Responsibilities
                </div>
                <p className="text-sm text-gray-700">
                  {project.responsibilities}
                </p>
              </div>
            )}
            {project.technologies && (
              <div>
                <div
                  className="text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{ color: "#9AA3B2" }}
                >
                  Technologies
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.split(",").map((tech, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: "#F3F4F6",
                        color: "#374151",
                      }}
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Inline delete confirmation */}
      {confirmDelete && (
        <div
          className="flex items-center justify-between px-4 py-3 border-t"
          style={{ backgroundColor: "#FFF5F5", borderColor: "#FECACA" }}
        >
          <span className="text-sm font-medium" style={{ color: "#DC2626" }}>
            Delete this project? This cannot be undone.
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setConfirmDelete(false)}
              className="px-3 py-1 text-xs font-medium text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setConfirmDelete(false);
                onDelete(project.id);
              }}
              className="px-3 py-1 text-xs font-semibold text-white rounded transition-all active:scale-[0.97]"
              style={{ backgroundColor: "#E8364F" }}
            >
              Confirm Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
