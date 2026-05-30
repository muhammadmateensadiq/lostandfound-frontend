"use client";

import { useRouter } from "next/navigation";
import { PostItemPage } from "../components/post-item-page";
// import "../index.css";

export default function Page() {
  const router = useRouter();

  return (
    <PostItemPage
      onSuccess={() => {
        // later: save item to backend here
        router.push("/dashboard");
      }}
    />
  );
}
