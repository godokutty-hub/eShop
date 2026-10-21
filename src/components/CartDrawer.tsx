/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ShieldCheck,
  Truck,
  ArrowRight,
  AlertTriangle,
  Lock
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartTotalUSD,
    formatPrice,
    setIsCheckoutOpen,
    setIsNoCodPolicyOpen,
    country
  } = useApp();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 border-l border-slate-200">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-extrabold text-slate-900">
                Shopping Cart ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* SafeEscrow & Strictly NO COD Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2">
              <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Strictly NO COD / 100% SafeEscrow:</span>
                <p className="text-[11px] text-amber-800 mt-0.5">
                  Your funds are held in trust. The seller receives payment only after you receive and inspect your package in {country.name}.
                </p>
              </div>
            </div>

            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
                <div className="text-sm font-bold text-slate-700">Your cart is empty</div>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Browse millions of products with verified original photos and SafeEscrow buyer protection.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-blue-600 text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-blue-700 transition cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map(item => (
                  <div
                    key={item.product.id}
                    className="p-3 bg-white border border-slate-200 rounded-xl shadow-2xs flex gap-3 items-center"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-16 h-16 rounded-lg object-cover border border-slate-100 shrink-0"
                    />

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="text-xs font-bold text-slate-900 truncate">
                        {item.product.title}
                      </div>

                      <div className="text-[10px] text-slate-500 flex items-center gap-1">
                        <span>Sold by: {item.product.sellerName}</span>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs font-extrabold text-blue-900">
                          {formatPrice(item.product.priceUSD * item.quantity)}
                        </span>

                        {/* Quantity Controls */}
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden text-xs">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="px-2 py-1 bg-slate-50 hover:bg-slate-200 text-slate-600 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 py-0.5 font-bold text-slate-800">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="px-2 py-1 bg-slate-50 hover:bg-slate-200 text-slate-600 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-bold text-slate-900">{formatPrice(cartTotalUSD)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>International Shipping ({country.flag} {country.name}):</span>
                  <span className="text-emerald-700 font-bold">Free Tracked Courier</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>SafeEscrow Buyer Protection:</span>
                  <span className="text-blue-700 font-bold">Included ($0.00)</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-extrabold text-slate-900">
                  <span>Total Due:</span>
                  <span className="text-base text-blue-900">{formatPrice(cartTotalUSD)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-600/20"
              >
                <span>Proceed to SafeEscrow Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>30-Day Money Back Guarantee · NO COD Allowed</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
