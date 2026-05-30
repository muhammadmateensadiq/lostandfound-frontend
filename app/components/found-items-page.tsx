// import { MapPin, Clock, Search, Filter } from "lucide-react";
// import { Badge } from "./ui/badge";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
// import { ImageWithFallback } from "./f/ImageWithFallback";
// import { useEffect, useState } from "react";
// import api from "@/lib/api";

// interface FoundItemsPageProps {
//   onItemClick: (id: number) => void;
// }

// export function FoundItemsPage({ onItemClick }: FoundItemsPageProps) {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [items, setItems] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   // useEffect(() => {
//   //   fetchFoundItems();
//   // }, []);

//   // const fetchFoundItems = async () => {

//   //   setLoading(true);

//   //   try {

//   //     const res = await api.get(
//   //       `/items/all/?type=found&search=${searchTerm}`
//   //     );

//   //     setItems(res.data.results);

//   //   } catch (err) {

//   //     console.error(err);

//   //   } finally {

//   //     setLoading(false);

//   //   }
//   // };

//   const fetchFoundItems = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get(
//         `/items/all/?type=found&search=${encodeURIComponent(searchTerm)}`
//       );
//       setItems(res.data.results || res.data);   // handle both paginated and non-paginated
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Add this useEffect
//   useEffect(() => {
//     fetchFoundItems();
//   }, [searchTerm]);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-8">
//         <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
//           <div className="grid md:grid-cols-3 gap-4">
//             <div className="md:col-span-2">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <Input
//                   placeholder="Search found items..."
//                   className="pl-10"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div>
//               <Select value={selectedCategory} onValueChange={setSelectedCategory}>
//                 <SelectTrigger>
//                   <Filter className="w-4 h-4 mr-2 text-gray-400" />
//                   <SelectValue placeholder="Category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Categories</SelectItem>
//                   <SelectItem value="wallet">Wallets</SelectItem>
//                   <SelectItem value="pets">Pets</SelectItem>
//                   <SelectItem value="electronics">Electronics</SelectItem>
//                   <SelectItem value="jewelry">Jewelry</SelectItem>
//                   <SelectItem value="keys">Keys</SelectItem>
//                   <SelectItem value="bags">Bags</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </div>

//         {loading && (
//           <div className="text-center py-10">
//             <p className="text-gray-500">
//               Loading items...
//             </p>
//           </div>
//         )}
//         {!loading && items.length === 0 && (
//           <div className="text-center py-10">
//             <p className="text-gray-500">
//               No found items available
//             </p>
//           </div>
//         )}

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {items.map((item) => (
//             <div
//               key={item.id}
//               onClick={() => onItemClick(item.id)}
//               className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
//             >
//               <div className="aspect-4/3 relative overflow-hidden bg-gray-100">
//                 <ImageWithFallback
//                   src={item.images?.[0]?.image || "/placeholder.png"}
//                   alt={item.title}
//                   className="w-full h-full object-cover"
//                 />
//                 <Badge className="absolute top-3 right-3 bg-green-500 hover:bg-green-600">
//                   Found
//                 </Badge>
//               </div>

//               <div className="p-4">
//                 <h3 className="text-gray-900 mb-2">{item.title}</h3>
//                 <p className="text-gray-600 mb-3 line-clamp-2">{item.description}</p>

//                 <div className="flex items-center gap-4 text-gray-500 mb-3">
//                   <div className="flex items-center gap-1">
//                     <MapPin className="w-4 h-4" />
//                     <span className="line-clamp-1">{item.location}</span>
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-1 text-gray-500">
//                     <Clock className="w-4 h-4" />
//                     <span>
//                       {new Date(
//                         item.updated_at || item.created_at
//                       ).toLocaleDateString()}
//                     </span>
//                   </div>
//                   <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
//                     Claim Item
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { MapPin, Clock, Search, Filter } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

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

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("all");

  const [items, setItems] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const fetchFoundItems = async () => {

    setLoading(true);

    try {

      const res = await api.get(
        `/items/all/?type=found&search=${encodeURIComponent(searchTerm)}`
      );

      setItems(res.data.results || res.data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchFoundItems();
  }, [searchTerm]);

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
    <div className="min-h-screen bg-gray-50">

      <div className="container mx-auto px-4 py-8">

        {/* search */}
        {/* <div className="bg-white rounded-lg p-6 shadow-sm mb-8">

          <div className="grid md:grid-cols-3 gap-4">

            <div className="md:col-span-2">

              <div className="relative">

                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                <Input
                  placeholder="Search found items..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

              </div>

            </div>

            <div>

              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >

                <SelectTrigger>

                  <Filter className="w-4 h-4 mr-2 text-gray-400" />

                  <SelectValue placeholder="Category" />

                </SelectTrigger>

                <SelectContent>

                  <SelectItem value="all">
                    All Categories
                  </SelectItem>

                  <SelectItem value="wallet">
                    Wallets
                  </SelectItem>

                  <SelectItem value="pets">
                    Pets
                  </SelectItem>

                  <SelectItem value="electronics">
                    Electronics
                  </SelectItem>

                  <SelectItem value="jewelry">
                    Jewelry
                  </SelectItem>

                  <SelectItem value="keys">
                    Keys
                  </SelectItem>

                  <SelectItem value="bags">
                    Bags
                  </SelectItem>

                </SelectContent>

              </Select>

            </div>

          </div>

        </div> */}

        {/* loading */}
        {loading && (
          <div className="text-center py-10">

            <p className="text-gray-500">
              Loading items...
            </p>

          </div>
        )}

        {/* empty */}
        {!loading && items.length === 0 && (
          <div className="text-center py-10">

            <p className="text-gray-500">
              No found items available
            </p>

          </div>
        )}

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