import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mouse, 
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

const MouseTrackpadsPage = () => {
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
          productName: selectedProduct?.title || 'Mouse/Trackpad Inquiry',
        }),
      });

      if (response.ok) {
        toast({
          title: "Quote Request Sent! ✅",
          description: "We'll get back to you shortly.",
        });
        
        const whatsappMessage = `🔔 *New Quote Request*\n\n📦 *Product:* ${selectedProduct?.title || 'Mouse/Trackpad'}\n\n👤 *Customer:*\n• Name: ${quoteForm.fullName}\n• Email: ${quoteForm.email}\n• Phone: ${quoteForm.phone}\n\n${quoteForm.message ? `💬 *Message:* ${quoteForm.message}` : ''}`;
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
      title: 'Wired Mouse',
      description: 'Reliable wired mice for everyday computing and office work.',
      image: 'https://m.media-amazon.com/images/I/71j6PDIwegL._SL1500_.jpg',
      price: 299,
      originalPrice: 499,
      features: ['Optical Sensor', 'Ergonomic Design', 'Plug & Play', 'Durable Build']
    },
    {
      title: 'Wireless Mouse',
      description: 'Cable-free wireless mice with reliable connectivity.',
      image: 'https://m.media-amazon.com/images/I/61AeUJwifcL._SL1500_.jpg',
      price: 799,
      originalPrice: 1199,
      features: ['2.4GHz Wireless', 'Long Battery Life', 'Silent Clicks', 'Compact Design']
    },
    {
      title: 'Gaming Mouse',
      description: 'High-precision gaming mice with customizable buttons and RGB.',
      image: 'https://m.media-amazon.com/images/I/51jFOZuPzYL._SL1500_.jpg',
      price: 2499,
      originalPrice: 2999,
      features: ['High DPI Sensor', 'Programmable Buttons', 'RGB Lighting', 'Adjustable Weight']
    },
    {
      title: 'Ergonomic Mouse',
      description: 'Vertically designed mice for comfort and reduced wrist strain.',
      image: 'https://m.media-amazon.com/images/I/51Oe78RFkML._SL1500_.jpg',
      price: 1499,
      originalPrice: 1999,
      features: ['Vertical Design', 'Wrist Support', 'Multiple Buttons', 'Wireless Option']
    },
    {
      title: 'Trackpads',
      description: 'Touch-based trackpads for gesture control and precise navigation.',
      image: 'https://m.media-amazon.com/images/I/61WKVeq-RZL._SL1500_.jpg',
      price: 3999,
      originalPrice: 4999,
      features: ['Multi-touch Gestures', 'Glass Surface', 'Bluetooth', 'Rechargeable']
    },
    {
      title: 'Bluetooth Mouse',
      description: 'Bluetooth mice that connect without USB receivers.',
      image: 'https://m.media-amazon.com/images/I/41d107wh7KL._AC_CR0%2C0%2C0%2C0_SX615_SY462_.jpg',
      price: 1299,
      originalPrice: 1699,
      features: ['Bluetooth 5.0', 'Multi-device Pairing', 'USB-C Charging', 'Slim Profile']
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] text-white py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-2 text-blue-200 mb-4">
            <Link to="/products" className="hover:text-white">Products</Link>
            <ArrowRight className="w-4 h-4" />
            <span>Mouse & Trackpads</span>
          </div>
          <div className="flex-1">
            <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
              <Mouse className="w-10 h-10" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Mouse & Trackpads
            </h1>
            <p className="text-lg text-blue-100 leading-relaxed mb-8 max-w-2xl">
              Explore our collection of mice and trackpads - from basic office mice to 
              high-performance gaming and ergonomic options.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <Card key={index} className="group border border-gray-200 shadow-sm hover:shadow-xl overflow-hidden transition-all duration-500 hover:-translate-y-1 bg-white rounded-xl">
                <div className="relative h-48 overflow-hidden bg-white border-b border-gray-100">
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
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
              <Label htmlFor="message">Additional Requirements</Label>
              <Textarea
                id="message"
                name="message"
                value={quoteForm.message}
                onChange={handleFormChange}
                placeholder="Type, connectivity, brand preference..."
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

export default MouseTrackpadsPage;
