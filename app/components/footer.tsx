import { Search, Facebook, Twitter, Instagram, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* TOP GRID */}
        <div className="grid gap-8 mb-12 md:grid-cols-4">
          {/* LOGO + DESCRIPTION */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 mb-4 transform transition-transform hover:scale-105 duration-300"
            >
              <Search className="w-6 h-6 text-blue-500 animate-pulse" />
              <span className="text-white text-lg font-bold">FindIt</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Helping reunite people with their lost belongings. 
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-white mb-4 font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "Lost Items", href: "/lost-items" },
                { name: "Found Items", href: "/found-items" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-blue-400 transition-colors duration-300 hover:translate-x-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-white mb-4 font-semibold">Contact Us</h4>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500 animate-pulse" />
                <a
                  href="mailto:support@findit.com"
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  support@findit.com
                </a>
              </li>
            </ul>

            {/* SOCIALS */}
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-linear-to-br hover:from-blue-500 hover:to-purple-500 transition-all duration-500 transform hover:scale-110"
                >
                  <Icon className="w-5 h-5 text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-gray-800 pt-6 text-center text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} FindIt. All rights reserved. |{" "}
            <Link href="#" className="hover:text-blue-400 transition-colors duration-300">
              Privacy Policy
            </Link>{" "}
            |{" "}
            <Link href="#" className="hover:text-blue-400 transition-colors duration-300">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
      <div className="md:hidden h-16" />
    </footer>
  );
}
