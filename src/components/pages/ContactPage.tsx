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

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: 'Message Sent!',
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({
        name: '',
        mobile: '',
        email: '',
        service: '',
        message: '',
      });
    }, 1500);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      content: '123 Tech Street, Digital City, TC 12345',
      link: 'https://maps.google.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+1 (234) 567-890',
      link: 'tel:+1234567890',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      content: 'Chat with us',
      link: `https://wa.me/1234567890?text=${encodeURIComponent("Hi, I'm interested in IT HUB Computer services")}`,
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
                          <span>Monday - Friday:</span>
                          <span className="font-medium text-[#1F2937]">9:00 AM - 7:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Saturday:</span>
                          <span className="font-medium text-[#1F2937]">10:00 AM - 6:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sunday:</span>
                          <span className="font-medium text-[#1F2937]">Closed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <a href="tel:+1234567890">
                  <Button className="w-full h-14 bg-[#1E40AF] hover:bg-[#3B82F6] text-white btn-press">
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now
                  </Button>
                </a>
                <a
                  href={`https://wa.me/1234567890?text=${whatsappMessage}`}
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

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-[#1F2937] mb-8 text-center">
            Find Us Here
          </h2>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1841374555634!2d-73.98823492346618!3d40.75889097138558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="IT HUB Computer Location"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
