"use client";

import { FoundItemsPage } from "../components/found-items-page";

export default function LostItems() {
  return (
    <>
      <FoundItemsPage onItemClick={() => console.log("clicked")} />
    </>
  );
}
