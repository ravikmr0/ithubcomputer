import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, Building2, Clock, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { branchLocations } from '@/lib/branches';

const BranchTwoPage = () => {
  const branch = branchLocations.find((item) => item.id === 'branch-2');

  if (!branch) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <section className="bg-gradient-to-br from-[#1E40AF] via-[#2563EB] to-[#3B82F6] py-20 text-white">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
              <Building2 className="mr-2 h-4 w-4" />
              Branch 2 • Sector 104
            </div>
            <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">
              IT HUB COMPUTER – Branch 2
            </h1>
            <p className="text-lg leading-relaxed text-blue-100">
              Visit our second office in Noida for premium computer services, repairs, hardware support, and expert guidance.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1280px] gap-8 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <Card className="border-none shadow-lg">
            <CardContent className="space-y-8 p-8 lg:p-10">
              <div>
                <h2 className="mb-3 font-display text-2xl font-bold text-[#111827]">
                  Office Details
                </h2>
                <p className="text-base leading-7 text-[#6B7280]">
                  Our Sector 104 branch is designed for fast support, convenient service visits, and reliable assistance for all your IT needs.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#1E40AF]/10 text-[#1E40AF]">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3B82F6]">
                      Location
                    </p>
                    <h3 className="mt-1 text-xl font-semibold text-[#111827]">{branch.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#4B5563]">{branch.address}</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <a href={branch.phoneHref} className="w-full">
                  <Button className="h-12 w-full bg-[#1E40AF] text-white hover:bg-[#3B82F6]">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Branch
                  </Button>
                </a>
                <a href={branch.whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button className="h-12 w-full bg-[#10B981] text-white hover:bg-[#059669]">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp
                  </Button>
                </a>
                <a href={branch.directionsUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:col-span-2">
                  <Button variant="outline" className="h-12 w-full border-[#1E40AF] text-[#1E40AF] hover:bg-blue-50">
                    <Navigation className="mr-2 h-4 w-4" />
                    Get Directions
                  </Button>
                </a>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#10B981]/10 text-[#10B981]">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-[#111827]">Service Availability</h3>
                    <p className="mt-2 text-sm leading-7 text-[#4B5563]">
                      Open every day from 10:00 AM to 10:00 PM for consultations, repairs, quotations, and hardware support.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardContent className="p-0">
              <div className="rounded-t-3xl bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] p-6 text-white">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-white/20 p-3">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-semibold">Branch Map</h2>
                    <p className="text-sm text-blue-100">Quick access to the location</p>
                  </div>
                </div>
              </div>
              <div className="aspect-video w-full">
                <iframe
                  title={`${branch.title} location`}
                  src={branch.mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
          <Card className="border-none shadow-lg">
            <CardContent className="p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
                <div>
                  <h2 className="mb-4 font-display text-2xl font-bold text-[#111827]">Why Choose This Branch</h2>
                  <div className="space-y-3">
                    {[
                      'Conveniently located in Sector 104, Noida',
                      'Trusted IT support for laptops, desktops, software, and networking',
                      'Fast assistance for quotations, product selection, and repairs',
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                        <BadgeCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#10B981]" />
                        <p className="text-sm leading-7 text-[#4B5563]">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-[#F9FAFB] p-6">
                  <h3 className="font-display text-lg font-semibold text-[#111827]">Need help finding the right branch?</h3>
                  <p className="mt-3 text-sm leading-7 text-[#4B5563]">
                    Explore our main contact page for both office locations and quick support options.
                  </p>
                  <div className="mt-6 flex flex-col gap-3">
                    <Link to="/contact" className="w-full">
                      <Button className="h-12 w-full bg-[#1E40AF] text-white hover:bg-[#3B82F6]">
                        Contact Us
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link to="/" className="w-full">
                      <Button variant="outline" className="h-12 w-full border-slate-300 text-[#374151] hover:bg-slate-100">
                        Back to Home
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default BranchTwoPage;
