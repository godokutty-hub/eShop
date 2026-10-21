/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CartItem,
  Country,
  Currency,
  MerchantProfile,
  Order,
  Product,
  SellerAccount,
  SellerPayoutMethod,
  SellerWarning,
  ShippingAddress,
  SupportTicket,
  UserRole
} from '../types';
import { COUNTRIES, CURRENCIES, DEMO_BANNED_MERCHANT, INITIAL_MERCHANT, INITIAL_PRODUCTS, INITIAL_TICKETS } from '../data/mockData';

interface AppContextType {
  // Localization & International Access
  currency: Currency;
  setCurrency: (c: Currency) => void;
  country: Country;
  setCountry: (c: Country) => void;
  formatPrice: (amountUSD: number) => string;
  convertPrice: (amountUSD: number) => number;

  // Role Switcher
  userRole: UserRole;
  setUserRole: (r: UserRole) => void;

  // Products
  products: Product[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onlyOriginalPhotos: boolean;
  setOnlyOriginalPhotos: (val: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  addNewProduct: (product: Omit<Product, 'id' | 'createdAt' | 'sellerId' | 'sellerStoreId' | 'sellerName' | 'sellerRating' | 'sellerCountry' | 'sellerAgeVerified' | 'sellerStrikes'>) => { success: boolean; error?: string; product?: Product };

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotalUSD: number;
  cartItemsCount: number;

  // Orders & SafeEscrow (Strictly NO COD)
  orders: Order[];
  createOrder: (address: ShippingAddress, paymentMethod: Order['paymentMethod']) => Order;
  confirmOrderReceived: (orderId: string) => void;
  disputeOrder: (orderId: string, reason: string) => void;

  // 18+ Merchant & 5-Store System
  merchant: MerchantProfile;
  activeStore: SellerAccount;
  switchActiveStore: (storeId: string) => void;
  createNewStorefront: (name: string, category: string, description: string) => { success: boolean; error?: string; store?: SellerAccount };
  completeMerchant18PlusOnboarding: (data: Partial<MerchantProfile>) => void;
  updateSellerPayoutMethod: (storeId: string, method: Omit<SellerPayoutMethod, 'id' | 'isVerified' | 'verifiedAt'>) => void;
  requestSellerPayout: (storeId: string) => { success: boolean; message: string };

  // Warning & Ban System
  issueSellerWarning: (targetMerchantId: string, storeId: string, reason: string, details: string, severity: 'low' | 'medium' | 'critical') => void;
  executePermanentBan: (targetMerchantId: string, reason: string) => void;
  liftBanOrAppeal: (targetMerchantId: string, approved: boolean, note: string) => void;
  submitSellerAppeal: (targetMerchantId: string, appealMessage: string) => void;
  activeDemoBannedSeller: MerchantProfile;

  // 24/7 Customer Support & SafeEscrow Hotline
  tickets: SupportTicket[];
  activeTicket: SupportTicket | null;
  setActiveTicket: (t: SupportTicket | null) => void;
  createSupportTicket: (subject: string, category: SupportTicket['category'], priority: SupportTicket['priority'], initialMessage: string, orderId?: string) => SupportTicket;
  sendTicketMessage: (ticketId: string, text: string) => void;

  // UI Modals
  isCartOpen: boolean;
  setIsCartOpen: (v: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (v: boolean) => void;
  isSellerOnboardingOpen: boolean;
  setIsSellerOnboardingOpen: (v: boolean) => void;
  isSupportOpen: boolean;
  setIsSupportOpen: (v: boolean) => void;
  isOrdersOpen: boolean;
  setIsOrdersOpen: (v: boolean) => void;
  isNoCodPolicyOpen: boolean;
  setIsNoCodPolicyOpen: (v: boolean) => void;
  isTrustSafetyOpen: boolean;
  setIsTrustSafetyOpen: (v: boolean) => void;
  isAddProductOpen: boolean;
  setIsAddProductOpen: (v: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Localization
  const [currency, setCurrency] = useState<Currency>(CURRENCIES[0]);
  const [country, setCountry] = useState<Country>(COUNTRIES[0]);

  // Roles & Catalog
  const [userRole, setUserRole] = useState<UserRole>('buyer');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyOriginalPhotos, setOnlyOriginalPhotos] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart
  const [cart, setCart] = useState<CartItem[]>([]);

  // Orders
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-77218-SAFE',
      date: '2026-10-19 11:20 UTC',
      items: [
        {
          product: INITIAL_PRODUCTS[1],
          quantity: 1
        }
      ],
      totalUSD: 119.00,
      currency: 'USD',
      currencyRate: 1.0,
      shippingAddress: {
        fullName: 'Alexander Wright',
        email: 'alex.wright@example.com',
        phone: '+1 415-555-0199',
        addressLine1: '350 Mission St, Apt 14A',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94105',
        country: 'United States'
      },
      paymentMethod: 'card',
      escrowStatus: 'held_in_escrow',
      deliveryStatus: 'customs_cleared',
      trackingNumber: 'ESHOP-US-9912048X',
      estimatedDeliveryDate: '2026-10-23',
      buyerProtectionCovered: true,
      isConfirmedByBuyer: false,
      trackingSteps: [
        {
          title: 'SafeEscrow Payment Confirmed',
          description: '$119.00 held safely by eShop Escrow (No COD allowed). Seller notified to pack original goods.',
          timestamp: '2026-10-19 11:20 UTC',
          completed: true,
          current: false
        },
        {
          title: 'Original Photo Verified & Packed',
          description: 'Seller dispatched package matching verified workshop photo specs.',
          timestamp: '2026-10-19 16:45 UTC',
          completed: true,
          current: false
        },
        {
          title: 'International Customs Cleared',
          description: 'Package cleared inbound terminal customs. In transit to local carrier hub.',
          timestamp: '2026-10-21 04:10 UTC',
          completed: true,
          current: true
        },
        {
          title: 'Out for Final Delivery',
          description: 'Local courier will deliver to your door.',
          timestamp: 'Pending',
          completed: false,
          current: false
        },
        {
          title: 'Buyer Inspection & Escrow Release',
          description: 'Buyer inspects original item. Upon buyer confirmation, funds release to seller payout account.',
          timestamp: 'Pending',
          completed: false,
          current: false
        }
      ]
    }
  ]);

