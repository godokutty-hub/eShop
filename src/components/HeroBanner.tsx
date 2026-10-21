/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Camera,
  AlertTriangle,
  Headphones,
  Store,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  Lock,
  Globe2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HeroBanner: React.FC = () => {
  const {
    setIsNoCodPolicyOpen,
    setIsSupportOpen,
    setIsSellerOnboardingOpen,
    setIsTrustSafetyOpen,
    setUserRole,
    country
  } = useApp();

  const [activeSlide, setActiveSlide] = useState(0);

  // Countdown timer simulation for Flash Deals
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const slides = [
    {
      badge: 'eShop SafeEscrow Guarantee',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
      title: 'SafeEscrow Protection: Strictly NO COD Fraud',
      subtitle: 'All payments are held securely in escrow until international delivery is confirmed. Cash on Delivery (COD) is permanently prohibited to protect buyers & sellers.',
      ctaText: 'Why NO COD Policy?',
      ctaAction: () => setIsNoCodPolicyOpen(true),
      secondaryText: '24/7 Live Support',
      secondaryAction: () => setIsSupportOpen(true),
      bgColor: 'from-slate-950 via-indigo-950 to-blue-950',
      image: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80',
      featureIcon: Lock
    },
    {
      badge: '18+ Verified Merchant Platform',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-400/40',
      title: 'Open Your Self-Details 5 Seller Account (18+ Only)',
      subtitle: 'Manage up to 5 individual international storefronts under one verified adult identity with direct global payouts via Bank Wire, Payoneer, or PayPal.',
      ctaText: 'Open 5-Store Account',
      ctaAction: () => {
        setUserRole('seller');
        setIsSellerOnboardingOpen(true);
      },
      secondaryText: 'View Ban & Warning System',
      secondaryAction: () => setIsTrustSafetyOpen(true),
      bgColor: 'from-blue-950 via-slate-900 to-indigo-950',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      featureIcon: Store
    },
    {
      badge: 'Zero Scraped Photos Mandate',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
      title: 'Original Pictures Mandatory for All Items',
      subtitle: 'Sellers must upload original photographs taken with authenticated camera metadata. Scraped web stock photos trigger automated strike warnings and bans.',
      ctaText: 'View Verification Rules',
      ctaAction: () => setIsTrustSafetyOpen(true),
      secondaryText: 'Need 24/7 Help?',
      secondaryAction: () => setIsSupportOpen(true),
      bgColor: 'from-slate-900 via-amber-950/40 to-slate-950',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
      featureIcon: Camera
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 pt-4 pb-6 space-y-4">
      {/* 1. Main Visual Carousel Banner */}
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${slides[activeSlide].bgColor} text-white shadow-xl min-h-[300px] sm:min-h-[340px] flex items-center transition-all duration-500 border border-slate-800`}>
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 w-full items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${slides[activeSlide].badgeColor}`}>
                <Sparkles className="w-3.5 h-3.5" />
                {slides[activeSlide].badge}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Globe2 className="w-3.5 h-3.5 text-blue-400" />
                Shipping to {country.name}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white">
              {slides[activeSlide].title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl font-normal leading-relaxed">
              {slides[activeSlide].subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={slides[activeSlide].ctaAction}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-3 rounded-xl text-sm transition shadow-lg shadow-blue-600/30 cursor-pointer"
              >
                <span>{slides[activeSlide].ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={slides[activeSlide].secondaryAction}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-3 rounded-xl text-sm transition backdrop-blur-xs cursor-pointer border border-white/10"
              >
                <span>{slides[activeSlide].secondaryText}</span>
              </button>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl group">
              <img
                src={slides[activeSlide].image}
                alt="Banner Feature"
                className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Inspected & Verified Original Item Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                activeSlide === idx ? 'w-8 bg-blue-500' : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
              title={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* 2. AliExpress / eBay Style SuperDeals & 5 Core Guarantees Bar */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div
          onClick={() => setIsNoCodPolicyOpen(true)}
          className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs hover:shadow-sm hover:border-amber-300 transition cursor-pointer group"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 leading-tight">Strictly NO COD</div>
              <div className="text-[11px] text-slate-500">SafeEscrow Only</div>
            </div>
          </div>
        </div>

        <div
          onClick={() => setIsTrustSafetyOpen(true)}
          className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs hover:shadow-sm hover:border-emerald-300 transition cursor-pointer group"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 leading-tight">Original Photos</div>
              <div className="text-[11px] text-slate-500">Zero Stock Scrapes</div>
            </div>
          </div>
        </div>

        <div
          onClick={() => {
            setUserRole('seller');
            setIsSellerOnboardingOpen(true);
          }}
          className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs hover:shadow-sm hover:border-blue-300 transition cursor-pointer group"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition">
              <Store className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 leading-tight">18+ Seller Hub</div>
              <div className="text-[11px] text-slate-500">Up to 5 Storefronts</div>
            </div>
          </div>
        </div>

        <div
          onClick={() => setIsTrustSafetyOpen(true)}
          className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs hover:shadow-sm hover:border-rose-300 transition cursor-pointer group"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-110 transition">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 leading-tight">3-Strike Ban Law</div>
              <div className="text-[11px] text-slate-500">Fraudsters Frozen</div>
            </div>
          </div>
        </div>

        <div
          onClick={() => setIsSupportOpen(true)}
          className="col-span-2 md:col-span-1 p-3.5 bg-gradient-to-br from-blue-50 to-indigo-50/60 rounded-xl border border-blue-200 shadow-2xs hover:shadow-sm transition cursor-pointer group"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-blue-950 leading-tight flex items-center gap-1">
                24/7 Support
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <div className="text-[11px] text-blue-700">Zero Disappointment</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Flash Deals Ticker Bar (AliExpress & eBay style countdown) */}
      <div className="bg-gradient-to-r from-rose-500 via-amber-500 to-rose-600 rounded-xl p-3 text-white flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <span className="bg-white text-rose-600 text-xs font-extrabold uppercase px-2 py-0.5 rounded shadow-xs">
            Flash SuperDeals
          </span>
          <span className="text-xs font-bold hidden sm:inline">
            Direct Global Shipping to {country.flag} {country.name} with SafeEscrow Protection
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold">
          <span className="flex items-center gap-1 text-rose-100">
            <Clock className="w-3.5 h-3.5" />
            Deals Refresh In:
          </span>
          <div className="flex items-center gap-1 font-mono">
            <span className="bg-slate-950/80 px-2 py-0.5 rounded text-amber-300">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span>:</span>
            <span className="bg-slate-950/80 px-2 py-0.5 rounded text-amber-300">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span>:</span>
            <span className="bg-slate-950/80 px-2 py-0.5 rounded text-amber-300">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
