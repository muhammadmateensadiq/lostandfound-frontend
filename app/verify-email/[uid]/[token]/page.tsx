"use client";

import { useEffect, useState, use } from "react";
import api from "@/lib/api";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

type Params = {
  uid: string;
  token: string;
};

export default function VerifyEmail({
  params,
}: {
  params: Promise<Params>;
}) {
  const { uid, token } = use(params);

  const [status, setStatus] = useState<
    "loading" | "success" | "error"
  >("loading");

  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    const verify = async () => {
      try {
        await api.get(
          `/accounts/auth/verify-email/${uid}/${token}/`
        );

        setStatus("success");
        setMessage("Email verified successfully!");
      } catch {
        setStatus("error");
        setMessage("Invalid or expired link");
      }
    };

    verify();
  }, [uid, token]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 text-center shadow-sm">

        {/* Icon */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
          {status === "loading" && (
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          )}

          {status === "success" && (
            <CheckCircle2 className="h-7 w-7 text-green-500 animate-in fade-in zoom-in" />
          )}

          {status === "error" && (
            <XCircle className="h-7 w-7 text-red-500 animate-in fade-in zoom-in" />
          )}
        </div>

        {/* Title */}
        <h1 className="text-xl font-semibold text-foreground">
          {status === "loading" && "Verifying Email"}
          {status === "success" && "Success"}
          {status === "error" && "Verification Failed"}
        </h1>

        {/* Message */}
        <p className="mt-2 text-sm text-muted-foreground">
          {message}
        </p>

        {/* Button */}
        {status !== "loading" && (
          <a
            href="/signin"
            className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Go to Sign In
          </a>
        )}
      </div>
    </div>
  );
}