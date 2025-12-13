import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LeafDecoration from "@/components/LeafDecoration";

const Footer = () => {
  const footerSections = [
    {
      title: "Shop",
      links: [
        { name: "Best Sellers", href: "/products?category=bestsellers" },
        { name: "Gut Health", href: "/products?category=gut-health" },
        { name: "Sleep & Mood", href: "/products?category=sleep-mood" },
        { name: "Bundles", href: "/products?category=bundles" },
        { name: "All Products", href: "/products" },
      ]
    },
    {
      title: "Learn", 
      links: [
        { name: "About Us", href: "/about" },
        { name: "Reviews", href: "/reviews" },
        { name: "Blog", href: "/blog" },
        { name: "Science", href: "/science" },
        { name: "FAQ", href: "/faq" },
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Contact Us", href: "/contact" },
        { name: "Shipping Info", href: "/shipping" },
        { name: "Returns", href: "/returns" },
        { name: "Size Guide", href: "/size-guide" },
        { name: "Track Order", href: "/track" },
      ]
    },
    {
      title: "Account",
      links: [
        { name: "My Account", href: "/account" },
        { name: "Order History", href: "/orders" },
        { name: "Wishlist", href: "/wishlist" },
        { name: "Subscriptions", href: "/subscriptions" },
      ]
    }
  ];

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Follow on Instagram" },
    { icon: Facebook, href: "#", label: "Follow on Facebook" },
    { icon: Twitter, href: "#", label: "Follow on Twitter" },
    { icon: Youtube, href: "#", label: "Subscribe on YouTube" },
  ];

  return (
    <footer style={{ background: 'linear-gradient(90deg, #c5e0bf 0%, #a6d1a0 50%, #7fb57d 100%)' }} className="w-full py-8 text-center relative overflow-hidden bg-gradient-to-r from-emerald-200 via-emerald-300 to-emerald-400 text-white">
      {/* Decorative leaves */}
      <div className="pointer-events-none absolute inset-0">
        <LeafDecoration className="absolute -left-12 top-24 opacity-40 scale-150 rotate-45" size={180} color="var(--tertiary)" />
        <LeafDecoration className="absolute right-[-3rem] top-12 opacity-30 scale-125 -rotate-12" size={200} color="var(--accent)" />
        <LeafDecoration className="absolute left-1/4 bottom-[-2rem] opacity-20 scale-90" size={160} color="var(--tertiary)" />
        <LeafDecoration className="absolute right-1/3 bottom-16 opacity-25 scale-75 rotate-90" size={140} color="var(--accent)" />
      </div>
      <div className="w-full">
        {/* Newsletter Signup */}
        <div className="py-12 relative">
          <div className="max-w-md mx-auto text-center space-y-4">
            <h3 className="text-2xl font-serif font-semibold text-white">
              Stay in the know
            </h3>
            <p className="text-base text-white/90 max-w-sm mx-auto">
              Get exclusive access to new products, wellness tips, and special offers.
            </p>
            <div className="flex gap-3 max-w-sm mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/90 backdrop-blur border-tertiary focus:border-accent rounded-lg px-4 py-2"
              />
              <Button variant="premium" size="sm">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="w-full py-12 relative bg-white/10 backdrop-blur-sm border-t border-white/10 shadow-inner rounded-t-3xl">

          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-6">
              <Link to="/" className="inline-block">
                <span className="text-3xl font-serif font-bold text-white tracking-tight">Nutrition pHirst</span>
              </Link>
              <p className="text-base text-white/80 leading-relaxed max-w-xs">
                Premium wellness supplements designed for modern life. 
                Scientifically-backed solutions for optimal health and cognitive performance.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 bg-white/10 rounded-full hover:bg-white/20 text-white"
                    asChild
                  >
                    <a href={social.href} aria-label={social.label}>
                      <social.icon className="h-4 w-4 text-white" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-6">
                <h4 className="font-serif font-semibold text-lg text-white">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-base text-white/90 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        {/* <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-xs text-muted-foreground">
              <Link to="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link to="/accessibility" className="hover:text-foreground transition-colors">
                Accessibility
              </Link>
            </div>
            
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Nutrition pHirst. All rights reserved.
            </p>
          </div>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
