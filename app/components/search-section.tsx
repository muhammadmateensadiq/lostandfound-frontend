"use client";

import { Search, MapPin } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface Props {
  searchTerm: string;
  setSearchTerm: (value: string) => void;

  location: string;
  setLocation: (value: string) => void;

  onSearch: () => void;
}

export function SearchSection({
  searchTerm,
  setSearchTerm,
  location,
  setLocation,
  onSearch,
}: Props) {
  return (
    <section className="py-3">
      <div className="container mx-auto px-4">
        <div className="bg-white-50 rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="grid md:grid-cols-4 gap-4">

            {/* search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                <Input
                  placeholder="Search items..."
                  className="pl-10 bg-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* location */}
            <div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                <Input
                  placeholder="Location"
                  className="pl-10 bg-white"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            {/* button */}
            <div>
              <Button
                onClick={onSearch}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Search
              </Button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}