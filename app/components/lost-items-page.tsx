"use client";

import { useEffect, useState } from "react";
import { MapPin, Clock } from "lucide-react";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

import { ImageWithFallback } from "./f/ImageWithFallback";
import { SearchSection } from "./search-section";

import api from "@/lib/api";
import { useRouter } from "next/navigation";

interface LostItemsPageProps {
  onItemClick: (id: number) => void;
}

export function LostItemsPage({
  onItemClick,
}: LostItemsPageProps) {

  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");

  const [items, setItems] = useState<any[]>([]);

  const [page, setPage] = useState(1);

  const [hasMore, setHasMore] = useState(true);

  const [loading, setLoading] = useState(true);

  const [useNearby, setUseNearby] = useState(false);

  const router = useRouter();

  const fetchItems = async (pageNumber = 1, isNearby = false, lat = null, lng = null) => {

    setLoading(true);

    try {

      let url = `/items/all/?page=${pageNumber}&search=${searchTerm}&location=${location}&type=lost`;

      if (isNearby && lat && lng) {
        url = `/items/all/?lat=${lat}&lng=${lng}&radius=5&type=lost`;
      }

      const res = await api.get(url);

      const newItems = res.data.results;

      setItems((prev) =>
        pageNumber === 1 ? newItems : [...prev, ...newItems]
      );

      setHasMore(!!res.data.next);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLocationAndSearch = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      api.get(
        `/items/all/?lat=${lat}&lng=${lng}&radius=5&type=lost`
      ).then((res) => {
        setItems(res.data.results);
        setHasMore(false);
      });
    });
  };

  // initial load
  useEffect(() => {
    fetchItems(1);
  }, []);

  const handleContact = async (
    e: React.MouseEvent,
    itemId: number
  ) => {

    e.stopPropagation();

    try {

      const res = await api.get(`/items/contact/${itemId}/`);

      const phone = res.data.phone;
      const whatsapp = res.data.whatsapp;

      if (whatsapp) {

        window.open(`https://wa.me/${whatsapp}`, "_blank");

      } else if (phone) {

        window.location.href = `tel:${phone}`;

      } else {

        alert("User has not added contact info.");

      }

    } catch (err) {

      console.error(err);

      alert("User has not added contact info.");

    }
  };

  return (
    <div className="min-h-screen bg-white-50">

      <div className="container mx-auto px-4 py-8">

        {/* reusable search */}
        <SearchSection
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          location={location}
          setLocation={setLocation}
          onSearch={() => {
            setPage(1);
            setUseNearby(false);
            fetchItems(1, false);
          }}
        />

        {/* items */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

          {loading && (
            <div className="col-span-full flex items-center justify-center py-20">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-gray-500 text-sm">Loading...</p>
              </div>
            </div>
          )}

          {!loading && items.length === 0 && (
            <div className="col-span-full flex justify-center items-center py-20">
              <p className="text-gray-500 text-lg">
                No items found
              </p>
            </div>
          )}

          {items.map((item) => (

            <div
              key={item.id}
              onClick={() => router.push(`/items/${item.id}`)}
              className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer flex flex-col h-full"
            >

              {/* image */}
              <div className="aspect-4/3 relative overflow-hidden bg-gray-100">

                <ImageWithFallback
                  src={item.images?.[0]?.image || "/placeholder.png"}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />

                <Badge className="absolute top-3 right-3 bg-red-500 hover:bg-red-600">
                  Lost
                </Badge>

              </div>

              {/* content */}
              <div className="p-4 flex flex-col flex-1">

                <div className="flex items-start justify-between mb-2">

                  <h3 className="text-gray-900 flex-1 line-clamp-1 break-words">
                    {item.title}
                  </h3>

                  <Badge
                    variant="outline"
                    className="ml-2"
                  >
                    {item.reward
                      ? `$${item.reward}`
                      : "No reward"}
                  </Badge>

                </div>

                <p className="text-gray-600 mb-3 line-clamp-2 break-words">
                  {item.description}
                </p>

                <div className="flex items-center gap-4 text-gray-500 mb-3">

                  <div className="flex items-center gap-1">

                    <MapPin className="w-4 h-4" />

                    <span className="line-clamp-1 break-words">
                      {item.location}
                    </span>

                  </div>

                </div>

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-1 text-gray-500">

                    <Clock className="w-4 h-4" />

                    <span>
                      {new Date(
                        item.updated_at || item.created_at
                      ).toLocaleDateString(undefined, {
                        dateStyle: "medium",
                      })}
                    </span>

                  </div>

                  <Button
                    size="sm"
                    className="bg-red-600 hover:bg-red-700"
                    onClick={(e) => handleContact(e, item.id)}
                  >
                    Contact
                  </Button>

                </div>

              </div>

            </div>
          ))}

        </div>

        {/* show more */}
        {hasMore && items.length > 0 && (
          <div className="text-center mt-8">

            <Button
              onClick={() => {
                const nextPage = page + 1;

                setPage(nextPage);

                fetchItems(nextPage);
              }}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? "Loading..." : "Show More"}
            </Button>

          </div>
        )}

      </div>

    </div>
  );
}