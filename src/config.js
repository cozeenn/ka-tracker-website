// All unconfirmed business details live here. Empty contact values hide links.
export const business = {
  name: 'KA-TRACKER', tagline: 'Kasama Mo sa Bawat Biyahe.',
  logoUrl: `${import.meta.env.BASE_URL}ka-tracker-logo.jpg`, phone: '', email: '', serviceArea: '', facebookUrl: '',
  siteUrl: 'https://cozeenn.github.io/ka-tracker-website/',
  formEndpoint: '', // HTTPS endpoint accepting JSON; return { "success": true } ONLY after accepting the inquiry.
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
    ['Can I use KA-TRACKER with my vehicle?', 'Share your vehicle type, make, model, and year in your inquiry. Device suitability and compatibility need to be confirmed for your specific vehicle.'],
    ['How does installation work?', 'Installation arrangements, location, timing, and any charges will be discussed before booking. The process shown here is a draft and requires business confirmation.'],
    ['Can I track my vehicle on my phone?', 'Mobile access is a proposed feature. Supported devices, app availability, and account requirements will be confirmed with your recommended solution.'],
    ['Is there a monthly subscription?', 'Pricing, subscription periods, data inclusions, and renewal terms are still to be confirmed. Request a quote for details relevant to your vehicles.'],
    ['How do I request a quote?', 'Complete the inquiry form with your contact and vehicle details. This preview is in demo mode until a submission service is connected; it does not send inquiries.']
  ],
  privacy: 'Draft for business review: Once inquiry submission is enabled, the information you provide will be used to respond to your request and discuss vehicle tracking requirements. Before launch, KA-TRACKER must confirm the responsible business entity, privacy contact, service providers, retention period, lawful basis, and how you can request access, correction, or deletion. This demo does not transmit or persist form entries.'
};
