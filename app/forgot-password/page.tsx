"use client";

import { useState } from "react";
import { Search, Mail } from "lucide-react";
import Link from "next/link";

import api from "@/lib/api";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await api.post("/accounts/auth/password-reset/", { email });
      setStatus("sent");
    } catch {
      setStatus("sent"); // don't reveal if email exists
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg border border-gray-250 shadow-lg p-8">
          
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Search className="w-8 h-8 text-blue-600" />
            <span className="text-blue-600 font-semibold text-xl">
              FindIt
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-center text-2xl font-semibold mb-2 text-gray-900">
            Forgot Password
          </h2>

          <p className="text-center text-gray-600 mb-6">
            Enter your email to receive a password reset link
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>

              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {status === "loading"
                ? "Sending..."
                : "Send Reset Link"}
            </Button>

            {status === "sent" && (
              <p className="text-sm text-green-600 text-center">
                If the email exists, a reset link has been sent.
              </p>
            )}
          </form>

          {/* Back to Sign In */}
          <div className="mt-6 text-center">
            <Link
              href="/signin"
              className="text-blue-600 hover:underline"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}