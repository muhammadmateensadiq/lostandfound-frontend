// "use client";

// import { Search, Plus, User, Bell } from "lucide-react";
// import { Button } from "./ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "./ui/dropdown-menu";
// import { usePathname } from "next/navigation";
// import { useAuth } from "../auth/AuthContext";
// import api from "@/lib/api";
// import { useRouter } from "next/navigation";
// import { logout } from "@/lib/logout";
// import { useEffect, useState } from "react";

// type User = {
//   email: string;
//   full_name: string;
// };

// export default function Header() {
//   const router = useRouter();
//   const { user } = useAuth();
//   const isLoggedIn = !!user;

//   const pathname = usePathname();

//   const { setUser } = useAuth();
//   const [unreadCount, setUnreadCount] = useState(0);

//   useEffect(() => {
//     const fetchCount = async () => {
//       try {
//         const res = await api.get("/notifications/unread-count/");
//         setUnreadCount(res.data.count);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     if (user) fetchCount();
//   }, [user]);

//   //   return (
//   //     <header className="border-b bg-white sticky top-0 z-50 shadow-sm backdrop-blur-md">
//   //       <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//   //         {/* Logo */}
//   //         <button
//   //           onClick={() => (window.location.href = "/")}
//   //           className="flex gap-2 items-center transform transition-transform hover:scale-105 duration-300"
//   //         >
//   //           <Search className="w-6 h-6 text-blue-600 animate-pulse" />
//   //           <span className="text-blue-600 font-bold text-lg">FindIt</span>
//   //         </button>

//   //         {/* Nav */}
//   //         <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
//   //           {["Home", "Lost Items", "Found Items"].map((link) => {
//   //             const href =
//   //               link === "Home"
//   //                 ? "/"
//   //                 : `/${link.toLowerCase().replace(" ", "-")}`;

//   //             const isActive = pathname === href;

//   //             return (
//   //               <a
//   //                 key={link}
//   //                 href={href}
//   //                 className={`relative group transition-colors duration-300 hover:text-blue-600 ${isActive ? "text-blue-600 font-semibold" : ""
//   //                   }`}
//   //               >
//   //                 {link}

//   //                 {/* underline ONLY on hover, not active */}
//   //                 {!isActive && (
//   //                   <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
//   //                 )}
//   //               </a>
//   //             );
//   //           })}
//   //         </nav>

//   //         {/* Actions */}
//   //         <div className="flex gap-3 items-center">
//   //           {isLoggedIn ? (
//   //             <>
//   //               <Button
//   //                 onClick={() => (window.location.href = "/post-item-page")}
//   //                 className="flex items-center gap-2 transform transition-transform hover:scale-105 duration-300"
//   //               >
//   //                 <Plus className="w-4 h-4" />
//   //                 Post Item
//   //               </Button>

//   //               <DropdownMenu>
//   //                 <DropdownMenuTrigger asChild>
//   //                   <Button
//   //                     variant="ghost"
//   //                     size="icon"
//   //                     className="transform transition-transform hover:scale-110 duration-300"
//   //                   >
//   //                     <Avatar className="w-8 h-8">
//   //                       <AvatarImage src={user?.avatar || ""} />
//   //                       <AvatarFallback>
//   //                         {user?.full_name
//   //                           ?.split(" ")
//   //                           .map((n: string) => n[0])
//   //                           .join("") || "U"}
//   //                       </AvatarFallback>
//   //                     </Avatar>
//   //                   </Button>
//   //                 </DropdownMenuTrigger>

//   //                 <DropdownMenuContent align="end" className="animate-fade-in">
//   //                   {/* Dashboard */}
//   //                   <DropdownMenuItem
//   //                     onClick={() => (window.location.href = "/dashboard")}
//   //                     className="hover:bg-blue-50 transition-colors"
//   //                   >
//   //                     <User className="w-4 h-4 mr-2 text-blue-600" />
//   //                     Dashboard
//   //                   </DropdownMenuItem>

