"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Mail, Loader2, AlertCircle } from "lucide-react";
import Image from "next/image";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError(res.error);
        setLoading(false);
      } else {
        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-900 flex items-center justify-center p-6 transition-colors">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-8 sm:p-12 text-center">
          
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 bg-[#1546B0] rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
              <Lock className="h-8 w-8 text-white -rotate-3" />
            </div>
          </div>
          
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">NYFN Gandaki</h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium mb-8">Admin Portal Login</p>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-3 text-left">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input 
                  type="email" 
                  placeholder="Admin Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-14 bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 rounded-xl focus-visible:ring-[#1546B0] dark:focus-visible:ring-blue-500 text-base"
                  required
                />
              </div>
            </div>
            <div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input 
                  type="password" 
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 h-14 bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 rounded-xl focus-visible:ring-[#1546B0] dark:focus-visible:ring-blue-500 text-base"
                  required
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-14 bg-[#1546B0] hover:bg-[#0D2E78] text-white rounded-xl text-base font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Secure Login"
              )}
            </Button>
          </form>

        </div>
        
        <div className="bg-gray-50 dark:bg-gray-900/50 p-6 text-center border-t border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Unauthorized access is strictly prohibited.
          </p>
        </div>
      </div>
    </div>
  );
}
