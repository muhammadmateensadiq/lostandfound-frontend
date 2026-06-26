import { ArrowLeft, MapPin, Clock, MessageCircle, Flag, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useAuth } from "../auth/AuthContext";

interface ItemDetailPageProps {
  onBack: () => void;
  itemId: number;
}

export function ItemDetailPage({ onBack, itemId }: ItemDetailPageProps) {

  const [item, setItem] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showReport, setShowReport] = useState(false);
  const [reportText, setReportText] = useState("");
  const [verification, setVerification] = useState<any>(null);
  const [verifying, setVerifying] = useState(false);
  const [contactNumber, setContactNumber] = useState<string | null>(null);
  const [loadingContact, setLoadingContact] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await api.get(`/items/${itemId}/`);
        setItem(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchItem();
  }, [itemId]);

  // const handleContact = async () => {
  //   try {
  //     const res = await api.get(`/items/contact/${itemId}/`);

  //     const phone = res.data.phone;
  //     const whatsapp = res.data.whatsapp;

  //     if (whatsapp) {
  //       window.open(`https://wa.me/${whatsapp}`, "_blank");
  //     } else if (phone) {
  //       window.location.href = `tel:${phone}`;
  //     }

  //   } catch (err) {
  //     alert("User has not added contact info.");
  //   }
  // };

  const handleContact = async () => {
    try {
      setLoadingContact(true);

      const res = await api.get(`/items/contact/${itemId}/`);

      setContactNumber(res.data.phone);

    } catch (err) {
      alert("User has not added contact info.");
    } finally {
      setLoadingContact(false);
    }
  };

  const verifyBlockchain = async () => {

    try {

      setVerifying(true);

      const res = await api.get(
        `/blockchain/verify/${item.id}/`
      );

      setVerification(res.data);

    } catch (err) {

      console.error(err);

      alert("Verification failed");

    } finally {

      setVerifying(false);
    }
  };

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-100 bg-gray-200 rounded-xl"></div>
          <div className="h-6 bg-gray-200 w-1/2 rounded"></div>
          <div className="h-4 bg-gray-200 w-1/3 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="space-y-4">
                {/* Main Image */}
                {/* <div
                  style={{
                    width: "100%",
                    height: "400px",
                    overflow: "hidden",
                    borderRadius: "12px",
                    backgroundColor: "#f3f4f6",
                    position: "relative",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={item.images?.[selectedImage]?.image || "https://placehold.co/400x400/e5e7eb/6b7280?text=No+Image"}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transform: "scale(1)",
                      transition: "transform 300ms ease",
                      transformOrigin: "center",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  />

                  <Badge
                    className={`absolute top-3 right-3 z-10 ${item.type === "lost"
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                      }`}
                  >
                    {item.type === "lost" ? "Lost" : "Found"}
                  </Badge>

                  
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(0,0,0,0)",
                    transition: "background-color 300ms ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(0,0,0,0)";
                  }}
                />
              </div> */}

                <div
                  style={{
                    width: "100%",
                    height: "400px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    borderRadius: "12px",
                    backgroundColor: "#f3f4f6",
                    position: "relative",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={
                      item.images?.[selectedImage]?.image ||
                      "https://placehold.co/400x400/e5e7eb/6b7280?text=No+Image"
                    }
                    alt={item.title}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                      display: "block",
                      transition: "transform 300ms ease",
                      transformOrigin: "center",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  />

                  <Badge
                    className={`absolute top-3 right-3 z-10 ${item.type === "lost"
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                      }`}
                  >
                    {item.type === "lost" ? "Lost" : "Found"}
                  </Badge>

                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundColor: "rgba(0,0,0,0)",
                      transition: "background-color 300ms ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(0,0,0,0)";
                    }}
                  />
                </div>

                {/* Thumbnails (modern horizontal scroll) */}
                {item.images?.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2 pt-3 px-1 scrollbar-hide">
                    {item.images.map((img: any, index: number) => (
                      <button
                        key={img.id}
                        onClick={() => setSelectedImage(index)}
                        className={`relative shrink-0 min-w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200
    ${selectedImage === index
                            ? "border-blue-600 scale-105"
                            : "border-transparent opacity-70 hover:opacity-100"
                          }`}
                      >
                        <img
                          src={img.image}
                          alt=""
                          className="w-full h-full object-cover"
                        />

                        {/* Active indicator */}
                        {selectedImage === index && (
                          <div className="absolute inset-0 ring-2 ring-blue-500 rounded-lg" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-2xl font-semibold break-all">{item.title}</h1>
                    </div>
                    <div className="flex items-center gap-4 text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span className="break-all">{item.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>
                          {new Date(item.updated_at || item.created_at).toLocaleString(undefined, {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: item.title,
                            text: item.description,
                            url: window.location.href,
                          });
                        } else {
                          navigator.clipboard.writeText(window.location.href);
                          alert("Link copied!");
                        }
                      }}
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        if (!user) {
                          alert("Please login to report this item");
                          return;
                        }
                        if (!user?.is_verified) {
                          alert("Please verify your email before reporting");
                          return;
                        }

                        setShowReport(true);
                      }}
                    >
                      <Flag className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <Separator className="my-6" />

                <div>
                  <h3 className="text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line break-all">
                    {item.description}
                  </p>
                </div>

                <Separator className="my-6" />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 mb-1">Category</p>
                    <p className="text-gray-900">{item.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Date Lost</p>
                    <p className="text-gray-900">{item.date}</p>
                  </div>
                  {item.reward && (
                    <div>
                      <p className="text-gray-500 mb-1">Reward</p>
                      <p className="text-gray-900">{item.reward}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="text-gray-900 mb-4">Posted By</h3>

              <div className="flex items-center gap-3 mb-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={item.poster.avatar} />
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {item.poster?.name
                      ? item.poster.name.split(' ').map((n: string) => n[0]).join('')
                      : "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-gray-900">{item.poster?.name || "Unknown User"}</p>
                  <p className="text-gray-500">
                    Member since{" "}
                    {item.poster?.created_at
                      ? new Date(item.poster.created_at).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                      })
                      : "—"}
                    {" • "}
                    {item.poster?.is_verified ? (
                      <Badge className="bg-blue-100 text-blue-700 border border-blue-200">
                        Verified
                      </Badge>
                    ) : (
                      <span className="text-gray-400">Not verified</span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 mb-6 text-center">
                <div className="flex-1 bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-900">{item.poster?.itemsPosted || 0}</p>
                  <p className="text-gray-500">Items Posted</p>
                </div>
              </div>

              {/* <Button className="w-full bg-blue-600 hover:bg-blue-700 mb-3"
                onClick={handleContact}>
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact
              </Button> */}

              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 mb-3"
                onClick={handleContact}
                disabled={loadingContact}
              >
                <MessageCircle className="w-4 h-4 mr-2" />

                {loadingContact
                  ? "Loading..."
                  : contactNumber
                    ? contactNumber
                    : "Show Contact"}
              </Button>

              <Button
                variant="outline"
                className="w-full mb-3"
                onClick={verifyBlockchain}
                disabled={verifying}
              >
                {verifying
                  ? "Verifying..."
                  : "Verify on Blockchain"}
              </Button>

              {verification && (

                <div className="rounded-lg border p-4 mb-4">

                  {verification.verified ? (

                    <div className="text-green-600">

                      <p className="font-semibold">
                        Blockchain Verified
                      </p>

                      <p className="text-sm break-all mt-2">
                        Transaction:
                      </p>

                      <a
                        href={`https://amoy.polygonscan.com/tx/${verification.transaction_hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline break-all text-sm"
                      >
                        View on PolygonScan
                      </a>

                    </div>

                  ) : (

                    <div className="text-red-600">

                      <p className="font-semibold">
                        Integrity Failed
                      </p>

                      <p className="text-sm mt-2">
                        Item data may have been modified.
                      </p>

                    </div>
                  )}

                </div>
              )}

              <div className="bg-blue-50 rounded-lg p-4 mt-4">
                <h4 className="text-gray-900 mb-2">Safety Tips</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Meet in public places</li>
                  <li>• Verify item details</li>
                  <li>• Don't share personal info</li>
                  <li>• Trust your instincts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        showReport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl animate-in fade-in zoom-in-95">

              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Report Item
                </h2>
                <button
                  onClick={() => setShowReport(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-500 mb-4">
                Tell us what's wrong with this post. Your report will be reviewed.
              </p>

              {/* Input */}
              <textarea
                className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
                rows={4}
                placeholder="Spam, fake item, inappropriate content..."
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
              />

              {/* Actions */}
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowReport(false)}
                >
                  Cancel
                </Button>

                <Button
                  className="bg-red-600 hover:bg-red-700"
                  disabled={!reportText.trim()}
                  onClick={async () => {

                    if (!reportText.trim()) return;

                    try {
                      await api.post(`/items/${itemId}/report/`, {
                        reason: reportText,
                      });

                      setShowReport(false);
                      setReportText("");

                      console.log("Reported successfully");
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  Submit Report
                </Button>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
}
