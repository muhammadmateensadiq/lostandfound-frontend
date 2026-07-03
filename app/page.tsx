"use client";

import { useState } from "react";
import { Hero } from "./components/hero";
import { HomeSearchSection } from "./components/home-search-section";
import { FeaturedItems } from "./components/featured-items";
import { HowItWorks } from "./components/how-it-works";
import WhyChooseUs from "./components/WhyChooseUs";

export default function HomePage() {

  const [searchTerm, setSearchTerm] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [filters, setFilters] = useState({
    search: "",
    location: "",
  });

  return (
    <div className="min-h-screen bg-white">

      <Hero />

      <WhyChooseUs />

      <HomeSearchSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        // location={location}
        // setLocation={setLocation}
        onSearch={() =>
          setFilters({
            search: searchTerm,
            location,
          })
        }
      />

      <FeaturedItems
        searchTerm={filters.search}
        location={filters.location}
      />
      
      <HowItWorks />

    </div>
  );
}