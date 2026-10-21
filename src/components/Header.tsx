/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Search,
  ShoppingCart,
  Globe,
  ShieldCheck,
  Headphones,
  Store,
  ShieldAlert,
  Package,
  AlertTriangle,
  Camera,
  CheckCircle2,
  ChevronDown,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { COUNTRIES, CURRENCIES } from '../data/mockData';

export const Header: React.FC = () => {
  const {
    currency,
    setCurrency,
    country,
    setCountry,
    cartItemsCount,
    cartTotalUSD,
    formatPrice,
    userRole,
    setUserRole,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    onlyOriginalPhotos,
    setOnlyOriginalPhotos,
    setIsCartOpen,
    setIsOrdersOpen,
    setIsSupportOpen,
    setIsSellerOnboardingOpen,
    setIsNoCodPolicyOpen,
    setIsTrustSafetyOpen,
    merchant
  } = useApp();

  const [isCountryMenuOpen, setIsCountryMenuOpen] = useState(false);
  const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);

  const categories = [
    'All',
    'Electronics',
    'Fashion & Apparel',
    'Home & Living',
    'Automotive & Tools',
    'Collectibles'
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-xs">
      {/* 1. Global Announcement / Trust Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white text-xs px-4 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5" />
              eShop SafeEscrow
            </span>
            <span className="hidden sm:inline text-slate-300">
              Global Multi-Currency Escrow: Buyer & Seller 100% Protected
            </span>
            <button
              onClick={() => setIsNoCodPolicyOpen(true)}
              className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 font-semibold underline underline-offset-2 ml-1 cursor-pointer"
            >
              <AlertTriangle className="w-3 h-3" />
              Strictly NO COD Policy
            </button>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <button
              onClick={() => setIsSupportOpen(true)}
              className="inline-flex items-center gap-1.5 text-slate-200 hover:text-white transition cursor-pointer"
            >
              <Headphones className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-semibold text-blue-300">Customer Support (24/7)</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </button>

            <button
              onClick={() => setIsOrdersOpen(true)}
              className="hidden md:inline-flex items-center gap-1 hover:text-blue-300 transition cursor-pointer"
            >
              <Package className="w-3.5 h-3.5" />
              Track Orders
            </button>

            {/* Quick Role Switcher for seamless testing */}
            <div className="flex items-center bg-slate-800/90 rounded-md p-0.5 border border-slate-700">
              <button
                onClick={() => setUserRole('buyer')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition cursor-pointer ${
                  userRole === 'buyer'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Buyer Mode
              </button>
              <button
                onClick={() => setUserRole('seller')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition cursor-pointer ${
                  userRole === 'seller'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Seller Hub (18+)
              </button>
              <button
                onClick={() => {
                  setUserRole('admin_safety');
                  setIsTrustSafetyOpen(true);
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition cursor-pointer ${
                  userRole === 'admin_safety'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Trust & Safety
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div
              onClick={() => {
                setUserRole('buyer');
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="cursor-pointer group flex items-center gap-2"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-blue-500/20 group-hover:scale-105 transition">
                e
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-2xl tracking-tight text-slate-900">
                    e<span className="text-blue-600">Shop</span>
                  </span>
                  <span className="text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded">
                    Global
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 font-medium">
                  Verified 18+ International Marketplace
                </div>
              </div>
            </div>

            {/* Country & Currency Switcher Quick Button */}
            <div className="hidden lg:flex items-center gap-1.5 ml-4 pl-4 border-l border-slate-200 text-xs">
              {/* Country Picker */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsCountryMenuOpen(!isCountryMenuOpen);
                    setIsCurrencyMenuOpen(false);
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition cursor-pointer text-slate-700 font-medium"
                >
                  <span className="text-base">{country.flag}</span>
                  <span>Ship to {country.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {isCountryMenuOpen && (
                  <div className="absolute left-0 mt-1 w-64 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2 max-h-72 overflow-y-auto">
                    <div className="text-[11px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider">
                      Select Delivery Destination (150+ Countries)
                    </div>
                    {COUNTRIES.map(c => (
                      <button
                        key={c.code}
                        onClick={() => {
                          setCountry(c);
                          setIsCountryMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-2 text-xs rounded-lg transition cursor-pointer text-left ${
                          country.code === c.code
                            ? 'bg-blue-50 text-blue-700 font-semibold'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">{c.flag}</span>
                          <span>{c.name}</span>
                        </div>
                        <span className="text-[11px] text-slate-400">{c.currency}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Currency Picker */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsCurrencyMenuOpen(!isCurrencyMenuOpen);
                    setIsCountryMenuOpen(false);
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition cursor-pointer text-slate-700 font-medium"
                >
                  <Globe className="w-3.5 h-3.5 text-blue-600" />
                  <span>{currency.code} ({currency.symbol})</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {isCurrencyMenuOpen && (
                  <div className="absolute left-0 mt-1 w-56 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2 max-h-72 overflow-y-auto">
                    <div className="text-[11px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider">
                      Global Currency Rates
                    </div>
                    {CURRENCIES.map(curr => (
                      <button
                        key={curr.code}
                        onClick={() => {
                          setCurrency(curr);
                          setIsCurrencyMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-2 text-xs rounded-lg transition cursor-pointer text-left ${
                          currency.code === curr.code
                            ? 'bg-blue-50 text-blue-700 font-semibold'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{curr.flag}</span>
                          <span>{curr.code} - {curr.symbol}</span>
                        </div>
                        <span className="text-[11px] text-slate-400">{curr.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Search Bar - AliExpress / eBay Style */}
          <div className="flex-1 max-w-2xl mx-2">
            <div className="flex items-center border-2 border-blue-600 rounded-full bg-white overflow-hidden shadow-xs focus-within:ring-2 focus-within:ring-blue-400/30 transition">
              <div className="hidden sm:flex items-center pl-4 pr-2 border-r border-slate-200 text-xs font-semibold text-slate-700">
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="bg-transparent border-none outline-hidden cursor-pointer text-slate-700 py-1"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <input
                type="text"
                placeholder="Search products, brands, or verified original listings..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 text-sm outline-hidden text-slate-900 placeholder:text-slate-400"
              />

              <button
                onClick={() => setOnlyOriginalPhotos(!onlyOriginalPhotos)}
                title={onlyOriginalPhotos ? "Showing only Original Verified Photos" : "Filter by Original Verified Photos"}
                className={`hidden md:flex items-center gap-1 text-xs px-3 py-1 mr-1 rounded-full font-semibold transition cursor-pointer ${
                  onlyOriginalPhotos
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                <Camera className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[11px]">Original Only</span>
              </button>

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 transition flex items-center justify-center cursor-pointer">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Hub */}
          <div className="flex items-center gap-3">
            {/* Sell on eShop (18+ Requirements) */}
            <button
              onClick={() => {
                if (merchant.isAgeVerified) {
                  setUserRole('seller');
                } else {
                  setIsSellerOnboardingOpen(true);
                }
              }}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 transition cursor-pointer border border-slate-200"
            >
              <Store className="w-4 h-4 text-emerald-600" />
              <span>{merchant.isAgeVerified ? 'Seller Hub (5 Stores)' : 'Sell on eShop (18+)'}</span>
              {merchant.isAgeVerified && (
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              )}
            </button>

            {/* Trust & Safety Direct Launcher */}
            <button
              onClick={() => setIsTrustSafetyOpen(true)}
              title="eShop Trust, Safety & Seller Warning System"
              className="flex items-center gap-1.5 p-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            >
              <ShieldAlert className="w-5 h-5 text-amber-500" />
              <span className="hidden xl:inline text-xs">Trust & Bans</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer relative"
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                    {cartItemsCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-[10px] text-slate-300 font-normal leading-none">Cart</div>
                <div className="text-xs font-bold leading-tight">{formatPrice(cartTotalUSD)}</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Category & Navigation Pills */}
      <div className="bg-slate-50 border-t border-slate-200/80 px-4 py-1.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs overflow-x-auto no-scrollbar gap-4">
          <div className="flex items-center gap-1 sm:gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs font-semibold'
                    : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4 text-[11px] text-slate-500 font-medium whitespace-nowrap">
            <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              100% Original Photo Guarantee
            </span>
            <span className="flex items-center gap-1 text-slate-600">
              <ShieldCheck className="w-3 h-3 text-blue-600" />
              SafeEscrow Payout Protection
            </span>
            <button
              onClick={() => setIsNoCodPolicyOpen(true)}
              className="text-amber-700 hover:text-amber-800 font-semibold underline cursor-pointer"
            >
              Why No COD?
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
