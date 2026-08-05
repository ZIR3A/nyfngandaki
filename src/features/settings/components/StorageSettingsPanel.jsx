"use client";

import React, { useState, useEffect } from "react";
import { HardDrive, CheckCircle, XCircle, LogOut, RefreshCw, AlertCircle } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export const StorageSettingsPanel = () => {
  const [status, setStatus] = useState({
    loading: true,
    connected: false,
    email: null,
    connectedAt: null,
  });
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // Check for success or error flags in URL after redirect
    if (searchParams.get("success") === "1") {
      toast.success("Success", { description: "Google Drive connected successfully!" });
      // Clean up URL
      router.replace("/admin/settings/storage");
    } else if (searchParams.get("error")) {
      toast.error("Error", { description: `Failed to connect: ${searchParams.get("error")}` });
      router.replace("/admin/settings/storage");
    }

    fetchStatus();
  }, [searchParams, router]);

  const fetchStatus = async () => {
    try {
      const res = await fetch("/api/storage/oauth/status");
      const data = await res.json();
      setStatus({
        loading: false,
        connected: data.connected,
        email: data.email,
        connectedAt: data.connectedAt,
      });
    } catch (error) {
      console.error("Failed to fetch status", error);
      setStatus((prev) => ({ ...prev, loading: false }));
      toast.error("Error", { description: "Failed to load connection status." });
    }
  };

  const handleConnect = async () => {
    try {
      const res = await fetch("/api/storage/oauth/connect");
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Google Consent Screen
      } else {
        toast.error("Error", { description: "Failed to get connection URL." });
      }
    } catch (error) {
      console.error("Connect error", error);
      toast.error("Error", { description: "Could not initiate connection." });
    }
  };

  const handleDisconnect = async () => {
    if (!confirm("Are you sure you want to disconnect Google Drive? File uploads will stop working until you reconnect.")) return;
    
    setIsDisconnecting(true);
    try {
      const res = await fetch("/api/storage/oauth/disconnect", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        toast.success("Success", { description: "Google Drive disconnected." });
        fetchStatus();
      } else {
        toast.error("Error", { description: data.error || "Failed to disconnect." });
      }
    } catch (error) {
      console.error("Disconnect error", error);
      toast.error("Error", { description: "An error occurred while disconnecting." });
    } finally {
      setIsDisconnecting(false);
    }
  };

  if (status.loading) {
    return (
      <div className="flex items-center justify-center p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
        <RefreshCw className="w-6 h-6 animate-spin text-primary" />
        <span className="ml-3 text-slate-500">Checking Google Drive status...</span>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl">
            <HardDrive className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Google Drive Integration</h2>
            <p className="text-sm text-slate-500">Connect your Google account to store all platform uploads.</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">


        <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Connection Status</span>
              {status.connected ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  <CheckCircle className="w-3 h-3" />
                  Connected
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-300">
                  <XCircle className="w-3 h-3" />
                  Disconnected
                </span>
              )}
            </div>
            {status.connected ? (
              <p className="text-sm text-slate-500">
                Connected to <span className="font-semibold text-slate-900 dark:text-white">{status.email}</span> since {new Date(status.connectedAt).toLocaleDateString()}
              </p>
            ) : (
              <p className="text-sm text-slate-500">
                No Google account connected. Uploads will fail until connected.
              </p>
            )}
          </div>

          <div>
            {status.connected ? (
              <button
                onClick={handleDisconnect}
                disabled={isDisconnecting}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors disabled:opacity-50"
              >
                <LogOut className="w-4 h-4" />
                {isDisconnecting ? "Disconnecting..." : "Disconnect"}
              </button>
            ) : (
              <button
                onClick={handleConnect}
                className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-primary hover:bg-primary-hover rounded-xl transition-colors"
              >
                <HardDrive className="w-4 h-4" />
                Connect Google Drive
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
