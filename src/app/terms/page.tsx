import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Supreme Villagio',
  description: 'Terms of Service for Supreme Villagio in Somatane, Pune.',
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <Link href="/" className="inline-flex items-center text-stone hover:text-gold transition-colors mb-12">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-serif text-charcoal mb-8">Terms of Service</h1>
        
        <div className="prose prose-stone max-w-none text-stone">
          <p className="mb-6">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>

          <h2 className="text-2xl font-serif text-charcoal mt-10 mb-4">1. Agreement to Terms</h2>
          <p className="mb-6">
            By viewing, accessing, or otherwise using this website, you agree to be bound by these Terms and Conditions of Use. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.
          </p>

          <h2 className="text-2xl font-serif text-charcoal mt-10 mb-4">2. Disclaimer regarding Real Estate Information</h2>
          <p className="mb-6">
            The content on this website is for informational purposes only. The information regarding real estate projects, including but not limited to property descriptions, prices, floor plans, and amenities, is subject to change without notice. All project details are provided in accordance with the Real Estate (Regulation and Development) Act, 2016 (RERA). 
            We make no warranties, expressed or implied, regarding the accuracy, completeness, or reliability of the information.
          </p>

          <h2 className="text-2xl font-serif text-charcoal mt-10 mb-4">3. MahaRERA Registration</h2>
          <p className="mb-6">
            The project has been registered via MahaRERA registration number: P52100046867 (Phase 1), P52100049506 (Phase 2), P52100055048 (Phase 3) and is available on the website maharera.mahaonline.gov.in under registered projects.
          </p>

          <h2 className="text-2xl font-serif text-charcoal mt-10 mb-4">4. Limitations</h2>
          <p className="mb-6">
            In no event shall Supreme Universal or its authorized partners be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website.
          </p>

          <h2 className="text-2xl font-serif text-charcoal mt-10 mb-4">5. Contact Information</h2>
          <p className="mb-6">
            For any queries regarding these Terms of Service, please reach out to us:<br /><br />
            <strong>Email:</strong> Use the contact form on our website<br />
            <strong>Phone:</strong> +91 7744009295
          </p>
        </div>
      </div>
    </main>
  );
}
