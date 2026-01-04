import { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Eye, ShoppingCart, Star, ArrowLeft, Search, X } from 'lucide-react';
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const highlightedProductRef = useRef<HTMLDivElement>(null);
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

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchQuery.trim() === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get highlighted product ID from URL
  const highlightedId = searchParams.get('highlight');

  // Scroll to highlighted product on mount
  useEffect(() => {
    if (highlightedId && highlightedProductRef.current) {
      setTimeout(() => {
        highlightedProductRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }, [highlightedId]);

  // Update URL when search changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value.trim()) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] text-white py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="max-w-3xl">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-black mb-4">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
            </h1>
            <p className="text-base md:text-lg text-blue-100 leading-relaxed">
              {searchQuery 
                ? `Found ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} matching your search.`
                : 'Browse our complete collection of genuine computer hardware, accessories, and IT equipment. All products come with warranty and expert support.'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-6 bg-white border-b border-gray-200 sticky top-20 z-40">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            {/* Search Input */}
            <div className="relative flex-1 w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 border-gray-300 focus:border-[#3B82F6] focus:ring-[#3B82F6]"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-[#1E40AF] text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category === 'all' ? 'All Categories' : category}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 md:py-12">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <Search className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search or filter to find what you're looking for.</p>
              <Button onClick={clearSearch} className="bg-[#1E40AF] hover:bg-[#3B82F6]">
                Clear Search
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
              <div
                key={product.id}
                ref={highlightedId === String(product.id) ? highlightedProductRef : null}
              >
              <Card 
                className={`group border shadow-sm hover:shadow-xl overflow-hidden transition-all duration-500 hover:-translate-y-1 bg-white rounded-xl ${
                  highlightedId === String(product.id) 
                    ? 'border-[#1E40AF] ring-4 ring-[#1E40AF]/20 animate-pulse' 
                    : 'border-gray-200'
                }`}
              >
                <div className="relative h-64 overflow-hidden bg-white border-b border-gray-100">
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
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
              </div>
            ))}
            </div>
          )}
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
