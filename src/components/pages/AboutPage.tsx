import { Link } from 'react-router-dom';
import { Shield, Users, Award, Heart, Linkedin, Twitter, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const AboutPage = () => {
  const founders = [
    {
      name: 'Jai Duggal',
      role: 'Founder & CEO',
      image: '/images/jaibhai.jpg',
      bio: 'With over 4 years of experience in IT industry, Rajesh founded IT HUB Computer with a vision to provide quality tech solutions to everyone.',
      linkedin: '#',
      twitter: '#',
      email: 'info@ithubcomputer.com',
    },
    {
      name: 'Ashiya Malik ',
      role: 'Co-Founder & CTO',
      image: '/images/ashiyaa.jpg',
      bio: 'A tech enthusiast with expertise in networking and cybersecurity, Ashiya leads our technical operations and innovation initiatives.',
      linkedin: '#',
      twitter: '#',
      email: 'info@ithubcomputer.com',
    },
    {
      name: 'Rihan',
      role: 'Assistant Engineer',
      image: '/images/rihan.png',
      bio: 'business management experience, ensuring smooth operations and exceptional customer service delivery.',
      linkedin: '#',
      twitter: '#',
      email: 'info@ithubcomputer.com',
    },
  ];

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
      {/* Hero Section with Company Image */}
      <section className="relative bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80" 
            alt="IT HUB Computer Office"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
                About IT HUB Computer
              </h1>
              <p className="text-lg text-blue-100 leading-relaxed mb-6">
                Your trusted partner for all IT solutions since establishment. 
                We're committed to providing exceptional service and genuine products.
              </p>
              <div className="flex gap-4">
                <Link to="/contact">
                  <Button size="lg" className="bg-white text-[#1E40AF] hover:bg-gray-100 btn-press">
                    Contact Us
                  </Button>
                </Link>
                <Link to="/services">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 btn-press">
                    Our Services
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=800&q=80" 
                  alt="IT HUB Computer Team"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E40AF]/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-semibold text-lg">Our Modern Facility</p>
                  <p className="text-blue-100 text-sm">State-of-the-art equipment & expert team</p>
                </div>
              </div>
            </div>
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

      {/* Founders Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">
              Meet Our Founders
            </h2>
            <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
              The visionary leaders behind IT HUB Computer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {founders.map((founder, index) => (
              <Card key={index} className="border-none shadow-lg overflow-hidden group">
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display text-xl font-bold text-white mb-1">
                      {founder.name}
                    </h3>
                    <p className="text-blue-200 font-medium">{founder.role}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-[#6B7280] leading-relaxed mb-4">
                    {founder.bio}
                  </p>
                  <div className="flex gap-3">
                    <a 
                      href={founder.linkedin} 
                      className="w-10 h-10 rounded-full bg-[#1E40AF]/10 flex items-center justify-center hover:bg-[#1E40AF] hover:text-white transition-colors text-[#1E40AF]"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a 
                      href={founder.twitter} 
                      className="w-10 h-10 rounded-full bg-[#1E40AF]/10 flex items-center justify-center hover:bg-[#1E40AF] hover:text-white transition-colors text-[#1E40AF]"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a 
                      href={`mailto:${founder.email}`} 
                      className="w-10 h-10 rounded-full bg-[#1E40AF]/10 flex items-center justify-center hover:bg-[#1E40AF] hover:text-white transition-colors text-[#1E40AF]"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
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
