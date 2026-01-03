import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, Printer, FileText, Scan } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PrintersScannersPage = () => {
  const products = [
    {
      id: 1,
      name: 'HP LaserJet Pro M404dn Printer',
      price: 24999,
      originalPrice: 29999,
      rating: 4.7,
      reviews: 189,
      image: 'https://m.media-amazon.com/images/I/71y2BAO8OvL._SL1500_.jpg',
      badge: 'Best Seller',
      features: ['Duplex Printing', '40 ppm', 'Ethernet'],
    },
    {
      id: 2,
      name: 'Epson EcoTank L3250 All-in-One',
      price: 15999,
      originalPrice: 18999,
      rating: 4.8,
      reviews: 312,
      image: 'https://m.media-amazon.com/images/I/61KroW9mh3L._SL1500_.jpg',
      badge: 'Eco Friendly',
      features: ['Ink Tank', 'WiFi Direct', 'Low Cost Printing'],
    },
    {
      id: 3,
      name: 'Canon PIXMA G3020 Wireless Printer',
      price: 12999,
      originalPrice: 14999,
      rating: 4.6,
      reviews: 245,
      image: 'https://m.media-amazon.com/images/I/61pvI50OKRL._SL1500_.jpg',
      badge: 'Popular',
      features: ['Wireless', 'Refillable Ink', 'Print/Scan/Copy'],
    },
    {
      id: 4,
      name: 'Brother DCP-T720DW Ink Tank Printer',
      price: 18999,
      originalPrice: 21999,
      rating: 4.5,
      reviews: 167,
      image: 'https://m.media-amazon.com/images/I/61yImt-sdsL._SL1500_.jpg',
      badge: 'Business',
      features: ['Auto Duplex', 'ADF', '30ppm'],
    },
    {
      id: 5,
      name: 'HP DeskJet 2723e All-in-One',
      price: 5999,
      originalPrice: 7999,
      rating: 4.3,
      reviews: 423,
      image: 'https://m.media-amazon.com/images/I/71IWjhCfdcL._SL1500_.jpg',
      badge: 'Budget',
      features: ['Compact', 'WiFi', 'HP+ Smart'],
    },
    {
      id: 6,
      name: 'Epson WorkForce Pro WF-3820',
      price: 16999,
      originalPrice: 19999,
      rating: 4.6,
      reviews: 134,
      image: 'https://m.media-amazon.com/images/I/610hth+KNdL._SL1500_.jpg',
      badge: 'Office',
      features: ['35-sheet ADF', 'Ethernet', 'Auto 2-sided'],
    },
    {
      id: 7,
      name: 'Canon imageFORMULA R40 Scanner',
      price: 21999,
      originalPrice: 25999,
      rating: 4.8,
      reviews: 89,
      image: 'https://m.media-amazon.com/images/I/51DoqL2oi9L._SL1500_.jpg',
      badge: 'Scanner',
      features: ['40ppm Scanning', 'Duplex', 'OCR Software'],
    },
    {
      id: 8,
      name: 'Brother HL-L2351DW Laser Printer',
      price: 13999,
      originalPrice: 15999,
      rating: 4.4,
      reviews: 198,
      image: 'https://m.media-amazon.com/images/I/712Ohg8psPL._SL1500_.jpg',
      badge: 'Fast',
      features: ['32ppm', 'WiFi', 'Auto Duplex'],
    },
  ];

  const categories = [
    { name: 'Laser Printers', icon: Printer, count: 5 },
    { name: 'Inkjet Printers', icon: Printer, count: 6 },
    { name: 'Scanners', icon: Scan, count: 2 },
    { name: 'All-in-One', icon: FileText, count: 2 },
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
              <Printer className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-bold">Printers & Scanners</h1>
              <p className="text-blue-200 mt-2">15 Products Available</p>
            </div>
          </div>
          
          <p className="text-xl text-blue-100 max-w-2xl mt-4">
            High-quality printers and scanners for home and office use
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
              <Card key={product.id} className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
                <div className="relative overflow-hidden bg-gray-100 flex items-center justify-center p-4 h-48">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
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
            Need Help Finding the Right Printer?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Our experts can help you choose the perfect printer for your home or office needs
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

export default PrintersScannersPage;
