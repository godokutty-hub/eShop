/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  Package,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Truck,
  Lock,
  Headphones,
  AlertTriangle,
  RotateCcw,
  Camera,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const OrdersTrackerModal: React.FC = () => {
  const {
    isOrdersOpen,
    setIsOrdersOpen,
    orders,
    confirmOrderReceived,
    disputeOrder,
    formatPrice,
    setIsSupportOpen
  } = useApp();

  const [selectedOrderId, setSelectedOrderId] = useState<string>(orders[0]?.id || '');
  const [disputeReason, setDisputeReason] = useState('');
  const [isDisputeFormOpen, setIsDisputeFormOpen] = useState(false);

  if (!isOrdersOpen) return null;

  const currentOrder = orders.find(o => o.id === selectedOrderId) || orders[0];

  const handleConfirmReceived = (orderId: string) => {
    confirmOrderReceived(orderId);
  };

  const handleOpenDispute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!disputeReason.trim() || !currentOrder) return;
    disputeOrder(currentOrder.id, disputeReason.trim());
    setIsDisputeFormOpen(false);
    setDisputeReason('');
    setIsOrdersOpen(false);
    setIsSupportOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200 flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white rounded-t-2xl relative shrink-0">
          <button
            onClick={() => setIsOrdersOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="bg-emerald-500/30 text-emerald-300 text-xs font-bold uppercase px-2.5 py-0.5 rounded-full border border-emerald-400/40 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              eShop SafeEscrow Protection
            </span>
            <span className="text-xs text-slate-300">Live Global Parcel Radar</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black flex items-center gap-2">
            <Package className="w-6 h-6 text-blue-400" />
            Track Orders & SafeEscrow Milestones
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Funds remain safely locked in escrow until you confirm delivery and inspect original merchandise.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {orders.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Package className="w-12 h-12 text-slate-300 mx-auto" />
              <div className="text-sm font-bold text-slate-700">No Orders Placed Yet</div>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Place an order to experience our 100% SafeEscrow multi-country delivery tracking.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Left Column: Order Selector List */}
              <div className="md:col-span-4 space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Your Orders ({orders.length})
                </span>

                <div className="space-y-2">
                  {orders.map(ord => (
                    <button
                      key={ord.id}
                      onClick={() => {
                        setSelectedOrderId(ord.id);
                        setIsDisputeFormOpen(false);
                      }}
                      className={`w-full p-3 rounded-xl border text-left transition cursor-pointer space-y-1.5 ${
                        currentOrder?.id === ord.id
                          ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-slate-900">{ord.id}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase ${
                          ord.escrowStatus === 'released_to_seller'
                            ? 'bg-emerald-100 text-emerald-800'
                            : ord.escrowStatus === 'disputed'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {ord.escrowStatus === 'released_to_seller'
                            ? 'Released'
                            : ord.escrowStatus === 'disputed'
                            ? 'Disputed'
                            : 'In Escrow'}
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-500">
                        {ord.items.length} item(s) · {formatPrice(ord.totalUSD)}
                      </div>

                      <div className="text-[10px] text-slate-400 flex items-center justify-between">
                        <span>{ord.shippingAddress.country}</span>
                        <span>{ord.date.substring(0, 10)}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Tracking Radar & Escrow Action */}
              {currentOrder && (
                <div className="md:col-span-8 space-y-5">
                  {/* Order Overview Card */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
                      <div>
                        <div className="text-xs text-slate-400 font-mono">Tracking #{currentOrder.trackingNumber}</div>
                        <h3 className="text-sm font-bold text-slate-900">
                          Destination: {currentOrder.shippingAddress.addressLine1}, {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.country}
                        </h3>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-slate-900 block">
                          Total: {formatPrice(currentOrder.totalUSD)}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Escrow: {currentOrder.escrowStatus === 'released_to_seller' ? 'Payment Released' : 'Held Safe (No COD)'}
                        </span>
                      </div>
                    </div>

                    {/* Purchased Items Thumbnail Row */}
                    <div className="space-y-2">
                      {currentOrder.items.map(item => (
                        <div key={item.product.id} className="flex items-center gap-3 text-xs">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.title}
                            className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-slate-900 truncate">{item.product.title}</div>
                            <div className="text-[11px] text-slate-500">
                              Qty: {item.quantity} · {formatPrice(item.product.priceUSD)} each · Sold by: {item.product.sellerName}
                            </div>
                          </div>
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            <Camera className="w-3 h-3 text-emerald-600" />
                            Original Verified
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tracking Steps Timeline */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Live SafeEscrow & Delivery Progress
                    </h4>

                    <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                      {currentOrder.trackingSteps.map((step, idx) => (
                        <div key={idx} className="relative flex items-start gap-4 pl-8">
                          <div
                            className={`absolute left-1.5 top-1 -translate-x-1/2 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center ${
                              step.completed
                                ? 'border-emerald-500 bg-emerald-50 text-emerald-600'
                                : step.current
                                ? 'border-blue-600 bg-blue-50 text-blue-600 animate-pulse'
                                : 'border-slate-300'
                            }`}
                          >
                            {step.completed && <CheckCircle2 className="w-3 h-3 fill-emerald-500 text-white" />}
                          </div>

                          <div className="space-y-0.5 text-xs">
                            <div className="flex items-center gap-2">
                              <span className={`font-bold ${step.completed || step.current ? 'text-slate-900' : 'text-slate-400'}`}>
                                {step.title}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">{step.timestamp}</span>
                            </div>
                            <p className="text-[11px] text-slate-500">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Buyer Escrow Actions */}
                  <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                    {currentOrder.escrowStatus !== 'released_to_seller' ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleConfirmReceived(currentOrder.id)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-sm shadow-emerald-600/20"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Confirm Original Item Received & Release Escrow</span>
                        </button>

                        <button
                          onClick={() => setIsDisputeFormOpen(!isDisputeFormOpen)}
                          className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs py-2.5 px-3 rounded-xl transition cursor-pointer"
                        >
                          Issue Dispute / Freeze
                        </button>
                      </div>
                    ) : (
                      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>
                          Buyer confirmed delivery on {currentOrder.date.substring(0, 10)}. Payout successfully released to verified seller.
                        </span>
                      </div>
                    )}

                    <button
                      onClick={() => setIsSupportOpen(true)}
                      className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Headphones className="w-3.5 h-3.5" />
                      <span>24/7 Escrow Agent</span>
                    </button>
                  </div>

                  {/* Dispute Form */}
                  {isDisputeFormOpen && (
                    <form onSubmit={handleOpenDispute} className="bg-rose-50 border border-rose-300 rounded-xl p-4 space-y-3 animate-in fade-in">
                      <div className="flex items-center gap-2 text-rose-900 font-bold text-xs">
                        <AlertTriangle className="w-4 h-4 text-rose-600" />
                        <span>File Urgent SafeEscrow Dispute for Order #{currentOrder.id}</span>
                      </div>

                      <textarea
                        rows={2}
                        required
                        value={disputeReason}
                        onChange={e => setDisputeReason(e.target.value)}
                        placeholder="Explain reason (e.g. Item not received, broken packaging, non-original stock photo replica)..."
                        className="w-full px-3 py-2 text-xs border border-rose-300 rounded-lg bg-white focus:ring-2 focus:ring-rose-500 outline-hidden"
                      />

                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsDisputeFormOpen(false)}
                          className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-4 py-1.5 rounded-lg transition cursor-pointer"
                        >
                          Submit Dispute & Freeze Payout
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
