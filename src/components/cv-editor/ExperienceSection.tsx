import React, { useState } from "react";
import { ChevronDown, ChevronUp, Info, Plus, Search } from "lucide-react";
import { Project, FormMode } from "./types";
import ProjectCard from "./ProjectCard";
import ManualProjectForm from "./ManualProjectForm";

interface ExperienceSectionProps {
  projects: Project[];
  onProjectsChange: (projects: Project[]) => void;
  onShowSuccess: (msg: string) => void;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  projects,
  onProjectsChange,
  onShowSuccess,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [formMode, setFormMode] = useState<FormMode>("create");
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleAddManual = () => {
    setDropdownOpen(false);
    setFormMode("create");
    setEditingProject(null);
    setFormVisible(true);
  };

  const handleEdit = (project: Project) => {
    setFormMode("edit");
    setEditingProject(project);
    setFormVisible(true);
    // Scroll to form
    setTimeout(() => {
      document.getElementById("manual-form")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleDelete = (id: string) => {
    onProjectsChange(projects.filter((p) => p.id !== id));
    onShowSuccess("Project deleted successfully.");
  };

  const handleSave = (data: Omit<Project, "id">) => {
    if (formMode === "edit" && editingProject) {
      onProjectsChange(
        projects.map((p) =>
          p.id === editingProject.id ? { ...data, id: editingProject.id } : p
        )
      );
      onShowSuccess("Manual project updated successfully.");
    } else {
      const newProject: Project = {
        ...data,
        id: `manual-${Date.now()}`,
      };
      onProjectsChange([...projects, newProject]);
      onShowSuccess("Manual project saved successfully.");
    }
    setFormVisible(false);
    setEditingProject(null);
  };

  const handleCancel = () => {
    setFormVisible(false);
    setEditingProject(null);
  };

  return (
    <div
      className="rounded-xl border"
      style={{ borderColor: "#E5E7EB", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Section Header */}
      <div
        className="flex items-center justify-between px-5 py-4 cursor-pointer select-none rounded-t-xl"
        style={{ backgroundColor: "#FFFFFF" }}
        onClick={() => setCollapsed(!collapsed)}
      >
        <div className="flex items-center gap-2">
          {collapsed ? (
            <ChevronDown size={18} className="text-gray-500" />
          ) : (
            <ChevronUp size={18} className="text-gray-500" />
          )}
          <h2
            className="text-lg font-bold"
            style={{ color: "#111827" }}
          >
            Experience
          </h2>
          <button
            onClick={(e) => e.stopPropagation()}
            title="Experience section includes work projects and manual entries"
          >
            <Info size={15} style={{ color: "#9AA3B2" }} />
          </button>
        </div>
      </div>

      {!collapsed && (
        <div className="px-5 pb-5 pt-4 space-y-2 rounded-b-xl border-t" style={{ backgroundColor: "#F7F8FA", borderColor: "#E5E7EB" }}>
          {/* Project cards */}
          {projects.length === 0 && !formVisible && (
            <div className="py-8 text-center">
              <p className="text-sm" style={{ color: "#9AA3B2" }}>
                No projects added yet. Add your first project below.
              </p>
            </div>
          )}

          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}

          {/* Manual Project Form */}
          {formVisible && (
            <div id="manual-form">
              <ManualProjectForm
                mode={formMode}
                initialData={editingProject}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            </div>
          )}

          {/* Add Related Project Button */}
          {!formVisible && (
            <div className="relative pt-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdownOpen(!dropdownOpen);
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-md transition-all hover:bg-white"
                style={{
                  borderColor: "#DDE1EA",
                  color: "#374151",
                  backgroundColor: "transparent",
                }}
              >
                <Plus size={15} />
                Add Related Project
                <ChevronDown size={13} className="ml-1" />
              </button>

              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div
                    className="absolute left-0 top-full mt-1 w-72 rounded-lg border shadow-lg z-20 overflow-hidden"
                    style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" }}
                  >
                    {/* Primary option */}
                    <button
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-start gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100"
                    >
                      <Search size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-800">Search catalog</span>
                          <span
                            className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                            style={{ backgroundColor: "#E6F4EA", color: "#1E7E34" }}
                          >
                            Recommended
                          </span>
                        </div>
                        <p className="text-xs mt-0.5" style={{ color: "#9AA3B2" }}>
                          Find company or client projects
                        </p>
                      </div>
                    </button>

                    {/* Divider + hint */}
                    <div className="px-4 pt-2.5 pb-1">
                      <p className="text-[11px] font-medium uppercase tracking-wide" style={{ color: "#C0C6D4" }}>
                        Not in the catalog?
                      </p>
                    </div>

                    {/* Manual option */}
                    <button
                      onClick={handleAddManual}
                      className="flex items-start gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Plus size={14} style={{ color: "#E8364F" }} className="mt-0.5 flex-shrink-0" />
                      <div className="text-left">
                        <span className="font-medium text-gray-800">Add manual project</span>
                        <p className="text-xs mt-0.5" style={{ color: "#9AA3B2" }}>
                          For personal, pet, or training projects only
                        </p>
                      </div>
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExperienceSection;
