import { Link } from 'react-router-dom';
import { Shield, Users, Award, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const AboutPage = () => {
  const values = [
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'We use only genuine parts and follow industry best practices to ensure the highest quality service.',
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We listen to your needs and provide personalized solutions.',
    },
    {
      icon: Award,
      title: 'Expert Team',
      description: 'Our certified technicians have years of experience in handling all types of IT challenges.',
    },
    {
      icon: Heart,
      title: 'After-Sales Support',
      description: 'We stand behind our work with comprehensive warranties and ongoing technical support.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] text-white py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              About IT HUB Computer
            </h1>
            <p className="text-lg text-blue-100 leading-relaxed">
              Your trusted partner for all IT solutions since establishment. 
              We're committed to providing exceptional service and genuine products.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[720px] mx-auto px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-[#1F2937] mb-8">
            Our Story
          </h2>
          <div className="space-y-6 text-[#1F2937] leading-relaxed text-lg">
            <p>
              IT HUB Computer was founded with a simple mission: to provide reliable, affordable, 
              and professional IT services to our local community. What started as a small repair 
              shop has grown into a comprehensive IT solutions provider serving students, offices, 
              homes, and small businesses.
            </p>
            <p>
              We understand that technology is essential to modern life and business. That's why 
              we're committed to keeping your devices running smoothly and your systems secure. 
              Whether you need a quick repair, a complete system installation, or ongoing IT support, 
              we're here to help.
            </p>
            <p>
              Our team of certified technicians brings years of experience and a passion for 
              technology to every job. We stay up-to-date with the latest developments in the 
              IT industry to provide you with cutting-edge solutions and expert advice.
            </p>
            <p>
              At IT HUB Computer, we believe in building long-term relationships with our clients. 
              We're not just here to fix problems – we're here to be your trusted technology partner, 
              helping you make informed decisions about your IT investments.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-[#F9FAFB]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">
              Our Values
            </h2>
            <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="border-none shadow-lg">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-lg bg-[#1E40AF]/10 flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-[#1E40AF]" strokeWidth={2} />
                    </div>
                    <h3 className="font-display text-xl font-bold text-[#1F2937] mb-3">
                      {value.title}
                    </h3>
                    <p className="text-[#6B7280] leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] rounded-2xl p-12 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Our Commitment to You
              </h2>
              <p className="text-lg text-blue-100 mb-4 leading-relaxed">
                We're committed to providing exceptional customer service and technical excellence. 
                Every repair, installation, and consultation is performed with meticulous attention 
                to detail and a focus on your complete satisfaction.
              </p>
              <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                We stand behind our work with comprehensive warranties and offer ongoing support 
                to ensure your technology continues to serve you well long after the initial service.
              </p>
              <Link to="/contact">
                <Button size="lg" className="bg-white text-[#1E40AF] hover:bg-gray-100 btn-press">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-[#F9FAFB]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-display font-bold text-[#1E40AF] mb-2">100+</div>
              <div className="text-[#6B7280] font-medium">Happy Customers</div>
            </div>
            <div>
              <div className="text-5xl font-display font-bold text-[#1E40AF] mb-2">500+</div>
              <div className="text-[#6B7280] font-medium">Repairs Completed</div>
            </div>
            <div>
              <div className="text-5xl font-display font-bold text-[#1E40AF] mb-2">24/7</div>
              <div className="text-[#6B7280] font-medium">Support Available</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
