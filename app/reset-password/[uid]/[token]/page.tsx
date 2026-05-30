"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Search, Lock } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const params = useParams();

  const router = useRouter();

  const uid = params.uid as string;
  const token = params.token as string;

  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrors([]);

    try {
      await api.post("/accounts/auth/password-reset-confirm/", {
        uid,
        token,
        password,
      });

      setStatus("success");

      setTimeout(() => {
        router.push("/signin");
      }, 1500);

    } catch (err: any) {
      const data = err.response?.data?.error;

      if (Array.isArray(data)) {
        setErrors(data);
      } else {
        setErrors([data || "Something went wrong"]);
      }

      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg border border-gray-250 shadow-lg p-8">

          {/* Header (same as Signin) */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Search className="w-8 h-8 text-blue-600" />
            <span className="text-blue-600">FindIt</span>
          </div>

          <h2 className="text-center mb-2 text-gray-900">
            Reset Password
          </h2>

          <p className="text-center text-gray-600 mb-6">
            Enter a new secure password
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Password */}
            <div>
              <Label htmlFor="password">New Password</Label>

              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Error box */}
            {status === "error" && errors.length > 0 && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md text-sm space-y-1">
                {errors.map((err, i) => (
                  <p key={i}>• {err}</p>
                ))}
              </div>
            )}

            {/* Success */}
            {status === "success" && (
              <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-md text-sm">
                Password reset successful. You can now sign in.
              </div>
            )}

            {/* Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}