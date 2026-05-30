"use client";

import { useParams, useRouter } from "next/navigation";
import { ItemDetailPage } from "@/app/components/item-detail-page";

export default function Page() {
  const params = useParams();
  const router = useRouter();

  return (
    <ItemDetailPage
      itemId={Number(params.id)}   
      onBack={() => router.back()}
    />
  );
}