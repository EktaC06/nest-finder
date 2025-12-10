import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, Building2, Users, ChevronDown, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/pgfinder-logo.svg";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const { user, userRole, signOut, isLoading } = useAuth();

  const navLinks = [
    { label: "Find PGs", href: "/search" },
    { label: "Cities", href: "/cities" },
    { label: "How it Works", href: "/how-it-works" },
    { label: "Help", href: "/help" },
  ];

  const roleOptions = [
    { label: "PG Seeker", icon: User, href: "/auth?role=client", description: "Find your perfect PG" },
    { label: "PG Owner", icon: Building2, href: "/auth?role=owner", description: "List your property" },
    { label: "Broker", icon: Users, href: "/auth?role=broker", description: "Partner with us" },
  ];

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
    navigate("/");
  };

  const getRoleLabel = () => {
    switch (userRole) {
      case "owner": return "PG Owner";
      case "broker": return "Broker";
      case "admin": return "Admin";
      default: return "PG Seeker";
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="PGFinder" className="h-12 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          {(userRole === "owner" || userRole === "broker") && (
            <Link to="/owner/dashboard">
              <Button variant="ghost" size="sm">
                List Your PG
              </Button>
            </Link>
          )}
          
          {isLoading ? (
            <div className="h-8 w-24 bg-muted animate-pulse rounded-md" />
          ) : user ? (
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="gap-2"
              >
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <span className="max-w-24 truncate">{user.email?.split("@")[0]}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
              
              <AnimatePresence>
                {showUserMenu && (
                  <>
                    <div
                      className="fixed inset-0"
                      onClick={() => setShowUserMenu(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-2 w-56 rounded-xl border bg-card p-2 shadow-lg"
                    >
                      <div className="px-3 py-2 border-b mb-2">
                        <div className="font-medium text-sm truncate">{user.email}</div>
                        <div className="text-xs text-muted-foreground">{getRoleLabel()}</div>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors"
                      >
                        <User className="h-4 w-4" />
                        My Profile
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors text-destructive"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className="gap-1"
              >
                Login / Signup
                <ChevronDown className="h-4 w-4" />
              </Button>
              
              <AnimatePresence>
                {showRoleMenu && (
                  <>
                    <div
                      className="fixed inset-0"
                      onClick={() => setShowRoleMenu(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-2 w-64 rounded-xl border bg-card p-2 shadow-lg"
                    >
                      {roleOptions.map((role) => (
                        <button
                          key={role.href}
                          onClick={() => {
                            navigate(role.href);
                            setShowRoleMenu(false);
                          }}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-muted transition-colors"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <role.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">{role.label}</div>
                            <div className="text-xs text-muted-foreground">{role.description}</div>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t bg-card"
          >
            <div className="container py-4 space-y-4">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              
              <div className="border-t pt-4 space-y-2">
                {user ? (
                  <>
                    <div className="px-3 py-2">
                      <div className="font-medium text-sm truncate">{user.email}</div>
                      <div className="text-xs text-muted-foreground">{getRoleLabel()}</div>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      <User className="h-5 w-5 text-primary" />
                      <span className="font-medium text-sm">My Profile</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsOpen(false);
                      }}
                      className="flex w-full items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-destructive"
                    >
                      <LogOut className="h-5 w-5" />
                      <span className="font-medium text-sm">Sign Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <p className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Get Started As
                    </p>
                    {roleOptions.map((role) => (
                      <Link
                        key={role.href}
                        to={role.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                      >
                        <role.icon className="h-5 w-5 text-primary" />
                        <span className="font-medium text-sm">{role.label}</span>
                      </Link>
                    ))}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
