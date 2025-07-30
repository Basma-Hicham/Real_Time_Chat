import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User , Phone} from "lucide-react";
import { Link } from "react-router-dom";

import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
  phone: "",
  age: "",
  dateOfBirth: "",
  address: {
    street: "",
    city: ""
  },
  role: "student",
  wantHint: false
});
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
     if (!formData.name) {
    return toast.error("Full name is required");
  }

  if (!/^[A-Za-z]+ [A-Za-z]+$/.test(formData.name)) {
    return toast.error("Name must be two words with letters only");
  }

  if (!formData.email) {
    return toast.error("Email is required");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    return toast.error("Please enter a valid email");
  }

  if (!formData.password) {
    return toast.error("Password is required");
  }

  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(formData.password)) {
    return toast.error("Password must be 8+ chars with uppercase, number, and special character");
  }

  if (!formData.phone) {
    return toast.error("Phone is required");
  }

  if (!/^\d{11}$/.test(formData.phone)) {
    return toast.error("Phone must be 11 digits");
  }

  if (!formData.address.street || !formData.address.city) {
    return toast.error("Street and city are required");
  }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();

    if (success === true) signup(formData);

  };

 return (
  <div className="min-h-screen grid lg:grid-cols-2">
    {/* Left side */}
    <div className="flex flex-col justify-center items-center p-6 sm:p-12 overflow-y-auto">
      <div className="w-full max-w-md space-y-6">
        {/* LOGO */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 group">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <MessageSquare className="size-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mt-2">Complete Your Profile</h1>
            <p className="text-base-content/60">Fill in all required information</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Full Name*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="size-5 text-base-content/40" />
              </div>
              <input
                type="text"
                className="input input-bordered w-full pl-10"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="size-5 text-base-content/40" />
              </div>
              <input
                type="email"
                className="input input-bordered w-full pl-10"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Password*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="size-5 text-base-content/40" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pl-10"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="size-5 text-base-content/40" />
                ) : (
                  <Eye className="size-5 text-base-content/40" />
                )}
              </button>
            </div>
            <label className="label">
              <span className="label-text-alt">
                Must include uppercase, number, and special character
              </span>
            </label>
          </div>

          {/* Phone Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Phone*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="size-5 text-base-content/40" />
              </div>
              <input
                type="tel"
                className="input input-bordered w-full pl-10"
                placeholder="12345678901"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            <label className="label">
              <span className="label-text-alt">11 digits required</span>
            </label>
          </div>

          {/* Age Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Age</span>
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              placeholder="25"
              min="5"
              max="100"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            />
          </div>

          {/* Date of Birth */}
          {/* <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Date of Birth</span>
            </label>
            <input
              type="date"
              className="input input-bordered w-full"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            />
          </div> */}

          {/* Address Section */}
          <div className="space-y-2">
            <h3 className="font-medium">Address*</h3>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Street*</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="123 Main St"
                value={formData.address.street}
                onChange={(e) => setFormData({
                  ...formData,
                  address: { ...formData.address, street: e.target.value }
                })}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">City*</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="New York"
                value={formData.address.city}
                onChange={(e) => setFormData({
                  ...formData,
                  address: { ...formData.address, city: e.target.value }
                })}
                required
              />
            </div>
          </div>

        

          {/* Hint Preference */}
          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                checked={formData.wantHint}
                onChange={(e) => setFormData({ ...formData, wantHint: e.target.checked })}
              />
              <span className="label-text">I want password hints</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full mt-6"
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                <span className="ml-2">Creating Account...</span>
              </>
            ) : (
              "Complete Registration"
            )}
          </button>
        </form>

        <div className="text-center pt-4">
          <p className="text-base-content/60">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>

    {/* Right side - image */}
    <AuthImagePattern
      title="Join our community"
      subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
    />
  </div>
);
      

};
export default SignUpPage;