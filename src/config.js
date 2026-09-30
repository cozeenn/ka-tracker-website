// All unconfirmed business details live here. Empty contact values hide links.
export const business = {
  name: 'KA-TRACKER', tagline: 'Kasama Mo sa Bawat Biyahe.',
  logoUrl: `${import.meta.env.BASE_URL}ka-tracker-logo.jpg`, phone: '', email: '', serviceArea: '', facebookUrl: '',
  siteUrl: 'https://cozeenn.github.io/ka-tracker-website/',
  featuresConfirmed: false,
  installationConfirmed: false,
  installation: 'We’ll discuss vehicle compatibility, installation arrangements, and account setup before you proceed.',
  features: [
    { icon: 'pin', title: 'Live location tracking', text: 'See where your vehicles are and get a clearer picture of their day.' },
    { icon: 'route', title: 'Trip history', text: 'Look back at routes and stops to understand the journeys that matter.' },
    { icon: 'fence', title: 'Geofence alerts', text: 'Define important places and receive updates when a vehicle enters or leaves.' },
    { icon: 'speed', title: 'Speed alerts', text: 'Stay informed about driving activity with configurable speed notifications.' },
    { icon: 'phone', title: 'Mobile access', text: 'Keep vehicle information close at hand, even when you’re away from your desk.' },
    { icon: 'report', title: 'Fleet reports', text: 'Bring vehicle activity together to support your day-to-day planning.' }
  ],
  faqs: [
    ['Can I use KA-TRACKER with my vehicle?', 'Device suitability depends on vehicle type, make, model, and year. Compatibility needs to be confirmed for each specific vehicle.'],
    ['How does installation work?', 'Installation arrangements, location, timing, and any charges will be discussed before booking. The process shown here is a draft and requires business confirmation.'],
    ['Can I track my vehicle on my phone?', 'Mobile access is a proposed feature. Supported devices, app availability, and account requirements will be confirmed with your recommended solution.'],
    ['Is there a monthly subscription?', 'Pricing, subscription periods, data inclusions, and renewal terms are still to be confirmed.'],
    ['Is the interactive demo actual tracking software?', 'The journey explorer is an illustrative concept using sample data. It demonstrates how tracking information can be presented and does not represent confirmed KA-TRACKER software or completed customer projects.']
  ],
  privacy: 'This showcase website does not collect information through forms or use analytics or tracking cookies. It is hosted on GitHub Pages and loads fonts from Google Fonts; those providers may process technical request information such as IP addresses. Business privacy contact details and provider disclosures remain subject to review.'
};
