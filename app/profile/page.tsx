"use client";

import { useState, useEffect, FormEvent } from "react";
import { Edit2 } from "lucide-react";
import api from "@/lib/api";
import { useAuth } from "../auth/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";
import { Input } from "../components//ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

// export default function ProfilePage() {

//   const { fetchMe } = useAuth();

//   const [fullName, setFullName] = useState("mateen");
//   const [email, setEmail] = useState("mateen@example.com");
//   const [phone, setPhone] = useState("123-456-7890");
//   const [dob, setDob] = useState("2000-01-01");
//   const [gender, setGender] = useState("male");
//   const [street, setStreet] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [country, setCountry] = useState("");
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [profilePicFile, setProfilePicFile] = useState<File | null>(null);

//   const router = useRouter();
//   const { user, loading } = useAuth();

//   useEffect(() => {
//     if (!loading && !user) {
//       router.push("/signin");
//     }
//   }, [user, loading]);

//   // Profile Picture State
//   const [profilePic, setProfilePic] = useState<string | null>(null);

//   useEffect(() => {
//     return () => {
//       if (profilePic?.startsWith("blob:")) {
//         URL.revokeObjectURL(profilePic);
//       }
//     };
//   }, [profilePic]);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {

//         const res = await api.get("/accounts/auth/me/");
//         const data = res.data;

//         setFullName(data.full_name ?? "");
//         setEmail(data.email ?? "");
//         setProfilePic(data.avatar ?? null);
//         setPhone(data.phone ?? "");
//         setGender(data.gender ?? "male");
//         setStreet(data.street ?? "");
//         setCity(data.city ?? "");
//         setState(data.state ?? "");
//         setCountry(data.country ?? "");
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchUser();
//   }, []);

//   const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setProfilePicFile(file);
//       setProfilePic(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("full_name", fullName);
//       formData.append("email", email);
//       formData.append("phone", phone);
//       formData.append("gender", gender);
//       formData.append("street", street);
//       formData.append("city", city);
//       formData.append("state", state);
//       formData.append("country", country);

//       if (profilePicFile) {
//         formData.append("avatar", profilePicFile);
//       }

//       const res = await api.patch("/accounts/auth/me/update/", formData);

//       if (!res || res.status >= 400) {
//         setMessage("Profile update failed");
//         return;
//       }

//       await fetchMe();

//       let passwordMessage = "";

//       if (currentPassword && newPassword) {
//         if (newPassword !== confirmPassword) {
//           setMessage("Passwords do not match");
//           return;
//         }

//         try {
//           await api.post("/accounts/auth/change-password/", {
//             current_password: currentPassword,
//             new_password: newPassword,
//           });
//           passwordMessage = " Password updated.";
//         } catch (err: any) {
//           console.error(err);

//           const data = err.response?.data;

//           if (data?.error) {
//             setMessage(Array.isArray(data.error) ? data.error.join(" ") : data.error);
//           } else if (data?.detail) {
//             setMessage(data.detail);
//           } else {
//             setMessage("Password update failed");
//           }

//           return;
//         }
//       }

//       setMessage(
//         passwordMessage
//           ? `Profile updated successfully.${passwordMessage}`
//           : "Profile updated successfully"
//       );

//       setCurrentPassword("");
//       setNewPassword("");
//       setConfirmPassword("");

//     } catch (err) {
//       console.error(err);
//       setMessage("Profile update failed");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="flex flex-col items-center">
//           <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
//           <p className="text-gray-500 text-sm">Loading...</p>
//         </div>
//       </div>
//     );
//   }
//   if (!user) return null;

//   return (
//     <div style={container}>
//       <h1 style={{ textAlign: "center", fontSize: "28px", marginBottom: "30px" }}>
//         Edit Profile
//       </h1>

//       <form onSubmit={handleSubmit} style={card}>
//         {/* Profile Picture */}
//         <div style={{ textAlign: "center", marginBottom: "30px" }}>
//           <div
//             style={profilePicContainer}
//             onMouseEnter={(e) => {
//               const overlay = e.currentTarget.querySelector<HTMLDivElement>(".overlay");
//               if (overlay) overlay.style.opacity = "1";
//             }}
//             onMouseLeave={(e) => {
//               const overlay = e.currentTarget.querySelector<HTMLDivElement>(".overlay");
//               if (overlay) overlay.style.opacity = "0";
//             }}
//           >
//             <img
//               src={profilePic || "/default-avatar.png"}
//               style={profilePicStyle}
//               onError={(e) => {
//                 (e.target as HTMLImageElement).src = "/default-avatar.png";
//               }}
//             />
//             <div
//               className="overlay"
//               style={editOverlay}
//               onClick={() => document.getElementById("profileInput")?.click()}
//             >
//               <Edit2 size={24} />
//             </div>
//           </div>
//           <input
//             id="profileInput"
//             type="file"
//             accept="image/*"
//             style={fileInputStyle}
//             onChange={handleProfilePicChange}
//           />
//         </div>

