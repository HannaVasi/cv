import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import ExperienceSection from "./ExperienceSection";
import UploadPanel from "./UploadPanel";
import SuccessToast from "./SuccessToast";
import { Project } from "./types";

const INITIAL_PROJECTS: Project[] = [
  {
    id: "1",
    projectName: "Nexa",
    startDate: "2023-11",
    endDate: undefined,
    untilNow: true,
    description:
      "Were/is involved: - in 2 internal projects: ecom (management system) & fintech (ERP) - in 1 discovery: healthcare domain (web application) - in pre-sales with: agtech, construction, ecom, edtech, environmental...",
    responsibilities: "Technical leadership and architecture decisions",
    technologies: "React, TypeScript, Node.js, PostgreSQL",
    is_manual: false,
    company: "Belarus",
  },
  {
    id: "2",
    projectName: "Medical Endoscopy Platform",
    startDate: "2024-09",
    endDate: "2024-10",
    untilNow: false,
    description:
      "An app for managing endoscopy video examinations & reports for hospitals & private practitioners within North America (USA & Canada)",
    responsibilities: "Full-stack development and API integration",
    technologies: "React, Next.js, TypeScript",
    is_manual: false,
  },
  {
    id: "3",
    projectName: "Nexa.Payroll Management",
    startDate: "2023-11",
    endDate: "2024-01",
    untilNow: false,
    description:
      "Bonus web app for employees (management part) including bonuses, vacations, overtimes",
    responsibilities: "Frontend development",
    technologies: "Vue.js, TypeScript",
    is_manual: false,
  },
  {
    id: "4",
    projectName: "Nexa Commerce",
    startDate: "2023-11",
    endDate: undefined,
    untilNow: true,
    description: "ecommerce web platform as pre-built internal product (management part)",
    responsibilities: "Frontend architecture",
    technologies: "React, Redux, Tailwind CSS",
    is_manual: false,
  },
];

const CVEditor: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [toast, setToast] = useState<string | null>(null);

  const showSuccess = (msg: string) => {
    setToast(msg);
  };

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Bar */}
        <TopBar onCancel={() => {}} onSave={() => showSuccess("CV changes saved successfully.")} />

        {/* Content Area */}
        <div
          className="flex flex-1 overflow-hidden"
          style={{ backgroundColor: "#F7F8FA" }}
        >
          {/* Center scrollable area */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-3xl mx-auto px-6 py-6">
              <ExperienceSection
                projects={projects}
                onProjectsChange={setProjects}
                onShowSuccess={showSuccess}
              />
            </div>
          </div>

          {/* Right Panel - Upload */}
          <div
            className="w-72 min-w-[288px] border-l overflow-y-auto p-5"
            style={{ borderColor: "#E5E7EB", backgroundColor: "#FFFFFF" }}
          >
            <UploadPanel />
          </div>
        </div>
      </div>

      {/* Success Toast */}
      {toast && (
        <SuccessToast message={toast} onDismiss={() => setToast(null)} />
      )}
    </div>
  );
};

export default CVEditor;
