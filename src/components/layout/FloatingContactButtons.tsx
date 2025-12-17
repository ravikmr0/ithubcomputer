import { Phone, MessageCircle } from "lucide-react";

export default function FloatingContactButtons() {
  const phoneNumber = "+919779286917";
  const whatsappNumber = "+919779286917";

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* Call Button */}
      <a
        href={`tel:${phoneNumber}`}
        className="group flex items-center justify-center w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Call us"
      >
        <Phone className="w-6 h-6" />
      </a>
    </div>
  );
}
