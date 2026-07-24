// This serves as the abstraction layer for the future Headless CMS (Sanity.io/Strapi) integration.
// Currently it routes to the local SEO engine, but can be instantly swapped to a fetch request.

import { generateSeoDataFromSlug, generateSeoSlugs } from './seo-data';

export interface CmsPageData {
  title: string;
  description: string;
  heroHeadline1: string;
  heroHeadline2: string;
  heroSubline: string;
  highlightWords: string[];
  pricing: string;
  typology: string;
}

export class CmsProvider {
  /**
   * Fetches the dynamic programmatic SEO page data.
   * In Phase 4, this will be swapped to: return await sanityClient.fetch(...)
   */
  static async getPageData(slugArray: string[]): Promise<CmsPageData> {
    // Simulate network delay for CMS
    // await new Promise(resolve => setTimeout(resolve, 50)); 
    return generateSeoDataFromSlug(slugArray);
  }

  /**
   * Fetches all available paths for static generation (ISR).
   */
  static async getAllSlugs(): Promise<string[][]> {
    return generateSeoSlugs();
  }
}
