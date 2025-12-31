import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Cpu, 
  ArrowRight, 
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const MemoryRAMPage = () => {
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
          productName: selectedProduct?.title || 'Memory/RAM Inquiry',
        }),
      });

      if (response.ok) {
        toast({
          title: "Quote Request Sent! ✅",
          description: "We'll get back to you shortly.",
        });
        
        const whatsappMessage = `🔔 *New Quote Request*\n\n📦 *Product:* ${selectedProduct?.title || 'Memory/RAM'}\n\n👤 *Customer:*\n• Name: ${quoteForm.fullName}\n• Email: ${quoteForm.email}\n• Phone: ${quoteForm.phone}\n\n${quoteForm.message ? `💬 *Message:* ${quoteForm.message}` : ''}`;
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

  const products = [
    {
      title: 'DDR4 Desktop RAM',
      description: 'High-performance DDR4 memory modules for desktop computers.',
      image: 'https://m.media-amazon.com/images/I/61P-Ax9vEuL._SL1280_.jpg',
      price: 1999,
      originalPrice: 2499,
      features: ['8GB-32GB Modules', '2666-3600MHz', 'DIMM Form Factor', 'Lifetime Warranty']
    },
    {
      title: 'DDR5 Desktop RAM',
      description: 'Next-gen DDR5 memory for the latest Intel and AMD platforms.',
      image: 'https://m.media-amazon.com/images/I/611n3F+AQJL._SL1500_.jpg',
      price: 4999,
      originalPrice: 5999,
      features: ['16GB-32GB Modules', '4800-6400MHz', 'On-die ECC', 'Better Efficiency']
    },
    {
      title: 'DDR4 Laptop RAM',
      description: 'Compatible DDR4 SO-DIMM memory for laptop upgrades.',
      image: 'https://m.media-amazon.com/images/I/717UzH-ehML._SL1500_.jpg',
      price: 1799,
      originalPrice: 2299,
      features: ['8GB-32GB Options', 'SO-DIMM Form Factor', '2666-3200MHz', 'Low Profile']
    },
    {
      title: 'DDR5 Laptop RAM',
      description: 'DDR5 SO-DIMM for latest generation laptops and notebooks.',
      image: 'https://m.media-amazon.com/images/I/61u+ioPoR1L._SL1080_.jpg',
      price: 4499,
      originalPrice: 5499,
      features: ['16GB-32GB Options', 'SO-DIMM DDR5', '4800MHz+', 'Improved Power']
    },
    {
      title: 'Gaming RGB RAM',
      description: 'High-speed gaming memory with RGB lighting effects.',
      image: 'https://m.media-amazon.com/images/I/51WMG-qMFOL._SL1500_.jpg',
      price: 5999,
      originalPrice: 7499,
      features: ['RGB Lighting', 'XMP Support', '3200-4000MHz', 'Heat Spreader']
    },
    {
      title: 'Server/ECC RAM',
      description: 'Error-correcting memory for servers and workstations.',
      image: 'https://m.media-amazon.com/images/I/5108P3H+jzL._SL1024_.jpg',
      price: 6999,
      originalPrice: 8499,
      features: ['ECC Memory', 'Registered/Unbuffered', '16GB-64GB', 'Server Grade']
    },
  ];

  const brands = ['Corsair', 'G.Skill', 'Kingston', 'Crucial', 'TeamGroup', 'ADATA'];

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] text-white py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-2 text-blue-200 mb-4">
            <Link to="/products" className="hover:text-white">Products</Link>
            <ArrowRight className="w-4 h-4" />
            <span>Memory & RAM</span>
          </div>
          <div className="flex-1">
            <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
              <Cpu className="w-10 h-10" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Memory & RAM
            </h1>
            <p className="text-lg text-blue-100 leading-relaxed mb-8 max-w-2xl">
              Upgrade your system's performance with our range of DDR4 and DDR5 memory modules. 
              Available for desktops, laptops, and servers.
            </p>
            <div className="flex flex-wrap gap-3">
              {brands.map((brand, index) => (
                <span key={index} className="px-4 py-2 bg-white/10 rounded-full text-sm">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <Card key={index} className="border-none shadow-lg overflow-hidden">
                <div className="aspect-video overflow-hidden bg-gray-200">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-display text-xl font-bold text-[#1F2937] mb-2">
                    {product.title}
                  </h3>
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
            ))}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1F2937] mb-6">
            Not Sure Which RAM You Need?
          </h2>
          <p className="text-lg text-[#6B7280] mb-8 max-w-2xl mx-auto">
            Tell us your system model and we'll help you find the right compatible memory upgrade. 
            Free compatibility check included.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-[#1E40AF] hover:bg-[#3B82F6] text-white">
              Get Compatibility Help
            </Button>
          </Link>
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
              <Label htmlFor="message">System Details / Requirements</Label>
              <Textarea
                id="message"
                name="message"
                value={quoteForm.message}
                onChange={handleFormChange}
                placeholder="Your laptop/desktop model, current RAM, desired capacity..."
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

export default MemoryRAMPage;
