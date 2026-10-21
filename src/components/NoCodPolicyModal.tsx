/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  X,
  AlertTriangle,
  ShieldCheck,
  Ban,
  Lock,
  CreditCard,
  CheckCircle2,
  AlertOctagon,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NoCodPolicyModal: React.FC = () => {
  const { isNoCodPolicyOpen, setIsNoCodPolicyOpen, setIsTrustSafetyOpen, setIsSupportOpen } = useApp();

  if (!isNoCodPolicyOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white rounded-t-2xl relative">
          <button
            onClick={() => setIsNoCodPolicyOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="bg-black/30 text-amber-200 text-xs font-bold uppercase px-2.5 py-0.5 rounded-full border border-amber-300/40">
              Platform Mandate #104
            </span>
            <span className="text-xs text-white/80">Global Trust & Safety</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black flex items-center gap-2">
            <Ban className="w-6 h-6 text-white" />
            Strictly NO Cash on Delivery (COD) Policy
          </h2>
          <p className="text-xs sm:text-sm text-white/90 mt-1">
            Why eShop permanently disables COD in favor of 100% Protected SafeEscrow.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Summary Box */}
          <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              Official Declaration: Zero Cash Transactions Permitted
            </div>
            <p className="text-xs text-amber-950/90 leading-relaxed">
              To guarantee that <span className="font-semibold">neither buyers nor sellers are ever disappointed or defrauded</span>, eShop mandates all international transactions go through our verified digital SafeEscrow payment network. Cash on Delivery (COD) is permanently prohibited across all 150+ supported countries.
            </p>
          </div>

          {/* Key Reasons Grid */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Core Pillars Behind the Anti-COD Mandate
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="border border-slate-200 rounded-xl p-3.5 space-y-1.5 bg-slate-50/50">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Buyer Protection Guarantee
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  With COD, buyers pay couriers before opening boxes and cannot recover funds if items are damaged or counterfeit. With SafeEscrow, your payment is locked in trust until you open and inspect your parcel.
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl p-3.5 space-y-1.5 bg-slate-50/50">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                  <Lock className="w-4 h-4 text-blue-600" />
                  Seller Payout Security
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Sellers are protected against fake orders, buyer refuse-at-doorstep scams, and high return shipping losses. Escrow guarantees funds are reserved prior to international dispatch.
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl p-3.5 space-y-1.5 bg-slate-50/50">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                  <AlertOctagon className="w-4 h-4 text-rose-600" />
                  Fraud & Courier Theft Prevention
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Cash payments leave zero digital trail and are susceptible to courier theft and unrecorded collections. Digital escrow creates immutable proof of payment for customs and law enforcement.
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl p-3.5 space-y-1.5 bg-slate-50/50">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                  <CreditCard className="w-4 h-4 text-purple-600" />
                  Global Multi-Currency Access
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Cross-border transactions in 150+ countries require real-time currency conversion (USD, EUR, GBP, JPY, etc.), which physical cash delivery cannot accommodate.
                </p>
              </div>
            </div>
          </div>

          {/* Strict Penalty for Violators */}
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 font-bold text-rose-900 text-xs">
              <Ban className="w-4 h-4 text-rose-600" />
              Strict Warning: Off-Platform COD Solicitation
            </div>
            <p className="text-[11px] text-rose-950/90 leading-relaxed">
              If any seller messages you asking to settle orders via cash, WhatsApp, or outside the eShop platform, report them to 24/7 Customer Support immediately. Soliciting COD is a <span className="font-bold underline">Strike 3 immediate permanent ban offense</span>, resulting in total store closure and frozen escrow balances.
            </p>
          </div>

          {/* Allowed Buyer Payment Methods */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-700">Supported Buyer Payment Methods:</h4>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 bg-slate-100 rounded-md font-medium text-slate-700">Visa / Mastercard / Amex</span>
              <span className="px-2.5 py-1 bg-slate-100 rounded-md font-medium text-slate-700">PayPal International</span>
              <span className="px-2.5 py-1 bg-slate-100 rounded-md font-medium text-slate-700">Apple Pay & Google Pay</span>
              <span className="px-2.5 py-1 bg-slate-100 rounded-md font-medium text-slate-700">Klarna & Afterpay</span>
              <span className="px-2.5 py-1 bg-slate-100 rounded-md font-medium text-slate-700">Global Bank Wire</span>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200">
            <button
              onClick={() => {
                setIsNoCodPolicyOpen(false);
                setIsSupportOpen(true);
              }}
              className="text-xs text-blue-600 font-bold hover:underline cursor-pointer"
            >
              Report a COD Request to 24/7 Support
            </button>

            <button
              onClick={() => setIsNoCodPolicyOpen(false)}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2 px-5 rounded-xl transition cursor-pointer"
            >
              I Understand & Agree
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
