import { Link } from 'react-router-dom';
import { 
  Laptop, 
  HardDrive, 
  Settings, 
  Camera, 
  Fingerprint, 
  Cpu,
  Shield,
  Zap,
  CheckCircle,
  Tag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const HomePage = () => {
  const services = [
    {
      icon: Laptop,
      title: 'Laptop & Desktop Repair',
      description: 'Expert repair services for all brands of laptops and desktops with genuine parts.',
    },
    {
      icon: HardDrive,
      title: 'Data Recovery',
      description: 'Professional data recovery from damaged hard drives and storage devices.',
    },
    {
      icon: Settings,
      title: 'Software Installation',
      description: 'Complete software setup, OS installation, and system optimization services.',
    },
    {
      icon: Camera,
      title: 'CCTV Installation',
      description: 'Professional CCTV camera installation and surveillance system setup.',
    },
    {
      icon: Fingerprint,
      title: 'Biometric Systems',
      description: 'Advanced biometric attendance and access control system installation.',
    },
    {
      icon: Cpu,
      title: 'Hardware Parts',
      description: 'Genuine computer parts and accessories at competitive prices.',
    },
  ];

  const features = [
    {
      icon: Shield,
      title: 'Genuine Parts',
      description: 'Only authentic components and accessories',
    },
    {
      icon: CheckCircle,
      title: 'Expert Technicians',
      description: 'Certified professionals with years of experience',
    },
    {
      icon: Zap,
      title: 'Fast Service',
      description: 'Quick turnaround time for all repairs',
    },
    {
      icon: Tag,
      title: 'Budget-Friendly',
      description: 'Competitive pricing for students and businesses',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1E40AF] via-[#3B82F6] to-[#60A5FA] text-white hero-pattern overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-display text-5xl md:text-7xl font-black mb-6 leading-tight animate-fade-up drop-shadow-lg">
              Your Trusted IT Solutions Partner
            </h1>
            <p className="text-xl md:text-2xl text-blue-50 mb-8 leading-relaxed font-medium">
              Professional computer repair, CCTV installation, and IT services for students, offices, and businesses. 
              Genuine parts, expert service, affordable prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:+1234567890">
                <Button size="lg" className="bg-white text-[#1E40AF] hover:bg-gray-100 btn-press text-base px-8 font-bold shadow-2xl hover:shadow-3xl">
                  Call Now
                </Button>
              </a>
              <Link to="/services">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-[#1E40AF] btn-press text-base px-8 font-bold backdrop-blur-sm"
                >
                  View Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-32 bg-[#F9FAFB]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-black text-[#1F2937] mb-4">
              Our Services
            </h2>
            <p className="text-xl text-[#6B7280] max-w-2xl mx-auto font-medium">
              Comprehensive IT solutions tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card 
                  key={index} 
                  className="card-hover cursor-pointer border-none shadow-lg hover:shadow-2xl bg-white"
                >
                  <CardContent className="p-8">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] flex items-center justify-center mb-6 shadow-lg">
                      <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                    </div>
                    <h3 className="font-display text-xl font-bold text-[#1F2937] mb-3">
                      {service.title}
                    </h3>
                    <p className="text-[#6B7280] leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button size="lg" className="bg-[#1E40AF] hover:bg-[#3B82F6] text-white btn-press font-bold shadow-xl">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">
              Why Choose IT HUB Computer?
            </h2>
            <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
              Your satisfaction is our priority
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-[#10B981]/10 flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-[#10B981]" strokeWidth={2} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#1F2937] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[#6B7280] text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#1E40AF] via-[#3B82F6] to-[#60A5FA] text-white relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-30"></div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-display text-4xl md:text-5xl font-black mb-6 drop-shadow-lg">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto font-medium">
            Contact us today for a free consultation and quote
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+1234567890">
              <Button size="lg" className="bg-white text-[#1E40AF] hover:bg-gray-100 btn-press font-bold shadow-2xl">
                Call Now
              </Button>
            </a>
            <Link to="/contact">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-[#1E40AF] btn-press font-bold backdrop-blur-sm"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
