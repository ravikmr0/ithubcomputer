import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Linkedin, Laptop, Monitor, Keyboard, Mouse, HardDrive, MemoryStick, Headphones, Printer, Cpu, Wifi, Cable, Battery } from 'lucide-react';

const Footer = () => {
  const services = [
    'Laptop & Desktop Repair',
    'Data Recovery',
    'Software Installation',
    'CCTV Installation',
    'Biometric Systems',
    'Hardware Parts',
  ];

  const products = [
    { name: 'Laptops & Notebooks', icon: Laptop },
    { name: 'Desktop Computers', icon: Monitor },
    { name: 'Monitors & Displays', icon: Monitor },
    { name: 'Keyboards', icon: Keyboard },
    { name: 'Mouse & Trackpads', icon: Mouse },
    { name: 'Storage Devices', icon: HardDrive },
    { name: 'Memory & RAM', icon: MemoryStick },
    { name: 'Audio Equipment', icon: Headphones },
    { name: 'Printers & Scanners', icon: Printer },
    { name: 'Processors & CPUs', icon: Cpu },
    { name: 'Networking Equipment', icon: Wifi },
    { name: 'Cables & Adapters', icon: Cable },
    { name: 'Batteries & Power', icon: Battery },
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Products', path: '/products' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="bg-[#1F2937] text-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-bold mb-6 text-white relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#3B82F6]"></span>
            </h3>
            <ul className="space-y-3 mt-4">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-[#3B82F6] transition-colors text-sm flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-display text-lg font-bold mb-6 text-white relative inline-block">
              Our Products
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#3B82F6]"></span>
            </h3>
            <ul className="space-y-2 mt-4 grid grid-cols-1 gap-2">
              {products.slice(0, 7).map((product) => {
                const Icon = product.icon;
                return (
                  <li key={product.name}>
                    <Link
                      to="/products"
                      className="text-gray-300 hover:text-[#3B82F6] transition-colors text-sm flex items-center group"
                    >
                      <Icon className="w-4 h-4 mr-2 text-[#3B82F6] opacity-70 group-hover:opacity-100 transition-opacity" />
                      {product.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-lg font-bold mb-6 text-white relative inline-block">
              Our Services
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#3B82F6]"></span>
            </h3>
            <ul className="space-y-3 mt-4">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-gray-300 hover:text-[#3B82F6] transition-colors text-sm flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-lg font-bold mb-6 text-white relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#3B82F6]"></span>
            </h3>
            <ul className="space-y-4 mt-4">
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-[#374151] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-[#3B82F6]" />
                </div>
                <span className="text-gray-300 text-sm">
                  Shahdara, Sector 141, Noida, Uttar Pradesh 201304, India
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-[#374151] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-[#3B82F6]" />
                </div>
                <div className="flex flex-col">
                  <a
                    href="tel:+919779286917"
                    className="text-gray-300 hover:text-[#3B82F6] transition-colors text-sm"
                  >
                    +91 9779286917
                  </a>
                  <a
                    href="tel:+919914690318"
                    className="text-gray-300 hover:text-[#3B82F6] transition-colors text-sm"
                  >
                    +91 9914690318
                  </a>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-[#374151] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-[#3B82F6]" />
                </div>
                <a
                  href="mailto:info@ithubcomputer.com"
                  className="text-gray-300 hover:text-[#3B82F6] transition-colors text-sm"
                >
                  info@ithubcomputer.com
                </a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex space-x-3 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-[#374151] flex items-center justify-center hover:bg-[#1E40AF] transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-[#374151] flex items-center justify-center hover:bg-[#1E40AF] transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-[#374151] flex items-center justify-center hover:bg-[#FF0000] transition-all duration-300 hover:scale-110"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-[#374151] flex items-center justify-center hover:bg-[#0A66C2] transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} IT HUB Computer. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/products" className="text-gray-400 hover:text-[#3B82F6] text-sm transition-colors">Privacy Policy</Link>
            <Link to="/products" className="text-gray-400 hover:text-[#3B82F6] text-sm transition-colors">Terms of Service</Link>
            <Link to="/products" className="text-gray-400 hover:text-[#3B82F6] text-sm transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
