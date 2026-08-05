"use client";

export function DashboardUserInfo({ user, role = "Province Administrator" }) {
  const name = user?.name || "Admin User";
  const initials = name.substring(0, 2).toUpperCase();

  return (
    <div className="flex items-center gap-4 mt-2">
      <div className="hidden sm:flex h-12 w-12 rounded-xl bg-gradient-to-br from-[#1546B0] to-[#0D2E78] text-white items-center justify-center font-bold shadow-md uppercase">
        {initials}
      </div>
      <div>
        <h3 className="text-xl font-bold text-[#1546B0] dark:text-blue-400">
          {name}
        </h3>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {role}
        </p>
      </div>
    </div>
  );
}
