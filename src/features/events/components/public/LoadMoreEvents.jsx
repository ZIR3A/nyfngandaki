"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import EventCard from "./EventCard";

export default function LoadMoreEvents({ 
  initialPage = 1, 
  totalPages = 1, 
  searchParams, 
  locale 
}) {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialPage < totalPages);

  // When searchParams change from parent (URL change), this component unmounts/remounts 
  // or we could listen to searchParams changes, but typically Next.js server components
  // will re-render the parent, passing a new `key` to this component if we set it up right,
  // effectively resetting the state.

  const loadMore = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    const nextPage = page + 1;
    
    try {
      const params = new URLSearchParams(searchParams);
      params.set("page", nextPage);
      params.set("limit", 6); // Grid limit

      // Fetch from our public API
      const res = await fetch(`/api/events?${params.toString()}`);
      const data = await res.json();
      
      if (data.success) {
        setEvents(prev => [...prev, ...data.data.events]);
        setPage(nextPage);
        setHasMore(nextPage < data.data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Failed to load more events:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!hasMore && events.length === 0) return null;

  return (
    <>
      {events.map((event) => (
        <EventCard key={event._id} event={event} locale={locale} />
      ))}
      
      {hasMore && (
        <div className="col-span-full flex justify-center mt-12">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-8 py-3 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-50 flex items-center"
          >
            {loading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
            {locale === "np" ? "थप हेर्नुहोस्" : "Load More"}
          </button>
        </div>
      )}
    </>
  );
}
