/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  Star,
  ShieldCheck,
  Camera,
  CheckCircle2,
  Truck,
  AlertTriangle,
  Lock,
  Headphones,
  RotateCcw,
  Globe,
  Share2,
  Heart,
  ChevronRight,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    formatPrice,
    addToCart,
    country,
    currency,
    setIsCartOpen,
    setIsCheckoutOpen,
    setIsNoCodPolicyOpen,
    setIsSupportOpen
  } = useApp();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isCopied, setIsCopied] = useState(false);

  if (!selectedProduct) return null;

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const discountPercent = Math.round(
    ((selectedProduct.originalPriceUSD - selectedProduct.priceUSD) / selectedProduct.originalPriceUSD) * 100
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
        {/* Sticky Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-5 sm:p-8">
          {/* Left Column: Image Gallery & Original Photo Proof */}
          <div className="md:col-span-6 space-y-4">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={selectedProduct.images[activeImageIdx] || selectedProduct.images[0]}
                alt={selectedProduct.title}
                className="w-full h-full object-cover"
              />

              {discountPercent > 0 && (
                <div className="absolute top-3 left-3 bg-rose-600 text-white font-extrabold text-xs px-2.5 py-1 rounded-md shadow-md">
                  SAVE {discountPercent}%
                </div>
              )}

              {/* Watermark/Inspection Seal overlay */}
              <div className="absolute bottom-3 left-3 right-3 bg-slate-950/80 backdrop-blur-sm rounded-lg p-2 text-white text-xs flex items-center justify-between border border-emerald-500/30">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <Camera className="w-4 h-4 text-emerald-400" />
                  <span>Verified Original Photo</span>
                </div>
                <span className="text-[10px] text-slate-300 font-mono">0% Scrape Match</span>
              </div>
            </div>

            {/* Thumbnails */}
            {selectedProduct.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {selectedProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition cursor-pointer shrink-0 ${
                      activeImageIdx === idx ? 'border-blue-600 shadow-xs' : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Original Photo Forensic Inspection Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  eShop Photo Authenticity Inspector
                </span>
                <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  Verified Original
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                <div className="bg-white p-2 rounded border border-slate-200/80">
                  <span className="text-slate-400 block text-[10px]">Camera / Hardware</span>
                  <span className="font-semibold text-slate-800">{selectedProduct.photoVerification.cameraModel}</span>
                </div>
                <div className="bg-white p-2 rounded border border-slate-200/80">
                  <span className="text-slate-400 block text-[10px]">Capture Timestamp</span>
                  <span className="font-semibold text-slate-800">{selectedProduct.photoVerification.captureTimestamp}</span>
                </div>
                <div className="bg-white p-2 rounded border border-slate-200/80">
                  <span className="text-slate-400 block text-[10px]">Authenticity Score</span>
                  <span className="font-semibold text-emerald-600">{selectedProduct.photoVerification.authenticityScore}/100 High Confidence</span>
                </div>
                <div className="bg-white p-2 rounded border border-slate-200/80">
                  <span className="text-slate-400 block text-[10px]">Scraped Stock Watermarks</span>
                  <span className="font-semibold text-emerald-600">None (100% Genuine)</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 italic">
                *eShop strictly bans stock web photo scraping. Sellers face permanent account bans if photos misrepresent delivered items.
              </p>
            </div>
          </div>

          {/* Right Column: Title, Pricing, Escrow, Shipping & Purchase */}
          <div className="md:col-span-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              {/* Category Breadcrumb */}
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <span>{selectedProduct.category}</span>
                <ChevronRight className="w-3.5 h-3.5" />
                <span>Verified Stock</span>
              </div>

              {/* Title */}
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                {selectedProduct.title}
              </h1>

              {/* Ratings and Seller Badges */}
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <div className="flex items-center text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="ml-1 text-slate-900 font-semibold">{selectedProduct.rating}</span>
                </div>
                <span className="text-slate-300">·</span>
                <span className="text-blue-600 underline font-medium cursor-pointer">
                  {selectedProduct.reviewsCount} customer reviews
                </span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-500 font-medium">{selectedProduct.soldCount.toLocaleString()} sold</span>
              </div>

              {/* Price Box */}
              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3.5 flex items-baseline justify-between">
                <div>
                  <div className="text-[11px] text-blue-900 font-medium">Price in {currency.code}</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-blue-950">
                      {formatPrice(selectedProduct.priceUSD)}
                    </span>
                    {selectedProduct.originalPriceUSD > selectedProduct.priceUSD && (
                      <span className="text-xs text-slate-400 line-through">
                        {formatPrice(selectedProduct.originalPriceUSD)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right text-xs">
                  <span className="inline-block bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[11px]">
                    In Stock ({selectedProduct.stock} left)
                  </span>
                </div>
              </div>

              {/* STRICT NO COD & SafeEscrow Guarantee Box */}
              <div className="bg-gradient-to-r from-amber-500/10 via-amber-50 to-orange-500/10 border-2 border-amber-300/80 rounded-xl p-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                    <Lock className="w-4 h-4 text-amber-600" />
                    eShop SafeEscrow Protection (Strictly NO COD)
                  </div>
                  <button
                    onClick={() => setIsNoCodPolicyOpen(true)}
                    className="text-[11px] font-bold text-amber-800 underline hover:text-amber-900 cursor-pointer"
                  >
                    View Policy
                  </button>
                </div>
                <p className="text-[11px] text-amber-800/90 leading-relaxed">
                  Cash on Delivery (COD) is strictly prohibited. Your payment is safely held by eShop SafeEscrow. The seller only receives payout after you receive and confirm your original package.
                </p>
              </div>

              {/* Seller Profile Summary */}
              <div className="border border-slate-200 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{selectedProduct.sellerName}</span>
                      <span title="18+ Verified Adult Merchant">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Located in {selectedProduct.sellerCountry} · 18+ ID Verified
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="inline-block bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded text-[10px] border border-emerald-200">
                      0 Strikes (100% Standing)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-100 text-[10px] text-slate-600 text-center">
                  <div>
                    <span className="text-slate-400 block">Rating</span>
                    <span className="font-bold text-slate-800">{selectedProduct.sellerRating} / 5.0</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Dispatch Time</span>
                    <span className="font-bold text-slate-800">Within 24 Hours</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">24/7 Support</span>
                    <span className="font-bold text-emerald-600">Covered</span>
                  </div>
                </div>
              </div>

              {/* Shipping to User's Country */}
              <div className="flex items-start gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <Truck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="font-semibold text-slate-900">
                    International Shipping to {country.flag} {country.name}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Estimated arrival: {selectedProduct.estimatedDays} business days via Global Express Courier with live tracking.
                  </div>
                </div>
              </div>

              {/* Specifications */}
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-800">Key Specifications:</span>
                <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                  {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                    <div key={key} className="bg-slate-50 px-2 py-1 rounded text-slate-700">
                      <span className="font-medium text-slate-500">{key}:</span> {value}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions: Quantity + Add to Cart + Buy Now */}
            <div className="pt-4 border-t border-slate-200 space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-bold text-slate-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => {
                    addToCart(selectedProduct, quantity);
                    setIsCartOpen(true);
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition cursor-pointer shadow-md shadow-blue-600/20"
                >
                  Add to Cart ({formatPrice(selectedProduct.priceUSD * quantity)})
                </button>

                <button
                  onClick={handleBuyNow}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-5 rounded-xl text-xs sm:text-sm transition cursor-pointer shadow-md shadow-emerald-600/20"
                >
                  Buy Now
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <button
                  onClick={() => setIsSupportOpen(true)}
                  className="flex items-center gap-1 hover:text-blue-600 cursor-pointer"
                >
                  <Headphones className="w-3.5 h-3.5 text-blue-500" />
                  <span>Ask 24/7 Support about this Item</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-1 hover:text-slate-900 cursor-pointer text-[11px]"
                >
                  <Share2 className="w-3 h-3" />
                  <span>{isCopied ? 'Link Copied!' : 'Share'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
