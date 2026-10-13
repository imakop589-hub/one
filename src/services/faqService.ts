import { CmsFaq } from '../types/cms';
import { resolveStorageAdapter, CmsStorageAdapter } from './storageAdapter';

const adapter: CmsStorageAdapter = resolveStorageAdapter();

export const faqService = {
  async listFAQs(category?: string): Promise<CmsFaq[]> {
    return adapter.getFaqs(category);
  },

  async createFAQ(faqData: Partial<CmsFaq> & { question: string; answer: string }): Promise<CmsFaq> {
    return adapter.saveFaq(faqData);
  },

  async updateFAQ(id: string, updates: Partial<CmsFaq>): Promise<CmsFaq> {
    return adapter.saveFaq({
      ...updates,
      id,
      question: updates.question ?? '',
      answer: updates.answer ?? '',
    });
  },

  async deleteFAQ(id: string): Promise<boolean> {
    return adapter.deleteFaq(id);
  },

  async publishFAQ(id: string, isPublished = true): Promise<CmsFaq | null> {
    return adapter.saveFaq({
      id,
      question: '',
      answer: '',
      isPublished,
    });
  },
};
