"use client";

import { useRouter } from "next/navigation";
import { SignupPage as SignupForm } from "../components/signup-page";
// import "../index.css";

export default function Page() {
  const router = useRouter();

  return (
    <SignupForm
      onBack={() => router.back()}
    />
  );
}
