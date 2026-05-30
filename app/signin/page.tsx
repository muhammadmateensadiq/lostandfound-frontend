"use client";

import { useRouter } from "next/navigation";
import { SigninPage as SigninForm } from "../components/signin-page";
// import "../index.css";

export default function Page() {
  const router = useRouter();

  return (
    <SigninForm
      onBack={() => router.back()}
      onSignupClick={() => router.push("/signup")}
      onSignIn={() => router.push("/dashboard")}
    />
  );
}
