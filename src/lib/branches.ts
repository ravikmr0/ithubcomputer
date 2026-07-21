export interface BranchLocation {
  id: string;
  title: string;
  branchLabel: string;
  address: string;
  directionsUrl: string;
  mapEmbedUrl: string;
  phone: string;
  phoneHref: string;
  whatsappUrl: string;
}

const whatsappMessage = "Hi, I'm interested in IT HUB Computer services";

export const branchLocations: BranchLocation[] = [
  {
    id: 'branch-1',
    title: 'IT HUB COMPUTER – Branch 1',
    branchLabel: 'Branch 1 – Sector 141',
    address: 'Sector 141, Noida, Uttar Pradesh 201304, India',
    directionsUrl: 'https://maps.app.goo.gl/jS9od4ePFGsdhwa2A',
    mapEmbedUrl: 'https://www.google.com/maps?q=Sector+141,+Noida,+Uttar+Pradesh+201304&output=embed',
    phone: '+91 9779286917',
    phoneHref: 'tel:+919779286917',
    whatsappUrl: `https://wa.me/919779286917?text=${encodeURIComponent(whatsappMessage)}`,
  },
  {
    id: 'branch-2',
    title: 'IT HUB COMPUTER – Branch 2',
    branchLabel: 'Branch 2 – Sector 104',
    address: 'Gali No. 04, Near Punjab National Bank, Hajipur Market, Sector 104, Noida, Uttar Pradesh – 201301',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Gali+No.+04,+Near+Punjab+National+Bank,+Hajipur+Market,+Sector+104,+Noida,+Uttar+Pradesh+201301',
    mapEmbedUrl: 'https://www.google.com/maps?q=Gali+No.+04,+Near+Punjab+National+Bank,+Hajipur+Market,+Sector+104,+Noida,+Uttar+Pradesh+201301&output=embed',
    phone: '+91 9779286917',
    phoneHref: 'tel:+919779286917',
    whatsappUrl: `https://wa.me/919779286917?text=${encodeURIComponent(whatsappMessage)}`,
  },
];

export const primaryPhone = '+91 9779286917';
export const primaryEmail = 'info@ithubcomputer.com';
