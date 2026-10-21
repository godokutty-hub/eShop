/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  Camera,
  ShieldCheck,
  AlertTriangle,
  Upload,
  CheckCircle2,
  Sparkles,
  Info,
  DollarSign
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AddProductModal: React.FC = () => {
  const {
    isAddProductOpen,
    setIsAddProductOpen,
    addNewProduct,
    currency,
    formatPrice,
    activeStore,
    merchant
  } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(activeStore.category || 'Electronics');
  const [priceUSD, setPriceUSD] = useState('89.00');
  const [originalPriceUSD, setOriginalPriceUSD] = useState('129.00');
  const [stock, setStock] = useState('25');
  const [estimatedDays, setEstimatedDays] = useState('4');
  const [shippingFree, setShippingFree] = useState(true);

  // Original Photo Verification State
  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1000&q=80'
  );
  const [cameraModel, setCameraModel] = useState('Sony A7 IV / Original Workshop Camera');
  const [isStockScraped, setIsStockScraped] = useState(false); // Can toggle to test rejection!
  const [photoScore, setPhotoScore] = useState(99);
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'passed' | 'rejected'>('passed');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isAddProductOpen) return null;

  const handleRunPhotoScan = (simulateScraped = false) => {
    setScanStatus('scanning');
    setErrorMessage('');

    setTimeout(() => {
      if (simulateScraped) {
        setIsStockScraped(true);
        setPhotoScore(34);
        setScanStatus('rejected');
        setErrorMessage('SCAN FAILED: Web Stock Scrape Detected! Image matched Google/Shutterstock image hashes with watermarks. Original seller-taken photos are legally required.');
      } else {
        setIsStockScraped(false);
        setPhotoScore(98);
        setScanStatus('passed');
      }
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (scanStatus === 'rejected' || isStockScraped) {
      setErrorMessage('Listing Blocked: eShop Mandate requires 100% original photos. Please upload genuine original pictures.');
      return;
    }

    const priceNum = parseFloat(priceUSD) || 10;
    const origNum = parseFloat(originalPriceUSD) || priceNum * 1.3;

    const result = addNewProduct({
      title,
      description,
      category,
      priceUSD: priceNum,
      originalPriceUSD: origNum,
      rating: 5.0,
      reviewsCount: 1,
      soldCount: 0,
      stock: parseInt(stock) || 10,
      images: [imageUrl],
      hasOriginalPhotos: true,
      photoVerification: {
        isOriginalVerified: true,
        cameraModel,
        captureTimestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
        authenticityScore: photoScore,
        watermarksDetected: false,
        isStockPhotoScraped: false,
        verificationBadge: 'Verified Workshop Original Photo'
      },
      shippingFree,
      estimatedDays: parseInt(estimatedDays) || 5,
      tags: ['Verified Original', 'New Listing', 'SafeEscrow'],
      specifications: {
        'Condition': 'Brand New Authentic Item',
        'Merchant ID': merchant.id,
        'Photo Inspection': 'Passed 100% Genuine Check',
        'Escrow Coverage': 'SafeEscrow Guaranteed'
      }
    });

    if (result.success) {
      setIsAddProductOpen(false);
    } else {
      setErrorMessage(result.error || 'Failed to list item');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white rounded-t-2xl relative">
          <button
            onClick={() => setIsAddProductOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="bg-emerald-500/30 text-emerald-300 text-xs font-bold uppercase px-2.5 py-0.5 rounded-full border border-emerald-400/40">
              Mandatory Original Photos Only
            </span>
            <span className="text-xs text-slate-300">{activeStore.storeName}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black flex items-center gap-2">
            <Camera className="w-6 h-6 text-emerald-400" />
            List Item with Original Photo Verification
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            All items are inspected against scraped stock photos before going live on eShop global marketplace.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {errorMessage && (
            <div className="bg-rose-50 border-2 border-rose-300 rounded-xl p-3.5 text-xs text-rose-900 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Violation Alert: </span>
                {errorMessage}
              </div>
            </div>
          )}

          {/* 1. Mandatory Original Photo Section */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-900">
                  Step 1: Upload Original Photo & Run EXIF Scan
                </span>
              </div>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                scanStatus === 'passed' ? 'bg-emerald-100 text-emerald-800' : scanStatus === 'rejected' ? 'bg-rose-100 text-rose-800' : 'bg-slate-200 text-slate-700'
              }`}>
                {scanStatus === 'passed' ? '✓ Authenticity Passed (98%)' : scanStatus === 'rejected' ? '✕ Stock Scrape Detected' : 'Pending Scan'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <div className="sm:col-span-4 aspect-video sm:aspect-square rounded-lg overflow-hidden border border-slate-300 bg-slate-200 relative">
                <img src={imageUrl} alt="preview" className="w-full h-full object-cover" />
                {scanStatus === 'passed' && (
                  <div className="absolute inset-0 bg-emerald-950/40 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 drop-shadow" />
                  </div>
                )}
              </div>

              <div className="sm:col-span-8 space-y-2">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Product Image URL / Live Camera Photo</label>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={e => setImageUrl(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Camera / Hardware Signature</label>
                  <input
                    type="text"
                    value={cameraModel}
                    onChange={e => setCameraModel(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                  />
                </div>

                {/* Tester toggles for the user to try passing vs simulated stock scrap violation */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleRunPhotoScan(false)}
                    className="text-[11px] font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-md transition cursor-pointer"
                  >
                    ✓ Test Original Scan (Pass)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRunPhotoScan(true)}
                    className="text-[11px] font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-2.5 py-1 rounded-md transition cursor-pointer"
                  >
                    ⚠ Test Scraped Stock (Simulate Reject)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Product Details */}
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Item Title (Exact & Transparent)</label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Wireless Smart Noise-Cancelling Earbuds with Charging Case"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion & Apparel">Fashion & Apparel</option>
                  <option value="Home & Living">Home & Living</option>
                  <option value="Automotive & Tools">Automotive & Tools</option>
                  <option value="Collectibles">Collectibles</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Stock Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={stock}
                  onChange={e => setStock(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Selling Price (USD)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs text-slate-400">$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    value={priceUSD}
                    onChange={e => setPriceUSD(e.target.value)}
                    className="w-full pl-6 pr-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Original Price (For Discount Display)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs text-slate-400">$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    value={originalPriceUSD}
                    onChange={e => setOriginalPriceUSD(e.target.value)}
                    className="w-full pl-6 pr-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Detailed Description & Specifications</label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Include accurate dimensions, warranty, accessories included in box, and dispatch timeline."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-hidden"
              />
            </div>
          </div>

          {/* 3. Escrow and Anti-COD reminder */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">SafeEscrow & Anti-COD Acknowledgment:</span>
              <p className="text-[11px] text-amber-800">
                You will receive payout after the buyer receives this item. Attempting to ship cash-on-delivery or messaging buyers to pay offline violates eShop terms and results in immediate Strike 3 termination.
              </p>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setIsAddProductOpen(false)}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={scanStatus === 'rejected'}
              className={`px-6 py-2.5 text-xs font-bold rounded-xl transition cursor-pointer shadow-md ${
                scanStatus === 'rejected'
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30'
              }`}
            >
              Publish Listing with Verified Original Seal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
