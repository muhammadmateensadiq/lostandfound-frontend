"use client";

import { useRouter } from "next/navigation";
import { UserDashboard } from "../components/user-dashboard";
// import "../index.css";

export default function Page() {
  const router = useRouter();

  return (
    <UserDashboard
      onSignOut={() => {
        // later: clear auth / session here
        router.push("/signin");
      }}
    />
  );
}
