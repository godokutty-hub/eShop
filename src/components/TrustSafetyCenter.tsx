/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  ShieldAlert,
  AlertTriangle,
  Ban,
  CheckCircle2,
  Lock,
  Camera,
  Users,
  FileText,
  AlertOctagon,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Scale
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TrustSafetyCenter: React.FC = () => {
  const {
    isTrustSafetyOpen,
    setIsTrustSafetyOpen,
    merchant,
    activeDemoBannedSeller,
    issueSellerWarning,
    executePermanentBan,
    liftBanOrAppeal,
    formatPrice,
    setIsSupportOpen
  } = useApp();

  const [activeTab, setActiveTab] = useState<'protocol' | 'merchants' | 'violations'>('merchants');
  const [selectedViolationReason, setSelectedViolationReason] = useState(
    'Uploaded scraped stock photo with Google watermark violating 100% original photo requirement'
  );
  const [actionSuccessNote, setActionSuccessNote] = useState('');

  if (!isTrustSafetyOpen) return null;

  const handleTestStrike1 = () => {
    issueSellerWarning(
      merchant.id,
      merchant.activeSubAccountId,
      'Non-Original Scraped Photo Detected',
      'Forensic EXIF check identified stock photo scraped from web catalog instead of genuine seller camera photo.',
      'low'
    );
    setActionSuccessNote(`Issued Strike 1 Formal Notice to Merchant ${merchant.fullName}. 48-hour resolution timer started.`);
    setTimeout(() => setActionSuccessNote(''), 4000);
  };

  const handleTestStrike2 = () => {
    issueSellerWarning(
      merchant.id,
      merchant.activeSubAccountId,
      'Second Violation: Persistent Listing Discrepancy',
      'Seller failed to replace scraped image within 48h deadline. New listings frozen.',
      'medium'
    );
    setActionSuccessNote(`Issued Strike 2 Severe Warning to Merchant ${merchant.fullName}. Storefront restricted!`);
    setTimeout(() => setActionSuccessNote(''), 4000);
  };

  const handleTestStrike3Ban = () => {
    executePermanentBan(
      merchant.id,
      'Strike 3 / Severe Policy Breach: Merchant attempted off-platform COD solicitation and persisted in listing non-original scraped inventory.'
    );
    setActionSuccessNote(`EXECUTED PERMANENT BAN on Merchant ${merchant.fullName}. All 5 store identities terminated and escrow frozen!`);
    setTimeout(() => setActionSuccessNote(''), 5000);
  };

  const handleLiftBan = () => {
    liftBanOrAppeal(merchant.id, true, 'Appeal approved by 24/7 Arbitrator after verified factory inspection.');
    setActionSuccessNote(`Ban lifted for Merchant ${merchant.fullName}. Reinstated under provisional probation.`);
    setTimeout(() => setActionSuccessNote(''), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-rose-950 text-white rounded-t-2xl relative">
          <button
            onClick={() => setIsTrustSafetyOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="bg-rose-500/30 text-rose-300 text-xs font-bold uppercase px-2.5 py-0.5 rounded-full border border-rose-400/40">
              eShop Platform Compliance Engine
            </span>
            <span className="text-xs text-slate-300">Automated Moderation & Ban Enforcement</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black flex items-center gap-2">
            <Scale className="w-6 h-6 text-rose-400" />
            Seller Warning & Permanent Ban Enforcement System
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            How eShop protects buyers and sellers from disappointment: Progressive Strike Law, Escrow Freezes & Instant Blacklisting.
          </p>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('merchants')}
              className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                activeTab === 'merchants' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Live Merchant Compliance & Testing
            </button>
            <button
              onClick={() => setActiveTab('protocol')}
              className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                activeTab === 'protocol' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              The 3-Strike Warning Architecture
            </button>
            <button
              onClick={() => setActiveTab('violations')}
              className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                activeTab === 'violations' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Demo Banned Merchant Case Study
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {actionSuccessNote && (
            <div className="bg-slate-900 text-emerald-300 border border-emerald-500/40 rounded-xl p-3.5 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{actionSuccessNote}</span>
            </div>
          )}

          {/* TAB 1: Live Merchant Compliance & Action Panel */}
          {activeTab === 'merchants' && (
            <div className="space-y-6">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Active Merchant Profile: {merchant.fullName}
                    </h3>
                    <div className="text-xs text-slate-500">
                      Storefronts: {merchant.subAccounts.length} / 5 | Current Strikes: {merchant.subAccounts[0]?.strikes || 0} / 3
                    </div>
                  </div>

                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    merchant.globalBanStatus.isBanned
                      ? 'bg-rose-100 text-rose-800 border border-rose-300'
                      : merchant.subAccounts[0]?.strikes === 2
                      ? 'bg-orange-100 text-orange-800'
                      : merchant.subAccounts[0]?.strikes === 1
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}>
                    {merchant.globalBanStatus.isBanned
                      ? '🔴 BANNED (Escrow Frozen)'
                      : merchant.subAccounts[0]?.strikes === 2
                      ? '🟠 Restricted (2 Strikes)'
                      : merchant.subAccounts[0]?.strikes === 1
                      ? '🟡 Warning Notice (1 Strike)'
                      : '🟢 Good Standing (0 Strikes)'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <span className="text-slate-400 text-[10px] block">18+ Identity Status</span>
                    <span className="font-bold text-slate-800">Verified ({merchant.idType.toUpperCase()})</span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <span className="text-slate-400 text-[10px] block">Escrow Balances</span>
                    <span className="font-bold text-slate-800">
                      {formatPrice(merchant.subAccounts.reduce((a, b) => a + b.balanceAvailableUSD + b.balancePendingUSD, 0))}
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <span className="text-slate-400 text-[10px] block">Ban Status</span>
                    <span className={`font-bold ${merchant.globalBanStatus.isBanned ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {merchant.globalBanStatus.isBanned ? 'Permanently Terminated' : 'Active Merchant'}
                    </span>
                  </div>
                </div>

                {/* Interactive Moderation Simulator Tools */}
                <div className="pt-3 border-t border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-700 block">
                    Test the Platform's Warning & Ban Escalation:
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={handleTestStrike1}
                      disabled={merchant.globalBanStatus.isBanned}
                      className="px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 rounded-lg text-xs font-bold transition cursor-pointer"
                    >
                      Issue Strike 1 (Warning Notice)
                    </button>

                    <button
                      onClick={handleTestStrike2}
                      disabled={merchant.globalBanStatus.isBanned}
                      className="px-3 py-2 bg-orange-50 hover:bg-orange-100 text-orange-800 border border-orange-300 rounded-lg text-xs font-bold transition cursor-pointer"
                    >
                      Issue Strike 2 (Listing Restriction)
                    </button>

                    <button
                      onClick={handleTestStrike3Ban}
                      className="px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition cursor-pointer shadow-xs"
                    >
                      Trigger Strike 3 (PERMANENT BAN)
                    </button>

                    {merchant.globalBanStatus.isBanned && (
                      <button
                        onClick={handleLiftBan}
                        className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition cursor-pointer shadow-xs flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Lift Ban & Reinstate Merchant
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Warning Log for Current Merchant */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Active Notice & Strike History for Merchant #{merchant.id}
                </h4>

                {merchant.subAccounts[0]?.warnings.length === 0 ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>No active strikes or warnings. Merchant maintains a 100% clean compliance score.</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {merchant.subAccounts[0]?.warnings.map(w => (
                      <div key={w.id} className="border border-slate-200 rounded-xl p-3 bg-white space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className={`font-bold ${w.strikeNumber === 3 ? 'text-rose-600' : 'text-amber-600'}`}>
                            Strike #{w.strikeNumber}: {w.reason}
                          </span>
                          <span className="text-slate-400 text-[10px]">{w.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-slate-600">{w.details}</p>
                        <div className="text-[10px] text-slate-500 font-mono bg-slate-50 p-1.5 rounded">
                          Action: {w.actionTaken}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: The 3-Strike Warning Architecture */}
          {activeTab === 'protocol' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-600 leading-relaxed">
                eShop implements a progressive, transparent strike law. Sellers who violate warnings or breach fundamental trust (such as using fake scraped stock photos or attempting offline COD) are banned systematically:
              </div>

              <div className="space-y-3">
                {/* Level 1 */}
                <div className="border border-amber-200 bg-amber-50/50 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-900">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      Strike 1: Formal Warning Notice (48-Hour Grace)
                    </span>
                    <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
                      Cure Period Active
                    </span>
                  </div>
                  <p className="text-xs text-amber-950/90 leading-relaxed">
                    Triggered when the AI Originality Inspector detects scraped catalog images, or a buyer files a first unfulfilled order inquiry. The seller is notified in their Seller Hub and granted 48 hours to replace listing photos with verified camera pictures.
                  </p>
                </div>

                {/* Level 2 */}
                <div className="border border-orange-300 bg-orange-50/50 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-orange-950">
                      <AlertOctagon className="w-4 h-4 text-orange-600" />
                      Strike 2: Severe Listing Restriction (7-Day Freeze)
                    </span>
                    <span className="text-[10px] font-bold bg-orange-200 text-orange-900 px-2 py-0.5 rounded">
                      Restricted Mode
                    </span>
                  </div>
                  <p className="text-xs text-orange-950/90 leading-relaxed">
                    Triggered if a seller ignores Strike 1 warnings or commits a second listing discrepancy. All new item creation is immediately locked across their storefronts. Payout withdrawals are frozen in SafeEscrow until buyer satisfaction is confirmed.
                  </p>
                </div>

                {/* Level 3 */}
                <div className="border-2 border-rose-400 bg-rose-50/60 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-rose-950">
                      <Ban className="w-4 h-4 text-rose-600" />
                      Strike 3: PERMANENT BAN & GLOBAL BLACKLIST
                    </span>
                    <span className="text-[10px] font-bold bg-rose-600 text-white px-2 py-0.5 rounded">
                      Instant Termination
                    </span>
                  </div>
                  <p className="text-xs text-rose-950 leading-relaxed">
                    Triggered upon 3rd violation OR immediate zero-tolerance offenses (attempting off-platform Cash on Delivery [COD], shipping counterfeit/hazardous items, or abusing buyers).
                  </p>
                  <ul className="text-[11px] text-rose-900 space-y-1 pl-4 list-disc font-medium">
                    <li>Immediate shutdown of all 5 seller storefront identity slots.</li>
                    <li>SafeEscrow balances frozen for 180 days to reimburse affected buyers.</li>
                    <li>Seller Gov ID, Residential Address, and Bank IBAN/Payoneer permanently blacklisted.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Demo Banned Merchant Case Study */}
          {activeTab === 'violations' && (
            <div className="space-y-4">
              <div className="bg-slate-900 text-white rounded-xl p-4 space-y-2 border border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Ban className="w-5 h-5 text-rose-500" />
                    <span className="text-sm font-bold text-rose-300">
                      Case File: Merchant Viktor Kolarov (#{activeDemoBannedSeller.id})
                    </span>
                  </div>
                  <span className="bg-rose-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase">
                    Status: Permanently Banned
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeDemoBannedSeller.globalBanStatus.banReason}
                </p>
              </div>

              {/* Warnings Breakdown */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Violation Escalation Timeline
                </h4>
                {activeDemoBannedSeller.subAccounts[0]?.warnings.map(w => (
                  <div key={w.id} className="border border-rose-200 bg-rose-50/40 rounded-xl p-3 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-rose-900">
                      <span>Strike #{w.strikeNumber}: {w.reason}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{w.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-slate-700">{w.details}</p>
                    <div className="text-[10px] text-rose-800 font-mono bg-rose-100/70 p-1.5 rounded">
                      Enforcement: {w.actionTaken}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800">Escrow Balance Status:</span>
                  <p className="text-[11px] text-slate-500">$2,410.00 locked in legal escrow hold for 180-day buyer chargeback security.</p>
                </div>
                <Lock className="w-5 h-5 text-slate-500" />
              </div>
            </div>
          )}

          {/* Footer Close */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={() => {
                setIsTrustSafetyOpen(false);
                setIsSupportOpen(true);
              }}
              className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
            >
              Report a Seller Violation to 24/7 Support Desk
            </button>

            <button
              onClick={() => setIsTrustSafetyOpen(false)}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2 px-5 rounded-xl cursor-pointer"
            >
              Close Compliance Center
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