  // Merchant 18+ Profiles (Normal & Banned Demo)
  const [merchant, setMerchant] = useState<MerchantProfile>(INITIAL_MERCHANT);
  const [activeDemoBannedSeller, setActiveDemoBannedSeller] = useState<MerchantProfile>(DEMO_BANNED_MERCHANT);

  // Active Storefront among the 5 slots
  const activeStore = merchant.subAccounts.find(s => s.id === merchant.activeSubAccountId) || merchant.subAccounts[0];

  // 24/7 Support Tickets
  const [tickets, setTickets] = useState<SupportTicket[]>(INITIAL_TICKETS);
  const [activeTicket, setActiveTicket] = useState<SupportTicket | null>(INITIAL_TICKETS[0]);

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSellerOnboardingOpen, setIsSellerOnboardingOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isNoCodPolicyOpen, setIsNoCodPolicyOpen] = useState(false);
  const [isTrustSafetyOpen, setIsTrustSafetyOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  // Auto-sync currency when user changes destination country if preferred
  const handleCountryChange = (c: Country) => {
    setCountry(c);
    const matchedCurr = CURRENCIES.find(cur => cur.code === c.currency);
    if (matchedCurr) {
      setCurrency(matchedCurr);
    }
  };

  const convertPrice = (amountUSD: number): number => {
    return Math.round(amountUSD * currency.rateAgainstUSD * 100) / 100;
  };

  const formatPrice = (amountUSD: number): string => {
    const converted = convertPrice(amountUSD);
    return `${currency.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const cartTotalUSD = cart.reduce((acc, item) => acc + item.product.priceUSD * item.quantity, 0);
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Create Order with SafeEscrow (STRICTLY NO COD)
  const createOrder = (address: ShippingAddress, paymentMethod: Order['paymentMethod']): Order => {
    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}-SAFE`;
    const newOrder: Order = {
      id: orderId,
      date: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      items: [...cart],
      totalUSD: cartTotalUSD,
      currency: currency.code,
      currencyRate: currency.rateAgainstUSD,
      shippingAddress: address,
      paymentMethod,
      escrowStatus: 'held_in_escrow',
      deliveryStatus: 'processing',
      trackingNumber: `ESHOP-${country.code}-${Math.floor(1000000 + Math.random() * 9000000)}`,
      estimatedDeliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      buyerProtectionCovered: true,
      isConfirmedByBuyer: false,
      trackingSteps: [
        {
          title: 'Payment Secured in SafeEscrow',
          description: `Held safely by eShop Escrow (${formatPrice(cartTotalUSD)}). Zero COD policy enforced.`,
          timestamp: 'Just now',
          completed: true,
          current: true
        },
        {
          title: 'Seller Preparing Original Verified Goods',
          description: 'Merchant verifying item serials against original photo database.',
          timestamp: 'Pending',
          completed: false,
          current: false
        },
        {
          title: 'International Dispatch & Tracking',
          description: `Dispatched to ${address.country} with door-to-door tracking.`,
          timestamp: 'Pending',
          completed: false,
          current: false
        },
        {
          title: 'Package Delivery & Buyer Inspection',
          description: 'Buyer inspects original package. 30-day Money Back Guarantee active.',
          timestamp: 'Pending',
          completed: false,
          current: false
        },
        {
          title: 'Escrow Payout to Verified Seller',
          description: 'Funds automatically released to seller payout account upon buyer confirmation.',
          timestamp: 'Pending',
          completed: false,
          current: false
        }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();

    // Also update seller pending balance
    setMerchant(prev => {
      const updatedSub = prev.subAccounts.map(s => {
        if (s.id === prev.activeSubAccountId) {
          return {
            ...s,
            balancePendingUSD: s.balancePendingUSD + cartTotalUSD,
            totalOrders: s.totalOrders + 1
          };
        }
        return s;
      });
      return { ...prev, subAccounts: updatedSub };
    });

    return newOrder;
  };

  const confirmOrderReceived = (orderId: string) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          return {
            ...ord,
            escrowStatus: 'released_to_seller',
            deliveryStatus: 'delivered',
            isConfirmedByBuyer: true,
            trackingSteps: ord.trackingSteps.map(step => ({ ...step, completed: true, current: false }))
          };
        }
        return ord;
      })
    );

    // Release escrow to seller's available balance
    setMerchant(prev => {
      const order = orders.find(o => o.id === orderId);
      const amount = order ? order.totalUSD : 100;
      const updatedSub = prev.subAccounts.map(s => {
        if (s.id === prev.activeSubAccountId) {
          return {
            ...s,
            balancePendingUSD: Math.max(0, s.balancePendingUSD - amount),
            balanceAvailableUSD: s.balanceAvailableUSD + amount
          };
        }
        return s;
      });
      return { ...prev, subAccounts: updatedSub };
    });
  };

  const disputeOrder = (orderId: string, reason: string) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          return {
            ...ord,
            escrowStatus: 'disputed'
          };
        }
        return ord;
      })
    );

    // Automatically generate 24/7 urgent dispute ticket
    createSupportTicket(
      `Dispute filed on Order ${orderId}: ${reason}`,
      'order_issue',
      'urgent',
      `Buyer opened formal dispute: "${reason}". SafeEscrow payout frozen pending 24/7 arbitrator review.`,
      orderId
    );
  };

  // Switch between the up to 5 sub-accounts
  const switchActiveStore = (storeId: string) => {
    setMerchant(prev => ({
      ...prev,
      activeSubAccountId: storeId
    }));
  };

  // Create another storefront (limit 5 per 18+ verified merchant)
  const createNewStorefront = (name: string, category: string, description: string) => {
    if (merchant.subAccounts.length >= 5) {
      return {
        success: false,
        error: 'eShop limit reached: Each 18+ verified merchant may hold a maximum of 5 Self-Details Seller Accounts.'
      };
    }

    if (merchant.globalBanStatus.isBanned) {
      return {
        success: false,
        error: 'Cannot create new storefronts: This merchant profile is under a global platform ban.'
      };
    }

    const nextNumber = (merchant.subAccounts.length + 1) as 1 | 2 | 3 | 4 | 5;
    const newStore: SellerAccount = {
      id: `store-${merchant.id}-${nextNumber}-${Date.now().toString().slice(-4)}`,
      parentMerchantId: merchant.id,
      storeNumber: nextNumber,
      storeName: name,
      category,
      description,
      logo: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=150&q=80',
      banner: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80',
      status: 'active',
      strikes: 0,
      warnings: [],
      balancePendingUSD: 0,
      balanceAvailableUSD: 0,
      totalSalesUSD: 0,
      totalOrders: 0,
      rating: 5.0,
      positiveFeedbackPercent: 100,
      payoutMethod: merchant.subAccounts[0]?.payoutMethod || null,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setMerchant(prev => ({
      ...prev,
      subAccounts: [...prev.subAccounts, newStore],
      activeSubAccountId: newStore.id
    }));

    return { success: true, store: newStore };
  };

  const completeMerchant18PlusOnboarding = (data: Partial<MerchantProfile>) => {
    setMerchant(prev => ({
      ...prev,
      ...data,
      isAgeVerified: true,
      verifiedAt: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC'
    }));
  };

  const updateSellerPayoutMethod = (storeId: string, method: Omit<SellerPayoutMethod, 'id' | 'isVerified' | 'verifiedAt'>) => {
    const verifiedMethod: SellerPayoutMethod = {
      ...method,
      id: `payout-${Date.now()}`,
      isVerified: true,
      verifiedAt: new Date().toISOString().split('T')[0]
    };

    setMerchant(prev => ({
      ...prev,
      subAccounts: prev.subAccounts.map(s => {
        if (s.id === storeId) {
          return { ...s, payoutMethod: verifiedMethod };
        }
        return s;
      })
    }));
  };

  const requestSellerPayout = (storeId: string) => {
    const targetStore = merchant.subAccounts.find(s => s.id === storeId);
    if (!targetStore) return { success: false, message: 'Store not found' };

    if (merchant.globalBanStatus.isBanned) {
      return { success: false, message: 'Payouts frozen: Merchant profile is banned by Trust & Safety.' };
    }

    if (targetStore.status === 'banned' || targetStore.strikes >= 3) {
      return { success: false, message: 'Payout rejected: Store is banned due to policy strikes.' };
    }

    if (targetStore.balanceAvailableUSD <= 0) {
      return { success: false, message: 'No available balance to withdraw. Pending escrow releases after buyer delivery confirmation.' };
    }

    if (!targetStore.payoutMethod) {
      return { success: false, message: 'Please attach a verified Seller Payout Method (Bank Wire / Payoneer / PayPal) first.' };
    }

    const withdrawnAmount = targetStore.balanceAvailableUSD;
    setMerchant(prev => ({
      ...prev,
      subAccounts: prev.subAccounts.map(s => {
        if (s.id === storeId) {
          return {
            ...s,
            balanceAvailableUSD: 0
          };
        }
        return s;
      })
    }));

    return {
      success: true,
      message: `Successfully scheduled payout of ${formatPrice(withdrawnAmount)} via ${targetStore.payoutMethod.name}. Funds will arrive within 1-2 business days.`
    };
  };

  // Add Product with Mandatory Original Photo Check
  const addNewProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'sellerId' | 'sellerStoreId' | 'sellerName' | 'sellerRating' | 'sellerCountry' | 'sellerAgeVerified' | 'sellerStrikes'>) => {
    // Check if merchant is banned
    if (merchant.globalBanStatus.isBanned || activeStore.status === 'banned') {
      return {
        success: false,
        error: 'Listing Rejected: Your seller account is banned for terms violations. New listings prohibited.'
      };
    }

    if (activeStore.status === 'restricted' || activeStore.strikes >= 2) {
      return {
        success: false,
        error: 'Listing Prohibited: Store has 2 strikes and is currently in restricted status. Resolve warnings before adding items.'
      };
    }

    // MANDATORY ORIGINAL PHOTO CHECK
    if (!productData.hasOriginalPhotos || productData.photoVerification.isStockPhotoScraped) {
      return {
        success: false,
        error: 'eShop Original Photo Mandate: Scraped stock photos are strictly prohibited! You must upload original photographs taken by you with verified camera metadata.'
      };
    }

    const newProd: Product = {
      ...productData,
      id: `prod-usr-${Date.now()}`,
      sellerId: merchant.id,
      sellerStoreId: activeStore.id,
      sellerName: `${activeStore.storeName} (Store #${activeStore.storeNumber})`,
      sellerRating: activeStore.rating,
      sellerCountry: merchant.residentialCountry,
      sellerAgeVerified: merchant.isAgeVerified,
      sellerStrikes: activeStore.strikes,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setProducts(prev => [newProd, ...prev]);
    return { success: true, product: newProd };
  };

  // Seller Warning & Ban Enforcement Engine
  const issueSellerWarning = (targetMerchantId: string, storeId: string, reason: string, details: string, severity: 'low' | 'medium' | 'critical') => {
    // Check if target is user merchant or demo banned merchant
    if (targetMerchantId === merchant.id) {
      setMerchant(prev => {
        const store = prev.subAccounts.find(s => s.id === storeId) || prev.subAccounts[0];
        const currentStrikes = store.strikes;
        const newStrikes = (currentStrikes + 1) as 1 | 2 | 3;

        const newWarning: SellerWarning = {
          id: `warn-${Date.now()}`,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
          strikeNumber: newStrikes > 3 ? 3 : newStrikes,
          severity,
          reason,
          details,
          deadlineHours: newStrikes === 1 ? 48 : newStrikes === 2 ? 24 : 0,
          isResolved: false,
          actionTaken:
            newStrikes === 1
              ? 'Formal Strike 1 Warning: 48h to resolve non-original image/listing discrepancy.'
              : newStrikes === 2
              ? 'Strike 2 Restriction: New listings blocked & 7-day probation.'
              : 'Strike 3: PERMANENT BAN. All 5 sub-accounts terminated & payout escrow frozen.'
        };

        const willBeBanned = newStrikes >= 3;

        const updatedSubAccounts: SellerAccount[] = prev.subAccounts.map(s => {
          if (s.id === store.id || willBeBanned) {
            return {
              ...s,
              strikes: willBeBanned ? 3 : newStrikes,
              status: willBeBanned ? 'banned' : newStrikes === 2 ? 'restricted' : 'warning',
              warnings: [newWarning, ...s.warnings]
            };
          }
          return s;
        });

        // Also update products strikes
        setProducts(currProds =>
          currProds.map(p => {
            if (p.sellerId === prev.id) {
              return {
                ...p,
                sellerStrikes: willBeBanned ? 3 : newStrikes
              };
            }
            return p;
          })
        );

        return {
          ...prev,
          subAccounts: updatedSubAccounts,
          globalBanStatus: willBeBanned
            ? {
                isBanned: true,
                bannedAt: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
                banReason: `Strike 3 reached: ${reason}. Repeated non-compliance with eShop original photo and buyer protection rules.`,
                escrowFrozen: true,
                appealStatus: 'none'
              }
            : prev.globalBanStatus
        };
      });
    }
  };

  const executePermanentBan = (targetMerchantId: string, reason: string) => {
    if (targetMerchantId === merchant.id) {
      setMerchant(prev => ({
        ...prev,
        globalBanStatus: {
          isBanned: true,
          bannedAt: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
          banReason: reason,
          escrowFrozen: true,
          appealStatus: 'none'
        },
        subAccounts: prev.subAccounts.map(s => ({
          ...s,
          status: 'banned',
          strikes: 3
        }))
      }));

      // Hide or strike products
      setProducts(currProds =>
        currProds.map(p => {
          if (p.sellerId === targetMerchantId) {
            return { ...p, sellerStrikes: 3 };
          }
          return p;
        })
      );
    }
  };

  const liftBanOrAppeal = (targetMerchantId: string, approved: boolean, note: string) => {
    if (targetMerchantId === merchant.id) {
      if (approved) {
        setMerchant(prev => ({
          ...prev,
          globalBanStatus: {
            isBanned: false,
            escrowFrozen: false,
            appealStatus: 'approved',
            appealMessage: note
          },
          subAccounts: prev.subAccounts.map(s => ({
            ...s,
            status: 'active',
            strikes: 1 // Reinstated with 1 provisional strike
          }))
        }));
      } else {
        setMerchant(prev => ({
          ...prev,
          globalBanStatus: {
            ...prev.globalBanStatus,
            appealStatus: 'rejected',
            appealMessage: note
          }
        }));
      }
    }
  };

  const submitSellerAppeal = (targetMerchantId: string, appealMessage: string) => {
    if (targetMerchantId === merchant.id) {
      setMerchant(prev => ({
        ...prev,
        globalBanStatus: {
          ...prev.globalBanStatus,
          appealStatus: 'pending',
          appealMessage
        }
      }));

      // Create 24/7 ticket
      createSupportTicket(
        `Seller Ban Appeal: Merchant ${merchant.fullName} (#${merchant.id})`,
        'seller_dispute',
        'urgent',
        `Seller submitted formal appeal against permanent ban: "${appealMessage}". Requires 24/7 Trust & Safety arbitrator review.`
      );
    }
  };

  // 24/7 Customer Support System
  const createSupportTicket = (subject: string, category: SupportTicket['category'], priority: SupportTicket['priority'], initialMessage: string, orderId?: string): SupportTicket => {
    const newTicket: SupportTicket = {
      id: `TICK-${Math.floor(1000 + Math.random() * 9000)}`,
      subject,
      category,
      priority,
      status: 'open',
      createdAt: 'Just now',
      orderId,
      messages: [
        {
          id: `msg-${Date.now()}-1`,
          sender: 'user',
          senderName: userRole === 'seller' ? `Seller (${merchant.fullName})` : 'Buyer',
          text: initialMessage,
          timestamp: 'Just now'
        },
        {
          id: `msg-${Date.now()}-2`,
          sender: 'agent',
          senderName: 'Sarah (eShop 24/7 Senior Concierge)',
          text: 'Thank you for reaching out to 24/7 eShop Resolution Center. Your request is queued with highest priority. A dedicated specialist is reviewing your case right now.',
          timestamp: 'Just now'
        }
      ]
    };

    setTickets(prev => [newTicket, ...prev]);
    setActiveTicket(newTicket);
    setIsSupportOpen(true);
    return newTicket;
  };

  const sendTicketMessage = (ticketId: string, text: string) => {
    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user' as const,
      senderName: userRole === 'seller' ? `Seller (${merchant.fullName})` : 'You',
      text,
      timestamp: 'Just now'
    };

    setTickets(prev =>
      prev.map(t => {
        if (t.id === ticketId) {
          return {
            ...t,
            messages: [...t.messages, userMsg]
          };
        }
        return t;
      })
    );

    // Simulate smart 24/7 agent response after 1 second
    setTimeout(() => {
      let agentReply = 'Our 24/7 mediation team has logged your update. If this involves an unfulfilled order, money is held safely in escrow and will be refunded if the seller does not comply.';
      const lower = text.toLowerCase();
      if (lower.includes('cod') || lower.includes('cash on delivery')) {
        agentReply = 'IMPORTANT: eShop strictly prohibits Cash on Delivery (COD). Anyone soliciting COD is committing a Level 3 Strike offense leading to immediate account termination. Please never pay cash offline; your funds on eShop are 100% escrow backed!';
      } else if (lower.includes('original') || lower.includes('fake') || lower.includes('photo')) {
        agentReply = 'Every seller on eShop is legally required to upload 100% original photos. If you received an item that does not match the original photo verification, we will issue an immediate return label and penalize the seller.';
      } else if (lower.includes('refund') || lower.includes('escrow') || lower.includes('money')) {
        agentReply = 'Your funds remain safe in eShop SafeEscrow. Payout is blocked until your issue is fully satisfied by our 24/7 Guarantee.';
      }

      const botMsg = {
        id: `msg-agent-${Date.now()}`,
        sender: 'agent' as const,
        senderName: 'Sarah (eShop 24/7 Senior Concierge)',
        text: agentReply,
        timestamp: 'Just now'
      };

      setTickets(curr =>
        curr.map(t => {
          if (t.id === ticketId) {
            return {
              ...t,
              messages: [...t.messages, botMsg]
            };
          }
          return t;
        })
      );
    }, 1000);
  };

  return (
    <AppContext.Provider
      value={{
        currency,
        setCurrency,
        country,
        setCountry: handleCountryChange,
        formatPrice,
        convertPrice,
        userRole,
        setUserRole,
        products,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        onlyOriginalPhotos,
        setOnlyOriginalPhotos,
        selectedProduct,
        setSelectedProduct,
        addNewProduct,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotalUSD,
        cartItemsCount,
        orders,
        createOrder,
        confirmOrderReceived,
        disputeOrder,
        merchant,
        activeStore,
        switchActiveStore,
        createNewStorefront,
        completeMerchant18PlusOnboarding,
        updateSellerPayoutMethod,
        requestSellerPayout,
        issueSellerWarning,
        executePermanentBan,
        liftBanOrAppeal,
        submitSellerAppeal,
        activeDemoBannedSeller,
        tickets,
        activeTicket,
        setActiveTicket,
        createSupportTicket,
        sendTicketMessage,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isSellerOnboardingOpen,
        setIsSellerOnboardingOpen,
        isSupportOpen,
        setIsSupportOpen,
        isOrdersOpen,
        setIsOrdersOpen,
        isNoCodPolicyOpen,
        setIsNoCodPolicyOpen,
        isTrustSafetyOpen,
        setIsTrustSafetyOpen,
        isAddProductOpen,
        setIsAddProductOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
