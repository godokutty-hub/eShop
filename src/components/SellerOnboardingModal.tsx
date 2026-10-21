/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  Building,
  CreditCard,
  Store,
  FileCheck,
  Upload,
  Camera,
  ArrowRight,
  ArrowLeft,
  Lock,
  Ban
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';

export const SellerOnboardingModal: React.FC = () => {
  const {
    isSellerOnboardingOpen,
    setIsSellerOnboardingOpen,
    completeMerchant18PlusOnboarding,
    merchant,
    setUserRole,
    country
  } = useApp();

  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [fullName, setFullName] = useState(merchant.fullName || '');
  const [dob, setDob] = useState(merchant.dateOfBirth || '1995-04-12');
  const [idType, setIdType] = useState<'passport' | 'national_id' | 'driver_license'>('passport');
  const [idNumber, setIdNumber] = useState(merchant.idNumber || 'US-99128410');
  const [resCountry, setResCountry] = useState(merchant.residentialCountry || country.name);
  const [address, setAddress] = useState(merchant.residentialAddress || '100 Market St, Suite 500');
  const [taxId, setTaxId] = useState(merchant.taxIdentificationNumber || 'TAX-99214092');

  // Payout Method State
  const [payoutType, setPayoutType] = useState<'bank_wire' | 'payoneer' | 'paypal'>('bank_wire');
  const [bankName, setBankName] = useState('Standard Chartered Global');
  const [ibanSwift, setIbanSwift] = useState('SCBLUS33XXX / GB99SCBL12345678');
  const [paypalEmail, setPaypalEmail] = useState('merchant.payouts@eshop-seller.com');
  const [payoneerId, setPayoneerId] = useState('PAYO-8821948');

  // Store 1 Setup
  const [storeName, setStoreName] = useState('Global Tech & Gadgets');
  const [storeCategory, setStoreCategory] = useState('Electronics');
  const [storeDesc, setStoreDesc] = useState('Premium authentic electronics with 100% original workshop photographs.');

  // Agreements
  const [pledgeOriginalPhotos, setPledgeOriginalPhotos] = useState(true);
  const [agreeNoCod, setAgreeNoCod] = useState(true);
  const [agreeStrikeSystem, setAgreeStrikeSystem] = useState(true);
  const [agreeCustomerSupport, setAgreeCustomerSupport] = useState(true);

  if (!isSellerOnboardingOpen) return null;

  // Calculate live age from DOB
  const calculateAge = (birthdateStr: string): number => {
    if (!birthdateStr) return 0;
    const birthDate = new Date(birthdateStr);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge(dob);
  const is18Plus = age >= 18;

  const handleNext = () => {
    if (currentStep === 1 && !is18Plus) {
      alert('Underage Alert: Only individuals aged 18+ can open a Seller Account on eShop.');
      return;
    }
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinalSubmit();
    }
  };

  const handleFinalSubmit = () => {
    completeMerchant18PlusOnboarding({
      fullName,
      dateOfBirth: dob,
      calculatedAge: age,
      idType,
      idNumber,
      residentialCountry: resCountry,
      residentialAddress: address,
      taxIdentificationNumber: taxId,
      eShopAntiCounterfeitPledge: pledgeOriginalPhotos,
      noCodPolicyAccepted: agreeNoCod
    });

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setIsSellerOnboardingOpen(false);
    setUserRole('seller');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white rounded-t-2xl relative">
          <button
            onClick={() => setIsSellerOnboardingOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="bg-emerald-500/30 text-emerald-300 text-xs font-bold uppercase px-2.5 py-0.5 rounded-full border border-emerald-400/40">
              18+ Self-Details Seller Account System
            </span>
            <span className="text-xs text-slate-300">International Merchant Gateway</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-blue-400" />
            Merchant Registration & Verification
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Complete the 5 self-details steps to unlock up to 5 verified storefronts with global payout access.
          </p>

          {/* Stepper Bar */}
          <div className="mt-5 grid grid-cols-5 gap-1.5">
            {[
              { num: 1, label: '18+ Age & ID' },
              { num: 2, label: 'Tax & Address' },
              { num: 3, label: 'Payout Method' },
              { num: 4, label: 'Storefront Setup' },
              { num: 5, label: 'Anti-Fraud Pledge' }
            ].map(step => (
              <div key={step.num} className="space-y-1">
                <div
                  className={`h-1.5 rounded-full transition-all ${
                    currentStep >= step.num ? 'bg-blue-500' : 'bg-slate-700'
                  }`}
                />
                <span className="hidden sm:block text-[10px] text-slate-300 font-medium truncate">
                  {step.num}. {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Step Body */}
        <div className="p-6 space-y-6">
          {/* STEP 1: 18+ Age & ID Verification */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Step 1: Legal 18+ Age & Identity Verification</h3>
                  <p className="text-xs text-slate-500">Only persons 18 years or older may operate merchant accounts on eShop.</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${is18Plus ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                  {is18Plus ? `Age Verified (${age} Years Old)` : 'Underage (< 18)'}
                </div>
              </div>

              {!is18Plus && (
                <div className="bg-rose-50 border-2 border-rose-300 rounded-xl p-3 flex items-start gap-2.5 text-rose-900 text-xs">
                  <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Age Restriction Enforcement:</span> eShop terms strictly require sellers to be at least 18 years of age to sign legally binding escrow contracts and accept international card payouts.
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Full Legal Name (as on Gov ID)</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="e.g. Johnathan Alexander Doe"
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Date of Birth (Must be 18+)</label>
                  <input
                    type="date"
                    value={dob}
                    onChange={e => setDob(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Government ID Type</label>
                  <select
                    value={idType}
                    onChange={e => setIdType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-hidden bg-white"
                  >
                    <option value="passport">International Passport</option>
                    <option value="national_id">National Identity Card</option>
                    <option value="driver_license">Driver's License</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">ID / Passport Number</label>
                  <input
                    type="text"
                    value={idNumber}
                    onChange={e => setIdNumber(e.target.value)}
                    placeholder="e.g. P9912048X"
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-hidden"
                  />
                </div>
              </div>

              {/* ID Document & Selfie Upload simulation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-blue-400 transition cursor-pointer bg-slate-50">
                  <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                  <div className="text-xs font-bold text-slate-700">Upload Front of Gov ID</div>
                  <div className="text-[10px] text-slate-400">JPG, PNG, PDF up to 10MB</div>
                  <span className="inline-block mt-2 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    ✓ Document Scanned & Verified
                  </span>
                </div>

                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-blue-400 transition cursor-pointer bg-slate-50">
                  <Camera className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                  <div className="text-xs font-bold text-slate-700">Live Liveness Biometric Check</div>
                  <div className="text-[10px] text-slate-400">Match face to Government ID</div>
                  <span className="inline-block mt-2 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    ✓ Biometric Match: 99.4%
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Tax & Address */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-slate-200">
                <h3 className="text-base font-bold text-slate-900">Step 2: Legal Entity, Tax & Residential Details</h3>
                <p className="text-xs text-slate-500">Required for international cross-border trade and tax compliance.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Country of Residence / Incorporation</label>
                  <input
                    type="text"
                    value={resCountry}
                    onChange={e => setResCountry(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Tax ID Number (TIN / VAT / EIN / SSN)</label>
                  <input
                    type="text"
                    value={taxId}
                    onChange={e => setTaxId(e.target.value)}
                    placeholder="e.g. EIN-84-991204"
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-hidden"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Registered Physical Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="Street address, Suite / Floor, City, Postal Code"
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-hidden"
                  />
                </div>
              </div>

              <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3 text-xs text-blue-900 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  Your tax information is encrypted with bank-level AES-256 and shared only with international customs authorities for legitimate cross-border parcel clearance.
                </span>
              </div>
            </div>
          )}

          {/* STEP 3: Seller Payout Method */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-slate-200">
                <h3 className="text-base font-bold text-slate-900">Step 3: Connect Seller Payout Method</h3>
                <p className="text-xs text-slate-500">Configure where you receive SafeEscrow payouts across 150+ countries.</p>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'bank_wire', title: 'Bank Wire / SWIFT', desc: 'Direct IBAN / ACH wire transfer' },
                  { id: 'payoneer', title: 'Payoneer Global', desc: 'Low fees multi-currency payout' },
                  { id: 'paypal', title: 'PayPal Business', desc: 'Instant merchant transfers' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setPayoutType(opt.id as any)}
                    className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                      payoutType === opt.id
                        ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900">{opt.title}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>

              {payoutType === 'bank_wire' && (
                <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Bank Name</label>
                    <input
                      type="text"
                      value={bankName}
                      onChange={e => setBankName(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">IBAN / SWIFT-BIC / Account Number</label>
                    <input
                      type="text"
                      value={ibanSwift}
                      onChange={e => setIbanSwift(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                    />
                  </div>
                </div>
              )}

              {payoutType === 'payoneer' && (
                <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Payoneer Account ID / Email</label>
                    <input
                      type="text"
                      value={payoneerId}
                      onChange={e => setPayoneerId(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                    />
                  </div>
                </div>
              )}

              {payoutType === 'paypal' && (
                <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">PayPal Merchant Email Address</label>
                    <input
                      type="email"
                      value={paypalEmail}
                      onChange={e => setPaypalEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                    />
                  </div>
                </div>
              )}

              <div className="text-[11px] text-slate-500 bg-amber-50 border border-amber-200 p-2.5 rounded-lg flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  Escrow Payout Timeline: Payouts are automatically routed to your method 72 hours following package delivery or immediate buyer confirmation.
                </span>
              </div>
            </div>
          )}

          {/* STEP 4: First Storefront Setup */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Step 4: Launch Your First Storefront (Slot 1 of 5)</h3>
                    <p className="text-xs text-slate-500">You can create up to 5 individual store identities under this 18+ merchant profile.</p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 font-extrabold text-xs px-2.5 py-1 rounded-md">
                    Store 1 / 5
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Store Name</label>
                  <input
                    type="text"
                    value={storeName}
                    onChange={e => setStoreName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Primary Product Category</label>
                  <select
                    value={storeCategory}
                    onChange={e => setStoreCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-hidden bg-white"
                  >
                    <option value="Electronics">Electronics & Hardware</option>
                    <option value="Fashion & Apparel">Fashion & Apparel</option>
                    <option value="Home & Living">Home & Living</option>
                    <option value="Automotive & Tools">Automotive & Tools</option>
                    <option value="Collectibles">Rare Collectibles & Antiques</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Storefront Bio & Buyer Commitment</label>
                  <textarea
                    rows={3}
                    value={storeDesc}
                    onChange={e => setStoreDesc(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-hidden"
                  />
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800">1-Store Management Perk:</span>
                  <p className="text-[11px] text-slate-500">You can add Stores #1 anytime directly from your Seller Hub tabs.</p>
                </div>
                <Store className="w-6 h-6 text-blue-600 shrink-0" />
              </div>
            </div>
          )}

          {/* STEP 5: Anti-Fraud Pledge & Terms */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-slate-200">
                <h3 className="text-base font-bold text-slate-900">Step 5: eShop Original Photos & Anti-Fraud Pledge</h3>
                <p className="text-xs text-slate-500">
                  Strict standards protect both buyers and sellers so that no one is ever disappointed.
                </p>
              </div>

              <div className="space-y-3">
                <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100/70 transition">
                  <input
                    type="checkbox"
                    checked={pledgeOriginalPhotos}
                    onChange={e => setPledgeOriginalPhotos(e.target.checked)}
                    className="mt-1 w-4 h-4 text-blue-600 rounded"
                  />
                  <div className="text-xs text-slate-700">
                    <span className="font-bold text-slate-900 block">Mandatory 100% Original Pictures Pledge</span>
                    I legally swear and agree that all product photos uploaded to my store are authentic original pictures taken by me. I understand that scraped stock photos from web catalogs trigger automated strike warnings and immediate listing removal.
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100/70 transition">
                  <input
                    type="checkbox"
                    checked={agreeNoCod}
                    onChange={e => setAgreeNoCod(e.target.checked)}
                    className="mt-1 w-4 h-4 text-blue-600 rounded"
                  />
                  <div className="text-xs text-slate-700">
                    <span className="font-bold text-slate-900 block">Strict Anti-COD (Cash on Delivery) Policy</span>
                    I acknowledge that eShop operates strictly via digital SafeEscrow. I will never ask buyers for cash or attempt off-platform COD settlement. I understand that doing so incurs a Strike 3 Permanent Ban and forfeiture of escrow funds.
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100/70 transition">
                  <input
                    type="checkbox"
                    checked={agreeStrikeSystem}
                    onChange={e => setAgreeStrikeSystem(e.target.checked)}
                    className="mt-1 w-4 h-4 text-blue-600 rounded"
                  />
                  <div className="text-xs text-slate-700">
                    <span className="font-bold text-slate-900 block">3-Strike Warning & Permanent Ban Law</span>
                    I accept the eShop Progressive Strike Law (Strike 1: Notice, Strike 2: 7-day listing freeze, Strike 3: Permanent Ban across all 5 stores and ID blacklist).
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100/70 transition">
                  <input
                    type="checkbox"
                    checked={agreeCustomerSupport}
                    onChange={e => setAgreeCustomerSupport(e.target.checked)}
                    className="mt-1 w-4 h-4 text-blue-600 rounded"
                  />
                  <div className="text-xs text-slate-700">
                    <span className="font-bold text-slate-900 block">Zero Buyer Disappointment & 24/7 Support Cooperation</span>
                    I agree to respond to buyer inquiries and cooperate with the eShop 24/7 Customer Support mediation desk to resolve issues quickly.
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Footer Controls */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous Step
              </button>
            ) : (
              <div></div>
            )}

            <button
              onClick={handleNext}
              disabled={currentStep === 1 && !is18Plus}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                currentStep === 1 && !is18Plus
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/30'
              }`}
            >
              <span>{currentStep === 5 ? 'Complete 18+ Verification & Launch' : 'Continue to Next Step'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
