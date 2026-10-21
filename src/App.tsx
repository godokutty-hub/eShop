/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SellerOnboardingModal } from './components/SellerOnboardingModal';
import { SellerHub } from './components/SellerHub';
import { TrustSafetyCenter } from './components/TrustSafetyCenter';
import { CustomerSupportModal } from './components/CustomerSupportModal';
import { NoCodPolicyModal } from './components/NoCodPolicyModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrdersTrackerModal } from './components/OrdersTrackerModal';
import { AddProductModal } from './components/AddProductModal';
import {
  ShieldCheck,
  Camera,
  Ban,
  Headphones,
  Store,
  Sparkles,
  Lock,
  Globe2,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  Scale
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const {
    products,
    selectedCategory,
    searchQuery,
    onlyOriginalPhotos,
    userRole,
    setUserRole,
    country,
    currency,
    setIsSupportOpen,
    setIsNoCodPolicyOpen,
    setIsSellerOnboardingOpen,
    setIsTrustSafetyOpen
  } = useApp();

  // Filter products by category, search query, and original photo filter
  const filteredProducts = products.filter(p => {
    // If banned seller (strike 3), hide from buyer catalog!
    if (p.sellerStrikes >= 3) return false;

    if (selectedCategory !== 'All' && p.category !== selectedCategory) {
      return false;
    }

    if (onlyOriginalPhotos && !p.hasOriginalPhotos) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchCategory = p.category.toLowerCase().includes(q);
      const matchTags = p.tags.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchCategory && !matchTags) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* 1. Header Navigation */}
      <Header />

      {/* 2. Main Content Area */}
      <main className="flex-1 pb-16">
        {userRole === 'seller' ? (
          /* SELLER HUB VIEW */
          <SellerHub />
        ) : (
          /* BUYER MARKETPLACE VIEW */
          <div className="space-y-6">
            {/* Promotional Banners & Flash Deals */}
            <HeroBanner />

            {/* Catalog Section */}
            <div className="max-w-7xl mx-auto px-4 space-y-4">
              {/* Category & Filter Status Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    {searchQuery ? `Search Results for "${searchQuery}"` : selectedCategory === 'All' ? 'Global Featured Products' : selectedCategory}
                  </h2>
                  <span className="text-xs text-slate-500 font-medium">
                    ({filteredProducts.length} items found)
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-600">
                  <span className="hidden sm:inline text-slate-400">
                    Pricing in <strong className="text-slate-800">{currency.code} ({currency.symbol})</strong> · Delivery to <strong className="text-slate-800">{country.flag} {country.name}</strong>
                  </span>

                  {onlyOriginalPhotos && (
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 font-bold px-2.5 py-1 rounded-full border border-emerald-300">
                      <Camera className="w-3.5 h-3.5 text-emerald-600" />
                      100% Original Photos Only
                    </span>
                  )}
                </div>
              </div>

              {/* Product Grid */}
              {filteredProducts.length === 0 ? (
                <div className="py-20 text-center space-y-3 bg-white rounded-2xl border border-slate-200">
                  <Camera className="w-12 h-12 text-slate-300 mx-auto" />
                  <div className="text-base font-bold text-slate-800">No matching products found</div>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Try adjusting your search terms or category filters. All available listings undergo rigorous original photo verification.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}

              {/* 3. Platform Constitution & Protection Grid */}
              <div className="mt-12 pt-8 border-t border-slate-200 space-y-6">
                <div className="text-center max-w-2xl mx-auto space-y-1.5">
                  <span className="text-xs font-extrabold text-blue-600 tracking-wider uppercase">
                    eShop Global Standard
                  </span>
                  <h3 className="text-2xl font-black text-slate-900">
                    Built for International Trust: Neither Buyer Nor Seller Disappointed
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Modeled after international leaders eBay and AliExpress, elevated with automated photo forensics and strict SafeEscrow.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Card 1: Strictly No COD */}
                  <div
                    onClick={() => setIsNoCodPolicyOpen(true)}
                    className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-amber-300 transition cursor-pointer space-y-2 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition">
                      <Ban className="w-5 h-5" />
                    </div>
                    <div className="text-sm font-extrabold text-slate-900 flex items-center justify-between">
                      <span>Strictly NO Cash on Delivery (COD)</span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition" />
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Zero physical cash on arrival. Payments are locked in digital SafeEscrow until you inspect the parcel. Solicitations for COD offline incur instant Strike 3 bans.
                    </p>
                  </div>

                  {/* Card 2: 100% Original Photos */}
                  <div
                    onClick={() => setIsTrustSafetyOpen(true)}
                    className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-emerald-300 transition cursor-pointer space-y-2 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition">
                      <Camera className="w-5 h-5" />
                    </div>
                    <div className="text-sm font-extrabold text-slate-900 flex items-center justify-between">
                      <span>Mandatory Original Pictures</span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition" />
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Sellers must upload original photographs with verified camera signatures. Scraped web stock photos are automatically detected and rejected from the platform.
                    </p>
                  </div>

                  {/* Card 3: 18+ Store Accounts */}
                  <div
                    onClick={() => {
                      setUserRole('seller');
                      setIsSellerOnboardingOpen(true);
                    }}
                    className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-blue-300 transition cursor-pointer space-y-2 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition">
                      <Store className="w-5 h-5" />
                    </div>
                    <div className="text-sm font-extrabold text-slate-900 flex items-center justify-between">
                      <span>18+ Self-Details Seller Account</span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition" />
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Adult-only verified merchant onboarding. Operate up to 5 distinct storefront identities under one ID with international wire, Payoneer, or PayPal payouts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 3. Floating 24/7 Customer Support Launcher */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setIsSupportOpen(true)}
          className="flex items-center gap-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold text-xs py-3 px-4 rounded-full shadow-xl shadow-blue-600/30 transition transform hover:scale-105 cursor-pointer border border-blue-400/40"
        >
          <div className="relative">
            <Headphones className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          </div>
          <span>Customer Support (24/7)</span>
        </button>
      </div>

      {/* 4. Global Footer (eBay x AliExpress Style) */}
      <footer className="bg-slate-900 text-white border-t border-slate-800 pt-12 pb-8 text-xs">
        <div className="max-w-7xl mx-auto px-4 space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-extrabold text-lg text-white">
                  e
                </div>
                <span className="font-extrabold text-xl tracking-tight text-white">
                  e<span className="text-blue-500">Shop</span>
                </span>
                <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 bg-blue-900/80 text-blue-300 rounded">
                  International
                </span>
              </div>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                Global e-commerce marketplace modeled after AliExpress and eBay. Strictly NO Cash on Delivery (COD), verified 18+ merchants, original photo guarantees, and round-the-clock 24/7 support.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <Globe2 className="w-4 h-4 text-blue-400" />
                <span>Supporting 150+ Countries & Territories</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-white uppercase text-[11px] tracking-wider">Buyer Protection</div>
              <ul className="space-y-1.5 text-slate-400 text-xs">
                <li><button onClick={() => setIsNoCodPolicyOpen(true)} className="hover:text-white cursor-pointer">Strict NO COD Policy</button></li>
                <li><button onClick={() => setIsSupportOpen(true)} className="hover:text-white cursor-pointer">SafeEscrow Guarantee</button></li>
                <li><button onClick={() => setIsSupportOpen(true)} className="hover:text-white cursor-pointer">30-Day Money Back</button></li>
                <li><button onClick={() => setIsTrustSafetyOpen(true)} className="hover:text-white cursor-pointer">Photo Authenticity Check</button></li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-white uppercase text-[11px] tracking-wider">Sell on eShop</div>
              <ul className="space-y-1.5 text-slate-400 text-xs">
                <li><button onClick={() => setIsSellerOnboardingOpen(true)} className="hover:text-white cursor-pointer">18+ Merchant Onboarding</button></li>
                <li><button onClick={() => setUserRole('seller')} className="hover:text-white cursor-pointer">5-Store Identity Hub</button></li>
                <li><button onClick={() => setUserRole('seller')} className="hover:text-white cursor-pointer">Seller Payout Methods</button></li>
                <li><button onClick={() => setIsTrustSafetyOpen(true)} className="hover:text-white cursor-pointer">3-Strike Ban Law</button></li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-white uppercase text-[11px] tracking-wider">24/7 Resolution</div>
              <ul className="space-y-1.5 text-slate-400 text-xs">
                <li><button onClick={() => setIsSupportOpen(true)} className="hover:text-white cursor-pointer">Live Help Desk (24/7)</button></li>
                <li><button onClick={() => setIsSupportOpen(true)} className="hover:text-white cursor-pointer">Zero Disappointment Guarantee</button></li>
                <li><button onClick={() => setIsSupportOpen(true)} className="hover:text-white cursor-pointer">Dispute Arbitration</button></li>
                <li><button onClick={() => setIsTrustSafetyOpen(true)} className="hover:text-white cursor-pointer">Trust & Safety Console</button></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-500">
            <div>
              © 2026 eShop International Inc. All rights reserved. Registered across 150+ jurisdictions.
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified Adult Sellers (18+)
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 text-amber-400">
                <Lock className="w-3.5 h-3.5" />
                No COD / SafeEscrow Held
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 text-blue-400">
                <Headphones className="w-3.5 h-3.5" />
                24/7 Support Desk
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* 5. All Modals & Drawers */}
      <ProductDetailModal />
      <SellerOnboardingModal />
      <TrustSafetyCenter />
      <CustomerSupportModal />
      <NoCodPolicyModal />
      <CartDrawer />
      <CheckoutModal />
      <OrdersTrackerModal />
      <AddProductModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