//   //                   {/* Notifications */}
//   //                   <DropdownMenuItem
//   //                     onClick={() => (window.location.href = "/notification")}
//   //                     className="hover:bg-blue-50 transition-colors flex justify-between items-center"
//   //                   >
//   //                     <div className="flex items-center gap-2">
//   //                       <Bell className="w-5 h-5 text-blue-600" />
//   //                       Notifications
//   //                     </div>
//   //                     {unreadCount > 0 && (
//   //                       <span className="inline-flex items-center justify-center min-w-5 h-5 px-1 text-xs font-bold text-red-500 rounded-full">
//   //                         {unreadCount}
//   //                       </span>
//   //                     )}
//   //                   </DropdownMenuItem>
//   //                   <DropdownMenuSeparator />

//   //                   {/* Sign Out */}
//   //                   <DropdownMenuItem
//   //                     onClick={() => logout(api, setUser, router)}
//   //                     className="hover:bg-red-50 transition-colors text-red-600"
//   //                   >
//   //                     Sign Out
//   //                   </DropdownMenuItem>
//   //                 </DropdownMenuContent>

//   //               </DropdownMenu>
//   //             </>
//   //           ) : (
//   //             <>
//   //               <Button
//   //                 variant="ghost"
//   //                 onClick={() => (window.location.href = "/signin")}
//   //                 className="transition-colors hover:text-blue-600"
//   //               >
//   //                 Sign In
//   //               </Button>
//   //               <Button
//   //                 onClick={() => (window.location.href = "/signup")}
//   //                 className="transform transition-transform hover:scale-105 duration-300"
//   //               >
//   //                 Sign Up
//   //               </Button>
//   //             </>
//   //           )}
//   //         </div>
//   //       </div>
//   //     </header>
//   //   );
//   // }

//   return (
//     <header className="border-b border-gray-100 bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-[0_1px_12px_rgba(0,0,0,0.06)]">
//       <div className="container mx-auto px-4 md:px-6 py-1 flex items-center justify-between h-17">

//         {/* Logo */}
//         <button
//           onClick={() => (window.location.href = "/")}
//           className="flex gap-2 items-center rounded-lg px-2 py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-200 hover:opacity-80"
//           aria-label="FindIt – go to homepage"
//         >
//           {/* <span className="flex items-center justify-center w-8 h-8 rounded-md bg-blue-600 text-white shadow-sm">
//             <Search className="w-3.5 h-3.5" aria-hidden="true" />
//           </span> */}
//           <Search className="w-6 h-6 text-blue-600 animate-pulse" />
//           <span className="text-gray-900 font-bold text-lg tracking-tight">
//             Find<span className="text-blue-600">It</span>
//           </span>
//         </button>

//         {/* Nav */}
//         <nav className="hidden md:flex gap-1 text-sm font-medium" aria-label="Main navigation">
//           {["Home", "Lost Items", "Found Items"].map((link) => {
//             const href =
//               link === "Home"
//                 ? "/"
//                 : `/${link.toLowerCase().replace(" ", "-")}`;

//             const isActive = pathname === href;

//             return (
//               <a
//                 key={link}
//                 href={href}
//                 aria-current={isActive ? "page" : undefined}
//                 className={`
//                   relative px-4 py-3 rounded-lg transition-all duration-200
//                   focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
//                   ${isActive
//                     ? "text-blue-600 bg-blue-50 font-semibold"
//                     : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
//                   }
//                 `}
//               >
//                 {link}
//                 {isActive && (
//                   <span
//                     className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3.5 h-0.5 bg-blue-600 rounded-full"
//                     aria-hidden="true"
//                   />
//                 )}
//               </a>
//             );
//           })}
//         </nav>

//         {/* Actions */}
//         <div className="flex gap-2 items-center">
//           {isLoggedIn ? (
//             <>
//               <Button
//                 onClick={() => (window.location.href = "/post-item-page")}
//                 size="sm"
//                 className="h-10 flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-sm hover:shadow transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                 aria-label="Post a lost or found item"
//               >
//                 <Plus className="w-4 h-4" aria-hidden="true" />
//                 Post Item
//               </Button>

//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="w-10 h-10 rounded-full focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 hover:bg-gray-100 transition-colors duration-200"
//                     aria-label={`Account menu for ${user?.full_name ?? "user"}`}
//                     aria-haspopup="true"
//                   >
//                     <Avatar className="w-9 h-9">
//                       <AvatarImage src={user?.avatar || ""} alt={user?.full_name ?? "User avatar"} />
//                       <AvatarFallback className="bg-blue-100 text-blue-700 text-xs font-semibold">
//                         {user?.full_name
//                           ?.split(" ")
//                           .map((n: string) => n[0])
//                           .join("") || "U"}
//                       </AvatarFallback>
//                     </Avatar>
//                   </Button>
//                 </DropdownMenuTrigger>

