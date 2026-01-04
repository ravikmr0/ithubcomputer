import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, Headphones, Speaker, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AudioEquipmentPage = () => {
  const products = [
    {
      id: 1,
      name: 'Sony WH-1000XM5 Wireless Headphones',
      price: 29999,
      originalPrice: 34999,
      rating: 4.9,
      reviews: 324,
      image: 'https://m.media-amazon.com/images/I/61+vg4nVg9L._SL1500_.jpg',
      badge: 'Best Seller',
      features: ['Active Noise Cancellation', '30hr Battery', 'Hi-Res Audio'],
    },
    {
      id: 2,
      name: 'JBL Charge 5 Portable Bluetooth Speaker',
      price: 14999,
      originalPrice: 17999,
      rating: 4.7,
      reviews: 256,
      image: 'https://m.media-amazon.com/images/I/71OAC2L15TL._SL1500_.jpg',
      badge: 'Popular',
      features: ['Waterproof IP67', '20hr Playtime', 'Powerbank Function'],
    },
    {
      id: 3,
      name: 'Audio-Technica AT2020 USB Microphone',
      price: 8999,
      originalPrice: 10999,
      rating: 4.8,
      reviews: 189,
      image: 'https://m.media-amazon.com/images/I/71rCf-z8+aL._SL1500_.jpg',
      badge: 'Top Rated',
      features: ['USB Connectivity', 'Cardioid Pattern', 'Studio Quality'],
    },
    {
      id: 4,
      name: 'Bose QuietComfort Earbuds II',
      price: 24999,
      originalPrice: 29999,
      rating: 4.8,
      reviews: 412,
      image: 'https://m.media-amazon.com/images/I/513LCPDEWKL._SL1500_.jpg',
      badge: 'Premium',
      features: ['CustomTune Technology', 'ANC', '6hr Battery'],
    },
    {
      id: 5,
      name: 'Marshall Stanmore II Bluetooth Speaker',
      price: 32999,
      originalPrice: 39999,
      rating: 4.6,
      reviews: 178,
      image: 'https://m.media-amazon.com/images/I/81fkcBjZndL._SL1500_.jpg',
      badge: 'Classic',
      features: ['Iconic Design', 'Multi-host Connectivity', 'Analog Controls'],
    },
    {
      id: 6,
      name: 'Sennheiser HD 560S Headphones',
      price: 15999,
      originalPrice: 18999,
      rating: 4.7,
      reviews: 145,
      image: 'https://m.media-amazon.com/images/I/81cWWVMM8+L._SL1500_.jpg',
      badge: 'Audiophile',
      features: ['Open-Back Design', 'Reference Grade', 'Velour Ear Pads'],
    },
    {
      id: 7,
      name: 'Rode NT-USB Mini Microphone',
      price: 7499,
      originalPrice: 8999,
      rating: 4.6,
      reviews: 234,
      image: 'https://m.media-amazon.com/images/I/71mmZOQPuNL._SL1500_.jpg',
      badge: 'Compact',
      features: ['Detachable Magnetic Stand', 'Zero-Latency', 'Built-in Pop Filter'],
    },
    {
      id: 8,
      name: 'Sony SRS-XB43 Extra Bass Speaker',
      price: 16999,
      originalPrice: 19999,
      rating: 4.5,
      reviews: 198,
      image: 'https://m.media-amazon.com/images/I/51hXamPiLGL._SL1500_.jpg',
      badge: 'Party Ready',
      features: ['Extra Bass', 'Party Connect', '24hr Battery'],
    },
  ];

  const categories = [
    { name: 'Headphones', icon: Headphones, count: 8 },
    { name: 'Speakers', icon: Speaker, count: 6 },
    { name: 'Microphones', icon: Mic, count: 5 },
    { name: 'Earbuds', icon: Headphones, count: 3 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#1E3A8A] via-[#1E40AF] to-[#3B82F6] text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <Link to="/products" className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Headphones className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-bold">Audio Equipment</h1>
              <p className="text-blue-200 mt-2">22 Products Available</p>
            </div>
          </div>
          
          <p className="text-xl text-blue-100 max-w-2xl mt-4">
            Premium audio gear including headphones, speakers, and microphones for every need
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.name}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-100 hover:bg-[#3B82F6] hover:text-white transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{category.name}</span>
                  <Badge variant="secondary" className="ml-1">{category.count}</Badge>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="group border border-gray-200 shadow-sm hover:shadow-xl overflow-hidden transition-all duration-500 hover:-translate-y-1 bg-white rounded-xl">
                <div className="relative h-48 overflow-hidden bg-white border-b border-gray-100">
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <Badge className="absolute top-3 left-3 bg-[#3B82F6]">{product.badge}</Badge>
                  {product.originalPrice > product.price && (
                    <Badge className="absolute top-3 right-3 bg-green-500">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </Badge>
                  )}
                </div>
                
                <CardContent className="p-5">
                  <h3 className="font-semibold text-[#1F2937] mb-2 line-clamp-2 group-hover:text-[#3B82F6] transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="ml-1 text-sm font-medium">{product.rating}</span>
                    </div>
                    <span className="text-gray-400 text-sm">({product.reviews} reviews)</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.features.slice(0, 2).map((feature, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-[#1E40AF]">₹{product.price.toLocaleString()}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-400 line-through ml-2">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4 bg-[#1E40AF] hover:bg-[#1E3A8A]">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Get Quote
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Need Help Choosing the Right Audio Gear?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Our audio experts can help you find the perfect equipment for your needs
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-[#1E40AF] hover:bg-gray-100">
              Contact Our Experts
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AudioEquipmentPage;
