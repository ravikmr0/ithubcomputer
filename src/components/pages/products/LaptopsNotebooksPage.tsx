import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Laptop, 
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

const LaptopsNotebooksPage = () => {
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
          productName: selectedProduct?.title || 'Laptop/Notebook Inquiry',
        }),
      });

      if (response.ok) {
        toast({
          title: "Quote Request Sent! ✅",
          description: "We'll get back to you shortly.",
        });
        
        const whatsappMessage = `🔔 *New Quote Request*\n\n📦 *Product:* ${selectedProduct?.title || 'Laptop/Notebook'}\n\n👤 *Customer:*\n• Name: ${quoteForm.fullName}\n• Email: ${quoteForm.email}\n• Phone: ${quoteForm.phone}\n\n${quoteForm.message ? `💬 *Message:* ${quoteForm.message}` : ''}`;
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
      title: 'Business Laptops',
      description: 'High-performance laptops for professionals and businesses. Reliable, secure, and built for productivity.',
      image: 'https://m.media-amazon.com/images/I/314AIJE3c+L.jpg',
      price: 45999,
      originalPrice: 54999,
      features: ['Intel Core i5/i7 Processors', '8GB-16GB RAM', 'SSD Storage', 'Windows 11 Pro']
    },
    {
      title: 'Gaming Laptops',
      description: 'Powerful gaming laptops with dedicated graphics for immersive gaming experience.',
      image: 'https://m.media-amazon.com/images/I/71X+a0NItZL._SL1500_.jpg',
      price: 89999,
      originalPrice: 109999,
      features: ['RTX Graphics', 'High Refresh Display', '16GB+ RAM', 'RGB Keyboard']
    },
    {
      title: 'Student Laptops',
      description: 'Affordable and reliable laptops perfect for students and everyday use.',
      image: 'https://m.media-amazon.com/images/I/71fHNU8KnQL._SL1500_.jpg',
      price: 32999,
      originalPrice: 39999,
      features: ['Intel Core i3', '8GB RAM', '256GB SSD', 'Long Battery Life']
    },
    {
      title: 'Ultrabooks',
      description: 'Thin and light laptops with premium build quality and excellent portability.',
      image: 'https://m.media-amazon.com/images/I/81aZPvpkQ0L._SL1500_.jpg',
      price: 75999,
      originalPrice: 89999,
      features: ['Ultra-thin Design', 'All-day Battery', 'High-res Display', 'Fast Charging']
    },
    {
      title: 'Workstation Laptops',
      description: 'Professional workstations for CAD, video editing, and heavy workloads.',
      image: 'https://m.media-amazon.com/images/I/616D2RabY1L.jpg',
      price: 125999,
      originalPrice: 149999,
      features: ['Xeon/i9 Processor', '32GB+ RAM', 'Quadro Graphics', 'ISV Certified']
    },
    {
      title: '2-in-1 Convertibles',
      description: 'Versatile laptops that convert to tablets with touchscreen functionality.',
      image: 'https://m.media-amazon.com/images/I/61oPlrp8O9L._SL1080_.jpg',
      price: 59999,
      originalPrice: 69999,
      features: ['360° Hinge', 'Touch Display', 'Stylus Support', 'Windows 11']
    },
  ];

  const brands = ['HP', 'Dell', 'Lenovo', 'ASUS', 'Acer', 'Microsoft', 'Apple', 'MSI'];

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] text-white py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-2 text-blue-200 mb-4">
            <Link to="/products" className="hover:text-white">Products</Link>
            <ArrowRight className="w-4 h-4" />
            <span>Laptops & Notebooks</span>
          </div>
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="flex-1">
              <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                <Laptop className="w-10 h-10" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Laptops & Notebooks
              </h1>
              <p className="text-lg text-blue-100 leading-relaxed mb-8 max-w-2xl">
                Explore our wide range of laptops from top brands. Whether you need a business laptop, 
                gaming powerhouse, or budget-friendly option, we have the perfect choice for you.
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

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1F2937] mb-6">
            Need Help Choosing?
          </h2>
          <p className="text-lg text-[#6B7280] mb-8 max-w-2xl mx-auto">
            Our experts can help you find the perfect laptop based on your needs and budget. 
            Contact us for personalized recommendations.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-[#1E40AF] hover:bg-[#3B82F6] text-white">
              Contact Us
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
              <Label htmlFor="message">Additional Requirements</Label>
              <Textarea
                id="message"
                name="message"
                value={quoteForm.message}
                onChange={handleFormChange}
                placeholder="Any specific brand, specs, or requirements..."
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

export default LaptopsNotebooksPage;
