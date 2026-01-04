import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Laptop, 
  ArrowRight, 
  CheckCircle2, 
  Loader2,
  Wrench,
  Monitor,
  Battery,
  Cpu,
  Shield,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const LaptopDesktopRepairPage = () => {
  const { toast } = useToast();
  const [isQuoteDialogOpen, setIsQuoteDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

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
          productName: 'Laptop & Desktop Repair Service',
        }),
      });

      if (response.ok) {
        toast({
          title: "Quote Request Sent! ✅",
          description: "We'll get back to you shortly.",
        });
        
        const whatsappMessage = `🔔 *New Quote Request*\n\n📦 *Service:* Laptop & Desktop Repair\n\n👤 *Customer:*\n• Name: ${quoteForm.fullName}\n• Email: ${quoteForm.email}\n• Phone: ${quoteForm.phone}\n\n${quoteForm.message ? `💬 *Message:* ${quoteForm.message}` : ''}`;
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

  const services = [
    { icon: Monitor, title: 'Screen Replacement', description: 'LCD/LED screen repair and replacement for all laptop models' },
    { icon: Cpu, title: 'Motherboard Repair', description: 'Component-level motherboard diagnostics and repair' },
    { icon: Battery, title: 'Battery Replacement', description: 'Original and compatible battery replacements' },
    { icon: Wrench, title: 'Hardware Diagnostics', description: 'Complete system diagnostics and troubleshooting' },
    { icon: Shield, title: 'Virus Removal', description: 'Malware and virus removal with system optimization' },
    { icon: Clock, title: 'Quick Turnaround', description: 'Fast repair services with same-day options available' },
  ];

  const repairList = [
    'Hardware diagnostics and troubleshooting',
    'Screen replacement and repair',
    'Keyboard and touchpad replacement',
    'Battery replacement',
    'Motherboard repair',
    'Overheating issues resolution',
    'Power jack repair',
    'Virus and malware removal',
    'RAM and storage upgrades',
    'Operating system reinstallation',
    'Data backup and recovery',
    'Cooling system cleaning',
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] text-white py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-2 text-blue-200 mb-4">
            <Link to="/services" className="hover:text-white">Services</Link>
            <ArrowRight className="w-4 h-4" />
            <span>Laptop & Desktop Repair</span>
          </div>
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="flex-1">
              <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                <Laptop className="w-10 h-10" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Laptop & Desktop Repair
              </h1>
              <p className="text-lg text-blue-100 leading-relaxed mb-8 max-w-2xl">
                Comprehensive repair services for all brands and models of laptops and desktop computers. 
                From hardware diagnostics to software troubleshooting, we've got you covered.
              </p>
              <Button 
                size="lg"
                className="bg-white text-[#1E40AF] hover:bg-gray-100"
                onClick={() => setIsQuoteDialogOpen(true)}
              >
                Get Free Quote
              </Button>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://thepcworks.com/wp-content/uploads/2020/04/hardware.jpg" 
                alt="Laptop Repair"
                className="w-[400px] rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-[#1F2937] mb-12 text-center">
            Our Repair Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="border-none shadow-lg">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-[#1E40AF]/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#1E40AF]" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-[#1F2937] mb-2">
                      {service.title}
                    </h3>
                    <p className="text-[#6B7280]">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Full Services List */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-[#1F2937] mb-6">
                Complete Repair Solutions
              </h2>
              <p className="text-[#6B7280] mb-8">
                We provide end-to-end repair solutions for all types of laptops and desktop computers. 
                Our experienced technicians can handle any issue, big or small.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {repairList.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                    <span className="text-[#1F2937]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] rounded-2xl p-8 text-white">
              <h3 className="font-display text-2xl font-bold mb-4">Why Choose Us?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Expert technicians with years of experience</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Genuine parts and warranty on repairs</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Quick turnaround time</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Affordable and transparent pricing</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Free diagnostics and estimates</span>
                </li>
              </ul>
              <Button 
                size="lg"
                className="mt-8 bg-white text-[#1E40AF] hover:bg-gray-100 w-full"
                onClick={() => setIsQuoteDialogOpen(true)}
              >
                Request Service
              </Button>
            </div>
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
              <span className="block mt-2 font-semibold text-[#1E40AF]">
                Service: Laptop & Desktop Repair
              </span>
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
              <Label htmlFor="message">Describe Your Issue</Label>
              <Textarea
                id="message"
                name="message"
                value={quoteForm.message}
                onChange={handleFormChange}
                placeholder="Tell us about the problem with your device..."
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

export default LaptopDesktopRepairPage;
