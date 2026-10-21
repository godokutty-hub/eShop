/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Country, Currency, MerchantProfile, Product, SellerAccount, SupportTicket } from '../types';

export const CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', rateAgainstUSD: 1.0, flag: '🇺🇸' },
  { code: 'LKR', symbol: 'Rs', name: 'Sri Lankan Rupee', rateAgainstUSD: 332.15, flag: '🇱🇰' },
  { code: 'EUR', symbol: '€', name: 'Euro', rateAgainstUSD: 0.92, flag: '🇪🇺' },
  { code: 'GBP', symbol: '£', name: 'British Pound', rateAgainstUSD: 0.79, flag: '🇬🇧' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rateAgainstUSD: 154.2, flag: '🇯🇵' },
  { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar', rateAgainstUSD: 1.38, flag: '🇨🇦' },
  { code: 'AUD', symbol: 'AU$', name: 'Australian Dollar', rateAgainstUSD: 1.52, flag: '🇦🇺' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', rateAgainstUSD: 85.5, flag: '🇮🇳' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', rateAgainstUSD: 5.4, flag: '🇧🇷' },
  { code: 'AED', symbol: 'AED', name: 'UAE Dirham', rateAgainstUSD: 3.67, flag: '🇦🇪' },
  { code: 'SGD', symbol: 'SG$', name: 'Singapore Dollar', rateAgainstUSD: 1.34, flag: '🇸🇬' },
];

