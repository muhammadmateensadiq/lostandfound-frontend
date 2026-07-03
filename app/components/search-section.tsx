"use client";

import { Search, MapPin } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

// interface Props {
//   searchTerm: string;
//   setSearchTerm: (value: string) => void;

//   location: string;
//   setLocation: (value: string) => void;

//   onSearch: () => void;
// }

// export function SearchSection({
//   searchTerm,
//   setSearchTerm,
//   location,
//   setLocation,
//   onSearch,
// }: Props) {
//   return (
//     <section className="py-3">
//       <div className="container mx-auto px-4">
//         <div className="bg-white-50 rounded-lg p-6 shadow-sm border border-gray-200">
//           <div className="grid md:grid-cols-4 gap-4">

//             {/* search */}
//             <div className="md:col-span-2">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

//                 <Input
//                   placeholder="Search items..."
//                   className="pl-10 bg-white"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//             </div>

//             {/* location */}
//             <div>
//               <div className="relative">
//                 <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

//                 <Input
//                   placeholder="Location"
//                   className="pl-10 bg-white"
//                   value={location}
//                   onChange={(e) => setLocation(e.target.value)}
//                 />
//               </div>
//             </div>

//             {/* button */}
//             <div>
//               <Button
//                 onClick={onSearch}
//                 className="w-full bg-blue-600 hover:bg-blue-700"
//               >
//                 Search
//               </Button>
//             </div>

//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

interface Props {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onSearch: () => void;
}

export function SearchSection({
  searchTerm,
  setSearchTerm,
  onSearch,
}: Props) {
  return (
    <section className="py-3">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">

          <div className="flex items-center rounded-full border border-gray-200 bg-white shadow-md hover:shadow-lg transition-all duration-300">

            <Input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 flex-1 border-0 bg-transparent px-6 text-sm text-blue-600 placeholder:text-gray-400 shadow-none focus-visible:ring-0"
            />

            <Button
              onClick={onSearch}
              size="icon"
              className="mr-1 h-10 w-10 rounded-full bg-white-600 hover:bg-white-700 transition-all duration-300 hover:scale-105"
            >
              <Search className="h-5 w-5 text-blue-600" />
            </Button>

          </div>

        </div>
      </div>
    </section>
  );
}