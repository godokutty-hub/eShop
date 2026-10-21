/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  Headphones,
  Send,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Ban,
  Clock,
  Phone,
  MessageSquare,
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CustomerSupportModal: React.FC = () => {
  const {
    isSupportOpen,
    setIsSupportOpen,
    tickets,
    activeTicket,
    setActiveTicket,
    createSupportTicket,
    sendTicketMessage,
    userRole
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'hotlines' | 'guarantee'>('chat');

  if (!isSupportOpen) return null;

  const currentTicket = activeTicket || tickets[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !currentTicket) return;
    sendTicketMessage(currentTicket.id, inputMessage.trim());
    setInputMessage('');
  };

  const handleQuickIssue = (subject: string, category: any, priority: any, initialMsg: string) => {
    const newT = createSupportTicket(subject, category, priority, initialMsg);
    setActiveTicket(newT);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200 flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-950 text-white rounded-t-2xl relative shrink-0">
          <button
            onClick={() => setIsSupportOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="bg-emerald-500/30 text-emerald-300 text-xs font-bold uppercase px-2.5 py-0.5 rounded-full border border-emerald-400/40 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              24/7 Live Desk Active
            </span>
            <span className="text-xs text-blue-200">Zero Disappointment Guarantee</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black flex items-center gap-2">
            <Headphones className="w-6 h-6 text-blue-400" />
            eShop Global Customer Support (24/7)
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Neither buyers nor sellers should ever be disappointed. Our 24/7 resolution mediators handle escrow protections, photo audits, and disputes in real time.
          </p>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'chat' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Live Resolution Chat
            </button>
            <button
              onClick={() => setActiveTab('guarantee')}
              className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'guarantee' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Zero Disappointment Policy
            </button>
            <button
              onClick={() => setActiveTab('hotlines')}
              className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'hotlines' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              Global 24/7 Hotlines
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 flex-1 flex flex-col space-y-4 overflow-y-auto">
          {activeTab === 'chat' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 flex-1">
              {/* Left Column: Tickets & Quick Actions */}
              <div className="md:col-span-4 space-y-4">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Quick Incident Desks
                  </span>
                  <div className="space-y-2">
                    <button
                      onClick={() =>
                        handleQuickIssue(
                          'Order Undelivered: Freeze SafeEscrow Payout',
                          'order_issue',
                          'urgent',
                          'I have not received my order within the estimated timeline. Please freeze SafeEscrow payout to the seller.'
                        )
                      }
                      className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 text-left text-xs transition cursor-pointer space-y-0.5"
                    >
                      <div className="font-bold text-slate-900 flex items-center justify-between">
                        <span>Freeze Seller Escrow</span>
                        <Lock className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                      <div className="text-[11px] text-slate-500">Item not received or delayed</div>
                    </button>

                    <button
                      onClick={() =>
                        handleQuickIssue(
                          'Non-Original Photo / Stock Photo Scraped Report',
                          'non_original_photo',
                          'urgent',
                          'The received item does not match the original seller workshop photo. I request a return and investigation.'
                        )
                      }
                      className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 text-left text-xs transition cursor-pointer space-y-0.5"
                    >
                      <div className="font-bold text-slate-900 flex items-center justify-between">
                        <span>Report Fake / Stock Photo</span>
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                      <div className="text-[11px] text-slate-500">Listing mismatch dispute</div>
                    </button>

                    <button
                      onClick={() =>
                        handleQuickIssue(
                          'URGENT: Seller Asked for Cash on Delivery (COD)',
                          'order_issue',
                          'urgent',
                          'A seller messaged me asking to settle cash on delivery offline. I know this is strictly prohibited on eShop.'
                        )
                      }
                      className="w-full p-2.5 rounded-xl border border-rose-200 hover:bg-rose-50/50 text-left text-xs transition cursor-pointer space-y-0.5"
                    >
                      <div className="font-bold text-rose-900 flex items-center justify-between">
                        <span>Report COD Solicitation</span>
                        <Ban className="w-3.5 h-3.5 text-rose-600" />
                      </div>
                      <div className="text-[11px] text-rose-700">Level 3 Strike violation</div>
                    </button>
                  </div>
                </div>

                {/* Ticket History */}
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Recent Open Tickets
                  </span>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto">
                    {tickets.map(t => (
                      <button
                        key={t.id}
                        onClick={() => setActiveTicket(t)}
                        className={`w-full p-2.5 rounded-lg text-left text-xs transition cursor-pointer border ${
                          currentTicket?.id === t.id
                            ? 'bg-blue-50 border-blue-400 text-blue-900 font-bold'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] text-slate-400">{t.id}</span>
                          <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                            t.priority === 'urgent' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {t.priority}
                          </span>
                        </div>
                        <div className="truncate text-xs mt-1">{t.subject}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Live Chat Stream */}
              <div className="md:col-span-8 flex flex-col h-[420px] border border-slate-200 rounded-xl bg-slate-50/50 overflow-hidden">
                {/* Active Chat Header */}
                <div className="p-3 bg-white border-b border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block truncate max-w-sm">
                      {currentTicket?.subject || '24/7 Live Support Concierge'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Ticket #{currentTicket?.id} · Assigned to 24/7 Resolution Agent
                    </span>
                  </div>

                  <span className="bg-emerald-50 text-emerald-700 font-bold text-[10px] px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Live Mediator Connected
                  </span>
                </div>

                {/* Message Stream */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {currentTicket?.messages.map(msg => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.sender === 'user' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1 text-[10px] text-slate-400">
                        <span className="font-semibold text-slate-700">{msg.senderName}</span>
                        <span>·</span>
                        <span>{msg.timestamp}</span>
                      </div>

                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-blue-600 text-white rounded-br-xs shadow-xs'
                            : msg.sender === 'system'
                            ? 'bg-amber-100 text-amber-950 border border-amber-300 rounded-bl-xs'
                            : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-2xs'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input Box */}
                <form onSubmit={handleSendMessage} className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={e => setInputMessage(e.target.value)}
                    placeholder="Type your message to 24/7 support specialist..."
                    className="flex-1 px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-hidden"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-xl transition cursor-pointer shadow-xs"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'guarantee' && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 font-black text-emerald-900 text-base">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  eShop Zero Disappointment Covenant
                </div>
                <p className="text-xs text-emerald-950/90 leading-relaxed">
                  "Neither buyer nor seller should ever be disappointed." On eShop, transactions are guarded by real-time escrow, verified 18+ seller identities, mandatory original photography, and zero tolerance for Cash on Delivery (COD) scams.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="border border-slate-200 rounded-xl p-4 space-y-2 bg-slate-50/50">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    For Buyers: 30-Day Money Back Guarantee
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    If your item does not arrive, arrives broken, or fails to match the original workshop photo, 24/7 support freezes the seller's escrow payout and issues a full refund.
                  </p>
                </div>

                <div className="border border-slate-200 rounded-xl p-4 space-y-2 bg-slate-50/50">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-emerald-600" />
                    For Sellers: Guaranteed Payout Protection
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    Sellers who provide authentic original items are protected from fraudulent chargebacks and refused deliveries (which COD normally causes). Funds are securely deposited into verified payout bank accounts.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hotlines' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-600">
                Direct toll-free international telephone lines and instant WhatsApp desks staffed 24/7/365:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 border border-slate-200 rounded-xl bg-slate-50 space-y-1">
                  <div className="font-bold text-slate-900">Sri Lanka (Toll-Free)</div>
                  <div className="font-mono text-blue-600 text-sm font-bold">+94-0787585911</div>
                  <div className="text-[10px] text-slate-400">Average wait time: Under 30 seconds</div>
                </div>

                <div className="p-3.5 border border-slate-200 rounded-xl bg-slate-50 space-y-1">
                  <div className="font-bold text-slate-900">Sri Lanka</div>
                  <div className="font-mono text-blue-600 text-sm font-bold">+94-0787595911</div>
                  <div className="text-[10px] text-slate-400">Multi-language (ENGLISH,TAMIL )</div>
                </div>

                <div className="p-3.5 border border-slate-200 rounded-xl bg-slate-50 space-y-1">
                  <div className="font-bold text-slate-900">Sri Lanka</div>
                  <div className="font-mono text-blue-600 text-sm font-bold">+94-0787585911</div>
                  <div className="text-[10px] text-slate-400">English, Tamil</div>
                </div>

                <div className="p-3.5 border border-slate-200 rounded-xl bg-slate-50 space-y-1">
                  <div className="font-bold text-slate-900">WhatsApp 24/7 Priority Concierge</div>
                  <div className="font-mono text-emerald-600 text-sm font-bold">+94-0787585911</div>
                  <div className="text-[10px] text-slate-400">Instant photo & tracking verification</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
