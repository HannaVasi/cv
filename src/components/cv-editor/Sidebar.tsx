import React from "react";
import {
  User,
  Users,
  GitBranch,
  Star,
  Bell,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { icon: User, label: "My Profile", active: true },
  { icon: Users, label: "Colleagues", active: false },
  { icon: GitBranch, label: "Org Chart", active: false },
  { icon: Star, label: "Grades", active: false },
  { icon: Bell, label: "Reminders", active: false },
];

const Sidebar: React.FC = () => {
  return (
    <div
      className="flex flex-col h-full w-[210px] min-w-[210px]"
      style={{ backgroundColor: "#1E2130" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
        <div
          className="flex items-center justify-center w-8 h-8 rounded font-black text-white text-lg"
          style={{ backgroundColor: "#E8364F" }}
        >
          N
        </div>
        <span
          className="text-white font-bold text-lg tracking-tight"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          nexaNEXT
        </span>
      </div>

      {/* Section label */}
      <div className="px-5 pt-5 pb-2">
        <span
          className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: "#6B7280" }}
        >
          Talents
        </span>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-1 px-3 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium w-full text-left transition-all relative ${
                item.active
                  ? "text-white bg-white/10"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {item.active && (
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r"
                  style={{ backgroundColor: "#E8364F" }}
                />
              )}
              <Icon size={16} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Bottom user info */}
      <div className="px-4 py-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gray-600 flex items-center justify-center">
            <User size={14} className="text-gray-300" />
          </div>
          <div className="flex-1 min-w-0">
            <div
              className="text-xs text-gray-400 truncate"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Anna Johnson
            </div>
          </div>
          <ChevronRight size={14} className="text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
