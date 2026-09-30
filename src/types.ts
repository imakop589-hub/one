export interface DomainPrice {
  extension: string;
  price: string;
  regularPrice: string;
  highlight?: string;
  badge?: string;
  popular?: boolean;
}

export interface ReviewItem {
  id: string;
  name: string;
  date: string;
  rating: number;
  title?: string;
  text: string;
  avatar?: string;
  country?: string;
}

export interface PortfolioWebsite {
  id: string;
  title: string;
  tagline: string;
  category: string;
  image: string;
  accentColor: string;
  previewUrl?: string;
  features: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface CartItem {
  id: string;
  type: 'domain' | 'hosting' | 'builder';
  title: string;
  subtitle?: string;
  price: number;
  period: string;
}

export interface ExamplePrompt {
  career: string;
  company: string;
  city: string;
  colorScheme: string;
  style: string;
}
