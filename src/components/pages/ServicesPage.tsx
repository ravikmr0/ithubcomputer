import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Laptop, 
  HardDrive, 
  Settings, 
  Camera, 
  Fingerprint, 
  Cpu,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const ServicesPage = () => {
  const { toast } = useToast();
  const [isQuoteDialogOpen, setIsQuoteDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleGetQuoteClick = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
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
    
    // Client-side validation
    if (!quoteForm.fullName.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your full name.",
        variant: "destructive",
        duration: 4000,
      });
      return;
    }
    
    if (!quoteForm.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(quoteForm.email)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
        duration: 4000,
      });
      return;
    }
    
    if (!quoteForm.phone.trim() || quoteForm.phone.replace(/\D/g, '').length < 10) {
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
          fullName: quoteForm.fullName.trim(),
          email: quoteForm.email.trim(),
          phone: quoteForm.phone.trim(),
          message: quoteForm.message.trim(),
          productName: selectedService || 'Service Inquiry',
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

📦 *Service:* ${selectedService || 'Service Inquiry'}

👤 *Customer Details:*
• Name: ${quoteForm.fullName.trim()}
• Email: ${quoteForm.email.trim()}
• Phone: ${quoteForm.phone.trim()}

${quoteForm.message.trim() ? `💬 *Message:*\n${quoteForm.message.trim()}` : ''}

📅 *Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;

        const whatsappUrl = `https://wa.me/919779286917?text=${encodeURIComponent(whatsappMessage)}`;
        
        setQuoteForm({
          fullName: '',
          email: '',
          phone: '',
          message: ''
        });
        setIsQuoteDialogOpen(false);
        
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

  const services = [
    {
      icon: Laptop,
      title: 'Laptop & Desktop Repair',
      description: 'Comprehensive repair services for all brands and models of laptops and desktop computers.',
      details: [
        'Hardware diagnostics and troubleshooting',
        'Screen replacement and repair',
        'Keyboard and touchpad replacement',
        'Battery replacement',
        'Motherboard repair',
        'Overheating issues resolution',
        'Power jack repair',
        'Virus and malware removal',
      ],
    },
    {
      icon: HardDrive,
      title: 'Data Recovery Services',
      description: 'Professional data recovery from damaged, corrupted, or failed storage devices.',
      details: [
        'Hard drive data recovery',
        'SSD data recovery',
        'USB flash drive recovery',
        'Memory card recovery',
        'RAID recovery',
        'Deleted file recovery',
        'Formatted drive recovery',
        'Physical damage recovery',
      ],
    },
    {
      icon: Settings,
      title: 'Software Installation & Support',
      description: 'Complete software setup, installation, and optimization services.',
      details: [
        'Operating system installation (Windows, Linux, macOS)',
        'Software installation and configuration',
        'Driver updates and installation',
        'System optimization and cleanup',
        'Antivirus installation and setup',
        'Office suite installation',
        'Custom software setup',
        'System backup solutions',
      ],
    },
    {
      icon: Camera,
      title: 'CCTV Installation',
      description: 'Professional surveillance camera installation and monitoring system setup.',
      details: [
        'CCTV camera installation',
        'DVR/NVR setup and configuration',
        'Remote viewing setup',
        'Network configuration',
        'Cable routing and management',
        'Multiple camera systems',
        'Night vision cameras',
        'Maintenance and support',
      ],
    },
    {
      icon: Fingerprint,
      title: 'Biometric Systems',
      description: 'Advanced biometric attendance and access control system installation.',
      details: [
        'Fingerprint attendance systems',
        'Face recognition systems',
        'Access control installation',
        'Time and attendance software',
        'Integration with existing systems',
        'Multi-location setup',
        'Employee database management',
        'Report generation setup',
      ],
    },
    {
      icon: Cpu,
      title: 'Hardware Parts & Accessories',
      description: 'Genuine computer parts and accessories at competitive prices.',
      details: [
        'RAM and storage upgrades',
        'Graphics cards',
        'Processors and motherboards',
        'Power supplies',
        'Cooling systems',
        'Keyboards and mice',
        'Monitors and displays',
        'Networking equipment',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] text-white py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-lg text-blue-100 leading-relaxed">
              Comprehensive IT solutions for all your technology needs. From repairs to installations, 
              we've got you covered with expert service and genuine parts.
            </p>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="space-y-12">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="border-none shadow-lg overflow-hidden">
                  <CardHeader className="bg-white border-b border-gray-100 pb-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 rounded-lg bg-[#1E40AF]/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-8 h-8 text-[#1E40AF]" strokeWidth={2} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="font-display text-2xl font-bold text-[#1F2937] mb-2">
                          {service.title}
                        </CardTitle>
                        <p className="text-[#6B7280] leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-8 pb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {service.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <ArrowRight className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                          <span className="text-[#1F2937]">{detail}</span>
                        </div>
                      ))}
                    </div>
                    <Button 
                      className="bg-[#1E40AF] hover:bg-[#3B82F6] text-white btn-press"
                      onClick={() => handleGetQuoteClick(service.title)}
                    >
                      Get Quote
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1F2937] mb-6">
            Need a Custom Solution?
          </h2>
          <p className="text-lg text-[#6B7280] mb-8 max-w-2xl mx-auto">
            We offer customized IT solutions tailored to your specific requirements. 
            Contact us to discuss your needs.
          </p>
          <Button 
            size="lg" 
            className="bg-[#1E40AF] hover:bg-[#3B82F6] text-white btn-press"
            onClick={() => handleGetQuoteClick('Custom IT Solution')}
          >
            Contact Us Today
          </Button>
        </div>
      </section>

      {/* Quote Request Dialog */}
      <Dialog open={isQuoteDialogOpen} onOpenChange={setIsQuoteDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#1F2937]">
              Request a Quote
            </DialogTitle>
            <DialogDescription className="text-[#6B7280]">
              {selectedService && (
                <span className="block mt-2 font-semibold text-[#1E40AF]">
                  Service: {selectedService}
                </span>
              )}
              Fill in your details and we'll get back to you shortly.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-[#1F2937] font-semibold">
                Full Name *
              </Label>
              <Input
                id="fullName"
                name="fullName"
                value={quoteForm.fullName}
                onChange={handleFormChange}
                placeholder="Enter your full name"
                className="border-[#E5E7EB] focus:border-[#1E40AF] focus:ring-[#1E40AF]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#1F2937] font-semibold">
                Email Address *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={quoteForm.email}
                onChange={handleFormChange}
                placeholder="Enter your email"
                className="border-[#E5E7EB] focus:border-[#1E40AF] focus:ring-[#1E40AF]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-[#1F2937] font-semibold">
                Phone Number *
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={quoteForm.phone}
                onChange={handleFormChange}
                placeholder="Enter your phone number"
                className="border-[#E5E7EB] focus:border-[#1E40AF] focus:ring-[#1E40AF]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-[#1F2937] font-semibold">
                Additional Details
              </Label>
              <Textarea
                id="message"
                name="message"
                value={quoteForm.message}
                onChange={handleFormChange}
                placeholder="Tell us more about your requirements..."
                className="border-[#E5E7EB] focus:border-[#1E40AF] focus:ring-[#1E40AF] min-h-[100px]"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsQuoteDialogOpen(false)}
                className="flex-1 border-[#E5E7EB] text-[#6B7280] hover:bg-[#F3F4F6]"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#1E40AF] hover:bg-[#3B82F6] text-white"
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

export default ServicesPage;