export const COUNTRIES: Country[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD', shippingDays: '3-5 business days', importDutyNote: 'No duty under $800 de minimis' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', shippingDays: '4-7 business days', importDutyNote: 'VAT collected at checkout' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', currency: 'EUR', shippingDays: '4-6 business days', importDutyNote: 'EU IOSS customs cleared' },
  { code: 'FR', name: 'France', flag: '🇫🇷', currency: 'EUR', shippingDays: '4-7 business days', importDutyNote: 'EU IOSS customs cleared' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', currency: 'JPY', shippingDays: '3-6 business days', importDutyNote: 'Standard clearance' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', currency: 'AUD', shippingDays: '5-8 business days', importDutyNote: 'GST collected at checkout' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'CAD', shippingDays: '4-6 business days', importDutyNote: 'CBSA compliant duties' },
  { code: 'IN', name: 'India', flag: '🇮🇳', currency: 'INR', shippingDays: '5-9 business days', importDutyNote: 'KYC verified customs clearance' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', currency: 'AED', shippingDays: '3-6 business days', importDutyNote: 'VAT pre-cleared' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', currency: 'SGD', shippingDays: '3-5 business days', importDutyNote: 'GST pre-calculated' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', currency: 'BRL', shippingDays: '8-14 business days', importDutyNote: 'Remessa Conforme compliant' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', currency: 'EUR', shippingDays: '5-8 business days', importDutyNote: 'EU IOSS customs cleared' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', currency: 'EUR', shippingDays: '5-8 business days', importDutyNote: 'EU IOSS customs cleared' },
  { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰', currency: 'LKR', shippingDays: '1-10 business days', importDutyNote: 'Customs ID accepted' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', currency: 'EUR', shippingDays: '3-5 business days', importDutyNote: 'EU Hub express' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', currency: 'USD', shippingDays: '3-6 business days', importDutyNote: 'Customs ID accepted' },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    title: 'Sony Alpha A7 IV Full-Frame Camera with 28-70mm Lens Kit - Genuine Global Stock',
    description: 'Authentic 33MP full-frame Exmor R CMOS sensor camera. Original item verified with authentic camera body serial numbers. Inspected and photographed under studio lighting by verified merchant. Free international courier with SafeEscrow.',
    category: 'Electronics',
    priceUSD: 1999.00,
    originalPriceUSD: 2499.00,
    rating: 4.9,
    reviewsCount: 342,
    soldCount: 1250,
    stock: 14,
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80'
    ],
    hasOriginalPhotos: true,
    photoVerification: {
      isOriginalVerified: true,
      cameraModel: 'Sony ILCE-7RM4 (Photographed by Seller)',
      captureTimestamp: '2026-10-18 14:22:09 UTC',
      authenticityScore: 99,
      watermarksDetected: false,
      isStockPhotoScraped: false,
      verificationBadge: 'Verified Original Photo - 0% Web Scrape Match'
    },
    sellerId: 'merch-8821',
    sellerStoreId: 'store-8821-1',
    sellerName: 'Apex Optics Global',
    sellerRating: 4.95,
    sellerCountry: 'Japan 🇯🇵',
    sellerAgeVerified: true,
    sellerStrikes: 0,
    shippingFree: true,
    estimatedDays: 4,
    tags: ['SuperDeals', 'Top Rated Plus', 'Verified Original', 'SafeEscrow'],
    specifications: {
      'Sensor': '33MP Full Frame BSI-CMOS',
      'Video': '4K 60p 10-bit 4:2:2',
      'Autofocus': '759 phase-detection points',
      'Warranty': '2 Years International Manufacturer Warranty'
    },
    createdAt: '2026-10-10'
  },
  {
    id: 'prod-002',
    title: 'Custom Gasket Mechanical Keyboard 75% Wireless Tri-Mode with Lubed Linear Switches',
    description: 'Hand-assembled mechanical keyboard with CNC aluminum chassis, hot-swappable PCB, PBT dye-sub keycaps, and sound-dampening poron foam. Photographed directly on seller workbench with live timestamp.',
    category: 'Electronics',
    priceUSD: 119.00,
    originalPriceUSD: 179.00,
    rating: 4.8,
    reviewsCount: 512,
    soldCount: 3840,
    stock: 45,
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1000&q=80'
    ],
    hasOriginalPhotos: true,
    photoVerification: {
      isOriginalVerified: true,
      cameraModel: 'Fujifilm X-T4',
      captureTimestamp: '2026-10-15 09:12:45 UTC',
      authenticityScore: 98,
      watermarksDetected: false,
      isStockPhotoScraped: false,
      verificationBadge: 'Verified Workshop Original Photo'
    },
    sellerId: 'merch-3310',
    sellerStoreId: 'store-3310-1',
    sellerName: 'KeyLab Artisans',
    sellerRating: 4.88,
    sellerCountry: 'Taiwan 🇹🇼',
    sellerAgeVerified: true,
    sellerStrikes: 0,
    shippingFree: true,
    estimatedDays: 5,
    tags: ['AliExpress Choice', 'Free Shipping', 'Verified Original'],
    specifications: {
      'Layout': '75% Compact (82 Keys)',
      'Connectivity': 'Bluetooth 5.2 / 2.4Ghz / Type-C',
      'Battery': '4000mAh Lithium Ion (Up to 200 hours)',
      'Plate': 'Polycarbonate Flex-cut'
    },
    createdAt: '2026-10-12'
  },
  {
    id: 'prod-003',
    title: 'Handcrafted Heritage Italian Full-Grain Leather Weekender Duffle Bag',
    description: 'Vegetable-tanned Tuscan cowhide leather with heavy-duty YKK brass zippers and reinforced dual handles. Hand-stitched in Florence. Photographed in studio by verified 18+ Italian leathercraft shop.',
    category: 'Fashion & Apparel',
    priceUSD: 245.00,
    originalPriceUSD: 395.00,
    rating: 4.9,
    reviewsCount: 189,
    soldCount: 890,
    stock: 18,
    images: [
      'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80'
    ],
    hasOriginalPhotos: true,
    photoVerification: {
      isOriginalVerified: true,
      cameraModel: 'Canon EOS R6 Mark II',
      captureTimestamp: '2026-10-11 11:45:30 UTC',
      authenticityScore: 100,
      watermarksDetected: false,
      isStockPhotoScraped: false,
      verificationBadge: 'Verified Artisan Original Photo'
    },
    sellerId: 'merch-5520',
    sellerStoreId: 'store-5520-1',
    sellerName: 'Firenze Pelle Studio',
    sellerRating: 4.97,
    sellerCountry: 'Italy 🇮🇹',
    sellerAgeVerified: true,
    sellerStrikes: 0,
    shippingFree: true,
    estimatedDays: 4,
    tags: ['Top Rated Plus', 'Handcrafted', 'SafeEscrow'],
    specifications: {
      'Material': '100% Full Grain Tuscan Leather',
      'Dimensions': '52cm x 28cm x 26cm',
      'Lining': 'Organic Cotton Twill',
      'Hardware': 'Antiqued Solid Brass'
    },
    createdAt: '2026-10-08'
  },
  {
    id: 'prod-004',
    title: 'Active Noise Cancelling Hi-Res Wireless Headphones with Spatial Audio & 60h Battery',
    description: 'Precision 40mm titanium drivers, hybrid ANC reducing 98% ambient noise, multipoint connection, and memory foam earcups. Inspected and tested before dispatch.',
    category: 'Electronics',
    priceUSD: 89.99,
    originalPriceUSD: 149.99,
    rating: 4.7,
    reviewsCount: 820,
    soldCount: 6400,
    stock: 92,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80'
    ],
    hasOriginalPhotos: true,
    photoVerification: {
      isOriginalVerified: true,
      cameraModel: 'Nikon Z6 II',
      captureTimestamp: '2026-10-14 16:30:11 UTC',
      authenticityScore: 97,
      watermarksDetected: false,
      isStockPhotoScraped: false,
      verificationBadge: 'Verified Original Inventory Photo'
    },
    sellerId: 'merch-8821',
    sellerStoreId: 'store-8821-2',
    sellerName: 'Apex Audio World',
    sellerRating: 4.91,
    sellerCountry: 'Japan 🇯🇵',
    sellerAgeVerified: true,
    sellerStrikes: 0,
    shippingFree: true,
    estimatedDays: 5,
    tags: ['SuperDeals', 'eShop Money Back', 'Fast Shipping'],
    specifications: {
      'Driver': '40mm Custom Titanium Diaphragm',
      'Noise Reduction': '-45dB Hybrid Active',
      'Battery Life': '60 Hours (ANC off) / 45 Hours (ANC on)',
      'Codecs': 'LDAC, AAC, SBC'
    },
    createdAt: '2026-10-14'
  },
  {
    id: 'prod-005',
    title: 'Japanese Hand-Forged Damascus Steel Chef Santoku Knife 7-Inch with Ebony Handle',
    description: '67 layers of VG-10 high-carbon Damascus steel forged by master blacksmiths in Seki City, Japan. Razor-sharp 15-degree double bevel edge. Water resistance treated octagonal wood handle.',
    category: 'Home & Living',
    priceUSD: 135.00,
    originalPriceUSD: 199.00,
    rating: 4.95,
    reviewsCount: 310,
    soldCount: 1450,
    stock: 22,
    images: [
      'https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1589718539308-1683fe7a7df4?auto=format&fit=crop&w=1000&q=80'
    ],
    hasOriginalPhotos: true,
    photoVerification: {
      isOriginalVerified: true,
      cameraModel: 'Sony A7R IV',
      captureTimestamp: '2026-10-09 10:20:00 UTC',
      authenticityScore: 99,
      watermarksDetected: false,
      isStockPhotoScraped: false,
      verificationBadge: 'Verified Forge Original Photo'
    },
    sellerId: 'merch-8821',
    sellerStoreId: 'store-8821-3',
    sellerName: 'Seki Blades Global',
    sellerRating: 4.96,
    sellerCountry: 'Japan 🇯🇵',
    sellerAgeVerified: true,
    sellerStrikes: 0,
    shippingFree: true,
    estimatedDays: 5,
    tags: ['Verified Original', 'Master Craft', 'SafeEscrow'],
    specifications: {
      'Core Steel': 'Japanese VG-10 Super Steel (60-62 HRC)',
      'Blade Length': '7.0 inches (180mm)',
      'Handle': 'Ebony wood with buffalo horn bolster',
      'Origin': 'Seki City, Gifu, Japan'
    },
    createdAt: '2026-10-09'
  },
  {
    id: 'prod-006',
    title: 'Titanium Smartwatch Ultra GPS - Sapphire Crystal 100m Water Resistant with ECG',
    description: 'Aerospace-grade titanium housing, bright 2500 nit AMOLED display, dual-frequency GNSS tracking, multi-sport biometric sensors, and magnetic titanium link bracelet.',
    category: 'Electronics',
    priceUSD: 289.00,
    originalPriceUSD: 420.00,
    rating: 4.82,
    reviewsCount: 460,
    soldCount: 2900,
    stock: 31,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=80'
    ],
    hasOriginalPhotos: true,
    photoVerification: {
      isOriginalVerified: true,
      cameraModel: 'iPhone 15 Pro Max Macro Lens',
      captureTimestamp: '2026-10-16 13:14:52 UTC',
      authenticityScore: 96,
      watermarksDetected: false,
      isStockPhotoScraped: false,
      verificationBadge: 'Verified Live Camera Original'
    },
    sellerId: 'merch-3310',
    sellerStoreId: 'store-3310-2',
    sellerName: 'Titan Tech Direct',
    sellerRating: 4.84,
    sellerCountry: 'Taiwan 🇹🇼',
    sellerAgeVerified: true,
    sellerStrikes: 0,
    shippingFree: true,
    estimatedDays: 4,
    tags: ['SuperDeals', 'AliExpress Choice', 'SafeEscrow'],
    specifications: {
      'Case': 'Grade 5 Aerospace Titanium (49mm)',
      'Screen': '1.96" Sapphire Crystal AMOLED (2500 nits)',
      'Water Rating': '100m Dive & ISO 22810 certified',
      'Battery': 'Up to 7 days normal / 20 days battery saver'
    },
    createdAt: '2026-10-15'
  },
  {
    id: 'prod-007',
    title: 'Vintage Retro 35mm Rangefinder Camera with F/1.4 Prime Lens - Collector Clean',
    description: 'Rare collectible mechanical rangefinder camera. Completely serviced, shutter speeds calibrated, clear optics with zero fungus or haze. Authentic vintage piece photographed in all angles with serial proof.',
    category: 'Collectibles',
    priceUSD: 380.00,
    originalPriceUSD: 520.00,
    rating: 4.98,
    reviewsCount: 88,
    soldCount: 210,
    stock: 2,
    images: [
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80'
    ],
    hasOriginalPhotos: true,
    photoVerification: {
      isOriginalVerified: true,
      cameraModel: 'Leica Q2',
      captureTimestamp: '2026-10-17 18:05:12 UTC',
      authenticityScore: 100,
      watermarksDetected: false,
      isStockPhotoScraped: false,
      verificationBadge: 'Verified Collector Original Photos'
    },
    sellerId: 'merch-5520',
    sellerStoreId: 'store-5520-2',
    sellerName: 'Vintage Vault EU',
    sellerRating: 4.98,
    sellerCountry: 'Germany 🇩🇪',
    sellerAgeVerified: true,
    sellerStrikes: 0,
    shippingFree: true,
    estimatedDays: 3,
    tags: ['Rare Collectible', 'Top Rated Plus', 'SafeEscrow'],
    specifications: {
      'Format': '35mm Film Rangefinder',
      'Lens Mount': 'M39 / LTM Thread',
      'Condition': 'Mint Condition (9.5/10)',
      'Includes': 'Original Leather Case + Metal Hood'
    },
    createdAt: '2026-10-16'
  },
  {
    id: 'prod-008',
    title: 'Professional OBD2 Car Diagnostic Scanner Tool with Bidirectional Control & ECU Coding',
    description: 'Full-system automotive scanner compatible with 150+ vehicle brands worldwide. Real-time live data graphs, oil reset, brake bleed, and DPF regeneration. Global updates included.',
    category: 'Automotive & Tools',
    priceUSD: 175.00,
    originalPriceUSD: 289.00,
    rating: 4.76,
    reviewsCount: 420,
    soldCount: 3100,
    stock: 58,
    images: [
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1000&q=80'
    ],
    hasOriginalPhotos: true,
    photoVerification: {
      isOriginalVerified: true,
      cameraModel: 'Sony Alpha 6400',
      captureTimestamp: '2026-10-13 15:40:00 UTC',
      authenticityScore: 97,
      watermarksDetected: false,
      isStockPhotoScraped: false,
      verificationBadge: 'Verified Garage Original Photo'
    },
    sellerId: 'merch-3310',
    sellerStoreId: 'store-3310-3',
    sellerName: 'AutoTech Global Tools',
    sellerRating: 4.79,
    sellerCountry: 'Taiwan 🇹🇼',
    sellerAgeVerified: true,
    sellerStrikes: 0,
    shippingFree: true,
    estimatedDays: 6,
    tags: ['Automotive Pro', 'SafeEscrow', 'Fast Courier'],
    specifications: {
      'Screen': '7-inch IPS High-Brightness Touchscreen',
      'OS': 'Android 11 Automotive Edition',
      'Compatibility': 'OBD II & EOBD Protocol (1996 - 2026)',
      'Updates': '2 Years Free Wi-Fi Updates'
    },
    createdAt: '2026-10-11'
  }
];

