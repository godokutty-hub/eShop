/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  rateAgainstUSD: number; // 1 USD = rate * currency
  flag: string;
}

export interface Country {
  code: string;
  name: string;
  flag: string;
  currency: string;
  shippingDays: string;
  importDutyNote: string;
}

export interface PhotoVerification {
  isOriginalVerified: boolean;
  cameraModel: string;
  captureTimestamp: string;
  authenticityScore: number; // 0 - 100
  watermarksDetected: boolean;
  isStockPhotoScraped: boolean;
  verificationBadge: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  priceUSD: number;
  originalPriceUSD: number;
  rating: number;
  reviewsCount: number;
  soldCount: number;
  stock: number;
  images: string[];
  hasOriginalPhotos: boolean;
  photoVerification: PhotoVerification;
  sellerId: string;
  sellerStoreId: string;
  sellerName: string;
  sellerRating: number;
  sellerCountry: string;
  sellerAgeVerified: boolean;
  sellerStrikes: number; // 0, 1, 2, 3 (3 = banned)
  shippingFree: boolean;
  estimatedDays: number;
  tags: string[];
  specifications: Record<string, string>;
  createdAt: string;
}

export interface SellerWarning {
  id: string;
  timestamp: string;
  strikeNumber: 1 | 2 | 3;
  severity: 'low' | 'medium' | 'critical';
  reason: string;
  details: string;
  deadlineHours?: number;
  isResolved: boolean;
  actionTaken: string;
}

export interface SellerPayoutMethod {
  id: string;
  type: 'bank_wire' | 'paypal' | 'payoneer' | 'stripe_connect';
  name: string;
  accountIdentifier: string; // IBAN, Email, Payoneer ID
  bankName?: string;
  swiftBic?: string;
  currency: string;
  isVerified: boolean;
  verifiedAt: string;
}

export interface SellerAccount {
  id: string;
  parentMerchantId: string;
  storeNumber: 1 | 2 | 3 | 4 | 5; // Up to 5 stores per verified 18+ merchant
  storeName: string;
  category: string;
  description: string;
  logo: string;
  banner: string;
  status: 'active' | 'warning' | 'restricted' | 'banned';
  strikes: number; // 0 to 3
  warnings: SellerWarning[];
  balancePendingUSD: number;
  balanceAvailableUSD: number;
  totalSalesUSD: number;
  totalOrders: number;
  rating: number;
  positiveFeedbackPercent: number;
  payoutMethod: SellerPayoutMethod | null;
  createdAt: string;
}

export interface MerchantProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string; // YYYY-MM-DD
  calculatedAge: number;
  isAgeVerified: boolean; // Must be >= 18
  idType: 'passport' | 'national_id' | 'driver_license';
  idNumber: string;
  idDocumentPreview: string;
  selfieVerificationUrl: string;
  residentialCountry: string;
  residentialAddress: string;
  taxIdentificationNumber: string;
  eShopAntiCounterfeitPledge: boolean;
  noCodPolicyAccepted: boolean;
  verifiedAt: string;
  subAccounts: SellerAccount[]; // Up to 5
  activeSubAccountId: string;
  globalBanStatus: {
    isBanned: boolean;
    bannedAt?: string;
    banReason?: string;
    escrowFrozen: boolean;
    appealStatus?: 'none' | 'pending' | 'rejected' | 'approved';
    appealMessage?: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface TrackingStep {
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
  current: boolean;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  totalUSD: number;
  currency: string;
  currencyRate: number;
  shippingAddress: ShippingAddress;
  paymentMethod: 'card' | 'paypal' | 'apple_pay' | 'google_pay' | 'klarna' | 'bank_transfer';
  escrowStatus: 'held_in_escrow' | 'released_to_seller' | 'disputed' | 'refunded';
  deliveryStatus: 'processing' | 'shipped' | 'customs_cleared' | 'out_for_delivery' | 'delivered';
  trackingNumber: string;
  estimatedDeliveryDate: string;
  trackingSteps: TrackingStep[];
  buyerProtectionCovered: boolean;
  isConfirmedByBuyer: boolean;
}

export interface SupportTicket {
  id: string;
  subject: string;
  category: 'order_issue' | 'buyer_protection' | 'non_original_photo' | 'seller_dispute' | 'age_verification' | 'payout_query';
  priority: 'urgent' | 'high' | 'normal';
  status: 'open' | 'investigating' | 'resolved';
  createdAt: string;
  orderId?: string;
  sellerId?: string;
  messages: {
    id: string;
    sender: 'user' | 'agent' | 'system';
    senderName: string;
    text: string;
    timestamp: string;
  }[];
}

export type UserRole = 'buyer' | 'seller' | 'admin_safety';
