"use client";

import { Button } from "./ui/button";
import { Search, Package } from "lucide-react";

import { useRouter } from "next/navigation";

export function Hero() {

  const router = useRouter();

  return (
    <section
      className="py-20"
      style={{ backgroundColor: "#FCFDFF" }}
    >

      <div className="container mx-auto px-4">

        <div className="max-w-3xl mx-auto text-center">

          <h1 className="font-bold text-blue-600 mb-6">
            Reuniting People with Their Lost Items
          </h1>

          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Every item has a story. Whether you&apos;ve lost
            something precious or found an item that belongs
            to someone else, we&apos;re here to help connect
            them back together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() =>
                router.push("/lost-items")
              }
            >
              <Search className="w-5 h-5 mr-2" />
              I Lost Something
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
              onClick={() =>
                router.push("/found-items")
              }
            >
              <Package className="w-5 h-5 mr-2" />
              I Found Something
            </Button>

          </div>

        </div>

      </div>

      <img
        src="/bg0.jpeg"
        alt="Lost and found"
        className="w-full max-w-384 mx-auto mt-16 object-contain"
      />

    </section>
  );
}