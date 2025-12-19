import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Products', path: '/products' },
    { name: 'All Products', path: '/all-products' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-[#1F2937] text-white py-2">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+919779286917" className="flex items-center gap-2 hover:text-[#3B82F6] transition-colors">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">+91 97792 86917</span>
            </a>
            <a href="mailto:info@ithubservices.in" className="flex items-center gap-2 hover:text-[#3B82F6] transition-colors">
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">info@ithubservices.in</span>
            </a>
          </div>
          <div className="text-gray-300 text-xs">
            Mon - Sat: 9:00 AM - 8:00 PM
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/ithubnew.png" 
              alt="IT Hub Services" 
              className="h-10 w-auto"
            />
            <span className="font-display text-xl font-bold text-[#1F2937]">IT Hub Services</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-[#1E40AF] text-white'
                    : 'text-[#1F2937] hover:bg-[#F3F4F6]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link to="/contact">
              <Button className="bg-[#1E40AF] hover:bg-[#3B82F6] text-white">
                Get Quote
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-[#1F2937] hover:bg-[#F3F4F6]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="max-w-[1280px] mx-auto px-6 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-[#1E40AF] text-white'
                    : 'text-[#1F2937] hover:bg-[#F3F4F6]'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full mt-4 bg-[#1E40AF] hover:bg-[#3B82F6] text-white">
                Get Quote
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
