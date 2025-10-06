import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    <footer className="w-full text-base-800 py-8 text-center" style={{ background: '#D7DED3' }}>
      <div className="w-full">
        {/* Newsletter Signup */}
        <div className="py-12 border-b border-border">
          <div className="max-w-md mx-auto text-center space-y-4">
            <h3 className="text-xl font-serif font-semibold text-foreground">
              Stay in the know
            </h3>
            <p className="text-sm text-muted-foreground">
              Get exclusive access to new products, wellness tips, and special offers.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button variant="premium" size="sm">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div
          className="w-full py-12"
          style={{
            background: "linear-gradient(135deg, #6B7C6B 0%, #D7DED3 100%)"
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-4">
              <Link to="/" className="inline-block">
                <span className="text-2xl font-serif font-bold text-foreground">Nutrition pHirst</span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed">
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
                    className="h-8 w-8"
                    asChild
                  >
                    <a href={social.href} aria-label={social.label}>
                      <social.icon className="h-4 w-4" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-4">
                <h4 className="font-medium text-foreground tracking-wide">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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