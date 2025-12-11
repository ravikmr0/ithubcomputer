import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, ShoppingCart, Star, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const AllProductsPage = () => {
  const { toast } = useToast();
  const [isLeadDialogOpen, setIsLeadDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadForm, setLeadForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleBuyNowClick = (product: any) => {
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

  const products = [
    {
      id: 1,
      name: 'Gaming Laptop i7 RTX 4060',
      category: 'Laptops',
      price: 89999,
      originalPrice: 109999,
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&q=80',
      rating: 4.8,
      reviews: 124,
      badge: 'Best Seller',
      inStock: true,
    },
    {
      id: 2,
      name: '27" 4K IPS Monitor',
      category: 'Monitors',
      price: 32999,
      originalPrice: 42999,
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80',
      rating: 4.9,
      reviews: 89,
      badge: 'New',
      inStock: true,
    },
    {
      id: 3,
      name: 'Mechanical RGB Keyboard',
      category: 'Peripherals',
      price: 4999,
      originalPrice: 6999,
      image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400&q=80',
      rating: 4.7,
      reviews: 256,
      badge: 'Hot',
      inStock: true,
    },
    {
      id: 4,
      name: '1TB NVMe SSD Gen4',
      category: 'Storage',
      price: 7499,
      originalPrice: 9999,
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80',
      rating: 4.9,
      reviews: 312,
      badge: 'Sale',
      inStock: true,
    },
    {
      id: 5,
      name: 'Wireless Gaming Mouse',
      category: 'Peripherals',
      price: 2999,
      originalPrice: 3999,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80',
      rating: 4.6,
      reviews: 178,
      badge: null,
      inStock: true,
    },
    {
      id: 6,
      name: '32GB DDR5 RAM Kit',
      category: 'Memory',
      price: 12999,
      originalPrice: 15999,
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&q=80',
      rating: 4.8,
      reviews: 94,
      badge: 'Popular',
      inStock: true,
    },
    {
      id: 7,
      name: 'WiFi 6E Router',
      category: 'Networking',
      price: 8999,
      originalPrice: 11999,
      image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400&q=80',
      rating: 4.5,
      reviews: 67,
      badge: null,
      inStock: true,
    },
    {
      id: 8,
      name: 'RTX 4070 Graphics Card',
      category: 'Graphics Cards',
      price: 54999,
      originalPrice: 64999,
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&q=80',
      rating: 4.9,
      reviews: 201,
      badge: 'Best Seller',
      inStock: true,
    },
    {
      id: 9,
      name: 'Business Desktop PC',
      category: 'Desktops',
      price: 35999,
      originalPrice: 42999,
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&q=80',
      rating: 4.6,
      reviews: 78,
      badge: null,
      inStock: true,
    },
    {
      id: 10,
      name: 'Wireless Headset',
      category: 'Audio',
      price: 3499,
      originalPrice: 4999,
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&q=80',
      rating: 4.7,
      reviews: 145,
      badge: 'Sale',
      inStock: true,
    },
    {
      id: 11,
      name: 'CCTV Camera System',
      category: 'Surveillance',
      price: 15999,
      originalPrice: 19999,
      image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400&q=80',
      rating: 4.8,
      reviews: 56,
      badge: 'New',
      inStock: true,
    },
    {
      id: 12,
      name: 'Biometric Scanner',
      category: 'Security',
      price: 9999,
      originalPrice: 12999,
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80',
      rating: 4.5,
      reviews: 43,
      badge: null,
      inStock: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] text-white py-16">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl font-black mb-4">
              All Products
            </h1>
            <p className="text-lg text-blue-100 leading-relaxed">
              Browse our complete collection of genuine computer hardware, accessories, and IT equipment. 
              All products come with warranty and expert support.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card 
                key={product.id} 
                className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
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
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <Button size="sm" className="bg-white text-[#1F2937] hover:bg-[#1E40AF] hover:text-white">
                      <Eye className="w-4 h-4 mr-1" /> View
                    </Button>
                    <Button size="sm" className="bg-[#1E40AF] text-white hover:bg-[#3B82F6]">
                      <ShoppingCart className="w-4 h-4 mr-1" /> Add
                    </Button>
                  </div>
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
            ))}
          </div>
        </div>
      </section>

      {/* Lead Generation Dialog */}
      <Dialog open={isLeadDialogOpen} onOpenChange={setIsLeadDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#1F2937]">Request a Quote</DialogTitle>
            <DialogDescription className="text-[#6B7280]">
              Fill in your details and we'll get back to you with the best quote for {selectedProduct?.name}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLeadFormSubmit} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="fullName" className="text-[#1F2937] font-medium">Full Name *</Label>
              <Input
                id="fullName"
                name="fullName"
                value={leadForm.fullName}
                onChange={handleLeadFormChange}
                placeholder="Enter your full name"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-[#1F2937] font-medium">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={leadForm.email}
                onChange={handleLeadFormChange}
                placeholder="your.email@example.com"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-[#1F2937] font-medium">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={leadForm.phone}
                onChange={handleLeadFormChange}
                placeholder="+91 XXXXX XXXXX"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="message" className="text-[#1F2937] font-medium">Message (Optional)</Label>
              <Textarea
                id="message"
                name="message"
                value={leadForm.message}
                onChange={handleLeadFormChange}
                placeholder="Any specific requirements or questions?"
                rows={4}
                className="mt-1"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsLeadDialogOpen(false)}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#1E40AF] hover:bg-[#3B82F6] text-white"
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

export default AllProductsPage;
