import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Upload, Check, X, Loader2 } from 'lucide-react';

const CATEGORIES = [
  'Anti-inflammatory/Analgesic',
  'Anti-parasitic',
  'Antibiotics',
  'Nutritional supplement',
  'Respiratory system'
];

const SPECIES = ['Bovine', 'Porcine', 'Ovine', 'Poultry', 'Equine', 'Caprine', 'Aquaculture', 'Bees'];

function ProductPreview({ product, onApprove, onReject }) {
  const [edited, setEdited] = useState(product);

  return (
    <motion.div
      layout
      className="border border-primary/30 rounded-xl p-6 bg-card/50"
    >
      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="font-orbitron text-xs font-bold text-primary mb-1 block">NAME</label>
          <input
            type="text"
            value={edited.name}
            onChange={(e) => setEdited({...edited, name: e.target.value})}
            className="w-full bg-background border border-border rounded px-3 py-2 font-inter text-sm text-foreground"
          />
        </div>

        {/* Category */}
        <div>
          <label className="font-orbitron text-xs font-bold text-primary mb-1 block">CATEGORY</label>
          <select
            value={edited.category}
            onChange={(e) => setEdited({...edited, category: e.target.value})}
            className="w-full bg-background border border-border rounded px-3 py-2 font-inter text-sm text-foreground"
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="font-orbitron text-xs font-bold text-primary mb-1 block">DESCRIPTION</label>
          <textarea
            value={edited.description || ''}
            onChange={(e) => setEdited({...edited, description: e.target.value})}
            rows="3"
            className="w-full bg-background border border-border rounded px-3 py-2 font-inter text-sm text-foreground resize-none"
          />
        </div>

        {/* Species */}
        <div>
          <label className="font-orbitron text-xs font-bold text-primary mb-2 block">SPECIES</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {SPECIES.map(sp => (
              <label key={sp} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={edited.species?.includes(sp) || false}
                  onChange={(e) => {
                    const newSpecies = e.target.checked
                      ? [...(edited.species || []), sp]
                      : (edited.species || []).filter(s => s !== sp);
                    setEdited({...edited, species: newSpecies});
                  }}
                  className="w-4 h-4"
                />
                <span className="font-inter text-xs">{sp}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Features */}
        <div>
          <label className="font-orbitron text-xs font-bold text-primary mb-1 block">FEATURES</label>
          <div className="space-y-2">
            {(edited.features || []).map((f, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  value={f}
                  onChange={(e) => {
                    const newFeatures = [...(edited.features || [])];
                    newFeatures[i] = e.target.value;
                    setEdited({...edited, features: newFeatures});
                  }}
                  className="flex-1 bg-background border border-border rounded px-3 py-2 font-inter text-sm text-foreground"
                />
                <button
                  onClick={() => setEdited({...edited, features: (edited.features || []).filter((_, idx) => idx !== i)})}
                  className="px-3 py-2 bg-destructive/20 rounded text-destructive hover:bg-destructive/30"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() => setEdited({...edited, features: [...(edited.features || []), '']})}
              className="px-3 py-2 bg-primary/20 rounded text-primary text-sm font-orbitron hover:bg-primary/30 w-full"
            >
              + Add Feature
            </button>
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="font-orbitron text-xs font-bold text-primary mb-1 block">PRICE (USD)</label>
          <input
            type="number"
            step="0.01"
            value={edited.price || ''}
            onChange={(e) => setEdited({...edited, price: e.target.value ? parseFloat(e.target.value) : null})}
            className="w-full bg-background border border-border rounded px-3 py-2 font-inter text-sm text-foreground"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-6 pt-6 border-t border-border">
        <button
          onClick={() => onApprove(edited)}
          className="flex-1 px-4 py-2 bg-green-500/20 text-green-400 rounded font-orbitron text-sm font-bold hover:bg-green-500/30 flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4" /> APPROVE
        </button>
        <button
          onClick={() => onReject()}
          className="flex-1 px-4 py-2 bg-destructive/20 text-destructive rounded font-orbitron text-sm font-bold hover:bg-destructive/30 flex items-center justify-center gap-2"
        >
          <X className="w-4 h-4" /> REJECT
        </button>
      </div>
    </motion.div>
  );
}

export default function ProductImport() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [extractedProducts, setExtractedProducts] = useState([]);
  const [approved, setApproved] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setLoading(true);
    setExtractedProducts([]);
    setApproved([]);
    setUploadSuccess(false);

    try {
      // Upload PDF
      const uploadRes = await base44.integrations.Core.UploadFile({ file: selectedFile });
      
      // Extract data from PDF
      const extractRes = await base44.functions.invoke('extractProductPdf', {
        file_url: uploadRes.file_url
      });

      if (extractRes.data.success) {
        setExtractedProducts(extractRes.data.products || []);
      } else {
        alert('Failed to extract products: ' + extractRes.data.error);
      }
    } catch (error) {
      alert('Upload error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (product) => {
    const newApproved = [...approved, product];
    setApproved(newApproved);
    setExtractedProducts(extractedProducts.filter(p => p !== extractedProducts.find(x => x.name === product.name)));
  };

  const handleReject = (product) => {
    setExtractedProducts(extractedProducts.filter(p => p !== product));
  };

  const handleSaveAll = async () => {
    if (approved.length === 0) {
      alert('No products to save');
      return;
    }

    setLoading(true);
    try {
      await base44.entities.Product.bulkCreate(approved);
      setUploadSuccess(true);
      setApproved([]);
      setFile(null);
      setTimeout(() => setUploadSuccess(false), 5000);
    } catch (error) {
      alert('Save error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="font-mono text-[10px] tracking-[6px] text-primary mb-4">
            ADMIN TOOLS
          </div>
          <h1 className="font-orbitron text-4xl font-bold text-foreground mb-4">
            IMPORT PRODUCTS FROM PDF
          </h1>
          <p className="font-inter text-gray-400">
            Upload product PDFs. Review extracted data. Approve before adding to catalog.
          </p>
        </motion.div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-12 p-8 border-2 border-dashed border-primary/40 rounded-xl text-center"
        >
          <label className="cursor-pointer">
            <div className="flex flex-col items-center gap-4">
              <Upload className="w-12 h-12 text-primary" />
              <div>
                <p className="font-orbitron font-bold text-white mb-1">UPLOAD PDF</p>
                <p className="font-inter text-sm text-gray-400">Click to select a PDF file</p>
              </div>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                disabled={loading}
                className="hidden"
              />
            </div>
          </label>
        </motion.div>

        {/* Loading State */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-3 mb-8 p-6 bg-primary/10 rounded-xl"
            >
              <Loader2 className="w-5 h-5 text-primary animate-spin" />
              <p className="font-inter text-primary">Processing PDF...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Message */}
        <AnimatePresence>
          {uploadSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-8 p-6 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-3"
            >
              <Check className="w-5 h-5 text-green-400" />
              <p className="font-inter text-green-400">{approved.length} products successfully added to catalog!</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Extracted Products for Review */}
        {extractedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-12"
          >
            <h2 className="font-orbitron text-2xl font-bold text-foreground mb-6">
              REVIEW EXTRACTED PRODUCTS ({extractedProducts.length})
            </h2>
            <div className="space-y-6">
              {extractedProducts.map((product, i) => (
                <ProductPreview
                  key={i}
                  product={product}
                  onApprove={() => handleApprove(product)}
                  onReject={() => handleReject(product)}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Approved Products */}
        {approved.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-12 p-6 bg-green-500/5 border border-green-500/30 rounded-xl"
          >
            <h2 className="font-orbitron text-xl font-bold text-green-400 mb-4">
              APPROVED PRODUCTS ({approved.length})
            </h2>
            <div className="space-y-2 mb-6">
              {approved.map((p, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-background rounded">
                  <span className="font-inter text-sm">{p.name}</span>
                  <span className="font-mono text-xs text-primary">{p.category}</span>
                </div>
              ))}
            </div>
            <button
              onClick={handleSaveAll}
              disabled={loading}
              className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-xl font-orbitron font-bold hover:opacity-90 disabled:opacity-50"
            >
              {loading ? 'SAVING...' : 'SAVE ALL TO CATALOG'}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}