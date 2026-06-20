"use client";

import { LostItemsPage } from "../components/lost-items-page";

export default function LostItems() {
  return (
    <>
      <LostItemsPage onItemClick={() => console.log("clicked")} />
    </>
  );
}
