"use client";

import { LostItemsPage } from "../components/lost-items-page";
// import "../index.css";

export default function LostItems() {
  return (
    <>
      <LostItemsPage onItemClick={() => console.log("clicked")} />
    </>
  );
}
