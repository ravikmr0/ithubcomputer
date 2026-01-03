import { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const ContactPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    service: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Message Sent!',
          description: "We'll get back to you as soon as possible.",
        });
        
        // Generate WhatsApp message with form data
        const whatsappMessage = `🔔 *New Contact Form Submission*

👤 *Customer Details:*
• Name: ${formData.name}
• Email: ${formData.email}
${formData.mobile ? `• Phone: ${formData.mobile}` : ''}
${formData.service ? `• Service: ${formData.service}` : ''}

💬 *Message:*
${formData.message}

📅 *Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;

        const whatsappUrl = `https://wa.me/919779286917?text=${encodeURIComponent(whatsappMessage)}`;
        
        setFormData({
          name: '',
          mobile: '',
          email: '',
          service: '',
          message: '',
        });
        
        // Redirect to WhatsApp
        window.open(whatsappUrl, '_blank');
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Failed to send message. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      content: 'Sector 141, Noida, Uttar Pradesh 201304, India',
      link: 'https://share.google/d3XWH8nuOviYXnm5a',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+91 9779286917',
      link: 'tel:+919779286917',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      content: 'Chat with us',
      link: `https://wa.me/919779286917?text=${encodeURIComponent("Hi, I'm interested in IT HUB Computer services")}`,
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@ithubcomputer.com',
      link: 'mailto:info@ithubcomputer.com',
    },
  ];

  const whatsappMessage = encodeURIComponent("Hi, I'm interested in IT HUB Computer services");

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] text-white py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-lg text-blue-100 leading-relaxed">
              Get in touch with us for any inquiries, quotes, or support. 
              We're here to help you with all your IT needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="border-none shadow-lg">
                <CardContent className="p-8">
                  <h2 className="font-display text-2xl font-bold text-[#1F2937] mb-6">
                    Send us a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-[#1F2937] font-medium mb-2 block">
                        Name *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>

                    <div>
                      <Label htmlFor="mobile" className="text-[#1F2937] font-medium mb-2 block">
                        Mobile Number *
                      </Label>
                      <Input
                        id="mobile"
                        type="tel"
                        placeholder="Your mobile number"
                        value={formData.mobile}
                        onChange={(e) => handleChange('mobile', e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-[#1F2937] font-medium mb-2 block">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>

                    <div>
                      <Label htmlFor="service" className="text-[#1F2937] font-medium mb-2 block">
                        Service/Product *
                      </Label>
                      <Select
                        value={formData.service}
                        onValueChange={(value) => handleChange('service', value)}
                        required
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select a service or product" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="laptop-repair">Laptop & Desktop Repair</SelectItem>
                          <SelectItem value="data-recovery">Data Recovery</SelectItem>
                          <SelectItem value="software">Software Installation</SelectItem>
                          <SelectItem value="cctv">CCTV Installation</SelectItem>
                          <SelectItem value="biometric">Biometric Systems</SelectItem>
                          <SelectItem value="hardware">Hardware Parts</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-[#1F2937] font-medium mb-2 block">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your requirements..."
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        required
                        rows={5}
                        className="resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 bg-[#1E40AF] hover:bg-[#3B82F6] text-white btn-press text-base"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-[#1F2937] mb-6">
                  Get in Touch
                </h2>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <Card key={index} className="border-none shadow-md card-hover">
                        <CardContent className="p-6">
                          <a
                            href={info.link}
                            target={info.link.startsWith('http') ? '_blank' : undefined}
                            rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="flex items-start space-x-4"
                          >
                            <div className="w-12 h-12 rounded-lg bg-[#1E40AF]/10 flex items-center justify-center flex-shrink-0">
                              <Icon className="w-6 h-6 text-[#1E40AF]" />
                            </div>
                            <div>
                              <h3 className="font-display font-bold text-[#1F2937] mb-1">
                                {info.title}
                              </h3>
                              <p className="text-[#6B7280]">{info.content}</p>
                            </div>
                          </a>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Business Hours */}
              <Card className="border-none shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-[#10B981]/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-[#10B981]" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-[#1F2937] mb-3">
                        Business Hours
                      </h3>
                      <div className="space-y-2 text-sm text-[#6B7280]">
                        <div className="flex justify-between">
                          <span>Monday - Sunday:</span>
                          <span className="font-medium text-[#1F2937]"> 10:00 AM - 10:00 PM</span>
                        </div>
                        
                        
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <a href="tel:+919779286917">
                  <Button className="w-full h-14 bg-[#1E40AF] hover:bg-[#3B82F6] text-white btn-press">
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now
                  </Button>
                </a>
                <a
                  href={`https://wa.me/+919779286917?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full h-14 bg-[#10B981] hover:bg-[#059669] text-white btn-press">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">
              Visit Our Store
            </h2>
            <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
              Find us at our location in Sector 141, Noida. We're here to serve you with all your IT needs.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] rounded-2xl p-8 md:p-12 text-white text-center">
            <MapPin className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h3 className="text-2xl font-bold mb-4">IT HUB Computer</h3>
            <p className="text-lg text-blue-100 mb-8 max-w-xl mx-auto">
              Sector 141, Noida, Uttar Pradesh 201304, India
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://maps.app.goo.gl/jS9od4ePFGsdhwa2A" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button className="bg-white text-[#1E40AF] hover:bg-blue-50 font-semibold px-8 py-4 text-lg shadow-lg w-full sm:w-auto">
                  <MapPin className="w-5 h-5 mr-2" />
                  Open in Google Maps
                </Button>
              </a>
              <a href="tel:+919779286917">
                <Button className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-4 text-lg w-full sm:w-auto">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Us Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;
