import { useState, useEffect, FormEvent, CSSProperties } from "react";
import { Search, Mail, Lock, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import api from "@/lib/api";
import { useAuth } from "../auth/AuthContext";
import Link from "next/link";

interface SigninPageProps {
  onBack: () => void;
  onSignupClick: () => void;
  onSignIn: () => void;
}

// export function SigninPage({ onBack, onSignupClick, onSignIn }: SigninPageProps) {

//   const { fetchMe } = useAuth();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     remember: false,
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await api.post("/accounts/auth/login/", {
//         email: formData.email,
//         password: formData.password,
//       });

//       await fetchMe();

//       window.location.href = "/dashboard";

//       onSignIn();

//     } catch (err: any) {
//       console.error(err);
//       if (err.response?.status === 500) {
//         alert("Server Error: Have you run your migrations?");
//       } else {
//         alert("Invalid email or password");
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-br flex items-center justify-center py-12 px-4">
//       <div className="max-w-md w-full">

//         <div className="bg-white rounded-lg border border-gray-250 shadow-lg p-8">
//           <div className="flex items-center justify-center gap-2 mb-6">
//             <Search className="w-8 h-8 text-blue-600" />
//             <span className="text-blue-600">FindIt</span>
//           </div>

//           <h2 className="text-center mb-2 text-gray-900">Welcome Back</h2>
//           <p className="text-center text-gray-600 mb-6">
//             Sign in to access your account
//           </p>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <Label htmlFor="email">Email Address</Label>
//               <div className="relative mt-1">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="you@example.com"
//                   className="pl-10"
//                   value={formData.email}
//                   onChange={(e) =>
//                     setFormData({ ...formData, email: e.target.value })
//                   }
//                   required
//                 />
//               </div>
//             </div>

//             <div>
//               <Label htmlFor="password">Password</Label>
//               <div className="relative mt-1">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <Input
//                   id="password"
//                   type="password"
//                   placeholder="••••••••"
//                   className="pl-10"
//                   value={formData.password}
//                   onChange={(e) =>
//                     setFormData({ ...formData, password: e.target.value })
//                   }
//                   required
//                 />
//               </div>
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <Checkbox
//                   id="remember"
//                   checked={formData.remember}
//                   onCheckedChange={(checked) =>
//                     setFormData({ ...formData, remember: checked as boolean })
//                   }
//                 />
//                 <label htmlFor="remember" className="text-gray-600 cursor-pointer">
//                   Remember me
//                 </label>
//               </div>
//               <Link href="/forgot-password" className="text-blue-600 hover:underline">
//                 Forgot password?
//               </Link>
//             </div>

//             <Button
//               type="submit"
//               className="w-full bg-blue-600 hover:bg-blue-700"
//             >
//               Sign In
//             </Button>
//           </form>

//           <div className="mt-6 text-center">
//             <p className="text-gray-600">
//               Don't have an account?{" "}
//               <button
//                 onClick={onSignupClick}
//                 className="text-blue-600 hover:underline"
//               >
//                 Sign Up
//               </button>
//             </p>
//           </div>

//           {/* <div className="mt-6 relative">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-300"></div>
//             </div>
//             <div className="relative flex justify-center">
//               <span className="px-4 bg-white text-gray-500">
//                 Or continue with
//               </span>
//             </div>
//           </div>

//           <div className="mt-6">
//             <Button
//               variant="outline"
//               type="button"
//               className="flex items-center justify-center gap-3 h-11 w-full border-gray-300 hover:bg-gray-50"
//             >
//               <img
//                 src="https://developers.google.com/identity/images/g-logo.png"
//                 alt="Google logo"
//                 className="w-5 h-5"
//               />
//               <span className="text-sm font-medium text-gray-700">
//                 Continue with Google
//               </span>
//             </Button>
//           </div> */}

//         </div>
//       </div>
//     </div>
//   );
// }

export function SigninPage({
  onBack,
  onSignupClick,
  onSignIn,
}: SigninPageProps) {
  const { fetchMe } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/accounts/auth/login/", {
        email: formData.email,
        password: formData.password,
      });

      await fetchMe();

      window.location.href = "/dashboard";

      onSignIn();
    } catch (err: any) {
      console.error(err);

      if (err.response?.status === 500) {
        alert("Server Error: Have you run your migrations?");
      } else {
        alert("Invalid email or password");
      }
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl transition-all duration-300 p-6 sm:p-8">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center gap-1 -ml-1">
              <Search className="w-7 h-7 text-blue-600" />
              <span className="text-3xl font-bold leading-none">
                <span className="text-black">Find</span>
                <span className="text-blue-600">It</span>
              </span>
            </div>
          </div>

          {/* Header */}
          <div className="mb-7">
            <h2 className="text-center text-2xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>

            <p className="text-center text-sm text-gray-500">
              Sign in to access your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email Address
              </Label>

              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10 h-11 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </Label>

              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 h-11 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={formData.remember}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      remember: checked as boolean,
                    })
                  }
                />

                <label
                  htmlFor="remember"
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  Remember me
                </label>
              </div>

              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              className="w-full h-11 rounded-lg bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-200"
            >
              Sign In
            </Button>
          </form>

          {/* Signup */}
          <div className="pt-7 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <button
                onClick={onSignupClick}
                className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}