import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const ProductsPage = () => {
  const [activeCategory, setActiveCategory] = useState('laptops');

  const categories = [
    { id: 'laptops', name: 'Laptops & Desktops' },
    { id: 'components', name: 'Components' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'networking', name: 'Networking' },
    { id: 'surveillance', name: 'Surveillance' },
  ];

  const products = {
    laptops: [
      {
        title: 'Business Laptops',
        description: 'High-performance laptops for professionals and businesses',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80',
      },
      {
        title: 'Gaming Laptops',
        description: 'Powerful gaming laptops with dedicated graphics',
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&q=80',
      },
      {
        title: 'Desktop Computers',
        description: 'Custom-built desktops for home and office use',
        image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&q=80',
      },
    ],
    components: [
      {
        title: 'RAM Modules',
        description: 'DDR4 and DDR5 RAM for all systems',
        image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&q=80',
      },
      {
        title: 'Storage Drives',
        description: 'SSDs and HDDs in various capacities',
        image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80',
      },
      {
        title: 'Graphics Cards',
        description: 'Latest GPUs for gaming and professional work',
        image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&q=80',
      },
    ],
    accessories: [
      {
        title: 'Keyboards & Mice',
        description: 'Mechanical and wireless input devices',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80',
      },
      {
        title: 'Monitors',
        description: 'LED and gaming monitors in various sizes',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80',
      },
      {
        title: 'Headsets',
        description: 'Professional and gaming headsets',
        image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&q=80',
      },
    ],
    networking: [
      {
        title: 'Routers',
        description: 'High-speed wireless routers for home and office',
        image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400&q=80',
      },
      {
        title: 'Network Switches',
        description: 'Managed and unmanaged network switches',
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&q=80',
      },
      {
        title: 'Network Cables',
        description: 'Cat5e, Cat6, and Cat6a ethernet cables',
        image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&q=80',
      },
    ],
    surveillance: [
      {
        title: 'CCTV Cameras',
        description: 'Indoor and outdoor surveillance cameras',
        image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400&q=80',
      },
      {
        title: 'DVR/NVR Systems',
        description: 'Recording systems for surveillance setups',
        image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400&q=80',
      },
      {
        title: 'Biometric Devices',
        description: 'Fingerprint and face recognition systems',
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] text-white py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Our Products
            </h1>
            <p className="text-lg text-blue-100 leading-relaxed">
              Browse our wide selection of genuine computer hardware, accessories, and IT equipment. 
              All products come with warranty and expert support.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <Tabs defaultValue="laptops" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-12 h-auto">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="text-sm md:text-base py-3"
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products[category.id as keyof typeof products].map((product, index) => (
                    <Card key={index} className="border-none shadow-lg overflow-hidden card-hover">
                      <div className="aspect-video overflow-hidden bg-gray-200">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-display text-xl font-bold text-[#1F2937] mb-2">
                          {product.title}
                        </h3>
                        <p className="text-[#6B7280] leading-relaxed">
                          {product.description}
                        </p>
                      </CardContent>
                      <CardFooter className="p-6 pt-0">
                        <Link to="/contact" className="w-full">
                          <Button className="w-full bg-[#1E40AF] hover:bg-[#3B82F6] text-white btn-press">
                            Enquiry Now
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] rounded-2xl p-12 text-white text-center">
            <Package className="w-16 h-16 mx-auto mb-6" />
            <h2 className="font-display text-3xl font-bold mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              We have access to a wide range of products. Contact us with your requirements, 
              and we'll source the right product for you.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-white text-[#1E40AF] hover:bg-gray-100 btn-press">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
