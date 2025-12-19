import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const ProductsPage = () => {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState('all');
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
    { id: 'all', name: 'All Products' },
    { id: 'laptops', name: 'Laptops & Desktops' },
    { id: 'components', name: 'Components' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'networking', name: 'Networking' },
    { id: 'surveillance', name: 'Surveillance' },
  ];

  const products = {
    laptops: [
      {
        title: 'Business Laptops',
        description: 'High-performance laptops for professionals and businesses',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80',
        price: 45999,
        originalPrice: 54999,
      },
      {
        title: 'Gaming Laptops',
        description: 'Powerful gaming laptops with dedicated graphics',
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&q=80',
        price: 89999,
        originalPrice: 109999,
      },
      {
        title: 'Desktop Computers',
        description: 'Custom-built desktops for home and office use',
        image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&q=80',
        price: 35999,
        originalPrice: 42999,
      },
    ],
    components: [
      {
        title: 'RAM Modules',
        description: 'DDR4 and DDR5 RAM for all systems',
        image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&q=80',
        price: 12999,
        originalPrice: 15999,
      },
      {
        title: 'Storage Drives',
        description: 'SSDs and HDDs in various capacities',
        image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80',
        price: 7499,
        originalPrice: 9999,
      },
      {
        title: 'Graphics Cards',
        description: 'Latest GPUs for gaming and professional work',
        image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&q=80',
        price: 54999,
        originalPrice: 64999,
      },
    ],
    accessories: [
      {
        title: 'Keyboards & Mice',
        description: 'Mechanical and wireless input devices',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80',
        price: 4999,
        originalPrice: 6999,
      },
      {
        title: 'Monitors',
        description: 'LED and gaming monitors in various sizes',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80',
        price: 32999,
        originalPrice: 42999,
      },
      {
        title: 'Headsets',
        description: 'Professional and gaming headsets',
        image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&q=80',
        price: 3499,
        originalPrice: 4999,
      },
    ],
    networking: [
      {
        title: 'Routers',
        description: 'High-speed wireless routers for home and office',
        image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400&q=80',
        price: 8999,
        originalPrice: 11999,
      },
      {
        title: 'Network Switches',
        description: 'Managed and unmanaged network switches',
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&q=80',
        price: 5999,
        originalPrice: 7999,
      },
      {
        title: 'Network Cables',
        description: 'Cat5e, Cat6, and Cat6a ethernet cables',
        image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&q=80',
        price: 499,
        originalPrice: 799,
      },
    ],
    surveillance: [
      {
        title: 'CCTV Cameras',
        description: 'Indoor and outdoor surveillance cameras',
        image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400&q=80',
        price: 3999,
        originalPrice: 5499,
      },
      {
        title: 'DVR/NVR Systems',
        description: 'Recording systems for surveillance setups',
        image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400&q=80',
        price: 15999,
        originalPrice: 19999,
      },
      {
        title: 'Biometric Devices',
        description: 'Fingerprint and face recognition systems',
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80',
        price: 9999,
        originalPrice: 12999,
      },
    ],
  };

  const allProducts = Object.values(products).flat();

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] text-white py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Our Products
            </h1>
            <p className="text-lg text-blue-100 leading-relaxed">
              Browse our wide selection of genuine computer hardware, accessories, and IT equipment. 
              All products come with warranty and expert support.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 mb-12 h-auto">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="text-sm md:text-base py-3"
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allProducts.map((product, index) => (
                  <Card key={index} className="border-none shadow-lg overflow-hidden card-hover">
                    <div className="aspect-video overflow-hidden bg-gray-200">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-display text-xl font-bold text-[#1F2937] mb-2">
                        {product.title}
                      </h3>
                      <p className="text-[#6B7280] leading-relaxed mb-4">
                        {product.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-[#1E40AF]">₹{product.price.toLocaleString('en-IN')}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-[#6B7280] line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <Button 
                        className="w-full bg-[#1E40AF] hover:bg-[#3B82F6] text-white btn-press"
                        onClick={() => handleQuoteNowClick(product)}
                      >
                        Quote Now
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {categories.filter(cat => cat.id !== 'all').map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products[category.id as keyof typeof products].map((product, index) => (
                    <Card key={index} className="border-none shadow-lg overflow-hidden card-hover">
                      <div className="aspect-video overflow-hidden bg-gray-200">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-display text-xl font-bold text-[#1F2937] mb-2">
                          {product.title}
                        </h3>
                        <p className="text-[#6B7280] leading-relaxed mb-4">
                          {product.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-[#1E40AF]">₹{product.price.toLocaleString('en-IN')}</span>
                          {product.originalPrice > product.price && (
                            <span className="text-sm text-[#6B7280] line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="p-6 pt-0">
                        <Button 
                          className="w-full bg-[#1E40AF] hover:bg-[#3B82F6] text-white btn-press"
                          onClick={() => handleQuoteNowClick(product)}
                        >
                          Quote Now
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

      {/* Info Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] rounded-2xl p-12 text-white text-center">
            <Package className="w-16 h-16 mx-auto mb-6" />
            <h2 className="font-display text-3xl font-bold mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              We have access to a wide range of products. Contact us with your requirements, 
              and we'll source the right product for you.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-white text-[#1E40AF] hover:bg-gray-100 btn-press">
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
