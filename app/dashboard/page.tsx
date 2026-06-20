"use client";

import { useRouter } from "next/navigation";
import { UserDashboard } from "../components/user-dashboard";

export default function Page() {
  const router = useRouter();

  return (
    <UserDashboard />
  );
}
