import { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2, User, Users, Mail, Phone, Lock, Eye, EyeOff, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import type { Database } from "@/integrations/supabase/types";

type AppRole = Database["public"]["Enums"]["app_role"];

const roles = [
  {
    id: "client" as AppRole,
    label: "PG Seeker",
    icon: User,
    description: "Find your perfect PG accommodation",
  },
  {
    id: "owner" as AppRole,
    label: "PG Owner",
    icon: Building2,
    description: "List your property and get tenants",
  },
  {
    id: "broker" as AppRole,
    label: "Broker",
    icon: Users,
    description: "Partner with us as an agent",
  },
];

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, signUp, signIn, isLoading: authLoading } = useAuth();
  
  const initialRole = (searchParams.get("role") as AppRole) || "client";
  
  const [selectedRole, setSelectedRole] = useState<AppRole>(initialRole);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user && !authLoading) {
      navigate("/");
    }
  }, [user, authLoading, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (authMode === "signup") {
        // Validation
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "Passwords don't match",
            description: "Please make sure your passwords match",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        if (formData.password.length < 6) {
          toast({
            title: "Password too short",
            description: "Password must be at least 6 characters",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        const { error } = await signUp(formData.email, formData.password, {
          full_name: formData.name,
          phone: formData.phone,
          role: selectedRole,
        });

        if (error) {
          let errorMessage = error.message;
          if (error.message.includes("already registered")) {
            errorMessage = "This email is already registered. Please sign in instead.";
          }
          toast({
            title: "Sign up failed",
            description: errorMessage,
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        toast({
          title: "Account created!",
          description: "Welcome to PGFinder. You are now logged in.",
        });
      } else {
        // Login
        const { error } = await signIn(formData.email, formData.password);

        if (error) {
          let errorMessage = error.message;
          if (error.message.includes("Invalid login credentials")) {
            errorMessage = "Invalid email or password. Please try again.";
          }
          toast({
            title: "Login failed",
            description: errorMessage,
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
      }

      // Navigation will happen automatically via useEffect
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-8"
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Building2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold">
              PG<span className="text-primary">Finder</span>
            </span>
          </Link>

          {/* Role Selection */}
          <div>
            <h2 className="text-2xl font-bold mb-2">
              {authMode === "login" ? "Welcome back" : "Create your account"}
            </h2>
            <p className="text-muted-foreground">
              {authMode === "login" 
                ? "Sign in to continue to your account" 
                : "Choose your role to get started"}
            </p>
          </div>

          {/* Role Cards */}
          {authMode === "signup" && (
            <div className="grid grid-cols-3 gap-3">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={cn(
                    "relative p-4 rounded-xl border-2 text-center transition-all",
                    selectedRole === role.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  {selectedRole === role.id && (
                    <div className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </div>
                  )}
                  <role.icon className={cn(
                    "h-8 w-8 mx-auto mb-2",
                    selectedRole === role.id ? "text-primary" : "text-muted-foreground"
                  )} />
                  <div className="font-medium text-sm">{role.label}</div>
                </button>
              ))}
            </div>
          )}

          {/* Auth Form */}
          <Tabs value={authMode} onValueChange={(v) => setAuthMode(v as "login" | "signup")}>
            <TabsList className="w-full">
              <TabsTrigger value="login" className="flex-1">Login</TabsTrigger>
              <TabsTrigger value="signup" className="flex-1">Sign Up</TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              {authMode === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {authMode === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  {authMode === "login" && (
                    <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {authMode === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                      minLength={6}
                    />
                  </div>
                </div>
              )}

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    {authMode === "login" ? "Sign In" : "Create Account"}
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
          </Tabs>

          {/* Terms */}
          <p className="text-center text-sm text-muted-foreground">
            By continuing, you agree to our{" "}
            <Link to="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Panel - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-primary">
          <img
            src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200"
            alt="Modern living space"
            className="h-full w-full object-cover opacity-20"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center p-16">
          <div className="text-center text-primary-foreground max-w-lg">
            <h2 className="text-4xl font-bold mb-6">
              {selectedRole === "client" && "Find Your Perfect Home Away From Home"}
              {selectedRole === "owner" && "Turn Your Property Into Income"}
              {selectedRole === "broker" && "Partner With India's Largest PG Platform"}
            </h2>
            <p className="text-xl opacity-90">
              {selectedRole === "client" && "Discover verified PG accommodations with transparent pricing and hassle-free booking."}
              {selectedRole === "owner" && "List your property for free and connect with thousands of verified tenants."}
              {selectedRole === "broker" && "Earn commission by helping property owners list and manage their PGs."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
