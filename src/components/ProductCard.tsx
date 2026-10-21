/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Star,
  ShieldCheck,
  Camera,
  CheckCircle2,
  Truck,
  Plus,
  AlertCircle
} from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    formatPrice,
    addToCart,
    setSelectedProduct,
    country
  } = useApp();

  const discountPercent = Math.round(
    ((product.originalPriceUSD - product.priceUSD) / product.originalPriceUSD) * 100
  );

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden group">
      {/* 1. Image & Badges Container */}
      <div
        onClick={() => setSelectedProduct(product)}
        className="relative aspect-square w-full bg-slate-100 overflow-hidden cursor-pointer"
      >
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
          {discountPercent > 0 && (
            <span className="bg-rose-600 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-md shadow-xs">
              -{discountPercent}%
            </span>
          )}

          {/* Original Photo Authenticity Seal */}
          {product.hasOriginalPhotos && (
            <span
              title="Verified Original Photo: Photographed by seller without scraped web stock images"
              className="inline-flex items-center gap-1 bg-emerald-950/80 text-emerald-300 backdrop-blur-xs text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-500/40 shadow-xs"
            >
              <Camera className="w-3 h-3 text-emerald-400" />
              <span>Original Photo</span>
            </span>
          )}
        </div>

        {/* Seller Strike Status if any */}
        {product.sellerStrikes > 0 && (
          <div className="absolute bottom-2 left-2 right-2">
            <span className="inline-flex items-center gap-1 bg-amber-950/90 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/50">
              <AlertCircle className="w-3 h-3 text-amber-400" />
              Seller Notice ({product.sellerStrikes}/3 Strikes)
            </span>
          </div>
        )}
      </div>

      {/* 2. Product Information */}
      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2.5">
        <div className="space-y-1.5">
          {/* Seller Store Name & 18+ Verification */}
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span className="truncate font-medium text-slate-700 flex items-center gap-1">
              {product.sellerName}
              <span title="18+ Verified Adult Merchant">
                <CheckCircle2 className="w-3 h-3 text-blue-500 shrink-0" />
              </span>
            </span>
            <span className="text-slate-400 shrink-0 text-[10px]">{product.sellerCountry}</span>
          </div>

          {/* Title */}
          <h3
            onClick={() => setSelectedProduct(product)}
            className="text-xs sm:text-sm font-semibold text-slate-900 line-clamp-2 hover:text-blue-600 cursor-pointer transition leading-snug"
            title={product.title}
          >
            {product.title}
          </h3>

          {/* Ratings & Sold Count */}
          <div className="flex items-center gap-1.5 text-xs">
            <div className="flex items-center text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="ml-1 text-slate-900 text-xs font-semibold">{product.rating}</span>
            </div>
            <span className="text-slate-300">·</span>
            <span className="text-slate-500 text-[11px]">{product.soldCount.toLocaleString()}+ sold</span>
          </div>
        </div>

        {/* 3. Pricing & Shipping */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              {formatPrice(product.priceUSD)}
            </span>
            {product.originalPriceUSD > product.priceUSD && (
              <span className="text-xs text-slate-400 line-through">
                {formatPrice(product.originalPriceUSD)}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1 text-emerald-700 font-medium">
              <Truck className="w-3 h-3 text-emerald-600" />
              {product.shippingFree ? 'Free Shipping' : 'Standard Delivery'}
            </span>
            <span className="text-slate-400">
              to {country.code}
            </span>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-1.5 pt-1">
            <button
              onClick={() => addToCart(product, 1)}
              className="flex-1 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-bold text-xs py-2 px-3 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer border border-blue-200 hover:border-transparent"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={() => setSelectedProduct(product)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs py-2 px-2.5 rounded-lg transition cursor-pointer"
              title="View Original Photo Verification & Specs"
            >
              <ShieldCheck className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
