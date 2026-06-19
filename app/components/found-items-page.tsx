"use client";

import { MapPin, Clock } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./f/ImageWithFallback";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

interface FoundItemsPageProps {
  onItemClick: (id: number) => void;
}

export function FoundItemsPage({
  onItemClick,
}: FoundItemsPageProps) {

  const [items, setItems] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const [authRequired, setAuthRequired] = useState(false);

  const fetchFoundItems = async () => {

    try {

      const res = await api.get("/matching/my/");

      const uniqueItems = Array.from(
        new Map(
          res.data.map((m: any) => [
            m.found_item.id,
            m.found_item,
          ])
        ).values()
      );

      setItems(uniqueItems);

    } catch (err: any) {

      if (err.response?.status === 401) {
        setAuthRequired(true);
        return;
      }

      console.error(err);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchFoundItems();
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white-50">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (authRequired) {
    return (
      <div className="flex items-center justify-center h-full min-h-[80vh]">
        <div className="text-center">
          <p className="text-gray-500 mt-2">
            Please login to view your matched items.
          </p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center h-full min-h-[80vh]">
        <p>No found items available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white-50">

      <div className="container mx-auto px-4 py-8">

        {/* loading */}
        {/* {loading && (
          <div className="text-center py-10">

            <p className="text-gray-500">
              Loading items...
            </p>

          </div>
        )}

        
        {!loading && items.length === 0 && (
          <div className="flex items-center justify-center min-h-[60vh]">
            <p className="text-lg text-gray-500">
              No found items available
            </p>
          </div>
        )} */}

        {/* cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {items.map((item) => (

            <div
              key={item.id}
              onClick={() => router.push(`/items/${item.id}`)}
              className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
            >

              <div className="aspect-4/3 relative overflow-hidden bg-gray-100">

                <ImageWithFallback
                  src={item.images?.[0]?.image || "/placeholder.png"}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />

                <Badge className="absolute top-3 right-3 bg-green-500 hover:bg-green-600">
                  Found
                </Badge>

              </div>

              <div className="p-4">

                <h3 className="text-gray-900 mb-2">
                  {item.title}
                </h3>

                <p className="text-gray-600 mb-3 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center gap-4 text-gray-500 mb-3">

                  <div className="flex items-center gap-1">

                    <MapPin className="w-4 h-4" />

                    <span className="line-clamp-1">
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
                      ).toLocaleDateString()}
                    </span>

                  </div>

                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={(e) => handleContact(e, item.id)}
                  >
                    Claim Item
                  </Button>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}