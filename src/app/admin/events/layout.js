export const metadata = {
  title: "Events Management | NYFN Gandaki Admin",
  description: "Manage events, registrations, and categories.",
};

export default function AdminEventsLayout({ children }) {
  return (
    <div className="flex flex-col h-full">
      {/* Optional: Events specific secondary navigation could go here */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
