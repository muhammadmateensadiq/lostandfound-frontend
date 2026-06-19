import { useState } from "react";
import { Upload, MapPin, Calendar, DollarSign } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth/AuthContext";
import api from "@/lib/api";

interface PostItemPageProps {
  onSuccess: () => void;
  itemId?: string;
  isEdit?: boolean;
}

export function PostItemPage({ onSuccess, itemId, isEdit }: PostItemPageProps) {

  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [user, loading, router]);

  const [formData, setFormData] = useState<{
    type: string;
    title: string;
    category: string;
    description: string;
    location: string;
    date: string;
    reward: string;
    images: File[];
  }>({
    type: "lost",
    title: "",
    category: "",
    description: "",
    location: "",
    date: "",
    reward: "",
    images: [],
  });

  type ImageType =
    | { id: number; image: string }  // from backend
    | File;                          // new uploads

  const [previewUrls, setPreviewUrls] = useState<ImageType[]>([]);

  useEffect(() => {
    const newImages: ImageType[] = formData.images.map((file) => file);

    setPreviewUrls((prev) => [
      ...prev.filter((img) => !(img instanceof File)), // keep backend images
      ...newImages,
    ]);
  }, [formData.images]);

  useEffect(() => {
    if (isEdit && itemId) {
      api.get(`/items/${itemId}/`)
        .then(res => {
          const data = res.data;

          setFormData({
            type: data.type,
            title: data.title,
            category: data.category || "",
            description: data.description,
            location: data.location,
            date: data.date,
            reward: data.reward || "",
            images: [],
          });

          setPreviewUrls(data.images || []);
        });
    }
  }, [isEdit, itemId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.is_verified) {
      alert("Please verify your email before posting");
      return;
    }

    const form = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "images" && value) {
        form.append(key, value as string);
      }
    });

    formData.images.forEach((img) => {
      form.append("images", img);
    });

    try {
      let res;

      if (isEdit) {
        res = await api.patch(`/items/${itemId}/update/`, form);
      } else {
        res = await api.post("/items/create/", form);
      }

      onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

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

  //   return (
  //     <div className="min-h-screen bg-gray-50 py-8">
  //       <div className="container mx-auto px-4 max-w-3xl">
  //         <div className="bg-white rounded-lg shadow-sm p-8">
  //           <h1 className="mb-2 text-blue-600 font-bold">Post an Item</h1>
  //           <p className="text-gray-600 mb-8">
  //             Fill out the details below to post a lost or found item
  //           </p>

  //           <form onSubmit={handleSubmit} className="space-y-6">
  //             <div>
  //               <Label>Item Status</Label>
  //               <RadioGroup
  //                 value={formData.type}
  //                 onValueChange={(value) => setFormData({ ...formData, type: value })}
  //                 className="flex gap-4 mt-2"
  //               >
  //                 <div className="flex items-center space-x-2">
  //                   <RadioGroupItem value="lost" id="lost" />
  //                   <Label htmlFor="lost" className="cursor-pointer">
  //                     I Lost Something
  //                   </Label>
  //                 </div>
  //                 <div className="flex items-center space-x-2">
  //                   <RadioGroupItem value="found" id="found" />
  //                   <Label htmlFor="found" className="cursor-pointer">
  //                     I Found Something
  //                   </Label>
  //                 </div>
  //               </RadioGroup>
  //             </div>

  //             <div>
  //               <Label htmlFor="title">Item Title</Label>
  //               <Input
  //                 id="title"
  //                 placeholder="e.g., Brown Leather Wallet"
  //                 value={formData.title}
  //                 onChange={(e) => setFormData({ ...formData, title: e.target.value })}
  //                 required
  //                 className="mt-1"
  //               />
  //             </div>

  //             <div>
  //               <Label htmlFor="category">Category</Label>
  //               <Select
  //                 value={formData.category}
  //                 onValueChange={(value) => setFormData({ ...formData, category: value })}
  //               >
  //                 <SelectTrigger className="mt-1">
  //                   <SelectValue placeholder="Select a category" />
  //                 </SelectTrigger>
  //                 <SelectContent>
  //                   <SelectItem value="wallet">Wallets</SelectItem>
  //                   <SelectItem value="phone">Phones</SelectItem>
  //                   <SelectItem value="keys">Keys</SelectItem>
  //                   <SelectItem value="bags">Bags & Backpacks</SelectItem>
  //                   <SelectItem value="pets">Pets</SelectItem>
  //                   <SelectItem value="jewelry">Jewelry & Accessories</SelectItem>
  //                   <SelectItem value="electronics">Electronics</SelectItem>
  //                   <SelectItem value="documents">Documents</SelectItem>
  //                   <SelectItem value="other">Other</SelectItem>
  //                 </SelectContent>
  //               </Select>
  //             </div>

  //             <div>
  //               <Label htmlFor="description">Description</Label>
  //               <Textarea
  //                 id="description"
  //                 placeholder="Provide detailed description including color, brand, distinctive features..."
  //                 value={formData.description}
  //                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
  //                 required
  //                 rows={4}
  //                 className="mt-1"
  //               />
  //             </div>

  //             <div>
  //               <Label htmlFor="location">Location</Label>
  //               <div className="relative mt-1">
  //                 <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
  //                 <Input
  //                   id="location"
  //                   placeholder="Where was it lost/found?"
  //                   className="pl-10"
  //                   value={formData.location}
  //                   onChange={(e) => setFormData({ ...formData, location: e.target.value })}
  //                   required
  //                 />
  //               </div>
  //             </div>

  //             <div>
  //               <Label htmlFor="date">Date</Label>
  //               <div className="relative mt-1">
  //                 <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
  //                 <Input
  //                   id="date"
  //                   type="date"
  //                   className="pl-10"
  //                   value={formData.date}
  //                   max={new Date().toISOString().split("T")[0]}
  //                   onChange={(e) => setFormData({ ...formData, date: e.target.value })}
  //                   required
  //                 />
  //               </div>
  //             </div>

  //             {formData.type === "lost" && (
  //               <div>
  //                 <Label htmlFor="reward">Reward (Optional)</Label>
  //                 <div className="relative mt-1">
  //                   <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
  //                   <Input
  //                     id="reward"
  //                     type="number"
  //                     placeholder="0"
  //                     className="pl-10"
  //                     value={formData.reward}
  //                     onChange={(e) => setFormData({ ...formData, reward: e.target.value })}
  //                   />
  //                 </div>
  //               </div>
  //             )}

  //             <div className="space-y-4">
  //               {/* Label */}
  //               <Label className="block text-base font-semibold text-gray-900">
  //                 Upload Photos
  //               </Label>

  //               {/* Hidden input */}
  //               <input
  //                 id="fileUpload"
  //                 type="file"
  //                 accept="image/*"
  //                 multiple
  //                 className="hidden"
  //                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
  //                   const files = e.target.files ? Array.from(e.target.files) : [];
  //                   const total = formData.images.length + files.length;

  //                   if (total > 5) {
  //                     alert("You can upload maximum 5 images only");
  //                     return;
  //                   }

  //                   setFormData(prev => ({
  //                     ...prev,
  //                     images: [...prev.images, ...files],
  //                   }));
  //                 }}
  //               />

  //               {/* Dropzone */}
  //               <label htmlFor="fileUpload" className="block">
  //                 <div
  //                   className={`
  //         rounded-2xl border-2 border-dashed
  //         p-8 sm:p-10 text-center cursor-pointer
  //         transition-all duration-200
  //         bg-white
  //         ${formData.images.length >= 5
  //                       ? "border-gray-200 opacity-60 cursor-not-allowed"
  //                       : "border-gray-300 hover:border-blue-500 hover:bg-blue-50"
  //                     }
  //       `}
  //                 >
  //                   <div className="flex flex-col items-center gap-3">
  //                     {/* Icon */}
  //                     <div className="p-3 sm:p-4 rounded-full bg-blue-50">
  //                       <Upload className="w-6 h-6 sm:w-7 sm:h-7 text-blue-500" />
  //                     </div>

  //                     {/* Text */}
  //                     <div className="space-y-1">
  //                       <p className="text-gray-900 font-medium">
  //                         Drag & drop your images here
  //                       </p>
  //                       <p className="text-sm text-gray-500">
  //                         or click to browse files
  //                       </p>
  //                     </div>

  //                     {/* Info */}
  //                     <p className="text-xs text-gray-400">
  //                       PNG, JPG up to 10MB • Maximum 5 images
  //                     </p>

  //                     {/* Progress */}
  //                     <div className="mt-3 w-full max-w-xs">
  //                       <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
  //                         <div
  //                           className="h-full bg-linear-to-r from-blue-500 to-indigo-500 transition-all duration-300"
  //                           style={{
  //                             width: `${(formData.images.length / 5) * 100}%`,
  //                           }}
  //                         />
  //                       </div>

  //                       <p className="mt-1 text-xs text-gray-600">
  //                         {formData.images.length} of 5 uploaded
  //                       </p>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </label>

  //               {/* Preview */}
  //               {previewUrls.length > 0 && (
  //                 <div className="space-y-4">
  //                   {/* <p className="text-sm font-semibold text-gray-800">
  //                     Selected Images ({previewUrls.length}/5)
  //                   </p> */}

  //                   <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
  //                     {previewUrls.map((img, index) => {
  //                       const src =
  //                         img instanceof File
  //                           ? URL.createObjectURL(img)
  //                           : img.image;

  //                       return (
  //                         <div
  //                           key={index}
  //                           className="relative group aspect-square rounded-xl overflow-hidden border bg-gray-100 shadow-sm group"
  //                         >
  //                           {/* Image */}
  //                           <img
  //                             src={src}
  //                             alt="preview"
  //                             className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
  //                           />

  //                           {/* Overlay */}
  //                           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition" />

  //                           {/* Delete button */}
  //                           <button
  //                             type="button"
  //                             onClick={async () => {
  //                               const image = previewUrls[index];

  //                               // backend delete
  //                               if (!(image instanceof File)) {
  //                                 try {
  //                                   await api.delete(`/items/image/${image.id}/delete/`);
  //                                 } catch (err) {
  //                                   console.error(err);
  //                                   return;
  //                                 }
  //                               }

  //                               // remove preview
  //                               setPreviewUrls(prev => prev.filter((_, i) => i !== index));

  //                               // remove local file
  //                               if (image instanceof File) {
  //                                 setFormData(prev => ({
  //                                   ...prev,
  //                                   images: prev.images.filter((file) => file !== image)
  //                                 }));
  //                               }
  //                             }}
  //                             style={{ position: "absolute", top: 0, right: 0, zIndex: 9999, color: "white", width: "30px", height: "30px" }}
  //                           >
  //                             ×
  //                           </button>

  //                           {/* Badge (optional nice touch) */}
  //                           {!(img instanceof File) && (
  //                             <span className="absolute bottom-1 left-1 text-[10px] bg-black/70 text-white px-2 py-0.5 rounded">
  //                               Saved
  //                             </span>
  //                           )}
  //                         </div>
  //                       );
  //                     })}
  //                   </div>
  //                 </div>
  //               )}
  //             </div>

  //             <div className="flex gap-4 pt-4">
  //               <Button
  //                 type="button"
  //                 variant="outline"
  //                 className="flex-1"
  //                 onClick={() => window.history.back()}
  //               >
  //                 Cancel
  //               </Button>
  //               <Button
  //                 type="submit"
  //                 className="flex-1 bg-blue-600 hover:bg-blue-700"
  //               // disabled={!user?.is_verified}
  //               // className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
  //               >
  //                 {isEdit ? "Update Item" : "Post Item"}
  //               </Button>
  //             </div>
  //           </form>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-white-50/70 py-10">
      <div className="container mx-auto px-4 max-w-2xl">

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
            {isEdit ? "Edit Item" : "Post an Item"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Fill out the details below to post a lost or found item
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Item Status */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Item Status</Label>
              <RadioGroup
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
                className="grid grid-cols-2 gap-3 mt-1"
              >
                {[
                  { value: "lost", label: "I Lost Something" },
                  { value: "found", label: "I Found Something" },
                ].map(({ value, label }) => (
                  <label
                    key={value}
                    htmlFor={value}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer
                      transition-all duration-150
                      ${formData.type === value
                        ? value === "lost"
                          ? "border-red-400 bg-red-50 text-red-700"
                          : "border-green-400 bg-green-50 text-green-700"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                      }
                    `}
                  >
                    <RadioGroupItem value={value} id={value} className="sr-only" />
                    <span
                      className={`w-2.5 h-2.5 rounded-full shrink-0 ${formData.type === value
                        ? value === "lost" ? "bg-red-400" : "bg-green-400"
                        : "bg-gray-300"
                        }`}
                    />
                    <span className="text-sm font-medium">{label}</span>
                  </label>
                ))}
              </RadioGroup>
            </div>

            {/* Title */}
            <div className="space-y-1.5">
              <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                Item Title
              </Label>
              <Input
                id="title"
                placeholder="e.g., Brown Leather Wallet"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="h-10 rounded-lg border-gray-200 focus-visible:ring-blue-500 text-sm"
              />
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                Category
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="h-10 rounded-lg border-gray-200 focus:ring-blue-500 text-sm">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="wallet">Wallets</SelectItem>
                  <SelectItem value="phone">Phones</SelectItem>
                  <SelectItem value="keys">Keys</SelectItem>
                  <SelectItem value="bags">Bags & Backpacks</SelectItem>
                  <SelectItem value="pets">Pets</SelectItem>
                  <SelectItem value="jewelry">Jewelry & Accessories</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="documents">Documents</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Describe color, brand, size, and any distinctive features..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={4}
                className="rounded-lg border-gray-200 focus-visible:ring-blue-500 text-sm resize-none"
              />
            </div>

            {/* Location + Date row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                  Location
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
                  <Input
                    id="location"
                    placeholder="Where was it lost/found?"
                    className="pl-9 h-10 rounded-lg border-gray-200 focus-visible:ring-blue-500 text-sm"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="date" className="text-sm font-medium text-gray-700">
                  Date
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
                  <Input
                    id="date"
                    type="date"
                    className="pl-9 h-10 rounded-lg border-gray-200 focus-visible:ring-blue-500 text-sm"
                    value={formData.date}
                    max={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Reward — only for lost */}
            {formData.type === "lost" && (
              <div className="space-y-1.5">
                <Label htmlFor="reward" className="text-sm font-medium text-gray-700">
                  Reward <span className="text-gray-400 font-normal">(Optional)</span>
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
                  <Input
                    id="reward"
                    type="number"
                    min={0}
                    placeholder="0"
                    className="pl-9 h-10 rounded-lg border-gray-200 focus-visible:ring-blue-500 text-sm"
                    value={formData.reward}
                    onChange={(e) => setFormData({ ...formData, reward: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* Upload Photos */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">
                Upload Photos
              </Label>

              <input
                id="fileUpload"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const files = e.target.files ? Array.from(e.target.files) : [];
                  const total = formData.images.length + files.length;
                  if (total > 5) {
                    alert("You can upload maximum 5 images only");
                    return;
                  }
                  setFormData(prev => ({
                    ...prev,
                    images: [...prev.images, ...files],
                  }));
                }}
              />

              <label htmlFor="fileUpload" className="block">
                <div
                  className={`
                    rounded-xl border-2 border-dashed p-8 text-center cursor-pointer
                    transition-all duration-200
                    ${formData.images.length >= 5
                      ? "border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed pointer-events-none"
                      : "border-gray-200 bg-gray-50 hover:border-blue-400 hover:bg-blue-50"
                    }
                  `}
                >
                  <div className="flex flex-col items-center gap-2.5">
                    <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
                      <Upload className="w-5 h-5 text-blue-600" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        Click to upload photos
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        PNG, JPG up to 10MB · max 5 images
                      </p>
                    </div>

                    {/* Upload progress bar */}
                    <div className="w-full max-w-50 mt-1">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>{formData.images.length} of 5 uploaded</span>
                        <span>{Math.round((formData.images.length / 5) * 100)}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all duration-300"
                          style={{ width: `${(formData.images.length / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </label>

              {/* Image Preview Grid */}
              {previewUrls.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {previewUrls.map((img, index) => {
                    const src =
                      img instanceof File
                        ? URL.createObjectURL(img)
                        : img.image;

                    return (
                      <div
                        key={index}
                        className="relative group aspect-square rounded-xl overflow-hidden border bg-gray-100 shadow-sm group"
                      >
                        {/* Image */}
                        <img
                          src={src}
                          alt="preview"
                          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition" />

                        {/* Delete button */}
                        <button
                          type="button"
                          onClick={async () => {
                            const image = previewUrls[index];

                            // backend delete
                            if (!(image instanceof File)) {
                              try {
                                await api.delete(`/items/image/${image.id}/delete/`);
                              } catch (err) {
                                console.error(err);
                                return;
                              }
                            }

                            // remove preview
                            setPreviewUrls(prev => prev.filter((_, i) => i !== index));

                            // remove local file
                            if (image instanceof File) {
                              setFormData(prev => ({
                                ...prev,
                                images: prev.images.filter((file) => file !== image)
                              }));
                            }
                          }}
                          style={{ position: "absolute", top: 0, right: 0, zIndex: 9999, color: "white", width: "30px", height: "30px" }}
                        >
                          ×
                        </button>

                        {/* Badge (optional nice touch) */}
                        {!(img instanceof File) && (
                          <span className="absolute bottom-1 left-1 text-[10px] bg-black/70 text-white px-2 py-0.5 rounded">
                            Saved
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-10 rounded-lg border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 focus-visible:ring-blue-500 transition-colors duration-150"
                onClick={() => window.history.back()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-10 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-medium shadow-sm hover:shadow focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-150"
              >
                {isEdit ? "Update Item" : "Post Item"}
              </Button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}