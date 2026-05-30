"use client";

import { useRouter, useParams } from "next/navigation";
import { PostItemPage } from "@/app/components/post-item-page";

export default function EditPage() {
  const router = useRouter();
  const params = useParams();

  return (
    <PostItemPage
      itemId={params.id as string}
      isEdit={true}
      onSuccess={() => router.push("/dashboard")}
    />
  );
}