export const INITIAL_MERCHANT: MerchantProfile = {
  id: 'merch-8821',
  fullName: 'Marcus Vance',
  email: 'marcus.vance.merchants@eshop-intl.com',
  phone: '+1 (415) 890-4421',
  dateOfBirth: '1992-05-14',
  calculatedAge: 34,
  isAgeVerified: true,
  idType: 'passport',
  idNumber: 'PA-99218491A',
  idDocumentPreview: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
  selfieVerificationUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  residentialCountry: 'United States',
  residentialAddress: '742 Market Street, Suite 400, San Francisco, CA 94102',
  taxIdentificationNumber: 'EIN-84-991204',
  eShopAntiCounterfeitPledge: true,
  noCodPolicyAccepted: true,
  verifiedAt: '2026-01-10 10:00:00 UTC',
  activeSubAccountId: 'store-8821-1',
  globalBanStatus: {
    isBanned: false,
    escrowFrozen: false,
    appealStatus: 'none'
  },
  subAccounts: [
    {
      id: 'store-8821-1',
      parentMerchantId: 'merch-8821',
      storeNumber: 1,
      storeName: 'Apex Optics Global',
      category: 'Electronics',
      description: 'Authorized retailer of high-end optical equipment, Sony cameras, cinema lenses, and professional photo gear.',
      logo: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=150&q=80',
      banner: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80',
      status: 'active',
      strikes: 0,
      warnings: [],
      balancePendingUSD: 3998.00,
      balanceAvailableUSD: 14520.00,
      totalSalesUSD: 124800.00,
      totalOrders: 64,
      rating: 4.95,
      positiveFeedbackPercent: 99.4,
      payoutMethod: {
        id: 'payout-001',
        type: 'bank_wire',
        name: 'Chase Global Commercial Wire (USD / EUR / JPY)',
        accountIdentifier: 'US89CHAS12345678901234',
        bankName: 'JPMorgan Chase International',
        swiftBic: 'CHASUS33XXX',
        currency: 'USD',
        isVerified: true,
        verifiedAt: '2026-01-12'
      },
      createdAt: '2026-01-15'
    },
    {
      id: 'store-8821-2',
      parentMerchantId: 'merch-8821',
      storeNumber: 2,
      storeName: 'Apex Audio World',
      category: 'Electronics',
      description: 'Audiophile headphones, spatial audio monitors, and DAC amplifiers shipped worldwide with zero customs friction.',
      logo: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=150&q=80',
      banner: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
      status: 'active',
      strikes: 0,
      warnings: [],
      balancePendingUSD: 1240.00,
      balanceAvailableUSD: 6850.00,
      totalSalesUSD: 48900.00,
      totalOrders: 142,
      rating: 4.91,
      positiveFeedbackPercent: 98.7,
      payoutMethod: {
        id: 'payout-002',
        type: 'payoneer',
        name: 'Payoneer Multi-Currency Merchant Account',
        accountIdentifier: 'payoneer-merchant@apexoptics.com',
        currency: 'USD',
        isVerified: true,
        verifiedAt: '2026-01-20'
      },
      createdAt: '2026-02-01'
    },
    {
      id: 'store-8821-3',
      parentMerchantId: 'merch-8821',
      storeNumber: 3,
      storeName: 'Seki Blades Global',
      category: 'Home & Living',
      description: 'Direct imports of hand-forged Japanese culinary knives and whetstones from master artisans.',
      logo: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=150&q=80',
      banner: 'https://images.unsplash.com/photo-1589718539308-1683fe7a7df4?auto=format&fit=crop&w=1200&q=80',
      status: 'active',
      strikes: 0,
      warnings: [],
      balancePendingUSD: 540.00,
      balanceAvailableUSD: 3120.00,
      totalSalesUSD: 21400.00,
      totalOrders: 48,
      rating: 4.96,
      positiveFeedbackPercent: 99.8,
      payoutMethod: {
        id: 'payout-003',
        type: 'paypal',
        name: 'PayPal Merchant Business Account',
        accountIdentifier: 'payouts-paypal@seki-blades.com',
        currency: 'USD',
        isVerified: true,
        verifiedAt: '2026-02-15'
      },
      createdAt: '2026-02-10'
    }
  ]
};

