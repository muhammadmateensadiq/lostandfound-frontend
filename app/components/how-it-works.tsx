// import { Search, FileText, MessageCircle, CheckCircle } from "lucide-react";

// const steps = [
//   {
//     icon: Search,
//     title: "Search or Post",
//     description: "Search for your lost item or post details about what you've lost or found"
//   },
//   {
//     icon: FileText,
//     title: "Add Details",
//     description: "Provide a clear description, location, date, and upload photos to help with identification"
//   },
//   {
//     icon: MessageCircle,
//     title: "Connect",
//     description: "Get notified when there's a potential match and communicate securely with other users"
//   },
//   {
//     icon: CheckCircle,
//     title: "Reunite",
//     description: "Arrange a safe meetup and reunite with your lost item or return it to its owner"
//   }
// ];

// export function HowItWorks() {
//   return (
//     <section className="py-16 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="font-bold mb-4 text-blue-900">How It Works</h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Our simple 4-step process makes it easy to find lost items or help return found items
//           </p>
//         </div>
        
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
//           {steps.map((step, index) => {
//             const Icon = step.icon;
//             return (
//               <div key={index} className="relative">
//                 <div className="text-center">
//                   <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <Icon className="w-8 h-8 text-white" />
//                   </div>
//                   <div className="absolute top-8 left-1/2 w-full h-0.5 bg-blue-200 -z-10 hidden lg:block" 
//                        style={{ display: index === steps.length - 1 ? 'none' : 'block' }} />
//                   <h3 className="text-gray-900 mb-2">{step.title}</h3>
//                   <p className="text-gray-600">{step.description}</p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }


import { Search, FilePlus2, BellRing, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search Instantly",
    description:
      "Browse verified lost & found listings with smart filters and real-time matching.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: FilePlus2,
    title: "Create a Report",
    description:
      "Post detailed information, upload images, and mark exact locations effortlessly.",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: BellRing,
    title: "Get Match Alerts",
    description:
      "Receive instant notifications when someone posts a possible match for your item.",
    gradient: "from-orange-400 to-pink-500",
  },
  {
    icon: ShieldCheck,
    title: "Safe Reunions",
    description:
      "Connect securely and arrange trusted meetups to return belongings safely.",
    gradient: "from-emerald-500 to-teal-500",
  },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-white via-blue-50/40 to-white py-24">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto mb-20 max-w-3xl text-center">
          {/* <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-100/60 px-4 py-1 text-sm font-medium text-blue-700 backdrop-blur">
            Simple Process
          </span> */}

          <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
            How It Works
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-gray-600">
            A modern and secure way to reconnect people with their lost
            belongings in just a few simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mx-auto grid max-w-7xl gap-8 md:grid-cols-2 xl:grid-cols-4">
          {/* Connection Line */}
          <div className="absolute left-0 top-24 hidden h-1 w-full bg-linear-to-r from-blue-200 via-purple-200 to-emerald-200 xl:block" />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={index}
                className="group relative rounded-3xl border border-white/40 bg-white/70 p-8 shadow-lg backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Step Number */}
                <div className="absolute right-6 top-6 text-5xl font-black text-gray-100">
                  0{index + 1}
                </div>

                {/* Icon */}
                <div
                  className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-r ${step.gradient} shadow-lg transition-transform duration-500 group-hover:scale-110`}
                >
                  <Icon className="h-8 w-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  {step.title}
                </h3>

                <p className="leading-relaxed text-gray-600">
                  {step.description}
                </p>

                {/* Hover Glow */}
                <div
                  className={`absolute inset-0 -z-10 rounded-3xl bg-linear-to-r ${step.gradient} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}