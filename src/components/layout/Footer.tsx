import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Laptop, Monitor, Keyboard, Mouse, HardDrive, MemoryStick, Cpu, Wrench, Camera, Fingerprint, Settings, Database, MessageCircle } from 'lucide-react';
import { branchLocations, primaryEmail, primaryPhone } from '@/lib/branches';

const Footer = () => {
  const services = [
    { name: 'Laptop & Desktop Repair', path: '/services/laptop-desktop-repair', icon: Wrench },
    { name: 'Data Recovery', path: '/services/data-recovery', icon: Database },
    { name: 'Software Installation', path: '/services/software-installation', icon: Settings },
    { name: 'CCTV Installation', path: '/services/cctv-installation', icon: Camera },
    { name: 'Biometric Systems', path: '/services/biometric-systems', icon: Fingerprint },
    { name: 'Hardware Parts', path: '/products/hardware-parts', icon: Cpu },
  ];

  const products = [
    { name: 'Laptops & Notebooks', path: '/products/laptops-notebooks', icon: Laptop },
    { name: 'Desktop Computers', path: '/products/desktop-computers', icon: Monitor },
    { name: 'Monitors & Displays', path: '/products/monitors-displays', icon: Monitor },
    { name: 'Keyboards', path: '/products/keyboards', icon: Keyboard },
    { name: 'Mouse & Trackpads', path: '/products/mouse-trackpads', icon: Mouse },
    { name: 'Storage Devices', path: '/products/storage-devices', icon: HardDrive },
    { name: 'Memory & RAM', path: '/products/memory-ram', icon: MemoryStick },
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
              {products.map((product) => {
                const Icon = product.icon;
                return (
                  <li key={product.name}>
                    <Link
                      to={product.path}
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
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <li key={service.name}>
                    <Link
                      to={service.path}
                      className="text-gray-300 hover:text-[#3B82F6] transition-colors text-sm flex items-center group"
                    >
                      <Icon className="w-4 h-4 mr-2 text-[#3B82F6] opacity-70 group-hover:opacity-100 transition-opacity" />
                      {service.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-lg font-bold mb-6 text-white relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#3B82F6]"></span>
            </h3>
            <div className="mt-4 space-y-4">
              <div className="rounded-2xl border border-gray-700 bg-[#2A3444] p-4">
                <p className="mb-3 text-sm font-semibold text-white">Our Offices</p>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-1">
                  {branchLocations.map((branch) => (
                    <Link
                      key={branch.id}
                      to={branch.id === 'branch-2' ? '/branch-2-sector-104' : '/contact'}
                      className="rounded-xl border border-gray-600 bg-[#374151] p-3 transition hover:border-[#3B82F6] hover:bg-[#3B82F6]/10"
                    >
                      <div className="flex items-start gap-2">
                        <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#3B82F6]" />
                        <div>
                          <p className="text-sm font-semibold text-white">{branch.branchLabel}</p>
                          <p className="mt-1 text-xs leading-5 text-gray-300">{branch.address}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-[#374151] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-[#3B82F6]" />
                </div>
                <div className="flex flex-col">
                  <a
                    href="tel:+919779286917"
                    className="text-gray-300 hover:text-[#3B82F6] transition-colors text-sm"
                  >
                    {primaryPhone}
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-[#374151] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-[#3B82F6]" />
                </div>
                <a
                  href={`mailto:${primaryEmail}`}
                  className="text-gray-300 hover:text-[#3B82F6] transition-colors text-sm"
                >
                  {primaryEmail}
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Follow Us</h4>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://whatsapp.com/channel/0029VbBZwsHK5cD8riQW9G0G"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-[#374151] flex items-center justify-center hover:bg-[#25D366] transition-all duration-300 hover:scale-110 group"
                  aria-label="WhatsApp Channel"
                  title="Join our WhatsApp Channel"
                >
                  <MessageCircle className="w-5 h-5 group-hover:text-white" />
                </a>
                <a
                  href="https://www.facebook.com/share/17nWFpAyTQ/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-[#374151] flex items-center justify-center hover:bg-[#1877F2] transition-all duration-300 hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/ithub_computer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-[#374151] flex items-center justify-center hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] transition-all duration-300 hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://youtube.com/@ithubcomputer141noida?si=7AiGLSS7yh1idX6n"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-[#374151] flex items-center justify-center hover:bg-[#FF0000] transition-all duration-300 hover:scale-110"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                
              </div>
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
