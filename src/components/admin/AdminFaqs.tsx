import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  Check,
  Eye,
  EyeOff,
} from 'lucide-react';
import { cmsService } from '../../services/cmsService';
import { CmsFaq } from '../../types/cms';

export const AdminFaqs: React.FC = () => {
  const [faqs, setFaqs] = useState<CmsFaq[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Edit / Add modal
  const [editingFaq, setEditingFaq] = useState<CmsFaq | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formQuestion, setFormQuestion] = useState('');
  const [formAnswer, setFormAnswer] = useState('');
  const [formCategory, setFormCategory] = useState<CmsFaq['category']>('hosting');
  const [formOrder, setFormOrder] = useState(1);

  const loadFaqs = async () => {
    setIsLoading(true);
    try {
      const items = await cmsService.getFaqs();
      setFaqs(items);
    } catch (err) {
      console.error('Failed to load FAQs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenAdd = () => {
    setEditingFaq(null);
    setFormQuestion('');
    setFormAnswer('');
    setFormCategory('hosting');
    setFormOrder(faqs.length + 1);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (f: CmsFaq) => {
    setEditingFaq(f);
    setFormQuestion(f.question);
    setFormAnswer(f.answer);
    setFormCategory(f.category);
    setFormOrder(f.order);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formQuestion.trim() || !formAnswer.trim()) return;

    try {
      const saved = await cmsService.saveFaq({
        id: editingFaq?.id,
        question: formQuestion.trim(),
        answer: formAnswer.trim(),
        category: formCategory,
        order: Number(formOrder),
        isPublished: editingFaq ? editingFaq.isPublished : true,
      });

      if (editingFaq) {
        setFaqs(prev => prev.map(f => (f.id === saved.id ? saved : f)));
        showToast('FAQ entry updated.');
      } else {
        setFaqs(prev => [...prev, saved]);
        showToast('New FAQ entry created.');
      }
      setIsModalOpen(false);
    } catch {
      showToast('Failed to save FAQ.');
    }
  };

  const handleTogglePublish = async (faq: CmsFaq) => {
    try {
      const updated = await cmsService.saveFaq({
        ...faq,
        isPublished: !faq.isPublished,
      });
      setFaqs(prev => prev.map(f => (f.id === faq.id ? updated : f)));
      showToast(`FAQ "${faq.question.substring(0, 25)}..." is now ${updated.isPublished ? 'published' : 'hidden'}.`);
    } catch {
      showToast('Failed to toggle status.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this FAQ entry?')) return;
    try {
      const ok = await cmsService.deleteFaq(id);
      if (ok) {
        setFaqs(prev => prev.filter(f => f.id !== id));
        showToast('FAQ deleted.');
      }
    } catch {
      showToast('Failed to delete FAQ.');
    }
  };

  const filteredFaqs = faqs
    .filter(f => selectedCategory === 'all' || f.category === selectedCategory)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-emerald-400" />
            <span>FAQs Content Manager</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Maintain customer self-service answers across Hosting, Domains, and WHMCS Billing topics.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add FAQ Entry</span>
        </button>
      </div>

      {/* Toast */}
      {toastMessage && (
        <div role="status" className="p-3 bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs font-semibold rounded-xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-2">
        {['all', 'hosting', 'domains', 'billing_whmcs', 'general'].map(cat => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-slate-800 text-white border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            {cat.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* FAQs List */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden shadow-md">
        {isLoading ? (
          <div className="py-16 text-center text-xs text-slate-400">Loading FAQs...</div>
        ) : filteredFaqs.length === 0 ? (
          <div className="py-16 text-center text-slate-400 space-y-2">
            <HelpCircle className="w-10 h-10 mx-auto text-slate-600" />
            <p className="text-sm font-semibold text-slate-300">No FAQ entries found</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-850">
            {filteredFaqs.map(faq => (
              <div key={faq.id} className="p-4 sm:p-5 space-y-2 hover:bg-slate-900/60 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">
                        {faq.question}
                      </span>
                      <span className="text-[9px] uppercase font-mono text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                        {faq.category.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleTogglePublish(faq)}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        faq.isPublished ? 'text-emerald-400 hover:bg-emerald-950/40' : 'text-slate-600 hover:bg-slate-900'
                      }`}
                      title={faq.isPublished ? 'Published' : 'Hidden'}
                    >
                      {faq.isPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenEdit(faq)}
                      className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-850 rounded-lg transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(faq.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit / Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">
              {editingFaq ? 'Edit FAQ Entry' : 'Create New FAQ'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Question</label>
                <input
                  type="text"
                  required
                  value={formQuestion}
                  onChange={e => setFormQuestion(e.target.value)}
                  placeholder="e.g. How does domain privacy protection work?"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Answer</label>
                <textarea
                  rows={4}
                  required
                  value={formAnswer}
                  onChange={e => setFormAnswer(e.target.value)}
                  placeholder="Detailed answer text..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-hidden focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="hosting">Web & Cloud Hosting</option>
                    <option value="domains">Domains & DNS</option>
                    <option value="billing_whmcs">Billing & WHMCS</option>
                    <option value="general">General</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Display Order</label>
                  <input
                    type="number"
                    value={formOrder}
                    onChange={e => setFormOrder(Number(e.target.value))}
                    min={1}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-hidden focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-300 rounded-xl font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold cursor-pointer"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
