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
  Loader2,
  CheckCircle2,
  Shield,
  Clock,
  Award,
  Headphones,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';

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
      description: 'Expert repair services for all brands including Dell, HP, Lenovo, ASUS, Acer, and Apple. We fix hardware and software issues with genuine parts and warranty.',
      link: '/services/laptop-desktop-repair',
      badge: 'Most Popular',
      badgeColor: 'bg-emerald-500',
      image: 'https://5.imimg.com/data5/RG/VS/ND/SELLER-15278742/computer-repair-services.png',
      details: [
        'Complete hardware diagnostics & troubleshooting',
        'Screen replacement (LCD/LED/OLED)',
        'Keyboard & touchpad replacement',
        'Battery & charging port repair',
        'Motherboard level repair',
        'Overheating & thermal paste service',
        'Virus & malware removal',
        'Data backup & migration',
      ],
    },
    {
      icon: HardDrive,
      title: 'Data Recovery Services',
      description: 'Professional data recovery from damaged, corrupted, or failed storage devices. We recover data that others can\'t with 95%+ success rate.',
      link: '/services/data-recovery',
      badge: '95% Success Rate',
      badgeColor: 'bg-blue-500',
      image: 'https://www.nowdatarecovery.com/ndr/wp-content/uploads/2022/05/Data-Recovery-from-Desktop-Laptop-Camera-Hard-Disk-Drives-2-1.jpg',
      details: [
        'Hard drive data recovery (HDD/SSD)',
        'USB & external drive recovery',
        'Memory card & SD card recovery',
        'RAID array data recovery',
        'Deleted file recovery',
        'Formatted drive recovery',
        'Water/fire damaged device recovery',
        'Encrypted data recovery',
      ],
    },
    {
      icon: Settings,
      title: 'Software Installation & Support',
      description: 'Complete software setup, OS installation, system optimization, and ongoing technical support for individuals and businesses.',
      link: '/services/software-installation',
      badge: 'Quick Service',
      badgeColor: 'bg-purple-500',
      image: 'https://f5technology.in/wp-content/uploads/2019/06/computer-software-installation-services-mumbai.jpg',
      details: [
        'Windows, Linux & macOS installation',
        'MS Office & productivity software',
        'Antivirus & security setup',
        'Driver installation & updates',
        'System optimization & cleanup',
        'Cloud backup configuration',
        'Custom software deployment',
        'Remote technical support',
      ],
    },
    {
      icon: Camera,
      title: 'CCTV Installation',
      description: 'Professional security surveillance systems for homes, offices, and businesses. 24/7 monitoring capability with mobile app access.',
      link: '/services/cctv-installation',
      badge: '24/7 Security',
      badgeColor: 'bg-red-500',
      image: 'https://aquatechindia.com/wp-content/uploads/2023/08/1.jpg',
      details: [
        'HD & 4K camera installation',
        'DVR/NVR setup & configuration',
        'Mobile app remote viewing',
        'Night vision & IR cameras',
        'Motion detection alerts',
        'Cloud storage integration',
        'Concealed cable management',
        'Annual maintenance packages',
      ],
    },
    {
      icon: Fingerprint,
      title: 'Biometric Systems',
      description: 'Advanced biometric attendance and access control systems for offices and institutions. Accurate time tracking with comprehensive reports.',
      link: '/services/biometric-systems',
      badge: 'Smart Security',
      badgeColor: 'bg-indigo-500',
      image: 'https://teksun.com/wp-content/uploads/2022/02/Explained-Industrial-Automation-System-and-Its-Hierarchy-Primary-image-1.jpg',
      details: [
        'Fingerprint attendance machines',
        'Face recognition systems',
        'Access control door locks',
        'Time & attendance software',
        'Multi-branch integration',
        'Payroll system integration',
        'Employee management portal',
        'Custom report generation',
      ],
    },
    {
      icon: Cpu,
      title: 'Hardware Parts & Upgrades',
      description: 'Genuine computer components and upgrades at competitive prices. Expert installation and compatibility consultation included.',
      link: '/products',
      badge: 'Genuine Parts',
      badgeColor: 'bg-orange-500',
      image: 'https://thepcworks.com/wp-content/uploads/2020/04/hardware.jpg',
      details: [
        'RAM upgrades (DDR4/DDR5)',
        'SSD & storage upgrades',
        'Graphics card installation',
        'Processor & motherboard',
        'Power supply replacement',
        'Cooling system upgrades',
        'Peripherals & accessories',
        'Custom PC building',
      ],
    },
  ];

  const whyChooseUs = [
    { icon: Shield, title: 'Warranty Protected', description: 'All services come with minimum 30-day warranty' },
    { icon: Clock, title: 'Quick Turnaround', description: 'Most repairs completed within 24-48 hours' },
    { icon: Award, title: '10+ Years Experience', description: 'Trusted by thousands of customers' },
    { icon: Headphones, title: '24/7 Support', description: 'Round-the-clock technical assistance' },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Hero Section - Enhanced */}
      <section className="relative bg-gradient-to-br from-[#0F172A] via-[#1E40AF] to-[#3B82F6] text-white py-24 overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=40')] bg-cover bg-center opacity-10"></div>
        
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-white/20 text-white border-white/30 mb-6 px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                Trusted by 5000+ Customers
              </Badge>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Professional IT
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200"> Services</span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100 leading-relaxed mb-8">
                Expert computer repair, data recovery, CCTV installation, and comprehensive IT solutions. 
                Fast, reliable, and backed by warranty.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-[#1E40AF] hover:bg-blue-50 font-semibold px-8 shadow-lg shadow-white/20"
                  onClick={() => handleGetQuoteClick('General Inquiry')}
                >
                  Get Free Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Link to="/contact">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-white/50 text-[#1E40AF] hover:bg-white/10 font-semibold px-8"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '10+', label: 'Years Experience', icon: Award },
                { value: '5000+', label: 'Happy Customers', icon: CheckCircle2 },
                { value: '24/7', label: 'Support Available', icon: Headphones },
                { value: '95%', label: 'Success Rate', icon: Shield },
              ].map((stat, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <stat.icon className="w-8 h-8 text-cyan-300 mb-3" />
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-blue-200 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {whyChooseUs.map((item, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/20">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display font-bold text-[#1F2937] mb-1">{item.title}</h3>
                <p className="text-sm text-[#6B7280]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Enhanced Grid */}
      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-[#EEF2FF] text-[#1E40AF] mb-4">Our Services</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">
              Comprehensive IT Solutions
            </h2>
            <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
              From computer repairs to security installations, we provide end-to-end IT services for homes and businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="group border border-gray-200 shadow-sm hover:shadow-xl overflow-hidden transition-all duration-500 hover:-translate-y-1 bg-white rounded-xl">
                  {/* Image Header */}
                  <div className="relative h-48 overflow-hidden bg-white border-b border-gray-100">
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <Badge className={`absolute top-4 right-4 ${service.badgeColor} text-white border-0 shadow-lg`}>
                      {service.badge}
                    </Badge>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="w-14 h-14 rounded-xl bg-white/95 backdrop-blur flex items-center justify-center shadow-lg">
                        <Icon className="w-7 h-7 text-[#1E40AF]" strokeWidth={2} />
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="font-display text-xl font-bold text-[#1F2937] mb-3 group-hover:text-[#1E40AF] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-[#6B7280] text-sm leading-relaxed mb-4 line-clamp-2">
                      {service.description}
                    </p>
                    
                    {/* Features Preview */}
                    <div className="space-y-2 mb-6">
                      {service.details.slice(0, 4).map((detail, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <span className="text-[#4B5563] truncate">{detail}</span>
                        </div>
                      ))}
                      {service.details.length > 4 && (
                        <p className="text-[#1E40AF] text-sm font-medium">+{service.details.length - 4} more services</p>
                      )}
                    </div>
                    
                    <div className="flex gap-3">
                      <Button 
                        className="flex-1 bg-[#1E40AF] hover:bg-[#3B82F6] text-white shadow-md shadow-blue-500/20"
                        onClick={() => handleGetQuoteClick(service.title)}
                      >
                        Get Quote
                      </Button>
                      <Link to={service.link} className="flex-1">
                        <Button 
                          variant="outline"
                          className="w-full border-[#1E40AF] text-[#1E40AF] hover:bg-[#EEF2FF]"
                        >
                          Details
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-[#EEF2FF] text-[#1E40AF] mb-4">How It Works</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">
              Simple & Transparent Process
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-16 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-[#1E40AF] via-[#3B82F6] to-[#1E40AF]"></div>
            
            {[
              { step: '01', title: 'Contact Us', desc: 'Call, WhatsApp, or visit our store with your requirements' },
              { step: '02', title: 'Free Diagnosis', desc: 'We diagnose the issue and provide a transparent quote' },
              { step: '03', title: 'Expert Service', desc: 'Our certified technicians work on your device with care' },
              { step: '04', title: 'Quality Assured', desc: 'Pick up your device with warranty and support' },
            ].map((item, idx) => (
              <div key={idx} className="relative text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-blue-500/30 mb-6 relative z-10">
                  {item.step}
                </div>
                <h3 className="font-display font-bold text-lg text-[#1F2937] mb-2">{item.title}</h3>
                <p className="text-[#6B7280] text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-20 bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-300 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center relative z-10">
          <Sparkles className="w-12 h-12 text-cyan-300 mx-auto mb-6" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
            Need a Custom IT Solution?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Whether you're a student, professional, or business owner - we have tailored solutions for your specific needs. 
            Get in touch for a free consultation!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-white text-[#1E40AF] hover:bg-blue-50 font-semibold px-8 shadow-lg"
              onClick={() => handleGetQuoteClick('Custom IT Solution')}
            >
              Request Custom Quote
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <a href="tel:+919779286917">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-[#1E40AF] hover:bg-white/10 font-semibold px-8"
              >
                Call: +91 9779286917
              </Button>
            </a>
          </div>
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
