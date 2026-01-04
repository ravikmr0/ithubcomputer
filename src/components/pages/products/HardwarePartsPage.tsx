import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Cpu, 
  ArrowRight, 
  Loader2,
  CheckCircle2,
  HardDrive,
  Fan,
  Zap,
  CircuitBoard,
  Wifi
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const HardwarePartsPage = () => {
  const { toast } = useToast();
  const [isQuoteDialogOpen, setIsQuoteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleQuoteClick = (product: any) => {
    setSelectedProduct(product);
    setIsQuoteDialogOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setQuoteForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!quoteForm.fullName.trim() || !quoteForm.email.trim() || !quoteForm.phone.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-quote-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...quoteForm,
          productName: selectedProduct?.title || 'Hardware Parts Inquiry',
        }),
      });

      if (response.ok) {
        toast({
          title: "Quote Request Sent! ✅",
          description: "We'll get back to you shortly.",
        });
        
        const whatsappMessage = `🔔 *New Quote Request*\n\n📦 *Product:* ${selectedProduct?.title || 'Hardware Parts'}\n\n👤 *Customer:*\n• Name: ${quoteForm.fullName}\n• Email: ${quoteForm.email}\n• Phone: ${quoteForm.phone}\n\n${quoteForm.message ? `💬 *Message:* ${quoteForm.message}` : ''}`;
        window.open(`https://wa.me/919779286917?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
        
        setQuoteForm({ fullName: '', email: '', phone: '', message: '' });
        setIsQuoteDialogOpen(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    {
      icon: Cpu,
      title: 'Processors',
      description: 'Intel and AMD processors for desktop and laptop upgrades.',
      image: 'https://m.media-amazon.com/images/I/71e1ef+rE+L._SL1500_.jpg',
      price: 12999,
      originalPrice: 15999,
      features: ['Intel Core Series', 'AMD Ryzen', 'All Generations', 'Box/Tray']
    },
    {
      icon: CircuitBoard,
      title: 'Motherboards',
      description: 'Desktop motherboards supporting latest Intel and AMD platforms.',
      image: 'https://m.media-amazon.com/images/I/81pkavRMiwL._SL1500_.jpg',
      price: 7999,
      originalPrice: 9999,
      features: ['Intel/AMD Chipsets', 'ATX/mATX/ITX', 'DDR4/DDR5', 'PCIe 4.0/5.0']
    },
    {
      icon: HardDrive,
      title: 'Graphics Cards',
      description: 'NVIDIA and AMD graphics cards for gaming and professional work.',
      image: 'https://m.media-amazon.com/images/I/81nMCi1QCAL._SL1500_.jpg',
      price: 25999,
      originalPrice: 32999,
      features: ['NVIDIA RTX Series', 'AMD Radeon', 'Ray Tracing', 'DLSS Support']
    },
    {
      icon: Zap,
      title: 'Power Supplies',
      description: 'Reliable PSUs with 80+ certification for stable power delivery.',
      image: 'https://m.media-amazon.com/images/I/51DaEu8ilvL._SL1500_.jpg',
      price: 3499,
      originalPrice: 4499,
      features: ['80+ Bronze/Gold', '450W-1000W', 'Modular Options', '5-Year Warranty']
    },
    {
      icon: Fan,
      title: 'Cooling Systems',
      description: 'CPU coolers and case fans for optimal thermal performance.',
      image: 'https://m.media-amazon.com/images/I/61ujVKXwkVL._SL1000_.jpg',
      price: 1999,
      originalPrice: 2999,
      features: ['Air/Liquid Cooling', 'RGB Options', 'Quiet Operation', 'Easy Install']
    },
    {
      icon: Wifi,
      title: 'Network Cards',
      description: 'WiFi and ethernet cards for improved connectivity.',
      image: 'https://m.media-amazon.com/images/I/41qROlMXQeL._SL1000_.jpg',
      price: 1499,
      originalPrice: 1999,
      features: ['WiFi 6/6E', 'Gigabit Ethernet', 'Bluetooth', 'PCIe/USB']
    },
  ];

  const additionalParts = [
    'Computer Cases',
    'SATA/Power Cables',
    'Thermal Paste',
    'Cable Extensions',
    'Fan Splitters',
    'Drive Caddies',
    'PCI Brackets',
    'Cable Management',
    'Screws & Standoffs',
    'LED Strips',
    'Fan Controllers',
    'Anti-static Wrist Straps'
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] text-white py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-2 text-blue-200 mb-4">
            <Link to="/products" className="hover:text-white">Products</Link>
            <ArrowRight className="w-4 h-4" />
            <span>Hardware Parts</span>
          </div>
          <div className="flex-1">
            <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
              <Cpu className="w-10 h-10" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Hardware Parts
            </h1>
            <p className="text-lg text-blue-100 leading-relaxed mb-8 max-w-2xl">
              Genuine computer hardware parts and accessories at competitive prices. 
              From processors to cooling solutions, we have everything you need for your build.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((product, index) => {
              const Icon = product.icon;
              return (
                <Card key={index} className="border-none shadow-lg overflow-hidden">
                  <div className="h-48 overflow-hidden bg-gray-100 flex items-center justify-center p-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#1E40AF]/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#1E40AF]" />
                      </div>
                      <h3 className="font-display text-xl font-bold text-[#1F2937]">
                        {product.title}
                      </h3>
                    </div>
                    <p className="text-[#6B7280] leading-relaxed mb-4 text-sm">
                      {product.description}
                    </p>
                    <div className="space-y-2 mb-4">
                      {product.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                          <span className="text-[#1F2937]">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-[#1E40AF]">
                        Starting ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-[#6B7280] line-through">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button 
                      className="w-full bg-[#1E40AF] hover:bg-[#3B82F6] text-white"
                      onClick={() => handleQuoteClick(product)}
                    >
                      Get Quote
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Parts */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-[#1F2937] mb-8 text-center">
            Additional Parts & Accessories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {additionalParts.map((part, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-[#F9FAFB] rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                <span className="text-[#1F2937]">{part}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-[#6B7280] mb-4">
              Can't find what you're looking for? Contact us for any specific parts.
            </p>
            <Link to="/contact">
              <Button className="bg-[#1E40AF] hover:bg-[#3B82F6] text-white">
                Contact for Custom Parts
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quote Dialog */}
      <Dialog open={isQuoteDialogOpen} onOpenChange={setIsQuoteDialogOpen}>
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
          <form onSubmit={handleFormSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                name="fullName"
                value={quoteForm.fullName}
                onChange={handleFormChange}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={quoteForm.email}
                onChange={handleFormChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={quoteForm.phone}
                onChange={handleFormChange}
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Part Details / Requirements</Label>
              <Textarea
                id="message"
                name="message"
                value={quoteForm.message}
                onChange={handleFormChange}
                placeholder="Specific model, brand, compatibility requirements..."
                rows={4}
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsQuoteDialogOpen(false)}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#1E40AF] hover:bg-[#3B82F6]"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Submit Request'
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HardwarePartsPage;
