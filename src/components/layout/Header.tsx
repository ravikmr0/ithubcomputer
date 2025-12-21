import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Products', path: '/products' },
    { name: 'Contact', path: '/contact' },
  ];

  // Searchable data
  const searchData = {
    services: [
      { title: 'Laptop & Desktop Repair', path: '/services', category: 'Services' },
      { title: 'Data Recovery Services', path: '/services', category: 'Services' },
      { title: 'Software Installation & Support', path: '/services', category: 'Services' },
      { title: 'CCTV Installation', path: '/services', category: 'Services' },
      { title: 'Biometric Systems', path: '/services', category: 'Services' },
      { title: 'Network Setup', path: '/services', category: 'Services' },
    ],
    products: [
      { title: 'Business Laptops', path: '/products', category: 'Products' },
      { title: 'Gaming Laptops', path: '/products', category: 'Products' },
      { title: 'Desktop Computers', path: '/products', category: 'Products' },
      { title: 'RAM Modules', path: '/products', category: 'Products' },
      { title: 'Hard Drives', path: '/products', category: 'Products' },
      { title: 'Processors', path: '/products', category: 'Products' },
      { title: 'Keyboards & Mouse', path: '/products', category: 'Products' },
      { title: 'Monitors', path: '/products', category: 'Products' },
      { title: 'Printers & Scanners', path: '/products', category: 'Products' },
      { title: 'Network Equipment', path: '/products', category: 'Products' },
      { title: 'CCTV Systems', path: '/products', category: 'Products' },
      { title: 'Biometric Devices', path: '/products', category: 'Products' },
    ],
    pages: navLinks.map(link => ({ title: link.name, path: link.path, category: 'Pages' })),
  };

  // Handle search
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      const results: any[] = [];

      // Search through all data
      Object.values(searchData).forEach(items => {
        items.forEach(item => {
          if (item.title.toLowerCase().includes(query)) {
            results.push(item);
          }
        });
      });

      setSearchResults(results.slice(0, 8)); // Limit to 8 results
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchQuery]);

  // Click outside to close search results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchResultClick = (path: string) => {
    navigate(path);
    setSearchQuery('');
    setShowSearchResults(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-[#1a1f2e] shadow-lg sticky top-0 z-50">
      {/* Main Header */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="flex md:hidden flex-col py-3 gap-2">
          {/* Mobile: Logo & Brand Name with Menu */}
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/ithubnew.png" 
                alt="ITHUB Computer" 
                className="h-10 w-auto flex-shrink-0"
              />
              <div className="flex flex-col">
                <span className="font-bold text-base text-white tracking-wide whitespace-nowrap">ITHUB Computer</span>
                <span className="text-[9px] text-gray-400 tracking-widest uppercase whitespace-nowrap">All IT Services Provider</span>
              </div>
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              className="p-2 rounded-md text-white hover:bg-[#252b3d] flex-shrink-0"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          
          {/* Mobile: Search Bar */}
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search services, products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#252b3d] border-[#3a4052] text-white placeholder:text-gray-400 focus:border-[#4a9eff] focus:ring-[#4a9eff]"
            />
            
            {/* Mobile Search Results */}
            {searchQuery && searchResults.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-[#252b3d] border border-[#3a4052] rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                {searchResults.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      handleSearchResultClick(result.path);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-[#1a1f2e] transition-colors border-b border-[#3a4052] last:border-b-0"
                  >
                    <p className="text-white text-sm font-medium">{result.title}</p>
                    <p className="text-gray-400 text-xs mt-1">{result.category}</p>
                  </button>
                ))}
              </div>
            )}
            
            {searchQuery && searchResults.length === 0 && (
              <div className="absolute top-full mt-2 w-full bg-[#252b3d] border border-[#3a4052] rounded-md p-4">
                <p className="text-gray-400 text-sm text-center">No results found for "{searchQuery}"</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/ithubnew.png" 
              alt="ITHUB Computer" 
              className="h-12 w-auto"
            />
            <div className="flex flex-col">
              <span className="font-bold text-xl text-white tracking-wide">ITHUB Computer</span>
              <span className="text-[10px] text-gray-400 tracking-widest uppercase">All IT Services Provider</span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8" ref={searchRef}>
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search services, products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery && setShowSearchResults(true)}
                className="w-full pl-10 pr-4 py-2 bg-[#252b3d] border-[#3a4052] text-white placeholder:text-gray-400 focus:border-[#4a9eff] focus:ring-[#4a9eff]"
              />
              
              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-[#252b3d] border border-[#3a4052] rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
                  {searchResults.map((result, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearchResultClick(result.path)}
                      className="w-full px-4 py-3 text-left hover:bg-[#1a1f2e] transition-colors border-b border-[#3a4052] last:border-b-0"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium">{result.title}</p>
                          <p className="text-gray-400 text-xs mt-1">{result.category}</p>
                        </div>
                        <Search className="w-4 h-4 text-gray-500" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
              
              {/* No Results Message */}
              {showSearchResults && searchQuery && searchResults.length === 0 && (
                <div className="absolute top-full mt-2 w-full bg-[#252b3d] border border-[#3a4052] rounded-md shadow-lg z-50 p-4">
                  <p className="text-gray-400 text-sm text-center">No results found for "{searchQuery}"</p>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Call Now Button */}
          <div className="hidden md:block ml-4">
            <a href="tel:+919779286917">
              <Button className="bg-[#4a9eff] hover:bg-[#3b82f6] text-white font-medium px-6 py-2 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Call Now
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#252b3d] border-t border-[#3a4052]">
          <nav className="max-w-[1400px] mx-auto px-4 py-4 space-y-2">
            {/* Mobile Nav Links */}
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-[#4a9eff] text-white'
                    : 'text-gray-300 hover:bg-[#1a1f2e] hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Mobile Call Now Button */}
            <a href="tel:+919779286917" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full mt-4 bg-[#4a9eff] hover:bg-[#3b82f6] text-white flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
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
