"use client";

import { Button } from "./ui/button";
import { Search, Package, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

// export function Hero() {

//   const router = useRouter();

//   return (
//     <section
//       className="py-20"
//       style={{ backgroundColor: "#FCFDFF" }}
//     >

//       <div className="container mx-auto px-4">

//         <div className="max-w-3xl mx-auto text-center">

//           <h1 className="font-bold text-blue-600 mb-6">
//             Reuniting People with Their Lost Items
//           </h1>

//           <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
//             Every item has a story. Whether you&apos;ve lost
//             something precious or found an item that belongs
//             to someone else, we&apos;re here to help connect
//             them back together.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center">

//             <Button
//               size="lg"
//               className="bg-blue-600 hover:bg-blue-700"
//               onClick={() =>
//                 router.push("/lost-items")
//               }
//             >
//               <Search className="w-5 h-5 mr-2" />
//               I Lost Something
//             </Button>

//             <Button
//               size="lg"
//               variant="outline"
//               className="border-blue-600 text-blue-600 hover:bg-blue-50"
//               onClick={() =>
//                 router.push("/found-items")
//               }
//             >
//               <Package className="w-5 h-5 mr-2" />
//               I Found Something
//             </Button>

//           </div>

//         </div>

//       </div>

//       <img
//         src="/bg0.jpeg"
//         alt="Lost and found"
//         className="w-full max-w-384 mx-auto mt-16 object-contain"
//       />

//     </section>
//   );
// }

export function Hero() {
  const router = useRouter();

  return (
    <section className="relative py-14 sm:py-20 px-4 sm:px-6 overflow-hidden bg-linear-to-b from-blue-50 via-white to-blue-50">
      <div className="absolute top-20 -right-40 w-[500px] h-[500px] bg-blue-500/20 blur-[140px] rounded-full" />
      {/* Background pattern (kept safe for mobile) */}
      <div
        className="absolute inset-0 opacity-[0.99] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #CBD5E1 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">

        {/* LEFT CONTENT */}
        <div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-medium text-blue-700 mb-5 sm:mb-6">
            <ShieldCheck className="w-3.5 h-3.5" />
            Trusted Lost &amp; Found Platform
          </div>

          {/* Heading (responsive fix only) */}
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-semibold leading-[1.15] sm:leading-[1.12] text-gray-900 tracking-tight">
            Reuniting People
            <span className="block text-blue-600">
              With Their Lost Items
            </span>
          </h1>

          {/* Subtext */}
          <p className="mt-4 sm:mt-5 text-sm sm:text-base text-gray-500 leading-relaxed max-w-md">
            Lost your belongings? Found something valuable? Our platform helps
            people reconnect with their possessions quickly, securely, and
            effortlessly.
          </p>

          {/* Buttons (mobile friendly) */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 text-sm font-medium transition-colors"
              onClick={() => router.push("/lost-items")}
            >
              <Search className="mr-2 h-4 w-4" />
              Lost items
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border border-blue-200 text-blue-600 hover:bg-blue-50 rounded-lg px-6 text-sm font-medium transition-colors"
              onClick={() => router.push("/found-items")}
            >
              <Package className="mr-2 h-4 w-4" />
              Found items
            </Button>
          </div>
        </div>

        {/* RIGHT IMAGE SECTION */}
        <div className="relative mt-6 lg:mt-0">

          {/* Image */}
          <div className="rounded-2xl overflow-hidden border border-blue-100 bg-blue-50">
            <img
              src="/bg0.jpeg"
              alt="Two people exchanging a found wallet"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Floating card — hidden on mobile (fixes clutter) */}
          <div className="absolute -top-4 -right-4 hidden md:block bg-white border border-gray-100 rounded-xl shadow-sm px-4 py-3 min-w-[160px]">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
              <p className="text-sm font-medium text-gray-800">
                Item Returned
              </p>
            </div>
            {/* <p className="text-xs text-gray-400 pl-4">
              Wallet reunited in 2 days
            </p> */}
          </div>

          {/* Floating card — hidden on mobile */}
          <div className="absolute -bottom-4 -left-4 hidden md:block bg-white border border-gray-100 rounded-xl shadow-sm px-4 py-3 min-w-[160px]">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
              <p className="text-sm font-medium text-gray-800">
                Active Search
              </p>
            </div>
            {/* <p className="text-xs text-gray-400 pl-4">
              300+ recent listings
            </p> */}
          </div>

        </div>
      </div>
    </section>
  );
}

