import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Laptop, 
  HardDrive, 
  Settings, 
  Camera, 
  Fingerprint, 
  Cpu,
  Shield,
  Zap,
  CheckCircle,
  Tag,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Keyboard,
  Mouse,
  Headphones,
  Wifi,
  Battery,
  MemoryStick,
  Printer,
  Star,
  ShoppingCart,
  Eye,
  PhoneCall,
  MessageSquare,
  Truck,
  Clock,
  Award,
  CreditCard,
  Percent
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const HomePage = () => {
  const { toast } = useToast();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [categorySlide, setCategorySlide] = useState(0);
  const [isLeadDialogOpen, setIsLeadDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadForm, setLeadForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });
  
  // Countdown timer state - starts at 24 hours, 59 minutes, 30 seconds
  const [countdown, setCountdown] = useState({
    hours: 24,
    minutes: 59,
    seconds: 30
  });

  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1920&q=80',
      title: 'Your Trusted IT Solutions Partner',
      subtitle: 'Professional computer repair, CCTV installation, and IT services for students, offices, and businesses.',
    },
    {
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80',
      title: 'Expert Computer Repair Services',
      subtitle: 'Fast, reliable repairs for laptops and desktops with genuine parts and warranty.',
    },
    {
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
      title: 'Advanced CCTV Solutions',
      subtitle: 'Protect your home and business with our professional security camera installations.',
    },
    {
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80',
      title: 'Complete IT Infrastructure',
      subtitle: 'From networking to data recovery, we provide comprehensive IT solutions.',
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, [heroSlides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, [heroSlides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          // Reset to 24 hours when countdown reaches 0
          return { hours: 24, minutes: 59, seconds: 59 };
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Handle Buy Now click
  const handleBuyNowClick = (product: any) => {
    setSelectedProduct(product);
    setIsLeadDialogOpen(true);
  };

  // Handle form input changes
  const handleLeadFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLeadForm({
      ...leadForm,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
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
          productName: selectedProduct?.name || 'Unknown Product',
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
        
        setLeadForm({
          fullName: '',
          email: '',
          phone: '',
          message: ''
        });
        setIsLeadDialogOpen(false);
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

  // Auto-slide for categories (faster - 2 seconds)
  useEffect(() => {
    const categoryInterval = setInterval(() => {
      setCategorySlide((prev) => (prev + 1) % categories.length);
    }, 2000);
    return () => clearInterval(categoryInterval);
  }, []);

  const products = [
    {
      id: 1,
      name: 'Gaming Laptop i7 RTX 4060',
      category: 'Laptops',
      path: '/products/laptops-notebooks',
      price: 89999,
      originalPrice: 109999,
      image: 'https://m.media-amazon.com/images/I/81tmCrtiRgL._SL1500_.jpg',
      rating: 4.8,
      reviews: 124,
      badge: 'Best Seller',
      inStock: true,
    },
    {
      id: 2,
      name: '27" 4K IPS Monitor',
      category: 'Monitors',
      path: '/products/monitors-displays',
      price: 32999,
      originalPrice: 42999,
      image: 'https://m.media-amazon.com/images/I/718NLL4oZcL._SL1500_.jpg',
      rating: 4.9,
      reviews: 89,
      badge: 'New',
      inStock: true,
    },
    {
      id: 3,
      name: 'Mechanical RGB Keyboard',
      category: 'Peripherals',
      path: '/products/keyboards',
      price: 4999,
      originalPrice: 6999,
      image: 'https://m.media-amazon.com/images/I/61TD9fHj5uL._SL1000_.jpg',
      rating: 4.7,
      reviews: 256,
      badge: 'Hot',
      inStock: true,
    },
    {
      id: 4,
      name: '1TB NVMe SSD Gen4',
      category: 'Storage',
      path: '/products/storage-devices',
      price: 7499,
      originalPrice: 9999,
      image: 'https://m.media-amazon.com/images/I/71zmcorMSJL._SL1500_.jpg',
      rating: 4.9,
      reviews: 312,
      badge: 'Sale',
      inStock: true,
    },
    {
      id: 5,
      name: 'Wireless Gaming Mouse',
      category: 'Peripherals',
      path: '/products/mouse-trackpads',
      price: 2999,
      originalPrice: 3999,
      image: 'https://m.media-amazon.com/images/I/61frerOA2pL._SL1500_.jpg',
      rating: 4.6,
      reviews: 178,
      badge: null,
      inStock: true,
    },
    {
      id: 6,
      name: '32GB DDR5 RAM Kit',
      category: 'Memory',
      path: '/products/memory-ram',
      price: 12999,
      originalPrice: 15999,
      image: 'https://m.media-amazon.com/images/I/61EUuA9HiaL._SL1500_.jpg',
      rating: 4.8,
      reviews: 94,
      badge: 'Popular',
      inStock: true,
    },
    {
      id: 7,
      name: 'WiFi 6E Router',
      category: 'Networking',
      path: '/products/hardware-parts',
      price: 8999,
      originalPrice: 11999,
      image: 'https://m.media-amazon.com/images/I/61g+X1hqxJL._SL1500_.jpg',
      rating: 4.5,
      reviews: 67,
      badge: null,
      inStock: true,
    },
    {
      id: 8,
      name: 'USB-C Docking Station',
      category: 'Accessories',
      path: '/products/hardware-parts',
      price: 6999,
      originalPrice: 8999,
      image: 'https://m.media-amazon.com/images/I/61tPYsj5cGL._SL1500_.jpg',
      rating: 4.7,
      reviews: 143,
      badge: 'New',
      inStock: true,
    },
  ];

  const categories = [
    { icon: Laptop, name: 'Laptops', count: 45, path: '/products/laptops-notebooks' },
    { icon: Monitor, name: 'Monitors', count: 32, path: '/products/monitors-displays' },
    { icon: Keyboard, name: 'Keyboards', count: 28, path: '/products/keyboards' },
    { icon: Mouse, name: 'Mouse', count: 24, path: '/products/mouse-trackpads' },
    { icon: HardDrive, name: 'Storage', count: 56, path: '/products/storage-devices' },
    { icon: MemoryStick, name: 'Memory', count: 18, path: '/products/memory-ram' },
    { icon: Headphones, name: 'Audio', count: 22, path: '/products/audio-equipment' },
    { icon: Printer, name: 'Printers', count: 15, path: '/products/printers-scanners' },
  ];

  const brands = [
    { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { name: 'Dell', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg' },
    { name: 'HP', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg' },
    { name: 'Lenovo', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg' },
    { name: 'ASUS', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg' },
    { name: 'Acer', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Acer_2011.svg' },
    { name: 'MSI', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/13/MSI_Logo.svg' },
    { name: 'Samsung', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' },
    { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
    { name: 'Toshiba', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Toshiba_logo.svg' },
    { name: 'Sony', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg' },
    { name: 'LG', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/LG_symbol.svg' },
  ];

  const [brandSlide, setBrandSlide] = useState(0);

  // Auto-slide for brands (3 seconds)
  useEffect(() => {
    const brandInterval = setInterval(() => {
      setBrandSlide((prev) => (prev + 1) % brands.length);
    }, 3000);
    return () => clearInterval(brandInterval);
  }, [brands.length]);

  const services = [
    {
      icon: Laptop,
      title: 'Laptop & Desktop Repair',
      description: 'Expert repair services for all brands of laptops and desktops with genuine parts.',
      path: '/services/laptop-desktop-repair',
    },
    {
      icon: HardDrive,
      title: 'Data Recovery',
      description: 'Professional data recovery from damaged hard drives and storage devices.',
      path: '/services/data-recovery',
    },
    {
      icon: Settings,
      title: 'Software Installation',
      description: 'Complete software setup, OS installation, and system optimization services.',
      path: '/services/software-installation',
    },
    {
      icon: Camera,
      title: 'CCTV Installation',
      description: 'Professional CCTV camera installation and surveillance system setup.',
      path: '/services/cctv-installation',
    },
    {
      icon: Fingerprint,
      title: 'Biometric Systems',
      description: 'Advanced biometric attendance and access control system installation.',
      path: '/services/biometric-systems',
    },
    {
      icon: Cpu,
      title: 'Hardware Parts',
      description: 'Genuine computer parts and accessories at competitive prices.',
      path: '/products/hardware-parts',
    },
  ];

  const features = [
    {
      icon: Shield,
      title: 'Genuine Parts',
      description: 'Only authentic components and accessories',
    },
    {
      icon: CheckCircle,
      title: 'Expert Technicians',
      description: 'Certified professionals with years of experience',
    },
    {
      icon: Zap,
      title: 'Fast Service',
      description: 'Quick turnaround time for all repairs',
    },
    {
      icon: Tag,
      title: 'Budget-Friendly',
      description: 'Competitive pricing for students and businesses',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Image Slider */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        {/* Slides */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1E40AF]/90 via-[#1E40AF]/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
        ))}

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              {heroSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`transition-all duration-500 ${
                    index === currentSlide 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8 absolute'
                  }`}
                >
                  {index === currentSlide && (
                    <>
                      <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight text-white drop-shadow-2xl">
                        {slide.title}
                      </h1>
                      <p className="text-lg md:text-xl lg:text-2xl text-blue-50 mb-8 leading-relaxed font-medium drop-shadow-lg">
                        {slide.subtitle}
                      </p>
                    </>
                  )}
                </div>
              ))}
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:+919779286917">
                  <Button size="lg" className="bg-white text-[#1E40AF] hover:bg-gray-100 btn-press text-base px-8 font-bold shadow-2xl hover:shadow-3xl">
                    Call Now
                  </Button>
                </a>
                <Link to="/services">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-white text-[#1E40AF] hover:bg-white hover:text-[#1E40AF] btn-press text-base px-8 font-bold backdrop-blur-sm"
                  >
                    View Services
                  </Button>
                </Link>
              </div>

              {/* EMI Banner */}
              <div className="mt-8 p-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border-2 border-[#FFD700] max-w-md">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full p-3">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-[#1F2937] text-sm">Easy EMI Available</h3>
                      <Badge className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#1F2937] text-xs font-bold border-0">
                        <Percent className="w-3 h-3 mr-1" />
                        0% Interest
                      </Badge>
                    </div>
                    <p className="text-xs text-[#6B7280] font-medium">
                      Powered by <span className="font-bold text-[#1E40AF]">Bajaj Finserv</span> • Instant Approval
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => { prevSlide(); setIsAutoPlaying(false); setTimeout(() => setIsAutoPlaying(true), 5000); }}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={() => { nextSlide(); setIsAutoPlaying(false); setTimeout(() => setIsAutoPlaying(true), 5000); }}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide 
                  ? 'w-10 h-3 bg-white' 
                  : 'w-3 h-3 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
          <div 
            className="h-full bg-white transition-all duration-300"
            style={{ 
              width: `${((currentSlide + 1) / heroSlides.length) * 100}%`,
            }}
          />
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-32 bg-[#F9FAFB]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-black text-[#1F2937] mb-4">
              Our Services
            </h2>
            <p className="text-xl text-[#6B7280] max-w-2xl mx-auto font-medium">
              Comprehensive IT solutions tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link to={service.path} key={index}>
                  <Card 
                    className="card-hover cursor-pointer border-none shadow-lg hover:shadow-2xl bg-white h-full"
                  >
                    <CardContent className="p-8">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] flex items-center justify-center mb-6 shadow-lg">
                        <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                      </div>
                      <h3 className="font-display text-xl font-bold text-[#1F2937] mb-3">
                        {service.title}
                      </h3>
                      <p className="text-[#6B7280] leading-relaxed">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button size="lg" className="bg-[#1E40AF] hover:bg-[#3B82F6] text-white btn-press font-bold shadow-xl">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-b from-white to-[#F9FAFB]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-black text-[#1F2937] mb-2 md:mb-4">
              Shop by Category
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-[#6B7280] max-w-2xl mx-auto px-4">
              Browse our wide selection of computer hardware and accessories
            </p>
          </div>

          {/* Auto-sliding carousel */}
          <div className="relative overflow-hidden -mx-2 md:mx-0">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${categorySlide * (100 / (window.innerWidth < 640 ? 2 : 4))}%)` 
              }}
            >
              {/* Duplicate categories for infinite loop effect */}
              {[...categories, ...categories].map((category, index) => {
                const Icon = category.icon;
                return (
                  <Link
                    key={index}
                    to={category.path}
                    className="flex-shrink-0 px-2 md:px-3"
                    style={{ 
                      minWidth: window.innerWidth < 640 ? '50%' : '25%',
                      maxWidth: window.innerWidth < 640 ? '50%' : '25%'
                    }}
                  >
                    <div className="group flex flex-col items-center p-4 md:p-6 rounded-xl md:rounded-2xl bg-white border-2 border-[#E5E7EB] hover:border-transparent hover:bg-gradient-to-br hover:from-[#1E40AF] hover:to-[#3B82F6] hover:shadow-2xl transition-all duration-300 cursor-pointer h-full">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-[#EEF2FF] to-[#DBEAFE] shadow-lg flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 group-hover:shadow-xl group-hover:bg-white transition-all duration-300">
                        <Icon className="w-8 h-8 md:w-10 md:h-10 text-[#1E40AF] group-hover:text-[#1E40AF] transition-colors" />
                      </div>
                      <span className="font-bold text-sm md:text-base text-[#1F2937] group-hover:text-white text-center transition-colors">
                        {category.name}
                      </span>
                      <span className="text-xs md:text-sm text-[#6B7280] group-hover:text-blue-100 mt-1 transition-colors">
                        {category.count} items
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Slide indicators */}
          <div className="flex justify-center gap-1.5 md:gap-2 mt-6 md:mt-8">
            {categories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCategorySlide(index)}
                className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                  index === categorySlide % categories.length
                    ? 'w-6 md:w-8 bg-[#1E40AF]'
                    : 'w-1.5 md:w-2 bg-[#D1D5DB] hover:bg-[#9CA3AF]'
                }`}
                aria-label={`Go to category ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-[#F9FAFB] to-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <Badge className="bg-[#10B981] text-white mb-4">Featured Products</Badge>
              <h2 className="font-display text-3xl md:text-4xl font-black text-[#1F2937] mb-2">
                Popular Hardware
              </h2>
              <p className="text-lg text-[#6B7280]">
                Top-rated products loved by our customers
              </p>
            </div>
            <Link to="/products" className="mt-4 md:mt-0">
              <Button variant="outline" className="border-[#1E40AF] text-[#1E40AF] hover:bg-[#1E40AF] hover:text-white">
                View All Products
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link to={product.path} key={product.id}>
                <Card 
                  className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 bg-white h-full"
                >
                <div className="relative overflow-hidden bg-gray-100 flex items-center justify-center p-4 h-48">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.badge && (
                    <Badge 
                      className={`absolute top-3 left-3 ${
                        product.badge === 'Sale' ? 'bg-red-500' :
                        product.badge === 'New' ? 'bg-[#10B981]' :
                        product.badge === 'Hot' ? 'bg-orange-500' :
                        'bg-[#1E40AF]'
                      } text-white`}
                    >
                      {product.badge}
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <p className="text-xs text-[#6B7280] uppercase tracking-wider mb-1">{product.category}</p>
                  <h3 className="font-semibold text-[#1F2937] mb-2 line-clamp-2 group-hover:text-[#1E40AF] transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-xs text-[#6B7280]">({product.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl font-bold text-[#1E40AF]">₹{product.price.toLocaleString('en-IN')}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-[#6B7280] line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                    )}
                  </div>
                  <Button 
                    className="w-full bg-[#1E40AF] hover:bg-[#3B82F6] text-white font-semibold"
                    onClick={() => handleBuyNowClick(product)}
                  >
                    Quote Now
                  </Button>
                </CardContent>
              </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Deals Banner */}
      <section className="py-16 bg-gradient-to-r from-[#1E40AF] via-[#3B82F6] to-[#60A5FA] relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-20"></div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <Badge className="bg-white/20 text-white mb-4">Limited Time Offer</Badge>
              <h2 className="font-display text-3xl md:text-4xl font-black text-white mb-4">
                Up to 40% Off on Selected Items
              </h2>
              <p className="text-blue-100 text-lg mb-6 max-w-xl">
                Don't miss out on our biggest sale of the season. Premium hardware at unbeatable prices.
              </p>
              <Link to="/products">
                <Button size="lg" className="bg-white text-[#1E40AF] hover:bg-gray-100 font-bold shadow-xl">
                  Shop Now
                </Button>
              </Link>
            </div>
            <div className="flex gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center border border-white/20">
                <span className="text-4xl font-black text-white">{countdown.hours.toString().padStart(2, '0')}</span>
                <p className="text-blue-100 text-sm">Hours</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center border border-white/20">
                <span className="text-4xl font-black text-white">{countdown.minutes.toString().padStart(2, '0')}</span>
                <p className="text-blue-100 text-sm">Minutes</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center border border-white/20">
                <span className="text-4xl font-black text-white">{countdown.seconds.toString().padStart(2, '0')}</span>
                <p className="text-blue-100 text-sm">Seconds</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Brands */}
      <section className="py-12 md:py-16 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-[#1F2937] mb-2">
              Trusted Brands We Carry
            </h2>
            <p className="text-sm md:text-base text-[#6B7280]">Authorized dealer for leading technology brands</p>
          </div>
          
          {/* Auto-sliding brand carousel */}
          <div className="relative overflow-hidden -mx-2 md:mx-0">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ 
                transform: `translateX(-${brandSlide * (100 / (window.innerWidth < 640 ? 2 : window.innerWidth < 1024 ? 4 : 6))}%)` 
              }}
            >
              {/* Duplicate brands for infinite loop effect */}
              {[...brands, ...brands].map((brand, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 px-2 md:px-3 lg:px-4"
                  style={{ 
                    minWidth: window.innerWidth < 640 ? '50%' : window.innerWidth < 1024 ? '25%' : 'calc(100% / 6)',
                    maxWidth: window.innerWidth < 640 ? '50%' : window.innerWidth < 1024 ? '25%' : 'calc(100% / 6)'
                  }}
                >
                  <div className="w-full h-20 md:h-24 rounded-lg md:rounded-xl bg-white flex items-center justify-center hover:shadow-lg transition-all duration-300 cursor-pointer group border border-[#E5E7EB] hover:border-[#1E40AF]">
                    <img 
                      src={brand.logo} 
                      alt={brand.name}
                      className="h-8 md:h-10 w-auto max-w-[60px] md:max-w-[80px] object-contain group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = `<span class="text-base md:text-xl font-bold text-[#6B7280] group-hover:text-[#1E40AF] transition-colors">${brand.name}</span>`;
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide indicators */}
          <div className="flex justify-center gap-1.5 md:gap-2 mt-6 md:mt-8">
            {brands.map((_, index) => (
              <button
                key={index}
                onClick={() => setBrandSlide(index)}
                className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${
                  index === brandSlide % brands.length
                    ? 'w-4 md:w-6 bg-[#1E40AF]'
                    : 'bg-[#D1D5DB] hover:bg-[#9CA3AF]'
                }`}
                aria-label={`Go to brand ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Service Highlights */}
      <section className="py-16 bg-[#F9FAFB]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm">
              <div className="w-14 h-14 rounded-full bg-[#1E40AF]/10 flex items-center justify-center flex-shrink-0">
                <Truck className="w-7 h-7 text-[#1E40AF]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#1F2937]">Door-to-Door Service</h3>
                <p className="text-sm text-[#6B7280]"></p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm">
              <div className="w-14 h-14 rounded-full bg-[#10B981]/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-7 h-7 text-[#10B981]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#1F2937]">Warranty</h3>
                <p className="text-sm text-[#6B7280]">On Side </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm">
              <div className="w-14 h-14 rounded-full bg-[#F59E0B]/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-7 h-7 text-[#F59E0B]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#1F2937]">24/7 Support</h3>
                <p className="text-sm text-[#6B7280]">Expert assistance</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm">
              <div className="w-14 h-14 rounded-full bg-[#EF4444]/10 flex items-center justify-center flex-shrink-0">
                <Award className="w-7 h-7 text-[#EF4444]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#1F2937]">Best Quality</h3>
                <p className="text-sm text-[#6B7280]">Genuine products only</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">
              Why Choose IT HUB Computer?
            </h2>
            <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
              Your satisfaction is our priority
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-[#10B981]/10 flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-[#10B981]" strokeWidth={2} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#1F2937] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[#6B7280] text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#1E40AF] via-[#3B82F6] to-[#60A5FA] text-white relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-30"></div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-display text-4xl md:text-5xl font-black mb-6 drop-shadow-lg">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto font-medium">
            Contact us today for a free consultation and quote
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+919779286917">
              <Button size="lg" className="bg-white text-[#1E40AF] hover:bg-gray-100 btn-press font-bold shadow-2xl">
                Call Now
              </Button>
            </a>
            <Link to="/contact">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white bg-white text-[#1E40AF] hover:bg-white hover:text-[#1E40AF] btn-press font-bold backdrop-blur-sm"
              >
                Contact Us
              </Button>
            </Link>
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
                  Product: {selectedProduct.name}
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

export default HomePage;