//                 <DropdownMenuContent
//                   align="end"
//                   sideOffset={8}
//                   className="w-52 rounded-xl shadow-lg border border-gray-100 p-1"
//                 >
//                   {/* Identity row */}
//                   <div className="px-3 py-2.5 mb-1">
//                     <p className="text-sm font-semibold text-gray-900 truncate">{user?.full_name}</p>
//                     <p className="text-xs text-gray-500 truncate mt-0.5">{user?.email}</p>
//                   </div>

//                   <DropdownMenuSeparator className="my-1" />

//                   {/* Dashboard */}
//                   <DropdownMenuItem
//                     onClick={() => (window.location.href = "/dashboard")}
//                     className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-700 cursor-pointer hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-50 focus:text-blue-700 transition-colors duration-150"
//                   >
//                     <User className="w-4 h-4 text-blue-600" aria-hidden="true" />
//                     Dashboard
//                   </DropdownMenuItem>

//                   {/* Notifications */}
//                   <DropdownMenuItem
//                     onClick={() => (window.location.href = "/notification")}
//                     className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-700 cursor-pointer hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-50 focus:text-blue-700 transition-colors duration-150"
//                     aria-label={unreadCount > 0 ? `Notifications, ${unreadCount} unread` : "Notifications"}
//                   >
//                     <div className="flex items-center gap-2.5">
//                       <Bell className="w-4 h-4 text-blue-600" aria-hidden="true" />
//                       Notifications
//                     </div>
//                     {unreadCount > 0 && (
//                       <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-[10px] font-bold text-white bg-red-500 rounded-full">
//                         {unreadCount > 99 ? "99+" : unreadCount}
//                       </span>
//                     )}
//                   </DropdownMenuItem>

//                   <DropdownMenuSeparator className="my-1" />

//                   {/* Sign Out */}
//                   <DropdownMenuItem
//                     onClick={() => logout(api, setUser, router)}
//                     className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-600 cursor-pointer hover:bg-red-50 focus:bg-red-50 transition-colors duration-150"
//                   >
//                     Sign Out
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </>
//           ) : (
//             <>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => (window.location.href = "/signin")}
//                 className="h-10 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors duration-200"
//               >
//                 Sign In
//               </Button>
//               <Button
//                 size="sm"
//                 onClick={() => (window.location.href = "/signup")}
//                 className="h-10 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-sm hover:shadow focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-200"
//               >
//                 Sign Up
//               </Button>
//             </>
//           )}
//         </div>

//       </div>
//     </header>
//   );
// }

"use client";

import { Search, Plus, User, Bell, Home, PackageSearch, PackageCheck } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { useAuth } from "../auth/AuthContext";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/logout";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "Lost Items", href: "/lost-items", icon: PackageSearch },
  { label: "Found Items", href: "/found-items", icon: PackageCheck },
];

