import { Link } from "react-router-dom";
import { Building2, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const footerLinks = {
    forSeekers: [
      { label: "Find PGs", href: "/search" },
      { label: "Popular Cities", href: "/cities" },
      { label: "How it Works", href: "/how-it-works" },
      { label: "FAQs", href: "/help" },
    ],
    forOwners: [
      { label: "List Your Property", href: "/owner/dashboard" },
      { label: "Owner Dashboard", href: "/owner/dashboard" },
      { label: "Pricing", href: "/pricing" },
      { label: "Partner with Us", href: "/auth?role=broker" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Contact Us", href: "/contact" },
    ],
    legal: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Refund Policy", href: "/refund" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="border-t bg-secondary text-secondary-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Building2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold">
                PG<span className="text-primary">Finder</span>
              </span>
            </Link>
            <p className="text-sm text-secondary-foreground/70 mb-6 max-w-xs">
              Find your perfect paying guest accommodation. Verified listings, transparent pricing, hassle-free booking.
            </p>
            
            <div className="space-y-2 text-sm text-secondary-foreground/70">
              <a href="mailto:hello@pgfinder.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="h-4 w-4" />
                hello@pgfinder.com
              </a>
              <a href="tel:+911234567890" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="h-4 w-4" />
                +91 123 456 7890
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Bangalore, India
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">For Seekers</h4>
            <ul className="space-y-2">
              {footerLinks.forSeekers.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">For Owners</h4>
            <ul className="space-y-2">
              {footerLinks.forOwners.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-secondary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-secondary-foreground/60">
            © {new Date().getFullYear()} PGFinder. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-foreground/10 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}