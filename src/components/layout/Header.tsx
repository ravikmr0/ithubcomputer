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

  // Searchable data with direct links to specific pages
  const searchData = {
    services: [
      { title: 'Laptop & Desktop Repair', path: '/services/laptop-desktop-repair', category: 'Services', keywords: ['laptop', 'desktop', 'repair', 'computer', 'fix', 'broken'] },
      { title: 'Data Recovery Services', path: '/services/data-recovery', category: 'Services', keywords: ['data', 'recovery', 'lost', 'files', 'backup', 'restore'] },
      { title: 'Software Installation & Support', path: '/services/software-installation', category: 'Services', keywords: ['software', 'installation', 'install', 'setup', 'windows', 'office', 'antivirus'] },
      { title: 'CCTV Installation', path: '/services/cctv-installation', category: 'Services', keywords: ['cctv', 'camera', 'security', 'surveillance', 'video', 'monitoring'] },
      { title: 'Biometric Systems', path: '/services/biometric-systems', category: 'Services', keywords: ['biometric', 'fingerprint', 'attendance', 'access', 'control', 'scanner'] },
    ],
    products: [
      { title: 'Hardware Parts', path: '/products/hardware-parts', category: 'Products', keywords: ['hardware', 'parts', 'components', 'motherboard', 'processor', 'cpu', 'gpu'] },
      { title: 'Laptops & Notebooks', path: '/products/laptops-notebooks', category: 'Products', keywords: ['laptop', 'notebook', 'portable', 'computer', 'business', 'gaming'] },
      { title: 'Desktop Computers', path: '/products/desktop-computers', category: 'Products', keywords: ['desktop', 'computer', 'pc', 'tower', 'workstation'] },
      { title: 'Monitors & Displays', path: '/products/monitors-displays', category: 'Products', keywords: ['monitor', 'display', 'screen', 'lcd', 'led', 'curved'] },
      { title: 'Keyboards', path: '/products/keyboards', category: 'Products', keywords: ['keyboard', 'mechanical', 'wireless', 'gaming', 'typing'] },
      { title: 'Mouse & Trackpads', path: '/products/mouse-trackpads', category: 'Products', keywords: ['mouse', 'trackpad', 'wireless', 'gaming', 'optical'] },
      { title: 'Storage Devices', path: '/products/storage-devices', category: 'Products', keywords: ['storage', 'hard drive', 'ssd', 'hdd', 'external', 'usb', 'flash'] },
      { title: 'Memory RAM', path: '/products/memory-ram', category: 'Products', keywords: ['ram', 'memory', 'ddr4', 'ddr5', 'upgrade'] },
      { title: 'Audio Equipment', path: '/products/audio-equipment', category: 'Products', keywords: ['audio', 'speaker', 'headphone', 'sound', 'microphone'] },
      { title: 'Printers & Scanners', path: '/products/printers-scanners', category: 'Products', keywords: ['printer', 'scanner', 'print', 'ink', 'laser', 'copy'] },
    ],
    pages: navLinks.map(link => ({ title: link.name, path: link.path, category: 'Pages', keywords: [] as string[] })),
  };

  // Handle search
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      const results: any[] = [];

      // Search through all data (title and keywords)
      Object.values(searchData).forEach(items => {
        items.forEach(item => {
          const titleMatch = item.title.toLowerCase().includes(query);
          const keywordMatch = item.keywords?.some((keyword: string) => keyword.toLowerCase().includes(query));
          
          if (titleMatch || keywordMatch) {
            results.push(item);
          }
        });
      });

      // Remove duplicates and limit to 8 results
      const uniqueResults = results.filter((item, index, self) => 
        index === self.findIndex(t => t.path === item.path)
      );
      
      setSearchResults(uniqueResults.slice(0, 8));
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
                src="/ithubcom.png" 
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
              src="/ithubcom.png" 
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
