"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  HardDrive, RefreshCw, Unplug, TestTube2, ExternalLink,
  CheckCircle2, XCircle, AlertTriangle, Mail, Clock,
  Upload, Activity, Shield, Loader2, Plug,
} from "lucide-react";
import { ConnectionStatusBadge } from "./ConnectionStatusBadge";
import { Button } from "@/components/ui/button";

/**
 * StorageSettingsPanel
 * 
 * Full client-side Storage Settings dashboard for Super Admins.
 * Displays connection health, account info, last activity, and action buttons.
 * Reads initial status from the server and provides action buttons that call API routes.
 */
export function StorageSettingsPanel({ isSuperAdmin, initialStatus = null }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(!initialStatus);
  const [actionLoading, setActionLoading] = useState(null); // "test" | "disconnect"
  const [toast, setToast] = useState(null); // { type: "success"|"error", message }

  // Handle redirect params from OAuth callback
  useEffect(() => {
    const connected = searchParams.get("connected");
    const error = searchParams.get("error");
    const email = searchParams.get("email");

    if (connected === "true") {
      showToast("success", `Google Drive connected successfully${email ? ` as ${email}` : ""}!`);
      fetchStatus();
      // Clean URL
      router.replace("/admin/settings/storage");
    } else if (error) {
      const msg = decodeURIComponent(error);
      showToast("error", msg === "access_denied" ? "Google Drive connection was cancelled." : `Connection failed: ${msg}`);
      router.replace("/admin/settings/storage");
    }
  }, [searchParams]);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  };

  const fetchStatus = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/storage/oauth/status");
      const json = await res.json();
      if (json.success) setStatus(json.data);
    } catch (e) {
      console.error("Failed to fetch storage status:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!initialStatus) fetchStatus();
  }, []);

  const handleConnect = () => {
    window.location.href = "/api/storage/oauth/connect";
  };

  const handleDisconnect = async () => {
    if (!confirm("Are you sure you want to disconnect Google Drive? Uploads will stop working until reconnected.")) return;
    setActionLoading("disconnect");
    try {
      const res = await fetch("/api/storage/oauth/disconnect", { method: "POST" });
      const json = await res.json();
      if (json.success) {
        showToast("success", "Google Drive disconnected.");
        fetchStatus();
      } else {
        showToast("error", json.message || "Failed to disconnect.");
      }
    } catch (e) {
      showToast("error", "Network error. Please try again.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleTest = async () => {
    setActionLoading("test");
    try {
      const res = await fetch("/api/storage/oauth/test", { method: "POST" });
      const json = await res.json();
      if (json.success) {
        showToast("success", "✓ Connection test passed! Upload and delete permissions verified.");
        fetchStatus();
      } else {
        showToast("error", json.message || "Test failed.");
      }
    } catch (e) {
      showToast("error", "Network error. Please try again.");
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "Never";
    return new Date(dateStr).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const formatBytes = (bytes) => {
    if (!bytes) return "—";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 max-w-md px-5 py-4 rounded-xl shadow-2xl border flex items-start gap-3 transition-all ${
          toast.type === "success"
            ? "bg-emerald-50 dark:bg-emerald-900/80 border-emerald-200 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200"
            : "bg-red-50 dark:bg-red-900/80 border-red-200 dark:border-red-700 text-red-800 dark:text-red-200"
        }`}>
          {toast.type === "success"
            ? <CheckCircle2 className="shrink-0 mt-0.5" size={18} />
            : <XCircle className="shrink-0 mt-0.5" size={18} />}
          <p className="text-sm font-medium">{toast.message}</p>
        </div>
      )}

      {/* Header Card */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-600 rounded-xl shadow">
                <HardDrive className="text-white" size={22} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Google Drive Storage
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Organization-wide cloud storage provider
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {loading ? (
                <ConnectionStatusBadge isConnected={null} />
              ) : (
                <ConnectionStatusBadge isConnected={status?.isConnected} />
              )}
              <Button
                variant="outline" size="crm-primary"
                size="sm"
                onClick={fetchStatus}
                disabled={loading}
                className="h-8"
              >
                <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              </Button>
            </div>
          </div>
        </div>

        {/* Status Grid */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatusRow
            icon={<Mail size={16} />}
            label="Connected Account"
            value={status?.connectedEmail || "—"}
            loading={loading}
          />
          <StatusRow
            icon={<Shield size={16} />}
            label="Connected By"
            value={status?.connectedBy?.name || "—"}
            loading={loading}
          />
          <StatusRow
            icon={<Clock size={16} />}
            label="Connected On"
            value={formatDate(status?.connectedAt)}
            loading={loading}
          />
          <StatusRow
            icon={<Upload size={16} />}
            label="Last Upload"
            value={formatDate(status?.lastUploadAt)}
            loading={loading}
          />
          <StatusRow
            icon={<TestTube2 size={16} />}
            label="Last Test"
            value={formatDate(status?.lastTestAt)}
            loading={loading}
          />
          <StatusRow
            icon={<Activity size={16} />}
            label="Total Uploads"
            value={status?.totalUploads != null ? status.totalUploads.toLocaleString() : "—"}
            loading={loading}
          />
        </div>

        {/* Last Error */}
        {status?.lastError && (
          <div className="mx-6 mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl flex items-start gap-3">
            <AlertTriangle size={16} className="text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-700 dark:text-red-400">Last Error</p>
              <p className="text-xs text-red-600 dark:text-red-500 mt-0.5">{status.lastError}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {isSuperAdmin && (
          <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
            <div className="flex flex-wrap gap-3">
              {!status?.isConnected ? (
                <Button
                  onClick={handleConnect}
                  className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
                  disabled={loading}
                >
                  <Plug size={15} />
                  Connect Google Drive
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleConnect}
                    variant="outline" size="crm-primary"
                    className="gap-2"
                    disabled={!!actionLoading}
                  >
                    <RefreshCw size={15} />
                    Reconnect
                  </Button>
                  <Button
                    onClick={handleTest}
                    variant="outline" size="crm-primary"
                    className="gap-2"
                    disabled={!!actionLoading}
                  >
                    {actionLoading === "test"
                      ? <Loader2 size={15} className="animate-spin" />
                      : <TestTube2 size={15} />}
                    Test Connection
                  </Button>
                  <a
                    href={`https://drive.google.com/drive/folders/${process.env.NEXT_PUBLIC_GOOGLE_DRIVE_ROOT_FOLDER_ID || ""}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <ExternalLink size={15} />
                    Open Drive Folder
                  </a>
                  <Button
                    onClick={handleDisconnect}
                    variant="outline" size="crm-primary"
                    className="gap-2 text-red-600 hover:text-red-700 border-red-200 hover:border-red-300 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/20 ml-auto"
                    disabled={!!actionLoading}
                  >
                    {actionLoading === "disconnect"
                      ? <Loader2 size={15} className="animate-spin" />
                      : <Unplug size={15} />}
                    Disconnect
                  </Button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Non-super admin notice */}
        {!isSuperAdmin && (
          <div className="px-6 pb-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <Shield size={14} />
              Only Super Admins can connect or disconnect Google Drive.
            </p>
          </div>
        )}
      </div>

      {/* Provider Info Card */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Storage Architecture</h3>
        <div className="grid sm:grid-cols-3 gap-4 text-sm">
          <ArchRow label="Provider" value="Google Drive API v3" />
          <ArchRow label="Auth" value="OAuth 2.0 (Organization Account)" />
          <ArchRow label="Token Security" value="AES-256-GCM Encrypted" />
          <ArchRow label="Upload Access" value="All Authenticated CRM Users" />
          <ArchRow label="Connection Setup" value="Super Admin Only (Once)" />
          <ArchRow label="Folder Strategy" value="Auto-created Subfolders" />
        </div>
      </div>
    </div>
  );
}

function StatusRow({ icon, label, value, loading }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
      <span className="text-gray-400 dark:text-gray-500 mt-0.5">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5">
          {label}
        </p>
        {loading ? (
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        ) : (
          <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{value}</p>
        )}
      </div>
    </div>
  );
}

function ArchRow({ label, value }) {
  return (
    <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{value}</p>
    </div>
  );
}