// Demo banned seller to demonstrate the ban enforcement mechanism
export const DEMO_BANNED_MERCHANT: MerchantProfile = {
  id: 'merch-9944-banned',
  fullName: 'Viktor Kolarov',
  email: 'viktor.deals@shadow-outlet.com',
  phone: '+44 20 7946 0192',
  dateOfBirth: '1998-09-02',
  calculatedAge: 28,
  isAgeVerified: true,
  idType: 'national_id',
  idNumber: 'GB-99482109',
  idDocumentPreview: '',
  selfieVerificationUrl: '',
  residentialCountry: 'United Kingdom',
  residentialAddress: 'Flat 4B, 18 Canary Wharf, London',
  taxIdentificationNumber: 'GB-VAT-99214',
  eShopAntiCounterfeitPledge: false,
  noCodPolicyAccepted: false,
  verifiedAt: '2026-01-05',
  activeSubAccountId: 'store-9944-1',
  globalBanStatus: {
    isBanned: true,
    bannedAt: '2026-10-18 19:42:10 UTC',
    banReason: 'Strike 3 reached: Repeated upload of scraped web stock photos, selling non-original items, and attempting off-platform Cash on Delivery (COD) transactions in direct violation of eShop SafeEscrow policies.',
    escrowFrozen: true,
    appealStatus: 'rejected',
    appealMessage: 'Appeal reviewed by 24/7 Trust & Safety board on Oct 19: Denied due to multiple forensic image hashes matching copyrighted stock catalogs.'
  },
  subAccounts: [
    {
      id: 'store-9944-1',
      parentMerchantId: 'merch-9944-banned',
      storeNumber: 1,
      storeName: 'Shadow Outlet Discount',
      category: 'Electronics',
      description: 'Account terminated by eShop Trust & Safety.',
      logo: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=150&q=80',
      banner: '',
      status: 'banned',
      strikes: 3,
      warnings: [
        {
          id: 'warn-101',
          timestamp: '2026-10-02 08:30:00 UTC',
          strikeNumber: 1,
          severity: 'low',
          reason: 'Non-Original Image Scrape Detected',
          details: 'Listing #9912 used watermarked stock photography scraped from Google Images instead of original merchant camera photo.',
          isResolved: false,
          actionTaken: 'Listing removed. 48hr compliance window granted.'
        },
        {
          id: 'warn-102',
          timestamp: '2026-10-10 14:15:00 UTC',
          strikeNumber: 2,
          severity: 'medium',
          reason: 'Severe Listing Discrepancy & Off-Platform Solicitation',
          details: 'Buyer received mismatched generic plastic replica. Merchant attempted to message buyer offering off-platform COD settlement.',
          isResolved: false,
          actionTaken: 'Store restricted for 7 days. Escrow held. Compulsory dispute refund executed.'
        },
        {
          id: 'warn-103',
          timestamp: '2026-10-18 19:42:00 UTC',
          strikeNumber: 3,
          severity: 'critical',
          reason: 'PERMANENT BAN: Unlawful Re-Listing of Stock Photos & COD Fraud Attempt',
          details: 'Forensic image inspection confirmed third unauthorized stock scraping violation. Immediate global ban across store identity slots.',
          isResolved: false,
          actionTaken: 'PERMANENT BAN: Merchant ID, Bank details, and Gov ID blacklisted. Escrow balance ($2,410.00) locked for 180 days to cover buyer chargebacks.'
        }
      ],
      balancePendingUSD: 2410.00,
      balanceAvailableUSD: 0.00,
      totalSalesUSD: 6800.00,
      totalOrders: 18,
      rating: 2.1,
      positiveFeedbackPercent: 48.0,
      payoutMethod: null,
      createdAt: '2026-01-05'
    }
  ]
};

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'TICK-9082',
    subject: 'Escrow verification and delivery confirmation for Sony Alpha A7 IV',
    category: 'order_issue',
    priority: 'high',
    status: 'investigating',
    createdAt: '2026-10-20 16:30 UTC',
    orderId: 'ORD-881290',
    messages: [
      {
        id: 'msg-1',
        sender: 'user',
        senderName: 'Buyer (David K.)',
        text: 'Hello eShop 24/7 Support. I ordered the camera 2 days ago. I wanted to verify that my payment is protected under eShop SafeEscrow and will not be paid to seller until I inspect the original item?',
        timestamp: '16:30'
      },
      {
        id: 'msg-2',
        sender: 'agent',
        senderName: 'Elena (24/7 Escrow Agent)',
        text: 'Hello David! Absolutely. eShop operates on strict SafeEscrow with 0% COD. Your funds of $1,999.00 are held safely in trust. The seller only receives payout 72 hours after you receive the package and confirm the camera matches original photos.',
        timestamp: '16:32'
      }
    ]
  },
  {
    id: 'TICK-9083',
    subject: 'Report: Seller asked if I can pay cash on arrival',
    category: 'non_original_photo',
    priority: 'urgent',
    status: 'open',
    createdAt: '2026-10-21 07:15 UTC',
    messages: [
      {
        id: 'msg-3',
        sender: 'user',
        senderName: 'Buyer (Sophie L.)',
        text: 'A seller sent me a direct message asking if we can do COD (Cash on Delivery) to avoid platform fee. I know eShop strictly bans COD.',
        timestamp: '07:15'
      },
      {
        id: 'msg-4',
        sender: 'system',
        senderName: 'eShop Automated Anti-Fraud Guard',
        text: 'ALERT: Off-platform / COD solicitation detected. A Strike 1 investigation has been dispatched immediately to Trust & Safety. Your transaction remains 100% protected.',
        timestamp: '07:16'
      }
    ]
  }
];
