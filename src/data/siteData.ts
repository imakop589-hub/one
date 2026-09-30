import { ReviewItem, PortfolioWebsite, FaqItem, DomainPrice, ExamplePrompt } from '../types';

export const DOMAIN_PRICES: DomainPrice[] = [
  { extension: '.uk', price: '£0.99', regularPrice: '£9.99', highlight: '1st year*', badge: '*Free with hosting', popular: true },
  { extension: '.com', price: '£7.99', regularPrice: '£15.99', highlight: '1st year*', badge: '*Free with hosting', popular: true },
  { extension: '.co.uk', price: '£0.99', regularPrice: '£8.99', highlight: '1st year*', badge: '*Free with hosting' },
  { extension: '.one', price: '£1.49', regularPrice: '£18.99', highlight: '1st year*', badge: 'Trending' },
  { extension: '.online', price: '£1.99', regularPrice: '£29.99', highlight: '1st year*' },
  { extension: '.shop', price: '£2.99', regularPrice: '£34.99', highlight: '1st year*' },
  { extension: '.io', price: '£29.99', regularPrice: '£49.99', highlight: '1st year*' },
  { extension: '.tech', price: '£3.99', regularPrice: '£39.99', highlight: '1st year*' },
];

export const EXAMPLE_PROMPTS: ExamplePrompt[] = [
  { career: 'Japanese restaurant', company: 'Kaysuki', city: 'Amsterdam', colorScheme: 'Tokyo modern minimal', style: 'Dark warm ambiance, chef omakase menu, online table reservations' },
  { career: 'luxury eyewear boutique', company: 'Shutters', city: 'London', colorScheme: 'Minimalist sand & gold', style: 'Timeless designer frames, virtual try-on, curated lookbooks' },
  { career: 'mindfulness yoga studio', company: 'Find Your Flow', city: 'Edinburgh', colorScheme: 'Earthy sage & clay', style: 'Class scheduling, teacher bios, sound bath workshops' },
  { career: 'high-end fashion house', company: 'Atelier Mode', city: 'Paris', colorScheme: 'Editorial monochrome', style: 'Spring/Summer 2025 lookbook, runway archive, private appointments' },
  { career: 'artisan florist & botanical studio', company: 'Bloom Society', city: 'Manchester', colorScheme: 'Soft rose & moss', style: 'Same-day floral delivery, wedding event styling, workshop bookings' },
  { career: 'certified plumbing & heating expert', company: 'Apex Plumbing', city: 'Birmingham', colorScheme: 'Reliable navy & yellow', style: '24/7 emergency dispatch, upfront transparent pricing, review gallery' },
];

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: '1',
    name: 'andrew pickering',
    date: '01/09/2026',
    rating: 5,
    country: 'GB',
    text: 'Fast recovery and instructional help on how to put my website back on line.',
  },
  {
    id: '2',
    name: 'Gabriel Rimando',
    date: '01/09/2026',
    rating: 5,
    country: 'GB',
    text: 'Had a great experience with Lovely, she gave the best customer service and helped me solved my problems with my website, and she even promise...',
  },
  {
    id: '3',
    name: 'Henriette Skody',
    date: '01/09/2026',
    rating: 5,
    country: 'DK',
    text: 'Very good to solve my problem. Im not very good at web-things, but the human supporter help me very much.',
  },
  {
    id: '4',
    name: 'Pascal Meulemans',
    date: '30/08/2026',
    rating: 5,
    country: 'NL',
    text: 'Great support from Lesly.',
  },
  {
    id: '5',
    name: 'Kevin Joseph',
    date: '29/08/2026',
    rating: 5,
    country: 'GB',
    text: 'The support is excellent. I worked with Denn for the setup of my custom domain and email DNS records.',
  },
  {
    id: '6',
    name: 'Claus Gramstrup',
    date: '29/08/2026',
    rating: 5,
    country: 'DK',
    text: 'The personal service and support is really competent and extremely fast. Very friendly and accommodating if you can’t explain your problem in the right technical terms.',
  },
  {
    id: '7',
    name: 'Kerstin Magnusson',
    date: '29/08/2026',
    rating: 5,
    country: 'SE',
    text: 'Good service and quick response whenever we need assistance with our email accounts.',
  },
  {
    id: '8',
    name: 'Hland Mamadi',
    date: '29/08/2026',
    rating: 5,
    country: 'SE',
    text: 'Chat support on Hostxeon was amazing. Denn was very helpfull and solved my issue within minutes!',
  },
  {
    id: '9',
    name: 'Sven-Elin Rune Bjerki',
    date: '29/08/2026',
    rating: 5,
    country: 'NO',
    text: 'Unbeatable service, 24/7! Setup was flawless and our WordPress migration went smooth.',
  },
  {
    id: '10',
    name: 'Sophie Laurent',
    date: '28/08/2026',
    rating: 5,
    country: 'FR',
    text: 'Aida AI built our bakery website in literally 3 minutes. The copy and imagery were spot on!',
  },
];

