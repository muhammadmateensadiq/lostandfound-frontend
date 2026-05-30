"use client";

import { FoundItemsPage } from "../components/found-items-page";
// import "../index.css";

export default function LostItems() {
  return (
    <>
      <FoundItemsPage onItemClick={() => console.log("clicked")} />
    </>
  );
}
