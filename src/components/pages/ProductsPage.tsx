import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  X, 
  Filter,
  Laptop,
  Monitor,
  Keyboard,
  Mouse,
  HardDrive,
  MemoryStick,
  Headphones,
  Printer,
  Cpu,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Shield,
  Truck,
  Award,
  Star,
  ShoppingCart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const ProductsPage = () => {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [isLeadDialogOpen, setIsLeadDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadForm, setLeadForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleQuoteNowClick = (product: any) => {
    setSelectedProduct(product);
    setIsLeadDialogOpen(true);
  };

  const handleLeadFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLeadForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const handleLeadFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    if (!leadForm.fullName.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your full name.",
        variant: "destructive",
        duration: 4000,
      });
      return;
    }
    
    if (!leadForm.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadForm.email)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
        duration: 4000,
      });
      return;
    }
    
    if (!leadForm.phone.trim() || leadForm.phone.replace(/\D/g, '').length < 10) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid phone number (at least 10 digits).",
        variant: "destructive",
        duration: 4000,
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-quote-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: leadForm.fullName.trim(),
          email: leadForm.email.trim(),
          phone: leadForm.phone.trim(),
          message: leadForm.message.trim(),
          productName: selectedProduct?.title || 'Unknown Product',
        }),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error('Server returned an invalid response. Please try again.');
      }

      if (response.ok) {
        toast({
          title: "Quote Request Sent! ✅",
          description: "Thank you! We'll get back to you shortly with the best quote.",
          duration: 5000,
        });
        
        // Generate WhatsApp message with form data
        const whatsappMessage = `🔔 *New Quote Request*

📦 *Product:* ${selectedProduct?.title || 'Product Inquiry'}

👤 *Customer Details:*
• Name: ${leadForm.fullName.trim()}
• Email: ${leadForm.email.trim()}
• Phone: ${leadForm.phone.trim()}

${leadForm.message.trim() ? `💬 *Message:*\n${leadForm.message.trim()}` : ''}

📅 *Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;

        const whatsappUrl = `https://wa.me/919779286917?text=${encodeURIComponent(whatsappMessage)}`;
        
        setLeadForm({
          fullName: '',
          email: '',
          phone: '',
          message: ''
        });
        setIsLeadDialogOpen(false);
        
        // Redirect to WhatsApp
        window.open(whatsappUrl, '_blank');
      } else if (response.status === 400) {
        throw new Error(data.error || 'Please fill in all required fields correctly.');
      } else if (response.status === 500) {
        throw new Error('Our email service is temporarily unavailable. Please try again later or contact us directly at info@ithubcomputer.com');
      } else {
        throw new Error(data.error || 'Failed to send quote request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      
      let errorMessage = "Failed to send quote request. Please try again.";
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage = "Network error. Please check your internet connection and try again.";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Unable to Send Request",
        description: errorMessage,
        variant: "destructive",
        duration: 6000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    { id: 'all', name: 'All Products', icon: Package },
    { id: 'laptops', name: 'Laptops & Desktops', icon: Laptop },
    { id: 'components', name: 'Components', icon: Cpu },
    { id: 'accessories', name: 'Accessories', icon: Keyboard },
    { id: 'networking', name: 'Networking', icon: HardDrive },
    { id: 'surveillance', name: 'Surveillance', icon: Monitor },
  ];

  const productCategories = [
    { name: 'Laptops & Notebooks', icon: Laptop, link: '/products/laptops-notebooks', count: '50+', color: 'from-blue-500 to-indigo-600' },
    { name: 'Desktop Computers', icon: Monitor, link: '/products/desktop-computers', count: '30+', color: 'from-violet-500 to-purple-600' },
    { name: 'Monitors & Displays', icon: Monitor, link: '/products/monitors-displays', count: '40+', color: 'from-emerald-500 to-teal-600' },
    { name: 'Keyboards', icon: Keyboard, link: '/products/keyboards', count: '60+', color: 'from-orange-500 to-red-600' },
    { name: 'Mouse & Trackpads', icon: Mouse, link: '/products/mouse-trackpads', count: '45+', color: 'from-pink-500 to-rose-600' },
    { name: 'Storage Devices', icon: HardDrive, link: '/products/storage-devices', count: '80+', color: 'from-cyan-500 to-blue-600' },
    { name: 'Memory & RAM', icon: MemoryStick, link: '/products/memory-ram', count: '35+', color: 'from-amber-500 to-orange-600' },
    { name: 'Audio Equipment', icon: Headphones, link: '/products/audio-equipment', count: '25+', color: 'from-indigo-500 to-violet-600' },
    { name: 'Printers & Scanners', icon: Printer, link: '/products/printers-scanners', count: '20+', color: 'from-slate-500 to-gray-600' },
    { name: 'Hardware Parts', icon: Cpu, link: '/products/hardware-parts', count: '100+', color: 'from-red-500 to-pink-600' },
  ];

  const products = {
    laptops: [
      {
        title: 'Dell Inspiron 15',
        description: 'Intel Core i5 12th Gen, 8GB RAM, 512GB SSD, 15.6" FHD Display',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80',
        price: 52999,
        originalPrice: 64999,
        brand: 'Dell',
        badge: 'Best Seller',
        rating: 4.8,
      },
      {
        title: 'ASUS ROG Gaming',
        description: 'AMD Ryzen 7, RTX 3060, 16GB RAM, 1TB SSD, 165Hz Display',
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&q=80',
        price: 94999,
        originalPrice: 119999,
        brand: 'ASUS',
        badge: 'Gaming',
        rating: 4.9,
      },
      {
        title: 'HP Pro Tower',
        description: 'Intel Core i7, 16GB RAM, 512GB SSD, Windows 11 Pro',
        image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&q=80',
        price: 45999,
        originalPrice: 55999,
        brand: 'HP',
        badge: 'Business',
        rating: 4.7,
      },
    ],
    components: [
      {
        title: 'Corsair Vengeance 16GB',
        description: 'DDR5 5600MHz, RGB, Dual Channel Kit for Gaming',
        image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&q=80',
        price: 8499,
        originalPrice: 10999,
        brand: 'Corsair',
        badge: 'RGB',
        rating: 4.9,
      },
      {
        title: 'Samsung 980 Pro 1TB',
        description: 'NVMe M.2 SSD, 7000MB/s Read, PCIe Gen 4.0',
        image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&q=80',
        price: 9999,
        originalPrice: 13999,
        brand: 'Samsung',
        badge: 'Fast',
        rating: 4.8,
      },
      {
        title: 'RTX 4070 Super',
        description: '12GB GDDR6X, DLSS 3, Ray Tracing, 4K Gaming',
        image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&q=80',
        price: 62999,
        originalPrice: 74999,
        brand: 'NVIDIA',
        badge: 'New',
        rating: 4.9,
      },
    ],
    accessories: [
      {
        title: 'Logitech MX Master 3S',
        description: 'Wireless, 8K DPI, USB-C, Multi-Device, Quiet Clicks',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80',
        price: 8999,
        originalPrice: 11999,
        brand: 'Logitech',
        badge: 'Premium',
        rating: 4.9,
      },
      {
        title: 'LG UltraWide 34"',
        description: 'QHD 3440x1440, 160Hz, HDR400, USB-C 90W',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80',
        price: 42999,
        originalPrice: 54999,
        brand: 'LG',
        badge: 'Ultra Wide',
        rating: 4.8,
      },
      {
        title: 'Keychron K8 Pro',
        description: 'Wireless Mechanical, Hot-Swappable, RGB, Mac/Windows',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80',
        price: 9499,
        originalPrice: 12499,
        brand: 'Keychron',
        badge: 'Mechanical',
        rating: 4.7,
      },
    ],
    networking: [
      {
        title: 'TP-Link Archer AX73',
        description: 'WiFi 6, AX5400, Dual Band, 6 Antennas, 200+ Devices',
        image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=600&q=80',
        price: 8999,
        originalPrice: 11999,
        brand: 'TP-Link',
        badge: 'WiFi 6',
        rating: 4.6,
      },
      {
        title: 'Cisco SG350-28',
        description: '28-Port Managed Switch, PoE+, Gigabit, Enterprise',
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80',
        price: 24999,
        originalPrice: 32999,
        brand: 'Cisco',
        badge: 'Enterprise',
        rating: 4.8,
      },
      {
        title: 'Cat6A Cable Bundle',
        description: '10Gbps, 50m Roll, Shielded, Indoor/Outdoor',
        image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=600&q=80',
        price: 2499,
        originalPrice: 3499,
        brand: 'D-Link',
        badge: 'Value',
        rating: 4.5,
      },
    ],
    surveillance: [
      {
        title: 'Hikvision 4K Dome',
        description: '8MP, ColorVu, Night Vision, IP67, Smart Detection',
        image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&q=80',
        price: 5999,
        originalPrice: 7999,
        brand: 'Hikvision',
        badge: '4K',
        rating: 4.7,
      },
      {
        title: 'Dahua 8CH NVR',
        description: '4K Output, 8 PoE Ports, AI Detection, 8TB Support',
        image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=600&q=80',
        price: 18999,
        originalPrice: 24999,
        brand: 'Dahua',
        badge: 'AI',
        rating: 4.8,
      },
      {
        title: 'ZKTeco SpeedFace',
        description: 'Face + Fingerprint, 6000 Users, Access Control',
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80',
        price: 24999,
        originalPrice: 32999,
        brand: 'ZKTeco',
        badge: 'Biometric',
        rating: 4.6,
      },
    ],
  };

  const benefits = [
    { icon: Shield, title: 'Genuine Products', desc: 'All products with manufacturer warranty' },
    { icon: Truck, title: 'Fast Delivery', desc: 'Same day delivery in Mohali/Chandigarh' },
    { icon: Award, title: 'Best Prices', desc: 'Price match guarantee on all items' },
    { icon: Headphones, title: 'Expert Support', desc: 'Free installation assistance available' },
  ];

  const allProducts = Object.values(products).flat();

  // Extract unique brands
  const allBrands = Array.from(new Set(allProducts.map(product => product.brand))).sort();

  // Filter products based on selected brands
  const filterProductsByBrand = (productsList: any[]) => {
    if (selectedBrands.length === 0) return productsList;
    return productsList.filter(product => selectedBrands.includes(product.brand));
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Hero Section - Enhanced */}
      <section className="relative bg-gradient-to-br from-[#0F172A] via-[#1E40AF] to-[#3B82F6] text-white py-24 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-300 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=1920&q=40')] bg-cover bg-center opacity-5"></div>
        
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-white/20 text-white border-white/30 mb-6 px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                Premium Quality Products
              </Badge>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Shop Computer
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200"> Hardware</span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100 leading-relaxed mb-8">
                Genuine laptops, desktops, components, and accessories from top brands. 
                Best prices with warranty and expert support.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-[#1E40AF] hover:bg-blue-50 font-semibold px-8 shadow-lg shadow-white/20"
                  onClick={() => handleQuoteNowClick({ title: 'Custom Order', description: 'Custom product inquiry' })}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Request Quote
                </Button>
                <Link to="/contact">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-white/50 text-white hover:bg-white/10 font-semibold px-8"
                  >
                    Visit Store
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Benefits Grid */}
            <div className="grid grid-cols-2 gap-4">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <benefit.icon className="w-8 h-8 text-cyan-300 mb-3" />
                  <div className="font-semibold text-white mb-1">{benefit.title}</div>
                  <div className="text-blue-200 text-sm">{benefit.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-[#EEF2FF] text-[#1E40AF] mb-4">Browse Categories</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">
              Shop by Category
            </h2>
            <p className="text-[#6B7280] max-w-2xl mx-auto">
              Find exactly what you need from our extensive collection of IT products and accessories
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {productCategories.map((cat, idx) => (
              <Link key={idx} to={cat.link}>
                <Card className="group border-none shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
                  <div className={`h-2 bg-gradient-to-r ${cat.color}`}></div>
                  <CardContent className="p-5 text-center">
                    <div className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <cat.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-display font-bold text-[#1F2937] text-sm mb-1 group-hover:text-[#1E40AF] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-[#6B7280]">{cat.count} Products</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-[#EEF2FF] text-[#1E40AF] mb-4">Featured Products</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">
              Best Selling Products
            </h2>
          </div>

          {/* Brand Filter - Compact Design */}
          <div className="mb-8 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Filter className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">Filter by Brand</h3>
                    <p className="text-blue-100 text-sm">Select brands to refine results</p>
                  </div>
                </div>
                {selectedBrands.length > 0 && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setSelectedBrands([])}
                    className="bg-white/20 hover:bg-white/30 text-white border-0"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear All
                  </Button>
                )}
              </div>
            </div>
            
            <div className="p-6">
              {selectedBrands.length > 0 && (
                <div className="mb-4 pb-4 border-b border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    {selectedBrands.map((brand) => (
                      <Badge
                        key={brand}
                        className="bg-[#EEF2FF] text-[#1E40AF] hover:bg-[#DBEAFE] cursor-pointer px-3 py-1.5"
                        onClick={() => toggleBrand(brand)}
                      >
                        {brand}
                        <X className="h-3 w-3 ml-2" />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex flex-wrap gap-3">
                {allBrands.map((brand) => {
                  const isSelected = selectedBrands.includes(brand);
                  return (
                    <button
                      key={brand}
                      onClick={() => toggleBrand(brand)}
                      className={`
                        relative px-4 py-2 rounded-full border-2 transition-all duration-200 text-sm font-medium
                        ${isSelected 
                          ? 'border-[#1E40AF] bg-[#1E40AF] text-white shadow-md' 
                          : 'border-gray-200 bg-white text-[#4B5563] hover:border-[#3B82F6] hover:bg-gray-50'
                        }
                      `}
                    >
                      {isSelected && <CheckCircle2 className="h-4 w-4 inline mr-1" />}
                      {brand}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-8 h-auto bg-white rounded-xl shadow-md p-1">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="text-xs md:text-sm py-3 data-[state=active]:bg-[#1E40AF] data-[state=active]:text-white rounded-lg"
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <Icon className="w-4 h-4 mr-1 hidden md:inline" />
                    {category.name}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filterProductsByBrand(allProducts).map((product, index) => (
                  <Card key={index} className="group border-none shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 bg-white">
                    <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      {product.badge && (
                        <Badge className="absolute top-3 left-3 bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] text-white border-0 shadow-lg">
                          {product.badge}
                        </Badge>
                      )}
                      {product.originalPrice > product.price && (
                        <Badge className="absolute top-3 right-3 bg-emerald-500 text-white border-0">
                          -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-[#1E40AF] border-[#1E40AF]/30 bg-[#EEF2FF]">
                          {product.brand}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span className="text-sm font-medium text-[#1F2937]">{product.rating}</span>
                        </div>
                      </div>
                      <h3 className="font-display text-lg font-bold text-[#1F2937] mb-2 group-hover:text-[#1E40AF] transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-[#6B7280] text-sm leading-relaxed mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl font-bold text-[#1E40AF]">₹{product.price.toLocaleString('en-IN')}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-[#9CA3AF] line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <Button 
                        className="w-full bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] hover:from-[#1E3A8A] hover:to-[#1E40AF] text-white shadow-lg shadow-blue-500/20"
                        onClick={() => handleQuoteNowClick(product)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Get Quote
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {categories.filter(cat => cat.id !== 'all').map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filterProductsByBrand(products[category.id as keyof typeof products]).map((product, index) => (
                    <Card key={index} className="group border-none shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 bg-white">
                      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        {product.badge && (
                          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] text-white border-0 shadow-lg">
                            {product.badge}
                          </Badge>
                        )}
                        {product.originalPrice > product.price && (
                          <Badge className="absolute top-3 right-3 bg-emerald-500 text-white border-0">
                            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="text-[#1E40AF] border-[#1E40AF]/30 bg-[#EEF2FF]">
                            {product.brand}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            <span className="text-sm font-medium text-[#1F2937]">{product.rating}</span>
                          </div>
                        </div>
                        <h3 className="font-display text-lg font-bold text-[#1F2937] mb-2 group-hover:text-[#1E40AF] transition-colors">
                          {product.title}
                        </h3>
                        <p className="text-[#6B7280] text-sm leading-relaxed mb-4 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-2xl font-bold text-[#1E40AF]">₹{product.price.toLocaleString('en-IN')}</span>
                          {product.originalPrice > product.price && (
                            <span className="text-sm text-[#9CA3AF] line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="p-6 pt-0">
                        <Button 
                          className="w-full bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] hover:from-[#1E3A8A] hover:to-[#1E40AF] text-white shadow-lg shadow-blue-500/20"
                          onClick={() => handleQuoteNowClick(product)}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Get Quote
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-10">
            <Badge className="bg-[#EEF2FF] text-[#1E40AF] mb-4">Trusted Brands</Badge>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1F2937]">
              We Stock All Major Brands
            </h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {['Dell', 'HP', 'Lenovo', 'ASUS', 'Acer', 'Samsung', 'LG', 'Logitech', 'Corsair', 'Intel', 'AMD', 'NVIDIA'].map((brand, idx) => (
              <div key={idx} className="text-xl md:text-2xl font-bold text-gray-400 hover:text-[#1E40AF] transition-colors cursor-pointer">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-300 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Sparkles className="w-12 h-12 text-cyan-300 mb-6" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
                Can't Find What You Need?
              </h2>
              <p className="text-lg text-blue-100 mb-8">
                We have access to thousands of products through our supplier network. 
                Tell us what you need and we'll source it at the best price with warranty.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-[#1E40AF] hover:bg-blue-50 font-semibold px-8"
                  onClick={() => handleQuoteNowClick({ title: 'Custom Product Request', description: 'Custom product inquiry' })}
                >
                  Request Custom Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <a href="tel:+919779286917">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8"
                  >
                    Call: +91 97792 86917
                  </Button>
                </a>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Package, value: '500+', label: 'Products in Stock' },
                { icon: Truck, value: 'Same Day', label: 'Local Delivery' },
                { icon: Shield, value: '100%', label: 'Genuine Products' },
                { icon: Award, value: '2 Years', label: 'Warranty Support' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
                  <stat.icon className="w-8 h-8 text-cyan-300 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-blue-200 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lead Capture Dialog */}
      <Dialog open={isLeadDialogOpen} onOpenChange={setIsLeadDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#1F2937]">
              Request a Quote
            </DialogTitle>
            <DialogDescription className="text-[#6B7280]">
              {selectedProduct && (
                <span className="block mt-2 font-semibold text-[#1E40AF]">
                  Product: {selectedProduct.title}
                </span>
              )}
              Fill in your details and we'll get back to you shortly.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLeadFormSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-[#1F2937] font-semibold">
                Full Name *
              </Label>
              <Input
                id="fullName"
                name="fullName"
                value={leadForm.fullName}
                onChange={handleLeadFormChange}
                placeholder="Enter your full name"
                required
                className="border-[#E5E7EB] focus:border-[#1E40AF]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#1F2937] font-semibold">
                Email *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={leadForm.email}
                onChange={handleLeadFormChange}
                placeholder="Enter your email"
                required
                className="border-[#E5E7EB] focus:border-[#1E40AF]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-[#1F2937] font-semibold">
                Phone *
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={leadForm.phone}
                onChange={handleLeadFormChange}
                placeholder="Enter your phone number"
                required
                className="border-[#E5E7EB] focus:border-[#1E40AF]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-[#1F2937] font-semibold">
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                value={leadForm.message}
                onChange={handleLeadFormChange}
                placeholder="Any specific requirements or questions?"
                rows={4}
                className="border-[#E5E7EB] focus:border-[#1E40AF] resize-none"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsLeadDialogOpen(false)}
                className="flex-1 border-[#E5E7EB] text-[#6B7280] hover:bg-[#F3F4F6]"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#1E40AF] hover:bg-[#3B82F6] text-white font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Submit Request'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsPage;