export const PORTFOLIO_ITEMS: PortfolioWebsite[] = [
  {
    id: 'flow',
    title: 'Find Your Flow',
    tagline: 'Mindfulness & Movement Studio',
    category: 'Wellness & Health',
    accentColor: '#4A6B53',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800&auto=format&fit=crop',
    features: ['Online Class Booking', 'Membership Pass', 'Teacher Directory'],
  },
  {
    id: 'fashion',
    title: 'Spring Summer 2025',
    tagline: 'High Fashion & Editorial Runway',
    category: 'Fashion & Apparel',
    accentColor: '#A38F78',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop',
    features: ['Lookbook Grid', 'E-commerce Checkout', 'Instagram Feed'],
  },
  {
    id: 'architecture',
    title: 'Studio Forma',
    tagline: 'Contemporary Architectural Design',
    category: 'Architecture & Design',
    accentColor: '#1F2937',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    features: ['Project Portfolios', 'Interactive Floorplans', 'Client Inquiry Portal'],
  },
  {
    id: 'plumbing',
    title: 'Plumbing you can count on.',
    tagline: '24/7 Residential & Commercial Trade',
    category: 'Local Services',
    accentColor: '#2563EB',
    image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=800&auto=format&fit=crop',
    features: ['Emergency Call Button', 'Instant Quote Calculator', 'Trustpilot Reviews'],
  },
  {
    id: 'cafe',
    title: 'Kuro Artisan Coffee',
    tagline: 'Specialty Roastery & Espresso Bar',
    category: 'Food & Beverage',
    accentColor: '#78350F',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800&auto=format&fit=crop',
    features: ['Coffee Subscription', 'Origin Map', 'Table Reservation'],
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'uk-choice',
    question: 'Is Hostxeon a good choice for businesses and entrepreneurs from the United Kingdom?',
    answer: 'Yes, absolutely! Hostxeon is trusted by over 1.5 million customers across the UK and Europe. We provide high-speed local UK data routing, official Nominet .uk domain registration, 24/7 dedicated customer support in English, and transparent pricing in GBP with full 20% VAT compliance.',
  },
  {
    id: 'why-setup',
    question: 'Why should I set up my website with Hostxeon?',
    answer: 'Hostxeon is an all-in-one platform providing domain registration, ultra-fast cloud hosting, customized email on your own domain, automated daily backups, SSL certificates, and our breakthrough Aida AI Website Builder. You get all the power of modern web development without needing code or technical knowledge.',
  },
  {
    id: 'support-kind',
    question: 'What kind of support do I get at Hostxeon?',
    answer: 'You get 24/7 support every single day of the year via instant live chat, ticketing, and our comprehensive help center. Our award-winning customer support specialists assist with domain DNS, email configuration, website design, and WordPress optimization.',
  },
  {
    id: 'what-is-aida',
    question: 'What is Aida AI?',
    answer: 'Aida is our next-generation AI assistant built into the website builder. Simply describe what your business does in a few words, and Aida instantly generates custom responsive layouts, tailor-made copywriting, high-resolution imagery, and e-commerce shopping or booking functionality in under 3 minutes.',
  },
  {
    id: 'security',
    question: 'Is my website secure?',
    answer: 'Yes! Every website and domain hosted on Hostxeon comes with free Wildcard SSL encryption, automated daily off-site backups, DDoS mitigation, DNSSEC support, and spam/virus filtered email out of the box.',
  },
  {
    id: 'manage-products',
    question: 'How can I manage my products?',
    answer: 'Our integrated Online Shop dashboard gives you full control over product catalogs, inventory tracking, discounts, tax rates, shipping methods, and seamless payment gateway integrations with Stripe, PayPal, Apple Pay, and Klarna.',
  },
  {
    id: 'support-channels',
    question: 'What support channels are available at Hostxeon?',
    answer: 'We provide 24/7 Live Chat, email support with sub-24h turnaround, guided onboarding tutorials, Hostxeon Academy business courses, and dedicated professional website design services if you prefer a bespoke hand-crafted site.',
  },
];
