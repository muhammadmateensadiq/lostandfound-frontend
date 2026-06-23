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

export function SignupPage({ onBack }: SignupPageProps) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    setErrors({});

    if (!formData.agreeToTerms) {
      setErrors({ agreeToTerms: "You must accept Terms & Privacy Policy" });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    setLoading(true);

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
    } finally {
      setLoading(false);
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
                  className={`pl-10 h-11 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${errors.full_name ? "border-red-500" : ""
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
                  className={`pl-10 h-11 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${errors.email ? "border-red-500" : ""
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
                  className={`pl-10 h-11 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${errors.password ? "border-red-500" : ""
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
                  className={`pl-10 h-11 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${errors.confirmPassword ? "border-red-500" : ""
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

            {errors.agreeToTerms && (
              <p className="text-red-500 text-xs mt-1">
                {errors.agreeToTerms}
              </p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 shadow-md transition-all"
            >
              {loading ? "Creating..." : "Create Account"}
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