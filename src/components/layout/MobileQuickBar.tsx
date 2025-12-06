import { Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MobileQuickBar = () => {
  const whatsappMessage = encodeURIComponent("Hi, I'm interested in IT HUB Computer services");
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-200 shadow-lg">
      <div className="flex items-center justify-around p-3">
        <a href="tel:+1234567890" className="flex-1 mr-2">
          <Button className="w-full bg-[#1E40AF] hover:bg-[#3B82F6] text-white btn-press">
            <Phone className="w-4 h-4 mr-2" />
            Call Now
          </Button>
        </a>
        <a 
          href={`https://wa.me/919779286917?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 ml-2"
        >
          <Button className="w-full bg-[#10B981] hover:bg-[#059669] text-white btn-press">
            <MessageCircle className="w-4 h-4 mr-2" />
            WhatsApp
          </Button>
        </a>
      </div>
    </div>
  );
};

export default MobileQuickBar;
