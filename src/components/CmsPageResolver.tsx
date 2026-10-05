import React, { useState, useEffect } from 'react';
import {
  FileText,
  Calendar,
  Tag,
  ArrowLeft,
  ArrowRight,
  Globe,
  Share2,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { cmsService } from '../services/cmsService';
import { CmsPage } from '../types/cms';
import { PageContainer } from './ui/PageContainer';
import { Heading, Text } from './ui/Typography';
import { Button } from './ui/Button';

interface CmsPageResolverProps {
  slug: string;
  onAddToCart?: (item: any) => void;
  onOpenLiveChat?: () => void;
  onNavigate: (view: any) => void;
}

export const CmsPageResolver: React.FC<CmsPageResolverProps> = ({
  slug,
  onAddToCart,
  onOpenLiveChat,
  onNavigate,
}) => {
  const [page, setPage] = useState<CmsPage | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadPage() {
      setIsLoading(true);
      try {
        const found = await cmsService.getPageBySlug(slug);
        if (isMounted) {
          setPage(found);
          if (found && found.status === 'published') {
            document.title = `${found.seoTitle || found.title} | Hostxeon`;
          }
        }
      } catch (err) {
        console.error('Error resolving CMS page:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadPage();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (isLoading) {
    return (
      <div className="py-24 text-center text-slate-500">
        <div className="w-8 h-8 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs font-semibold">Loading content...</p>
      </div>
    );
  }

  // Not found or Draft state
  if (!page || page.status !== 'published') {
    return (
      <div className="py-20 sm:py-28 bg-slate-50 min-h-[60vh]">
        <PageContainer>
          <div className="max-w-xl mx-auto text-center bg-white p-8 sm:p-12 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <Heading level={2} className="text-2xl font-black text-slate-900">
              {page ? 'Page Under Review (Draft)' : 'Page Not Found'}
            </Heading>
            <Text variant="small" className="text-gray-600">
              {page
                ? `The page "/${slug}" exists in the CMS but is currently saved as a draft.`
                : `We could not locate a published CMS page with the slug "/${slug}".`}
            </Text>
            <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
              <Button
                variant="primary"
                onClick={() => onNavigate('home')}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                Return to Homepage
              </Button>
              <Button
                variant="outline"
                onClick={() => onNavigate('webhosting')}
              >
                Explore Hosting Plans
              </Button>
            </div>
          </div>
        </PageContainer>
      </div>
    );
  }

  // Render published CMS page
  return (
    <div className="bg-white min-h-[70vh] py-12 sm:py-16">
      <PageContainer>
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Breadcrumb Header */}
          <div className="border-b border-gray-100 pb-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="hover:text-emerald-700 transition-colors cursor-pointer"
              >
                Home
              </button>
              <span>/</span>
              <span className="text-slate-900 font-bold capitalize">{page.category || 'Pages'}</span>
              <span>/</span>
              <span className="text-emerald-700 font-bold">{page.title}</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                {page.category || 'Information'}
              </span>
              {page.publishedAt && (
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span>Published {new Date(page.publishedAt).toLocaleDateString()}</span>
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              {page.title}
            </h1>

            {page.metaDescription && (
              <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed pt-1">
                {page.metaDescription}
              </p>
            )}
          </div>

          {/* Body Content */}
          <div className="prose prose-slate max-w-none text-gray-700 leading-relaxed space-y-4 text-sm sm:text-base">
            <div className="p-6 sm:p-8 bg-slate-50/80 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-[#008a45]" />
                <span>Hostxeon Published Information</span>
              </div>
              <p className="whitespace-pre-line leading-relaxed text-slate-800 font-normal">
                {page.content}
              </p>
            </div>
          </div>

          {/* Bottom Helpful / CTA Ribbon */}
          <div className="pt-8 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <ShieldCheck className="w-4 h-4 text-[#008a45]" />
              <span>Verified Hostxeon Publication • 30-Day Money-Back Guarantee</span>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={onOpenLiveChat}
                leftIcon={<MessageSquare className="w-3.5 h-3.5" />}
              >
                Chat With Support
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => onNavigate('webhosting')}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                View Hosting Plans
              </Button>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};
