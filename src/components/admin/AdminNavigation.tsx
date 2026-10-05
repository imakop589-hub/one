import React, { useState, useEffect } from 'react';
import {
  Menu as MenuIcon,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Link as LinkIcon,
  ChevronRight,
  Eye,
  EyeOff,
} from 'lucide-react';
import { cmsService } from '../../services/cmsService';
import { CmsMenuItem } from '../../types/cms';

export const AdminNavigation: React.FC = () => {
  const [menuItems, setMenuItems] = useState<CmsMenuItem[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('header');
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Edit / Add modal state
  const [editingItem, setEditingItem] = useState<CmsMenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal form fields
  const [formLabel, setFormLabel] = useState('');
  const [formUrl, setFormUrl] = useState('');
  const [formLocation, setFormLocation] = useState<CmsMenuItem['menuLocation']>('header');
  const [formOrder, setFormOrder] = useState(1);
  const [formBadge, setFormBadge] = useState('');
  const [formBadgeColor, setFormBadgeColor] = useState('bg-emerald-100 text-[#008a45]');
  const [formIsExternal, setFormIsExternal] = useState(false);
  const [formIsActive, setFormIsActive] = useState(true);
  const [formTargetView, setFormTargetView] = useState('');

  const loadMenu = async () => {
    setIsLoading(true);
    try {
      const items = await cmsService.getMenuItems();
      setMenuItems(items);
    } catch (err) {
      console.error('Failed to load menu items:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMenu();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormLabel('');
    setFormUrl('#');
    setFormLocation((selectedLocation as any) || 'header');
    setFormOrder(menuItems.filter(i => i.menuLocation === selectedLocation).length + 1);
    setFormBadge('');
    setFormBadgeColor('bg-emerald-100 text-[#008a45]');
    setFormIsExternal(false);
    setFormIsActive(true);
    setFormTargetView('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: CmsMenuItem) => {
    setEditingItem(item);
    setFormLabel(item.label);
    setFormUrl(item.url);
    setFormLocation(item.menuLocation);
    setFormOrder(item.order);
    setFormBadge(item.badge || '');
    setFormBadgeColor(item.badgeColor || 'bg-emerald-100 text-[#008a45]');
    setFormIsExternal(item.isExternal);
    setFormIsActive(item.isActive);
    setFormTargetView(item.targetView || '');
    setIsModalOpen(true);
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formLabel.trim() || !formUrl.trim()) return;

    try {
      const saved = await cmsService.saveMenuItem({
        id: editingItem?.id,
        label: formLabel.trim(),
        url: formUrl.trim(),
        menuLocation: formLocation,
        order: Number(formOrder),
        badge: formBadge.trim() || undefined,
        badgeColor: formBadgeColor.trim() || undefined,
        isExternal: formIsExternal,
        isActive: formIsActive,
        targetView: formTargetView.trim() || undefined,
      });

      if (editingItem) {
        setMenuItems(prev => prev.map(i => (i.id === saved.id ? saved : i)));
        showToast(`Menu item "${saved.label}" updated.`);
      } else {
        setMenuItems(prev => [...prev, saved]);
        showToast(`Menu item "${saved.label}" created.`);
      }
      setIsModalOpen(false);
    } catch {
      showToast('Failed to save menu item.');
    }
  };

  const handleToggleActive = async (item: CmsMenuItem) => {
    try {
      const updated = await cmsService.saveMenuItem({
        ...item,
        isActive: !item.isActive,
      });
      setMenuItems(prev => prev.map(i => (i.id === item.id ? updated : i)));
      showToast(`Link "${item.label}" is now ${updated.isActive ? 'active' : 'hidden'}.`);
    } catch {
      showToast('Failed to toggle status.');
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!window.confirm('Delete this menu item?')) return;
    try {
      const ok = await cmsService.deleteMenuItem(id);
      if (ok) {
        setMenuItems(prev => prev.filter(i => i.id !== id));
        showToast('Menu item deleted.');
      }
    } catch {
      showToast('Failed to delete menu item.');
    }
  };

  const locationTabs = [
    { id: 'header', label: 'Header Navigation' },
    { id: 'mega_domains', label: 'Mega: Domains' },
    { id: 'footer_products', label: 'Footer Products' },
  ];

  const currentItems = menuItems
    .filter(i => i.menuLocation === selectedLocation)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <MenuIcon className="w-6 h-6 text-blue-400" />
            <span>Navigation Menus Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure header bars, mega-menus, and footer link hierarchies without touching code.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Menu Item</span>
        </button>
      </div>

      {/* Toast */}
      {toastMessage && (
        <div role="status" className="p-3 bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs font-semibold rounded-xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Location Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-2">
        {locationTabs.map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setSelectedLocation(tab.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedLocation === tab.id
                ? 'bg-slate-800 text-white border border-slate-700 shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Items List / Table */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden shadow-md">
        {isLoading ? (
          <div className="py-16 text-center text-xs text-slate-400">Loading menu items...</div>
        ) : currentItems.length === 0 ? (
          <div className="py-16 text-center text-slate-400 space-y-2">
            <MenuIcon className="w-10 h-10 mx-auto text-slate-600" />
            <p className="text-sm font-semibold text-slate-300">No menu items configured for this location</p>
            <button
              type="button"
              onClick={handleOpenAddModal}
              className="text-xs text-emerald-400 hover:underline font-semibold cursor-pointer inline-flex items-center gap-1"
            >
              Add the first link <Plus className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-850">
            {currentItems.map((item, idx) => (
              <div key={item.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-900/60 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-6 h-6 rounded-lg bg-slate-900 text-slate-500 font-mono text-[11px] font-bold flex items-center justify-center shrink-0 border border-slate-800">
                    {item.order}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold truncate ${item.isActive ? 'text-white' : 'text-slate-500 line-through'}`}>
                        {item.label}
                      </span>
                      {item.badge && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {item.badge}
                        </span>
                      )}
                      {item.isExternal && (
                        <ExternalLink className="w-3 h-3 text-slate-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs font-mono text-slate-500 truncate">
                      {item.url} {item.targetView ? `(View: ${item.targetView})` : ''}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleToggleActive(item)}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      item.isActive ? 'text-emerald-400 hover:bg-emerald-950/40' : 'text-slate-600 hover:bg-slate-900'
                    }`}
                    title={item.isActive ? 'Hide link' : 'Show link'}
                  >
                    {item.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenEditModal(item)}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-850 rounded-lg transition-colors cursor-pointer"
                    title="Edit item"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors cursor-pointer"
                    title="Delete item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit / Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">
              {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
            </h3>

            <form onSubmit={handleSaveItem} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Label Text</label>
                <input
                  type="text"
                  required
                  value={formLabel}
                  onChange={e => setFormLabel(e.target.value)}
                  placeholder="e.g. Cloud Hosting"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Target URL / Hash</label>
                <input
                  type="text"
                  required
                  value={formUrl}
                  onChange={e => setFormUrl(e.target.value)}
                  placeholder="#cloud or https://..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 font-mono focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Location</label>
                  <select
                    value={formLocation}
                    onChange={e => setFormLocation(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-hidden focus:border-blue-500 cursor-pointer"
                  >
                    <option value="header">Header Main</option>
                    <option value="mega_domains">Mega Domains</option>
                    <option value="footer_products">Footer Products</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Display Order</label>
                  <input
                    type="number"
                    value={formOrder}
                    onChange={e => setFormOrder(Number(e.target.value))}
                    min={1}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Badge Text (Optional)</label>
                <input
                  type="text"
                  value={formBadge}
                  onChange={e => setFormBadge(e.target.value)}
                  placeholder="e.g. Popular, From £0.99"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-hidden focus:border-blue-500"
                />
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
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold cursor-pointer"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
