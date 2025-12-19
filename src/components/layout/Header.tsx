import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Products', path: '/products' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-[#1F2937] text-white shadow-lg">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/ithubnew.png" 
              alt="IT HUB Computer Logo" 
              className="h-14 w-14 object-contain rounded-lg shadow-md transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-display text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                IT HUB Computer
              </span>
              <span className="text-xs text-gray-300 font-mono-accent tracking-wider uppercase">
                All IT Services Provider 
              </span>
            </div>
          </Link>

          {/* Search Box */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-[#374151] border-gray-600 text-white placeholder:text-gray-400 focus:border-[#3B82F6] focus:ring-[#3B82F6]"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-[#3B82F6] ${
                  isActive(link.path) ? 'text-[#3B82F6]' : 'text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a href="tel:+919779286917">
              <Button className="bg-[#1E40AF] hover:bg-[#3B82F6] text-white btn-press shadow-lg hover:shadow-xl font-semibold">
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1F2937] border-t border-gray-700">
          <nav className="px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block text-base font-medium transition-colors hover:text-[#3B82F6] ${
                  isActive(link.path) ? 'text-[#3B82F6]' : 'text-white'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <a href="tel:+919779286917" className="block">
              <Button className="w-full bg-[#1E40AF] hover:bg-[#3B82F6] text-white btn-press">
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
