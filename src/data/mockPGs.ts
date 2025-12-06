export interface PGRoom {
  id: string;
  type: "single" | "double" | "triple" | "quad";
  sharing: number;
  price: number;
  deposit: number;
  available: number;
  ac: boolean;
}

export interface PGListing {
  id: string;
  name: string;
  slug: string;
  address: string;
  locality: string;
  city: string;
  landmark?: string;
  type: "boys" | "girls" | "coed";
  rating: number;
  reviewCount: number;
  images: string[];
  amenities: string[];
  rooms: PGRoom[];
  description: string;
  rules: string[];
  owner: {
    name: string;
    phone: string;
    verified: boolean;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  featured: boolean;
  verified: boolean;
  minPrice: number;
  maxPrice: number;
  foodIncluded: boolean;
  nearbyPlaces: { name: string; distance: string }[];
}

export const mockPGs: PGListing[] = [
  {
    id: "1",
    name: "Sunrise PG for Men",
    slug: "sunrise-pg-koramangala",
    address: "123, 1st Cross, 4th Block",
    locality: "Koramangala",
    city: "Bangalore",
    landmark: "Near Sony Signal",
    type: "boys",
    rating: 4.5,
    reviewCount: 128,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    ],
    amenities: ["WiFi", "AC", "Power Backup", "Laundry", "Housekeeping", "CCTV", "Parking"],
    rooms: [
      { id: "r1", type: "single", sharing: 1, price: 12000, deposit: 24000, available: 2, ac: true },
      { id: "r2", type: "double", sharing: 2, price: 8000, deposit: 16000, available: 5, ac: true },
      { id: "r3", type: "triple", sharing: 3, price: 6000, deposit: 12000, available: 3, ac: false },
    ],
    description: "A premium PG accommodation for working professionals and students. Located in the heart of Koramangala with easy access to IT parks and metro stations.",
    rules: ["No smoking", "No alcohol", "Guests allowed till 9 PM", "Gate closes at 11 PM"],
    owner: { name: "Rajesh Kumar", phone: "+91 9876543210", verified: true },
    coordinates: { lat: 12.9352, lng: 77.6245 },
    featured: true,
    verified: true,
    minPrice: 6000,
    maxPrice: 12000,
    foodIncluded: true,
    nearbyPlaces: [
      { name: "Forum Mall", distance: "500m" },
      { name: "Metro Station", distance: "1.2km" },
      { name: "Christ University", distance: "2km" },
    ],
  },
  {
    id: "2",
    name: "Grace Ladies PG",
    slug: "grace-ladies-pg-indiranagar",
    address: "45, 12th Main Road",
    locality: "Indiranagar",
    city: "Bangalore",
    landmark: "Near 100 Feet Road",
    type: "girls",
    rating: 4.8,
    reviewCount: 256,
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800",
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800",
    ],
    amenities: ["WiFi", "AC", "Power Backup", "Laundry", "Housekeeping", "CCTV", "Gym", "Rooftop Garden"],
    rooms: [
      { id: "r1", type: "single", sharing: 1, price: 15000, deposit: 30000, available: 1, ac: true },
      { id: "r2", type: "double", sharing: 2, price: 10000, deposit: 20000, available: 4, ac: true },
    ],
    description: "A safe and comfortable PG for women with premium amenities. Located in the vibrant Indiranagar area with great food and shopping options nearby.",
    rules: ["No male visitors after 7 PM", "Gate closes at 10:30 PM", "Maintain silence after 11 PM"],
    owner: { name: "Sunita Sharma", phone: "+91 9876543211", verified: true },
    coordinates: { lat: 12.9784, lng: 77.6408 },
    featured: true,
    verified: true,
    minPrice: 10000,
    maxPrice: 15000,
    foodIncluded: true,
    nearbyPlaces: [
      { name: "100 Feet Road", distance: "200m" },
      { name: "Indiranagar Metro", distance: "800m" },
    ],
  },
  {
    id: "3",
    name: "Urban Co-living Space",
    slug: "urban-coliving-hsr",
    address: "78, Sector 5",
    locality: "HSR Layout",
    city: "Bangalore",
    landmark: "Near BDA Complex",
    type: "coed",
    rating: 4.3,
    reviewCount: 89,
    images: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800",
      "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800",
      "https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5?w=800",
    ],
    amenities: ["WiFi", "AC", "Power Backup", "Laundry", "Housekeeping", "CCTV", "Gaming Zone", "Coworking Space"],
    rooms: [
      { id: "r1", type: "single", sharing: 1, price: 18000, deposit: 36000, available: 3, ac: true },
      { id: "r2", type: "double", sharing: 2, price: 12000, deposit: 24000, available: 6, ac: true },
      { id: "r3", type: "triple", sharing: 3, price: 9000, deposit: 18000, available: 4, ac: true },
    ],
    description: "Modern co-living space designed for the new-age professional. Community events, networking opportunities, and a vibrant atmosphere.",
    rules: ["Quiet hours 11 PM - 7 AM", "Guests must register", "No smoking indoors"],
    owner: { name: "Urban Living Pvt Ltd", phone: "+91 9876543212", verified: true },
    coordinates: { lat: 12.9116, lng: 77.6389 },
    featured: true,
    verified: true,
    minPrice: 9000,
    maxPrice: 18000,
    foodIncluded: false,
    nearbyPlaces: [
      { name: "HSR BDA Complex", distance: "300m" },
      { name: "Agara Lake", distance: "1.5km" },
    ],
  },
  {
    id: "4",
    name: "Budget Boys Hostel",
    slug: "budget-boys-btm",
    address: "34, 2nd Stage",
    locality: "BTM Layout",
    city: "Bangalore",
    type: "boys",
    rating: 3.9,
    reviewCount: 67,
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800",
    ],
    amenities: ["WiFi", "Power Backup", "Laundry", "CCTV"],
    rooms: [
      { id: "r1", type: "double", sharing: 2, price: 5500, deposit: 11000, available: 8, ac: false },
      { id: "r2", type: "triple", sharing: 3, price: 4500, deposit: 9000, available: 6, ac: false },
      { id: "r3", type: "quad", sharing: 4, price: 3800, deposit: 7600, available: 4, ac: false },
    ],
    description: "Affordable PG accommodation perfect for students and freshers. Basic amenities with a friendly environment.",
    rules: ["No smoking", "Visitors till 8 PM", "Gate closes at 10 PM"],
    owner: { name: "Mohammed Ali", phone: "+91 9876543213", verified: false },
    coordinates: { lat: 12.9166, lng: 77.6101 },
    featured: false,
    verified: true,
    minPrice: 3800,
    maxPrice: 5500,
    foodIncluded: false,
    nearbyPlaces: [
      { name: "BTM Lake", distance: "800m" },
      { name: "Silk Board Junction", distance: "2km" },
    ],
  },
  {
    id: "5",
    name: "Premium Girls Residence",
    slug: "premium-girls-whitefield",
    address: "Block A, IT Park Road",
    locality: "Whitefield",
    city: "Bangalore",
    landmark: "Near ITPL",
    type: "girls",
    rating: 4.7,
    reviewCount: 145,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800",
    ],
    amenities: ["WiFi", "AC", "Power Backup", "Laundry", "Housekeeping", "CCTV", "Gym", "Swimming Pool", "Cafeteria"],
    rooms: [
      { id: "r1", type: "single", sharing: 1, price: 20000, deposit: 40000, available: 2, ac: true },
      { id: "r2", type: "double", sharing: 2, price: 14000, deposit: 28000, available: 5, ac: true },
    ],
    description: "Luxury living for working women in Whitefield. Resort-style amenities with top-notch security and a professional environment.",
    rules: ["Visitors with prior approval", "No smoking or alcohol", "Maintain decorum"],
    owner: { name: "Premium Stays Pvt Ltd", phone: "+91 9876543214", verified: true },
    coordinates: { lat: 12.9698, lng: 77.7500 },
    featured: true,
    verified: true,
    minPrice: 14000,
    maxPrice: 20000,
    foodIncluded: true,
    nearbyPlaces: [
      { name: "ITPL", distance: "500m" },
      { name: "Phoenix Marketcity", distance: "3km" },
    ],
  },
  {
    id: "6",
    name: "Student Hub Coliving",
    slug: "student-hub-electronic-city",
    address: "Plot 56, Phase 1",
    locality: "Electronic City",
    city: "Bangalore",
    type: "coed",
    rating: 4.1,
    reviewCount: 92,
    images: [
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
    ],
    amenities: ["WiFi", "AC", "Power Backup", "Laundry", "Housekeeping", "CCTV", "Study Room", "Library"],
    rooms: [
      { id: "r1", type: "double", sharing: 2, price: 7500, deposit: 15000, available: 10, ac: false },
      { id: "r2", type: "triple", sharing: 3, price: 5500, deposit: 11000, available: 8, ac: false },
      { id: "r3", type: "quad", sharing: 4, price: 4500, deposit: 9000, available: 6, ac: false },
    ],
    description: "Designed specifically for students with dedicated study areas, library access, and a quiet environment conducive to learning.",
    rules: ["Study hours 6 PM - 10 PM", "Quiet hours after 10 PM", "No parties"],
    owner: { name: "Student Housing Solutions", phone: "+91 9876543215", verified: true },
    coordinates: { lat: 12.8399, lng: 77.6770 },
    featured: false,
    verified: true,
    minPrice: 4500,
    maxPrice: 7500,
    foodIncluded: true,
    nearbyPlaces: [
      { name: "Infosys Campus", distance: "1km" },
      { name: "Electronic City Bus Stand", distance: "500m" },
    ],
  },
];

export const cities = [
  { name: "Bangalore", count: 2500, image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600" },
  { name: "Mumbai", count: 1800, image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600" },
  { name: "Delhi NCR", count: 2200, image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600" },
  { name: "Pune", count: 1500, image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=600" },
  { name: "Hyderabad", count: 1200, image: "https://images.unsplash.com/photo-1576675466969-38eeae4b41f6?w=600" },
  { name: "Chennai", count: 900, image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600" },
];

export const amenityIcons: Record<string, string> = {
  WiFi: "📶",
  AC: "❄️",
  "Power Backup": "🔌",
  Laundry: "🧺",
  Housekeeping: "🧹",
  CCTV: "📹",
  Parking: "🅿️",
  Gym: "💪",
  "Rooftop Garden": "🌿",
  "Gaming Zone": "🎮",
  "Coworking Space": "💻",
  "Swimming Pool": "🏊",
  Cafeteria: "☕",
  "Study Room": "📚",
  Library: "📖",
};