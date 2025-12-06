import { Link } from 'react-router-dom';
import { 
  Laptop, 
  HardDrive, 
  Settings, 
  Camera, 
  Fingerprint, 
  Cpu,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ServicesPage = () => {
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
                    <Link to="/contact">
                      <Button className="bg-[#1E40AF] hover:bg-[#3B82F6] text-white btn-press">
                        Get Quote
                      </Button>
                    </Link>
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
          <Link to="/contact">
            <Button size="lg" className="bg-[#1E40AF] hover:bg-[#3B82F6] text-white btn-press">
              Contact Us Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
