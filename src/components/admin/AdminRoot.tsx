import React, { useState, useEffect } from 'react';
import { authService } from '../../services/authService';
import { AdminLogin } from './AdminLogin';
import { AdminLayout, AdminSection } from './AdminLayout';
import { AdminDashboard } from './AdminDashboard';
import { AdminPages } from './AdminPages';
import { AdminPageEditor } from './AdminPageEditor';
import { AdminNavigation } from './AdminNavigation';
import { AdminSettings } from './AdminSettings';
import { AdminMedia } from './AdminMedia';
import { AdminFaqs } from './AdminFaqs';
import { AdminWhmcs } from './AdminWhmcs';
import { CmsPage } from '../../types/cms';

interface AdminRootProps {
  onBackToPublicSite: () => void;
  onNavigatePublicPage?: (slug: string) => void;
}

export const AdminRoot: React.FC<AdminRootProps> = ({
  onBackToPublicSite,
  onNavigatePublicPage,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => authService.isAuthenticated());
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');
  const [editingPageId, setEditingPageId] = useState<string | null>(null);

  // Check auth on mount
  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setActiveSection('dashboard');
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
  };

  const handleEditPage = (pageId: string) => {
    setEditingPageId(pageId);
    setActiveSection('page-edit');
  };

  const handleCreatePage = () => {
    setEditingPageId(null);
    setActiveSection('page-new');
  };

  const handlePageSaved = (savedPage: CmsPage) => {
    setActiveSection('pages');
    setEditingPageId(null);
  };

  const handleViewPageOnSite = (slug: string) => {
    if (onNavigatePublicPage) {
      onNavigatePublicPage(slug);
    } else {
      window.location.hash = `#${slug}`;
    }
  };

  if (!isAuthenticated) {
    return (
      <AdminLogin
        onSuccess={handleLoginSuccess}
        onBackToPublicSite={onBackToPublicSite}
      />
    );
  }

  // Generate dynamic breadcrumbs
  const getBreadcrumbs = () => {
    switch (activeSection) {
      case 'dashboard':
        return [{ label: 'Dashboard' }];
      case 'pages':
        return [{ label: 'Pages CMS' }];
      case 'page-new':
        return [
          { label: 'Pages CMS', action: () => setActiveSection('pages') },
          { label: 'Create New Page' },
        ];
      case 'page-edit':
        return [
          { label: 'Pages CMS', action: () => setActiveSection('pages') },
          { label: 'Edit Page' },
        ];
      case 'navigation':
        return [{ label: 'Navigation Menus' }];
      case 'settings':
        return [{ label: 'Site Settings' }];
      case 'media':
        return [{ label: 'Media Library' }];
      case 'faqs':
        return [{ label: 'FAQs Content' }];
      case 'whmcs':
        return [{ label: 'WHMCS Bridge Config' }];
      default:
        return [{ label: 'Dashboard' }];
    }
  };

  return (
    <AdminLayout
      activeSection={activeSection}
      onSelectSection={sec => {
        setActiveSection(sec);
        if (sec !== 'page-edit' && sec !== 'page-new') {
          setEditingPageId(null);
        }
      }}
      onLogout={handleLogout}
      onViewPublicSite={onBackToPublicSite}
      breadcrumbs={getBreadcrumbs()}
    >
      {activeSection === 'dashboard' && (
        <AdminDashboard
          onNavigateSection={sec => setActiveSection(sec)}
          onEditPage={handleEditPage}
          onCreatePage={handleCreatePage}
          onViewPublicSite={onBackToPublicSite}
        />
      )}

      {activeSection === 'pages' && (
        <AdminPages
          onEditPage={handleEditPage}
          onCreatePage={handleCreatePage}
          onViewPageOnSite={handleViewPageOnSite}
        />
      )}

      {(activeSection === 'page-new' || activeSection === 'page-edit') && (
        <AdminPageEditor
          pageId={editingPageId}
          onBack={() => setActiveSection('pages')}
          onSaved={handlePageSaved}
        />
      )}

      {activeSection === 'navigation' && <AdminNavigation />}

      {activeSection === 'settings' && <AdminSettings />}

      {activeSection === 'media' && <AdminMedia />}

      {activeSection === 'faqs' && <AdminFaqs />}

      {activeSection === 'whmcs' && <AdminWhmcs />}
    </AdminLayout>
  );
};
