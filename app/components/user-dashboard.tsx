"use client";

import { User, Package, MapPin, Clock, Edit, Trash2, Settings, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ImageWithFallback } from "./f/ImageWithFallback";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { logout } from "@/lib/logout";

type Item = {
  id: number;
  title: string;
  type: "lost" | "found";
  location: string;
  created_at: string;
  updated_at?: string;
  images: { image: string }[];
};

export function UserDashboard() {

  const router = useRouter();
  const { user, loading, setUser } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [user, loading, router]);

  const [myItems, setMyItems] = useState<Item[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);

  const totalItems = myItems.length;
  const lostItems = myItems.filter(i => i.type === "lost").length;
  const foundItems = myItems.filter(i => i.type === "found").length;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api.get("/items/my-items/");
        setMyItems(res.data);
      } catch (err) {
        console.error("Failed to load items", err);
      } finally {
        setLoadingItems(false);
      }
    };

    if (user) fetchItems();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const initials =
    user?.full_name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("") || "U";

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/items/${id}/delete/`);
      setMyItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      {/* <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user?.avatar || undefined} alt={user.full_name} />
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div>
                <h1 className="text-gray-900">{user?.full_name || "User"}</h1>
                <p className="text-gray-600">{user?.email || "No email"}</p>
                <p className="text-gray-500">
                  Member since{" "}
                  {user?.created_at
                    ? new Date(user.created_at).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                    })
                    : "—"}
                  {" • "}
                  {user?.is_verified ? (
                    <Badge className="bg-blue-100 text-blue-700 border border-blue-200">
                      Verified
                    </Badge>
                  ) : (
                    <span className="text-gray-400">
                      Not verified
                    </span>
                  )}
                </p>
                {!user?.is_verified && (
                  <button
                    onClick={async () => {
                      try {
                        await api.post("/auth/resend-verification/");

                        setUser((prev: any) => ({
                          ...prev,
                          verification_sent: true
                        }));

                        alert("Verification email sent");
                      } catch (err: any) {
                        if (err.response?.status === 429) {
                          alert(err.response.data.error); // "Please wait before requesting again"
                        } else {
                          alert("Something went wrong");
                        }
                      }
                    }} className="text-blue-600 underline text-sm mt-1">
                    {user?.verification_sent
                      ? "Resend verification email"
                      : "Send verification email"}
                  </button>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <Link href="/profile" passHref>
                <Button variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </Link>
              <Button variant="outline" onClick={() => logout(api, setUser, router)}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div> */}

      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6 sm:py-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            {/* LEFT: USER INFO */}
            <div className="flex items-center gap-4 sm:gap-5">

              <Avatar className="h-16 w-16 sm:h-20 sm:w-20 ring-2 ring-gray-100">
                <AvatarImage src={user?.avatar || undefined} alt={user?.full_name} />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-medium">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-1">

                <h1 className="text-lg sm:text-xl font-semibold text-gray-900 leading-tight">
                  {user?.full_name || "User"}
                </h1>

                <p className="text-sm text-gray-500">
                  {user?.email || "No email provided"}
                </p>

                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500">

                  <span>
                    Member since{" "}
                    {user?.created_at
                      ? new Date(user.created_at).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                      })
                      : "—"}
                  </span>

                  <span className="hidden sm:inline">•</span>

                  {user?.is_verified ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">
                      Verified
                    </span>
                  ) : (
                    <span className="text-gray-400">Not verified</span>
                  )}
                </div>

                {/* Verification CTA */}
                {!user?.is_verified && (
                  <button
                    onClick={async () => {
                      try {
                        await api.post("/auth/resend-verification/");

                        setUser((prev: any) => ({
                          ...prev,
                          verification_sent: true,
                        }));

                        alert("Verification email sent");
                      } catch (err: any) {
                        if (err.response?.status === 429) {
                          alert(err.response.data.error);
                        } else {
                          alert("Something went wrong");
                        }
                      }
                    }}
                    className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition mt-1"
                  >
                    {user?.verification_sent
                      ? "Resend verification email"
                      : "Send verification email"}
                  </button>
                )}
              </div>
            </div>

            {/* RIGHT: ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">

              <Link href="/profile">
                <Button variant="outline" className="w-full sm:w-auto">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </Link>

              <Button
                variant="outline"
                className="w-full sm:w-auto text-red-600 hover:text-red-700"
                onClick={() => logout(api, setUser, router)}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>

          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="container mx-auto px-4 py-8">
        {/* STATS */}
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Items Posted</CardDescription>
              <CardTitle className="text-blue-600">{totalItems}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Items Lost</CardDescription>
              <CardTitle className="text-red-500">{lostItems}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Items Found</CardDescription>
              <CardTitle className="text-green-500">{foundItems}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* TABS */}
        <Tabs defaultValue="active" className="w-full">
          <TabsContent value="active" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {loadingItems ? (
                <p className="text-center col-span-full"></p>
              ) : myItems.length === 0 ? (
                <p className="text-gray-500 text-center col-span-full">
                  No items posted yet.
                </p>
              ) : (
                myItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => router.push(`/items/${item.id}`)}
                    className="overflow-hidden rounded-lg border bg-white transition-shadow hover:shadow-lg"
                  >
                    <div className="aspect-4/3 relative overflow-hidden bg-gray-100">
                      <ImageWithFallback
                        src={item.images?.[0]?.image || "/placeholder.png"}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />

                      <Badge
                        className={`absolute right-3 top-3 ${item.type === "lost"
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-green-500 hover:bg-green-600"
                          }`}
                      >
                        {item.type === "lost" ? "Lost" : "Found"}
                      </Badge>
                    </div>

                    <div className="p-4">
                      <h3 className="mb-2 text-gray-900 line-clamp-1 break-words">{item.title}</h3>

                      <div className="mb-3 flex items-center gap-1 text-gray-500">
                        <MapPin className="h-4 w-4" />
                        <span className="line-clamp-1">{item.location}</span>
                      </div>

                      <div className="mb-3 flex items-center justify-between text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{new Date(item.updated_at || item.created_at).toLocaleString(undefined, {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}</span>
                        </div>
                      </div>

                      {/* <div className="mb-3 flex items-start gap-2 text-gray-500">
                        <Clock className="h-4 w-4 mt-1" />

                        <div className="flex flex-col text-xs">
                          <span>
                            Posted: {new Date(item.created_at).toLocaleString()}
                          </span>

                          {item.updated_at && (
                            <span>
                              Updated: {new Date(item.updated_at).toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div> */}

                      <div className="flex gap-2">
                        <Button onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/edit-item/${item.id}`);
                        }}
                          variant="outline"
                          size="sm"
                          className="flex-1">
                          <Edit className="mr-1 h-4 w-4" />
                          Edit
                        </Button>

                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(item.id);
                          }}
                          variant="outline"
                          size="sm"
                          className="flex-1 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="mr-1 h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
