export default function EventStatusBadge({ status }) {
  if (!status) return null;

  const styleMap = {
    Upcoming: "bg-blue-600 text-white border-blue-500 shadow-sm",
    Ongoing: "bg-green-600 text-white border-green-500 shadow-sm",
    Completed: "bg-slate-700 text-white border-slate-600 shadow-sm",
    Cancelled: "bg-red-600 text-white border-red-500 shadow-sm",
  };

  const style = styleMap[status] || styleMap.Upcoming;

  return (
    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-sm ${style}`}>
      {status.toUpperCase()}
    </span>
  );
}