export default function Header() {
  const router = useRouter();
  const { user, setUser } = useAuth();
  const isLoggedIn = !!user;
  const pathname = usePathname();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await api.get("/notifications/unread-count/");
        setUnreadCount(res.data.count);
      } catch (err) {
        console.error(err);
      }
    };
    if (user) fetchCount();
  }, [user]);

  return (
    <>
      {/* ─── Top Header ─── */}
      <header className="border-b border-gray-100 bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-[0_1px_12px_rgba(0,0,0,0.06)]">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16">

          {/* Logo */}
          <button
            onClick={() => (window.location.href = "/")}
            className="flex gap-2 items-center rounded-lg px-2 py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-200 hover:opacity-80"
            aria-label="FindIt – go to homepage"
          >
            <Search className="w-5 h-5 text-blue-600" />
            <span className="text-gray-900 font-bold text-lg tracking-tight">
              Find<span className="text-blue-600">It</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex gap-1 text-sm font-medium"
            aria-label="Main navigation"
          >
            {navLinks.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <a
                  key={label}
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={`
                    relative px-4 py-2.5 rounded-lg transition-all duration-200
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                    ${isActive
                      ? "text-blue-600 bg-blue-50 font-semibold"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }
                  `}
                >
                  {label}
                  {isActive && (
                    <span
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3.5 h-0.5 bg-blue-600 rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex gap-2 items-center">
            {isLoggedIn ? (
              <>
                <Button
                  onClick={() => (window.location.href = "/post-item-page")}
                  size="sm"
                  className="h-9 flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-sm hover:shadow transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg text-sm font-medium"
                  aria-label="Post a lost or found item"
                >
                  <Plus className="w-4 h-4" aria-hidden="true" />
                  <span className="hidden sm:inline">Post Item</span>
                  <span className="sm:hidden">Post</span>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-9 h-9 rounded-full focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 hover:bg-gray-100 transition-colors duration-200"
                      aria-label={`Account menu for ${user?.full_name ?? "user"}`}
                      aria-haspopup="true"
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarImage
                          src={user?.avatar || ""}
                          alt={user?.full_name ?? "User avatar"}
                        />
                        <AvatarFallback className="bg-blue-100 text-blue-700 text-xs font-semibold">
                          {user?.full_name
                            ?.split(" ")
                            .map((n: string) => n[0])
                            .join("") || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    sideOffset={8}
                    className="w-52 rounded-xl shadow-lg border border-gray-100 p-1"
                  >
                    <div className="px-3 py-2.5 mb-1">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {user?.full_name}
                      </p>
                      <p className="text-xs text-gray-500 truncate mt-0.5">
                        {user?.email}
                      </p>
                    </div>

                    <DropdownMenuSeparator className="my-1" />

                    <DropdownMenuItem
                      onClick={() => (window.location.href = "/dashboard")}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-700 cursor-pointer hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-50 focus:text-blue-700 transition-colors duration-150"
                    >
                      <User className="w-4 h-4 text-blue-600" aria-hidden="true" />
                      Dashboard
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => (window.location.href = "/notification")}
                      className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-700 cursor-pointer hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-50 focus:text-blue-700 transition-colors duration-150"
                      aria-label={unreadCount > 0 ? `Notifications, ${unreadCount} unread` : "Notifications"}
                    >
                      <div className="flex items-center gap-2.5">
                        <Bell className="w-4 h-4 text-blue-600" aria-hidden="true" />
                        Notifications
                      </div>
                      {unreadCount > 0 && (
                        <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-[10px] font-bold text-white bg-red-500 rounded-full">
                          {unreadCount > 99 ? "99+" : unreadCount}
                        </span>
                      )}
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="my-1" />

                    <DropdownMenuItem
                      onClick={() => logout(api, setUser, router)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-600 cursor-pointer hover:bg-red-50 focus:bg-red-50 transition-colors duration-150"
                    >
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => (window.location.href = "/signin")}
                  className="h-9 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors duration-200"
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  onClick={() => (window.location.href = "/signup")}
                  className="h-9 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-sm hover:shadow focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-200"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

        </div>
      </header>

      {/* ─── Mobile Bottom Nav Bar ─── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-gray-100 shadow-[0_-1px_12px_rgba(0,0,0,0.06)]"
        aria-label="Mobile navigation"
      >
        <div className="flex items-stretch h-16">
          {navLinks.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <a
                key={label}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`
                  flex-1 flex flex-col items-center justify-center gap-1 pt-2 pb-1
                  text-[10px] font-medium tracking-wide transition-all duration-200
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500
                  ${isActive ? "text-blue-600" : "text-gray-400 hover:text-gray-700"}
                `}
              >
                <span className="relative">
                  <Icon
                    className={`w-5 h-5 transition-transform duration-200 ${isActive ? "scale-110" : ""}`}
                    aria-hidden="true"
                    strokeWidth={isActive ? 2.2 : 1.8}
                  />
                  {isActive && (
                    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-blue-600 rounded-full" />
                  )}
                </span>
                <span>{label}</span>
              </a>
            );
          })}
        </div>
        {/* iOS safe area spacer */}
        <div style={{ height: "env(safe-area-inset-bottom)" }} className="bg-white/95" />
      </nav>
    </>
  );
}
