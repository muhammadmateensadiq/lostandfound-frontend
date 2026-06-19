import { useState } from "react";
import { Search, Mail, Lock, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import api from "@/lib/api";

interface SignupPageProps {
  onBack: () => void;
}

// export function SignupPage({ onBack }: SignupPageProps) {

//   const [errors, setErrors] = useState<{ [key: string]: string }>({});

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     agreeToTerms: false,
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     setErrors({});

//     if (formData.password !== formData.confirmPassword) {
//       setErrors({ confirmPassword: "Passwords do not match" });
//       return;
//     }

//     try {
//       const res = await api.post("/accounts/auth/signup/", {
//         email: formData.email,
//         full_name: formData.fullName,
//         password: formData.password,
//       });

//       const data = res.data;

//       window.location.href = "/dashboard";

//     } catch (err: any) {
//       console.error(err);

//       if (err.response && err.response.data) {
//         const data = err.response.data;

//         const formattedErrors: { [key: string]: string } = {};

//         Object.keys(data).forEach((key) => {
//           formattedErrors[key] = Array.isArray(data[key])
//             ? data[key][0]
//             : data[key];
//         });

//         setErrors(formattedErrors);
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

//           <h2 className="text-center mb-2 text-gray-900">Create Account</h2>
//           <p className="text-center text-gray-600 mb-6">
//             Join our community to help reunite lost items with their owners
//           </p>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <Label htmlFor="fullName">Full Name</Label>
//               <div className="relative mt-1">
//                 <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <Input
//                   id="fullName"
//                   type="text"
//                   placeholder="Name"
//                   className={`pl-10 ${errors.full_name ? "border-red-500" : ""}`}
//                   value={formData.fullName}
//                   onChange={(e) =>
//                     setFormData({ ...formData, fullName: e.target.value })
//                   }
//                   required
//                 />
//               </div>
//               {errors.full_name && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.full_name}
//                 </p>
//               )}
//             </div>

//             <div>
//               <Label htmlFor="email">Email Address</Label>
//               <div className="relative mt-1">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="you@example.com"
//                   className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
//                   value={formData.email}
//                   onChange={(e) =>
//                     setFormData({ ...formData, email: e.target.value })
//                   }
//                   required
//                 />
//               </div>
//               {errors.email && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.email}
//                 </p>
//               )}
//             </div>

//             <div>
//               <Label htmlFor="password">Password</Label>
//               <div className="relative mt-1">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <Input
//                   id="password"
//                   type="password"
//                   placeholder="Password"
//                   className={`pl-10 ${errors.password ? "border-red-500" : ""}`}
//                   value={formData.password}
//                   onChange={(e) =>
//                     setFormData({ ...formData, password: e.target.value })
//                   }
//                   required
//                 />
//               </div>
//               {errors.password && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.password}
//                 </p>
//               )}
//             </div>

//             <div>
//               <Label htmlFor="confirmPassword">Confirm Password</Label>
//               <div className="relative mt-1">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <Input
//                   id="confirmPassword"
//                   type="password"
//                   placeholder="Confirm Password"
//                   className={`pl-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
//                   value={formData.confirmPassword}
//                   onChange={(e) =>
//                     setFormData({ ...formData, confirmPassword: e.target.value })
//                   }
//                   required
//                 />
//               </div>
//               {errors.confirmPassword && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.confirmPassword}
//                 </p>
//               )}
//             </div>

//             <div className="flex items-start gap-2">
//               <Checkbox
//                 id="terms"
//                 checked={formData.agreeToTerms}
//                 onCheckedChange={(checked) =>
//                   setFormData({ ...formData, agreeToTerms: checked as boolean })
//                 }
//               />
//               <label htmlFor="terms" className="text-gray-600 cursor-pointer">
//                 I agree to the{" "}
//                 <a href="#" className="text-blue-600 hover:underline">
//                   Terms of Service
//                 </a>{" "}
//                 and{" "}
//                 <a href="#" className="text-blue-600 hover:underline">
//                   Privacy Policy
//                 </a>
//               </label>
//             </div>

//             <Button
//               type="submit"
//               className="w-full bg-blue-600 hover:bg-blue-700"
//             >
//               Create Account
//             </Button>
//           </form>

//           <div className="mt-6 text-center">
//             <p className="text-gray-600">
//               Already have an account?{" "}
//               <button onClick={onBack} className="text-blue-600 hover:underline">
//                 Sign In
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

export function SignupPage({ onBack }: SignupPageProps) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    try {
      await api.post("/accounts/auth/signup/", {
        email: formData.email,
        full_name: formData.fullName,
        password: formData.password,
      });

      window.location.href = "/dashboard";
    } catch (err: any) {
      console.error(err);

      if (err.response?.data) {
        const data = err.response.data;

        const formattedErrors: { [key: string]: string } = {};

        Object.keys(data).forEach((key) => {
          formattedErrors[key] = Array.isArray(data[key])
            ? data[key][0]
            : data[key];
        });

        setErrors(formattedErrors);
      }
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl p-6 sm:p-8">

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2">
              <Search className="w-7 h-7 text-blue-600" />
              <span className="text-3xl font-bold text-blue-600 leading-none">
                FindIt
              </span>
            </div>
          </div>

          {/* Header */}
          <div className="mb-7 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Create Account
            </h2>
            <p className="text-sm text-gray-500">
              Join our community to help reunite lost items
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Full Name */}
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Full Name
              </Label>

              <div className="relative mt-2">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                <Input
                  type="text"
                  placeholder="Name"
                  autoComplete="name"
                  className={`pl-10 h-11 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                    errors.full_name ? "border-red-500" : ""
                  }`}
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  required
                />
              </div>

              {errors.full_name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.full_name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Email Address
              </Label>

              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                <Input
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={`pl-10 h-11 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Password
              </Label>

              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                <Input
                  type="password"
                  placeholder="Password"
                  autoComplete="new-password"
                  className={`pl-10 h-11 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>

              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Confirm Password
              </Label>

              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                <Input
                  type="password"
                  placeholder="Confirm Password"
                  autoComplete="new-password"
                  className={`pl-10 h-11 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                />
              </div>

              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    agreeToTerms: checked as boolean,
                  })
                }
              />

              <label
                htmlFor="terms"
                className="text-sm text-gray-600 leading-relaxed"
              >
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 shadow-md transition-all"
            >
              Create Account
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={onBack}
                className="text-blue-600 hover:underline font-medium"
              >
                Sign In
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}