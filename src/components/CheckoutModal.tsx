/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Lock,
  CreditCard,
  Ban,
  CheckCircle2,
  Truck,
  ArrowRight,
  AlertTriangle,
  Globe
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { COUNTRIES } from '../data/mockData';
import confetti from 'canvas-confetti';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotalUSD,
    formatPrice,
    createOrder,
    country,
    setIsOrdersOpen,
    setIsNoCodPolicyOpen
  } = useApp();

  // Shipping form state
  const [fullName, setFullName] = useState('Alexander Wright');
  const [email, setEmail] = useState('alex.wright@example.com');
  const [phone, setPhone] = useState('+1 (415) 555-0199');
  const [addressLine1, setAddressLine1] = useState('350 Mission St, Apt 14A');
  const [city, setCity] = useState('San Francisco');
  const [state, setState] = useState('CA');
  const [postalCode, setPostalCode] = useState('94105');
  const [destCountry, setDestCountry] = useState(country.name);

  // Buyer Payment Method State
  const [paymentMethod, setPaymentMethod] = useState<
    'card' | 'paypal' | 'apple_pay' | 'google_pay' | 'klarna' | 'bank_transfer'
  >('card');

  // Card details
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvc, setCardCvc] = useState('888');

  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      createOrder(
        {
          fullName,
          email,
          phone,
          addressLine1,
          city,
          state,
          postalCode,
          country: destCountry
        },
        paymentMethod
      );

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });

      setIsProcessing(false);
      setIsCheckoutOpen(false);
      setIsOrdersOpen(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 text-white rounded-t-2xl relative">
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="bg-emerald-500/30 text-emerald-300 text-xs font-bold uppercase px-2.5 py-0.5 rounded-full border border-emerald-400/40 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              eShop SafeEscrow Secured
            </span>
            <span className="text-xs text-slate-300">Global Cross-Border Checkout</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black">
            International Order Checkout
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Shipping to {country.flag} {country.name} · All payments held safely in escrow until verified arrival.
          </p>
        </div>

        {/* Content Body */}
        <form onSubmit={handleSubmitOrder} className="p-6 space-y-6">
          {/* 1. STRICT NO COD BANNER */}
          <div className="bg-gradient-to-r from-amber-500/10 via-amber-50 to-orange-500/10 border-2 border-amber-300 rounded-xl p-3.5 flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Ban className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-amber-950 flex items-center gap-1">
                  <span>Strictly NO Cash on Delivery (COD)</span>
                  <span className="bg-amber-200 text-amber-900 text-[10px] px-1.5 py-0.2 rounded font-extrabold uppercase">
                    Mandate Enforced
                  </span>
                </div>
                <p className="text-[11px] text-amber-900/90 leading-relaxed">
                  To eliminate doorstep delivery fraud and swap scams, physical cash on delivery is prohibited. Your payment is safely held by eShop SafeEscrow and only released after you inspect your parcel.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsNoCodPolicyOpen(true)}
              className="text-xs font-bold text-amber-800 underline hover:text-amber-900 shrink-0 cursor-pointer"
            >
              Learn Why
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left Column: Shipping Address */}
            <div className="md:col-span-7 space-y-4">
              <div className="pb-2 border-b border-slate-200 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-blue-600" />
                  International Shipping Destination
                </h3>
                <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Tracked Courier
                </span>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Recipient Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Email Address (Tracking Updates)</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Phone (SMS Delivery Alerts)</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Street Address & Apartment / Suite</label>
                  <input
                    type="text"
                    required
                    value={addressLine1}
                    onChange={e => setAddressLine1(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">City</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">State / Region</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={e => setState(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Postal Code</label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={e => setPostalCode(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Destination Country</label>
                  <select
                    value={destCountry}
                    onChange={e => setDestCountry(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                  >
                    {COUNTRIES.map(c => (
                      <option key={c.code} value={c.name}>
                        {c.flag} {c.name} ({c.shippingDays})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Right Column: Buyer Payment Methods & Order Summary */}
            <div className="md:col-span-5 space-y-4">
              <div className="pb-2 border-b border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  Buyer Payment Method
                </h3>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`w-full p-2.5 rounded-xl border text-left transition cursor-pointer flex items-center justify-between ${
                    paymentMethod === 'card'
                      ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Credit / Debit Card</div>
                      <div className="text-[10px] text-slate-400">Visa, Mastercard, Amex, UnionPay</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600">SafeEscrow</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`w-full p-2.5 rounded-xl border text-left transition cursor-pointer flex items-center justify-between ${
                    paymentMethod === 'paypal'
                      ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-blue-800 text-xs">PayPal</span>
                    <div>
                      <div className="text-xs font-bold text-slate-900">PayPal International</div>
                      <div className="text-[10px] text-slate-400">Buyer Protection Included</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600">SafeEscrow</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple_pay')}
                  className={`w-full p-2.5 rounded-xl border text-left transition cursor-pointer flex items-center justify-between ${
                    paymentMethod === 'apple_pay'
                      ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-xs"> Pay / G-Pay</span>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Apple Pay & Google Pay</div>
                      <div className="text-[10px] text-slate-400">Biometric 1-Click Checkout</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600">SafeEscrow</span>
                </button>

                {/* Explicit Disabled COD Option */}
                <div className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-100/80 text-left flex items-center justify-between opacity-75 cursor-not-allowed">
                  <div className="flex items-center gap-2">
                    <Ban className="w-4 h-4 text-rose-500" />
                    <div>
                      <div className="text-xs font-bold text-slate-500 line-through">
                        Cash on Delivery (COD)
                      </div>
                      <div className="text-[10px] text-rose-600 font-semibold">
                        Permanently Disabled (Anti-Fraud Policy)
                      </div>
                    </div>
                  </div>
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>

              {/* Order Breakdown Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Cart Items ({cart.length}):</span>
                  <span className="font-bold text-slate-900">{formatPrice(cartTotalUSD)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Express International Courier:</span>
                  <span className="font-bold text-emerald-600">FREE</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>eShop SafeEscrow Guarantee:</span>
                  <span className="font-bold text-blue-600">Protected</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between font-extrabold text-slate-900 text-sm">
                  <span>Total Due:</span>
                  <span className="text-base text-blue-900">{formatPrice(cartTotalUSD)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3 px-4 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-600/30"
              >
                {isProcessing ? (
                  <span>Securing Payment in SafeEscrow...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-emerald-300" />
                    <span>Pay {formatPrice(cartTotalUSD)} (SafeEscrow)</span>
                  </>
                )}
              </button>

              <div className="text-center text-[10px] text-slate-400">
                Your payment is encrypted with AES-256 and backed by 24/7 Support.
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
