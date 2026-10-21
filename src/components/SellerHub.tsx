/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Store,
  ShieldCheck,
  AlertTriangle,
  Plus,
  DollarSign,
  Package,
  CheckCircle2,
  Lock,
  ArrowUpRight,
  Camera,
  AlertOctagon,
  CreditCard,
  Building,
  UserCheck,
  Ban,
  Clock,
  Sparkles,
  HelpCircle,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SellerHub: React.FC = () => {
  const {
    merchant,
    activeStore,
    switchActiveStore,
    createNewStorefront,
    requestSellerPayout,
    updateSellerPayoutMethod,
    formatPrice,
    products,
    setIsAddProductOpen,
    setIsTrustSafetyOpen,
    setIsSupportOpen,
    submitSellerAppeal,
    setIsNoCodPolicyOpen
  } = useApp();

  const [isCreatingNewStore, setIsCreatingNewStore] = useState(false);
  const [newStoreName, setNewStoreName] = useState('');
  const [newStoreCat, setNewStoreCat] = useState('Fashion & Apparel');
  const [newStoreDesc, setNewStoreDesc] = useState('');

  const [payoutMessage, setPayoutMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [appealText, setAppealText] = useState('');
  const [isAppealSubmitted, setIsAppealSubmitted] = useState(false);

  // Filter listings belonging to this seller/store
  const sellerProducts = products.filter(p => p.sellerStoreId === activeStore.id || p.sellerId === merchant.id);

  const handleCreateStore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStoreName) return;
    const res = createNewStorefront(newStoreName, newStoreCat, newStoreDesc);
    if (res.success) {
      setIsCreatingNewStore(false);
      setNewStoreName('');
      setNewStoreDesc('');
    } else {
      alert(res.error);
    }
  };

  const handlePayout = () => {
    const res = requestSellerPayout(activeStore.id);
    if (res.success) {
      setPayoutMessage({ type: 'success', text: res.message });
    } else {
      setPayoutMessage({ type: 'error', text: res.message });
    }
    setTimeout(() => setPayoutMessage(null), 5000);
  };

  const handleSendAppeal = () => {
    if (!appealText) return;
    submitSellerAppeal(merchant.id, appealText);
    setIsAppealSubmitted(true);
    setAppealText('');
  };

  // Check if merchant is globally banned
  const isGloballyBanned = merchant.globalBanStatus.isBanned;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* 1. Global Ban Notice Banner (If Banned) */}
      {isGloballyBanned && (
        <div className="bg-rose-950 border-2 border-rose-600 rounded-2xl p-6 text-white shadow-xl space-y-4 animate-in fade-in">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0">
                <Ban className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-rose-500 text-white text-xs font-black uppercase px-2.5 py-0.5 rounded">
                    Strike 3: Account Terminated
                  </span>
                  <span className="text-xs text-rose-300">eShop Global Trust & Safety Enforcement</span>
                </div>
                <h2 className="text-xl font-black text-rose-100">
                  Seller Profile Banned: All 5 Storefronts Frozen
                </h2>
                <p className="text-xs text-rose-200 max-w-3xl leading-relaxed">
                  {merchant.globalBanStatus.banReason || 'Your merchant profile violated eShop terms regarding original photo authenticity and anti-COD regulations.'}
                </p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="inline-block bg-rose-900/80 border border-rose-700 text-rose-200 text-xs font-bold px-3 py-1 rounded-lg">
                Escrow Balance Frozen: {formatPrice(activeStore.balancePendingUSD + activeStore.balanceAvailableUSD)}
              </span>
            </div>
          </div>

          <div className="bg-rose-900/40 border border-rose-800 rounded-xl p-4 text-xs text-rose-200 space-y-2">
            <div className="font-bold flex items-center gap-1.5 text-white">
              <Lock className="w-4 h-4 text-rose-400" />
              Escrow Protection Protocol Active
            </div>
            <p className="text-[11px] leading-relaxed">
              In accordance with eShop SafeEscrow policies, unfulfilled buyer orders are being refunded. Remaining balances are held for 180 days to cover potential chargebacks. Your Government ID and registered payout accounts have been blacklisted.
            </p>

            {merchant.globalBanStatus.appealStatus === 'pending' ? (
              <div className="bg-amber-950/70 border border-amber-600 p-2.5 rounded-lg text-amber-200 font-semibold flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                Appeal Pending: 24/7 Arbitrator is currently reviewing your submission.
              </div>
            ) : isAppealSubmitted ? (
              <div className="bg-emerald-950/70 border border-emerald-600 p-2.5 rounded-lg text-emerald-200 font-semibold">
                ✓ Appeal received by 24/7 Resolution Center. Decision expected within 2 hours.
              </div>
            ) : (
              <div className="pt-2 flex items-center gap-2">
                <input
                  type="text"
                  value={appealText}
                  onChange={e => setAppealText(e.target.value)}
                  placeholder="Explain corrective measures taken (e.g. proof of original factory photos)..."
                  className="flex-1 px-3 py-2 text-xs bg-slate-900 border border-rose-700 rounded-lg text-white placeholder:text-rose-400"
                />
                <button
                  onClick={handleSendAppeal}
                  className="bg-white hover:bg-rose-100 text-rose-900 font-bold px-4 py-2 rounded-lg text-xs cursor-pointer"
                >
                  Submit Appeal to 24/7 Board
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. Merchant Profile Bar (18+ Verified & 5-Store Switcher) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-700 text-white font-extrabold flex items-center justify-center text-lg shadow-md">
              <Store className="w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold text-slate-900">{merchant.fullName}</h1>
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 font-bold text-[11px] px-2 py-0.5 rounded-full border border-emerald-200">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                  18+ Verified Merchant ({merchant.calculatedAge} y/o)
                </span>
                <span className="text-xs text-slate-400 font-mono">ID: {merchant.id}</span>
              </div>
              <div className="text-xs text-slate-500">
                Operating up to <span className="font-semibold text-slate-700">5 Self-Details Storefronts</span> on eShop International Platform
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsTrustSafetyOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Platform Rules & Ban System</span>
            </button>

            <button
              onClick={() => setIsSupportOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition cursor-pointer shadow-xs"
            >
              <HelpCircle className="w-4 h-4" />
              <span>24/7 Seller Support</span>
            </button>
          </div>
        </div>

        {/* Store Identity Tabs */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Your Store Identity Slots ({merchant.subAccounts.length} / 1 Active)
            </span>

            {merchant.subAccounts.length < 5 && !isGloballyBanned && (
              <button
                onClick={() => setIsCreatingNewStore(true)}
                className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Storefront #{merchant.subAccounts.length + 1}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {merchant.subAccounts.map((store, idx) => (
              <button
                key={store.id}
                onClick={() => switchActiveStore(store.id)}
                className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                  activeStore.id === store.id
                    ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-blue-700 uppercase">
                      Store #{store.storeNumber}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      store.status === 'banned'
                        ? 'bg-rose-100 text-rose-800'
                        : store.status === 'restricted'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {store.status === 'banned' ? 'Banned' : store.status === 'restricted' ? 'Restricted' : 'Active'}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 mt-1 truncate">
                    {store.storeName}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">{store.category}</div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Orders: {store.totalOrders}</span>
                  <span className="font-bold text-slate-700">{formatPrice(store.totalSalesUSD)}</span>
                </div>
              </button>
            ))}

            {/* Empty Slots */}
            {Array.from({ length: 5 - merchant.subAccounts.length }).map((_, i) => (
              <button
                key={`empty-${i}`}
                onClick={() => setIsCreatingNewStore(true)}
                disabled={isGloballyBanned}
                className="p-3 rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-300 hover:bg-blue-50/20 text-slate-400 hover:text-blue-600 transition flex flex-col items-center justify-center gap-1 cursor-pointer min-h-[90px]"
              >
                <Plus className="w-5 h-5" />
                <span className="text-[11px] font-semibold">Slot #{merchant.subAccounts.length + i + 1} Open</span>
              </button>
            ))}
          </div>
        </div>

        {/* New Storefront Creation Drawer */}
        {isCreatingNewStore && (
          <form onSubmit={handleCreateStore} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">
                Setup Additional Storefront (#{merchant.subAccounts.length + 1} of 5)
              </span>
              <button
                type="button"
                onClick={() => setIsCreatingNewStore(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                required
                placeholder="Store Name (e.g. Apex Outdoor Gear)"
                value={newStoreName}
                onChange={e => setNewStoreName(e.target.value)}
                className="px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
              />
              <select
                value={newStoreCat}
                onChange={e => setNewStoreCat(e.target.value)}
                className="px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
              >
                <option value="Electronics">Electronics</option>
                <option value="Fashion & Apparel">Fashion & Apparel</option>
                <option value="Home & Living">Home & Living</option>
                <option value="Automotive & Tools">Automotive & Tools</option>
                <option value="Collectibles">Collectibles</option>
              </select>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-lg cursor-pointer"
              >
                Deploy Storefront
              </button>
            </div>
          </form>
        )}
      </div>

      {/* 3. Strike Status & SafeEscrow Balances */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Strike Meter Card */}
        <div className="md:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Compliance & Strike Status
              </span>
              <button
                onClick={() => setIsTrustSafetyOpen(true)}
                className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer"
              >
                View Strike Rules
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl shadow-xs ${
                activeStore.strikes === 0
                  ? 'bg-emerald-100 text-emerald-700'
                  : activeStore.strikes === 1
                  ? 'bg-amber-100 text-amber-700'
                  : activeStore.strikes === 2
                  ? 'bg-orange-100 text-orange-700'
                  : 'bg-rose-100 text-rose-700'
              }`}>
                {activeStore.strikes}/3
              </div>

              <div>
                <div className="text-sm font-extrabold text-slate-900">
                  {activeStore.strikes === 0
                    ? '100% Good Standing (Zero Strikes)'
                    : activeStore.strikes === 1
                    ? 'Strike 1: First Warning Notice'
                    : activeStore.strikes === 2
                    ? 'Strike 2: Restricted Account (Listing Blocked)'
                    : 'Strike 3: Permanent Ban Active'}
                </div>
                <div className="text-[11px] text-slate-500">
                  {activeStore.strikes === 0
                    ? 'All original photo verifications passed. Free to list and withdraw.'
                    : activeStore.strikes === 1
                    ? 'Notice issued. Resolve non-original photo or dispute within 48h.'
                    : activeStore.strikes === 2
                    ? 'New listings frozen. Escrow held until pending dispute review.'
                    : 'Account blacklisted. Payouts locked under anti-fraud protocol.'}
                </div>
              </div>
            </div>
          </div>

          {/* Strike Indicators */}
          <div className="space-y-1.5">
            <div className="grid grid-cols-3 gap-2">
              <div className={`p-2 rounded-lg text-center text-[10px] font-bold ${
                activeStore.strikes >= 1 ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-400'
              }`}>
                Strike 1: Warning
              </div>
              <div className={`p-2 rounded-lg text-center text-[10px] font-bold ${
                activeStore.strikes >= 2 ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-400'
              }`}>
                Strike 2: Freeze
              </div>
              <div className={`p-2 rounded-lg text-center text-[10px] font-bold ${
                activeStore.strikes >= 3 ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-400'
              }`}>
                Strike 3: Ban
              </div>
            </div>
            <p className="text-[10px] text-slate-400">
              *Strikes automatically trigger on: scraped stock photos, non-fulfillment, and soliciting off-platform Cash on Delivery (COD).
            </p>
          </div>
        </div>

        {/* SafeEscrow Balances & Payout Card */}
        <div className="md:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Seller Payment & Escrow Hub
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                SafeEscrow Balance for {activeStore.storeName}
              </h3>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <Lock className="w-3 h-3 text-emerald-600" />
                Escrow Protected
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1">
              <div className="text-xs text-slate-500 font-medium">Available for Withdrawal</div>
              <div className="text-xl font-extrabold text-slate-900">
                {formatPrice(activeStore.balanceAvailableUSD)}
              </div>
              <div className="text-[10px] text-emerald-600 font-medium">
                Released from confirmed buyer deliveries
              </div>
            </div>

            <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-3.5 space-y-1">
              <div className="text-xs text-blue-900 font-medium">In SafeEscrow Transit</div>
              <div className="text-xl font-extrabold text-blue-950">
                {formatPrice(activeStore.balancePendingUSD)}
              </div>
              <div className="text-[10px] text-blue-700 font-medium">
                Releases 72h post-delivery or buyer confirmation
              </div>
            </div>
          </div>

          {/* Payout Action & Registered Payout Method */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Building className="w-4 h-4 text-slate-500" />
              <span>
                Method:{' '}
                <strong className="text-slate-800">
                  {activeStore.payoutMethod?.name || 'Payoneer / PayPal (USD / EUR)'}
                </strong>
              </span>
            </div>

            <button
              onClick={handlePayout}
              disabled={activeStore.balanceAvailableUSD <= 0 || isGloballyBanned || activeStore.strikes >= 3}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeStore.balanceAvailableUSD <= 0 || isGloballyBanned || activeStore.strikes >= 3
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
              }`}
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>Withdraw Available Funds</span>
            </button>
          </div>

          {payoutMessage && (
            <div className={`p-2.5 rounded-lg text-xs font-semibold ${
              payoutMessage.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}>
              {payoutMessage.text}
            </div>
          )}
        </div>
      </div>

      {/* 4. Active Inventory Table & "Add Listing with Original Photo" */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">
              Inventory & Original Photo Listings ({activeStore.storeName})
            </h2>
            <p className="text-xs text-slate-500">
              Every item has passed automated original photo inspection.
            </p>
          </div>

          <button
            onClick={() => setIsAddProductOpen(true)}
            disabled={isGloballyBanned || activeStore.strikes >= 2}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer shadow-xs ${
              isGloballyBanned || activeStore.strikes >= 2
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
            }`}
          >
            <Camera className="w-4 h-4 text-emerald-400" />
            <span>+ List Item (Original Photos Only)</span>
          </button>
        </div>

        {/* Listings Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3">Item</th>
                <th className="py-2.5 px-3">Photo Authenticity</th>
                <th className="py-2.5 px-3">Price</th>
                <th className="py-2.5 px-3">Stock</th>
                <th className="py-2.5 px-3">Sold</th>
                <th className="py-2.5 px-3">Rating</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sellerProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No items in this storefront yet. Click "+ List Item" to add original photography.
                  </td>
                </tr>
              ) : (
                sellerProducts.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-3 flex items-center gap-3">
                      <img src={p.images[0]} alt={p.title} className="w-10 h-10 rounded-lg object-cover border border-slate-200" />
                      <div>
                        <div className="font-bold text-slate-900 max-w-xs truncate">{p.title}</div>
                        <div className="text-[10px] text-slate-400">{p.category}</div>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 font-bold text-[10px] px-2 py-0.5 rounded border border-emerald-200">
                        <Camera className="w-3 h-3 text-emerald-600" />
                        Original ({p.photoVerification.authenticityScore}%)
                      </span>
                    </td>

                    <td className="py-3 px-3 font-bold text-slate-900">
                      {formatPrice(p.priceUSD)}
                    </td>

                    <td className="py-3 px-3 text-slate-700 font-medium">
                      {p.stock} units
                    </td>

                    <td className="py-3 px-3 text-slate-700 font-medium">
                      {p.soldCount}
                    </td>

                    <td className="py-3 px-3 font-bold text-amber-600">
                      ★ {p.rating}
                    </td>

                    <td className="py-3 px-3">
                      <span className="inline-block bg-blue-50 text-blue-700 font-bold text-[10px] px-2 py-0.5 rounded border border-blue-200">
                        Live on eShop
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
