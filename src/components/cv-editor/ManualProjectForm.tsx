import React, { useState, useEffect, useRef } from "react";
import { X, Info, Calendar, Maximize2, AlertCircle } from "lucide-react";
import { Project, FormErrors, FormMode } from "./types";

const CATALOG_PROJECTS = [
  "EliNext",
  "EliNext.Payroll Management",
  "Eli eCommerce",
  "EliNext Healthcare",
  "EliNext CRM",
];

interface ManualProjectFormProps {
  mode: FormMode;
  initialData?: Project | null;
  onSave: (project: Omit<Project, "id">) => void;
  onCancel: () => void;
}

const ManualProjectForm: React.FC<ManualProjectFormProps> = ({
  mode,
  initialData,
  onSave,
  onCancel,
}) => {
  const [projectName, setProjectName] = useState(
    initialData?.projectName || ""
  );
  const [anonymizedName, setAnonymizedName] = useState(
    initialData?.anonymizedProjectName || ""
  );
  const [startDate, setStartDate] = useState(initialData?.startDate || "");
  const [endDate, setEndDate] = useState(initialData?.endDate || "");
  const [untilNow, setUntilNow] = useState(initialData?.untilNow || false);
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [responsibilities, setResponsibilities] = useState(
    initialData?.responsibilities || ""
  );
  const [technologies, setTechnologies] = useState(
    initialData?.technologies || ""
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [catalogConflict, setCatalogConflict] = useState(false);
  const [techInput, setTechInput] = useState("");
  const [techTags, setTechTags] = useState<string[]>(
    initialData?.technologies
      ? initialData.technologies.split(",").map((t) => t.trim()).filter(Boolean)
      : []
  );

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Catalog conflict detection with debounce
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!projectName.trim()) {
      setCatalogConflict(false);
      return;
    }
    debounceRef.current = setTimeout(() => {
      const match = CATALOG_PROJECTS.some((p) =>
        p.toLowerCase().includes(projectName.toLowerCase()) ||
        projectName.toLowerCase().includes(p.toLowerCase().substring(0, 5))
      );
      setCatalogConflict(match && projectName.length > 3);
    }, 500);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [projectName]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!projectName.trim()) newErrors.projectName = "Project name is required.";
    if (!startDate) newErrors.startDate = "Start date is required.";
    if (!untilNow && !endDate) newErrors.endDate = "End date is required.";
    if (!description.trim()) newErrors.description = "Project description is required.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      // Scroll to first error
      const firstErrorEl = formRef.current?.querySelector("[data-error='true']");
      firstErrorEl?.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave({
      projectName,
      anonymizedProjectName: anonymizedName,
      startDate,
      endDate: untilNow ? undefined : endDate,
      untilNow,
      description,
      responsibilities,
      technologies: techTags.join(", "),
      is_manual: true,
    });
  };

  const addTechTag = () => {
    const val = techInput.trim();
    if (val && !techTags.includes(val)) {
      setTechTags([...techTags, val]);
    }
    setTechInput("");
  };

  const removeTechTag = (tag: string) => {
    setTechTags(techTags.filter((t) => t !== tag));
  };

  const handleTechKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTechTag();
    } else if (e.key === "Backspace" && !techInput && techTags.length > 0) {
      setTechTags(techTags.slice(0, -1));
    }
  };

  const inputClass = (hasError?: boolean) =>
    `w-full px-3 py-2 text-sm rounded-md border outline-none transition-all ${
      hasError
        ? "border-red-500 focus:ring-2 focus:ring-red-200"
        : "border-gray-300 focus:border-[#E8364F] focus:ring-2 focus:ring-[#E8364F]/20"
    }`;

  return (
    <div
      ref={formRef}
      className="border rounded-xl overflow-hidden"
      style={{
        borderColor: "#DDE1EA",
        backgroundColor: "#FAFBFC",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        animation: "slideDown 150ms ease-out",
      }}
    >
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Form header */}
      <div
        className="flex items-center justify-between px-6 py-4 border-b"
        style={{ borderColor: "#DDE1EA", backgroundColor: "#FFFFFF" }}
      >
        <div>
          <h3 className="text-base font-700 text-gray-900 font-bold">
            {mode === "edit" ? "Edit Manual Project" : "Add Manual Project"}
          </h3>
          <p className="text-xs mt-0.5" style={{ color: "#9AA3B2" }}>
            This project will be marked as a manual entry
          </p>
        </div>
        <button
          onClick={onCancel}
          className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Form body */}
      <div className="p-6 space-y-5">
        {/* Row 1: Project Name + Anonymized Name */}
        <div className="grid grid-cols-2 gap-4">
          {/* Project Name */}
          <div data-error={!!errors.projectName}>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Project Name{" "}
              <span style={{ color: "#E8364F" }}>*</span>
            </label>
            <input
              type="text"
              placeholder="Enter project name"
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
                if (errors.projectName) setErrors((p) => ({ ...p, projectName: undefined }));
              }}
              className={inputClass(!!errors.projectName)}
            />
            {errors.projectName && (
              <p className="mt-1 text-xs flex items-center gap-1" style={{ color: "#E8364F" }}>
                <AlertCircle size={12} />
                {errors.projectName}
              </p>
            )}
            {/* Catalog conflict hint */}
            {catalogConflict && !errors.projectName && (
              <div
                className="mt-2 flex items-start gap-2 px-3 py-2.5 rounded-md border-l-4 text-xs"
                style={{
                  backgroundColor: "#FFF8E6",
                  borderLeftColor: "#F5A623",
                  color: "#92400E",
                }}
              >
                <Info size={13} className="flex-shrink-0 mt-0.5" style={{ color: "#F5A623" }} />
                <span>
                  A project with this name exists in the catalog. Did you mean to select it?{" "}
                  <button
                    className="underline font-medium hover:no-underline"
                    style={{ color: "#D97706" }}
                  >
                    View catalog entry
                  </button>
                </span>
              </div>
            )}
          </div>

          {/* Anonymized Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Anonymized Project Name{" "}
              <span className="text-xs font-normal ml-1" style={{ color: "#9AA3B2" }}>
                (optional)
              </span>
              <button className="ml-1.5 inline-flex" title="The anonymized name is shown in anonymous CV exports">
                <Info size={13} style={{ color: "#9AA3B2" }} />
              </button>
            </label>
            <input
              type="text"
              placeholder="Enter anonymized name"
              value={anonymizedName}
              onChange={(e) => setAnonymizedName(e.target.value)}
              className={inputClass()}
            />
          </div>
        </div>

        {/* Row 2: Start Date + End Date + Until Now */}
        <div className="flex items-end gap-4">
          {/* Start Date */}
          <div className="flex-1" data-error={!!errors.startDate}>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Start Date{" "}
              <span style={{ color: "#E8364F" }}>*</span>
            </label>
            <div className="relative">
              <Calendar
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "#9AA3B2" }}
              />
              <input
                type="month"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  if (errors.startDate) setErrors((p) => ({ ...p, startDate: undefined }));
                }}
                className={`${inputClass(!!errors.startDate)} pl-9`}
              />
            </div>
            {errors.startDate && (
              <p className="mt-1 text-xs flex items-center gap-1" style={{ color: "#E8364F" }}>
                <AlertCircle size={12} />
                {errors.startDate}
              </p>
            )}
          </div>

          {/* End Date */}
          <div className="flex-1" data-error={!!errors.endDate}>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              End Date{" "}
              <span style={{ color: "#E8364F" }}>*</span>
            </label>
            <div className="relative">
              <Calendar
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: untilNow ? "#C9CDD6" : "#9AA3B2" }}
              />
              <input
                type="month"
                value={endDate}
                disabled={untilNow}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  if (errors.endDate) setErrors((p) => ({ ...p, endDate: undefined }));
                }}
                className={`${inputClass(!!errors.endDate && !untilNow)} pl-9 ${
                  untilNow ? "bg-gray-50 text-gray-400 cursor-not-allowed" : ""
                }`}
              />
            </div>
            {errors.endDate && !untilNow && (
              <p className="mt-1 text-xs flex items-center gap-1" style={{ color: "#E8364F" }}>
                <AlertCircle size={12} />
                {errors.endDate}
              </p>
            )}
          </div>

          {/* Until Now checkbox */}
          <div className="flex items-center gap-2 pb-2.5">
            <input
              type="checkbox"
              id="untilNow"
              checked={untilNow}
              onChange={(e) => {
                setUntilNow(e.target.checked);
                if (e.target.checked && errors.endDate) {
                  setErrors((p) => ({ ...p, endDate: undefined }));
                }
              }}
              className="w-4 h-4 rounded cursor-pointer accent-[#E8364F]"
            />
            <label
              htmlFor="untilNow"
              className="text-sm font-medium text-gray-700 cursor-pointer select-none"
            >
              Until Now
            </label>
          </div>
        </div>

        {/* Project Description */}
        <div data-error={!!errors.description}>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Project Description{" "}
            <span style={{ color: "#E8364F" }}>*</span>
            <button className="ml-1.5 inline-flex" title="Describe the project goals and outcomes">
              <Info size={13} style={{ color: "#9AA3B2" }} />
            </button>
          </label>
          <div className="relative">
            <textarea
              rows={4}
              placeholder="Describe the project, its goals, and your role..."
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description) setErrors((p) => ({ ...p, description: undefined }));
              }}
              className={`${inputClass(!!errors.description)} resize-none`}
            />
            <button
              className="absolute bottom-2 right-2 p-1 rounded hover:bg-gray-100 text-gray-400 transition-colors"
              title="Expand"
            >
              <Maximize2 size={13} />
            </button>
          </div>
          {errors.description && (
            <p className="mt-1 text-xs flex items-center gap-1" style={{ color: "#E8364F" }}>
              <AlertCircle size={12} />
              {errors.description}
            </p>
          )}
        </div>

        {/* Responsibilities */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Responsibilities{" "}
            <span className="text-xs font-normal ml-1" style={{ color: "#9AA3B2" }}>
              (optional)
            </span>
          </label>
          <textarea
            rows={3}
            placeholder="Describe your key responsibilities on this project..."
            value={responsibilities}
            onChange={(e) => setResponsibilities(e.target.value)}
            className={`${inputClass()} resize-none`}
          />
        </div>

        {/* Technologies */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Used Frameworks &amp; Technologies{" "}
            <span className="text-xs font-normal ml-1" style={{ color: "#9AA3B2" }}>
              (optional)
            </span>
          </label>
          <div
            className="flex flex-wrap gap-1.5 items-center min-h-[42px] px-3 py-2 rounded-md border border-gray-300 focus-within:border-[#E8364F] focus-within:ring-2 focus-within:ring-[#E8364F]/20 bg-white transition-all cursor-text"
            onClick={() => document.getElementById("tech-input")?.focus()}
          >
            {techTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                style={{ backgroundColor: "#EFF0F3", color: "#374151" }}
              >
                {tag}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTechTag(tag);
                  }}
                  className="hover:text-red-500 transition-colors"
                >
                  <X size={10} />
                </button>
              </span>
            ))}
            <input
              id="tech-input"
              type="text"
              placeholder={techTags.length === 0 ? "Type and press Enter to add (e.g., React, Node.js)" : ""}
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={handleTechKeyDown}
              onBlur={addTechTag}
              className="flex-1 min-w-[120px] text-sm outline-none bg-transparent placeholder-gray-400"
            />
          </div>
          <p className="mt-1 text-xs" style={{ color: "#9AA3B2" }}>
            Press Enter or comma to add a technology tag
          </p>
        </div>
      </div>

      {/* Form footer */}
      <div
        className="flex items-center justify-end gap-3 px-6 py-4 border-t"
        style={{ borderColor: "#DDE1EA", backgroundColor: "#FFFFFF" }}
      >
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-5 py-2 text-sm font-semibold text-white rounded-md transition-all active:scale-[0.97] hover:opacity-90"
          style={{ backgroundColor: "#E8364F" }}
        >
          {mode === "edit" ? "Update Project" : "Save Project"}
        </button>
      </div>
    </div>
  );
};

export default ManualProjectForm;