//         {/* Personal Info */}
//         <h2 style={sectionTitle}>Personal Information</h2>
//         <div style={grid}>
//           <Field label="Full Name" value={fullName} onChange={setFullName} />
//           <Field label="Email" value={email} onChange={setEmail} />
//           <Field label="Phone" value={phone} onChange={setPhone} />

//           <div>
//             <label style={labelStyle}>Gender</label>
//             <select
//               value={gender}
//               onChange={(e) => setGender(e.target.value)}
//               style={inputStyle}
//             >
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//             </select>
//           </div>
//         </div>

//         {/* Address */}
//         <h2 style={{ ...sectionTitle, marginTop: "30px" }}>Address</h2>
//         <div style={grid}>
//           <Field label="Street" value={street} onChange={setStreet} />
//           <Field label="City" value={city} onChange={setCity} />
//           <Field label="State" value={state} onChange={setState} />
//           <Field label="Country" value={country} onChange={setCountry} />
//         </div>

//         {/* Password */}
//         <h2 style={{ ...sectionTitle, marginTop: "30px" }}>Change Password</h2>
//         <div style={grid}>
//           <Field
//             label="Current Password"
//             type="password"
//             value={currentPassword}
//             onChange={setCurrentPassword}
//           />
//           <Field
//             label="New Password"
//             type="password"
//             value={newPassword}
//             onChange={setNewPassword}
//           />
//         </div>
//         <div style={{ marginTop: "20px" }}>
//           <Field
//             label="Confirm New Password"
//             type="password"
//             value={confirmPassword}
//             onChange={setConfirmPassword}
//           />
//         </div>

//         <button type="submit" style={buttonStyle}>
//           Save Changes
//         </button>

//         {message && (
//           <p
//             style={{
//               marginTop: "16px",
//               textAlign: "center",
//               fontWeight: 600,
//               color: message.includes("success") ? "green" : "red",
//             }}
//           >
//             {message}
//           </p>
//         )}
//       </form>
//     </div>
//   );
// }

// /* Reusable Field */
// function Field({
//   label,
//   value,
//   onChange,
//   type = "text",
// }: {
//   label: string;
//   value: string;
//   type?: string;
//   onChange: (v: string) => void;
// }) {
//   return (
//     <div>
//       <label style={labelStyle}>{label}</label>
//       <input
//         type={type}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         style={inputStyle}
//       />
//     </div>
//   );
// }

