export default function RegistrationForm() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
      <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">Registration Form</h3>
      <div className="space-y-4">
        <input type="text" placeholder="Full Name" className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent" />
        <input type="email" placeholder="Email Address" className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent" />
        <button className="w-full py-3 bg-[#1546B0] text-white rounded-lg font-bold">Submit Registration</button>
      </div>
    </div>
  );
}