export default function ProfilePage() {

  const { fetchMe } = useAuth();

  const [fullName, setFullName] = useState("username");
  const [email, setEmail] = useState("username@example.com");
  const [phone, setPhone] = useState("123-456-7890");
  const [dob, setDob] = useState("2000-01-01");
  const [gender, setGender] = useState("male");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);

  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [user, loading]);

  const [profilePic, setProfilePic] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (profilePic?.startsWith("blob:")) {
        URL.revokeObjectURL(profilePic);
      }
    };
  }, [profilePic]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/accounts/auth/me/");
        const data = res.data;
        setFullName(data.full_name ?? "");
        setEmail(data.email ?? "");
        setProfilePic(data.avatar ?? null);
        setPhone(data.phone ?? "");
        setGender(data.gender ?? "male");
        setStreet(data.street ?? "");
        setCity(data.city ?? "");
        setState(data.state ?? "");
        setCountry(data.country ?? "");
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicFile(file);
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("full_name", fullName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("gender", gender);
      formData.append("street", street);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("country", country);

      if (profilePicFile) {
        formData.append("avatar", profilePicFile);
      }

      const res = await api.patch("/accounts/auth/me/update/", formData);

      if (!res || res.status >= 400) {
        setMessage("Profile update failed");
        return;
      }

      await fetchMe();

      let passwordMessage = "";

      if (currentPassword && newPassword) {
        if (newPassword !== confirmPassword) {
          setMessage("Passwords do not match");
          return;
        }

        try {
          await api.post("/accounts/auth/change-password/", {
            current_password: currentPassword,
            new_password: newPassword,
          });
          passwordMessage = " Password updated.";
        } catch (err: any) {
          console.error(err);
          const data = err.response?.data;
          if (data?.error) {
            setMessage(Array.isArray(data.error) ? data.error.join(" ") : data.error);
          } else if (data?.detail) {
            setMessage(data.detail);
          } else {
            setMessage("Password update failed");
          }
          return;
        }
      }

      setMessage(
        passwordMessage
          ? `Profile updated successfully.${passwordMessage}`
          : "Profile updated successfully"
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (err) {
      console.error(err);
      setMessage("Profile update failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-9 h-9 border-[3px] border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500 font-medium">Loading...</p>
        </div>
      </div>
    );
  }
  if (!user) return null;

  const isSuccess = message.toLowerCase().includes("success");

  return (
    <div className="min-h-screen bg-gray-50/70 py-10 px-4">

      {/* Page title */}
      <div className="max-w-3xl mx-auto mb-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Edit Profile</h1>
        <p className="text-sm text-gray-500 mt-1">Update your personal details and account settings</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">

        {/* Profile Picture */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center gap-3">
          <div
            className="relative w-24 h-24 group cursor-pointer"
            onMouseEnter={(e) => {
              const overlay = e.currentTarget.querySelector<HTMLDivElement>(".overlay");
              if (overlay) overlay.style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              const overlay = e.currentTarget.querySelector<HTMLDivElement>(".overlay");
              if (overlay) overlay.style.opacity = "0";
            }}
          >
            <img
              src={profilePic || "/default-avatar.png"}
              alt="Profile picture"
              className="w-full h-full rounded-full object-cover border-2 border-gray-200 shadow-sm"
              // onError={(e) => {
              //   (e.target as HTMLImageElement).src = "/default-avatar.png";
              // }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;

                target.onerror = null;

                target.src = "/default-avatar.png";
              }}
            />
            <div
              className="overlay absolute inset-0 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 transition-opacity duration-200"
              onClick={() => document.getElementById("profileInput")?.click()}
              aria-label="Change profile picture"
            >
              <Edit2 size={18} aria-hidden="true" />
            </div>
          </div>
          <input
            id="profileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleProfilePicChange}
          />
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-800">{fullName}</p>
            <p className="text-xs text-gray-500 mt-0.5">{email}</p>
          </div>
          {/* <button
            type="button"
            onClick={() => document.getElementById("profileInput")?.click()}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
          >
            Change photo
          </button> */}
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Personal Information</h2>
            <p className="text-xs text-gray-500 mt-0.5">Your basic account details</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Full Name" value={fullName} onChange={setFullName} />
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Email
              </Label>

              <Input
                type="email"
                value={email}
                disabled
                className="h-10 rounded-lg border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed"
              />

              <p className="text-xs text-gray-500">
                Email cannot be changed.
              </p>
            </div>
            <Field label="Phone" value={phone} onChange={setPhone} type="tel" />

            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="h-10 rounded-lg border-gray-200 text-sm focus:ring-blue-500">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Address</h2>
            <p className="text-xs text-gray-500 mt-0.5">Where you're based</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Street" value={street} onChange={setStreet} />
            <Field label="City" value={city} onChange={setCity} />
            <Field label="State" value={state} onChange={setState} />
            <Field label="Country" value={country} onChange={setCountry} />
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Change Password</h2>
            <p className="text-xs text-gray-500 mt-0.5">Leave blank if you don't want to change it</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={setCurrentPassword}
            />
            <Field
              label="New Password"
              type="password"
              value={newPassword}
              onChange={setNewPassword}
            />
          </div>
          <Field
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
          />
        </div>

        {/* Feedback message */}
        {message && (
          <div
            className={`
              rounded-xl px-4 py-3 text-sm font-medium border
              ${isSuccess
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-red-50 text-red-600 border-red-200"
              }
            `}
            role="alert"
            aria-live="polite"
          >
            {message}
          </div>
        )}

        {/* Submit */}
        <Button
          type="submit"
          className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold shadow-sm hover:shadow focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-150"
        >
          Save Changes
        </Button>

      </form>
    </div>
  );
}

/* Reusable Field */
function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  type?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-gray-700">{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 rounded-lg border-gray-200 focus-visible:ring-blue-500 text-sm"
      />
    </div>
  );
}

