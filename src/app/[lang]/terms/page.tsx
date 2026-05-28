import { getDictionary } from "@/i18n";
import { getLangFromParams } from "@/i18n";
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'GameGuide Terms of Service — rules and guidelines for using our site.',
};

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(getLangFromParams({ lang }));
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-300">Home</Link>
        <span>/</span>
        <span className="text-gray-400">Terms of Service</span>
      </div>

      <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: May 23, 2026</p>

      <div className="mt-8 space-y-8 text-gray-300 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-white">1. Acceptance of Terms</h2>
          <p className="mt-3">
            By accessing or using GameGuide ("the Site"), you agree to be bound by these Terms of Service.
            If you do not agree with any part of these terms, you must discontinue use of the Site immediately.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">2. Content and Intellectual Property</h2>
          <p className="mt-3">
            All original content published on GameGuide — including guides, articles, images, and site design —
            is the intellectual property of GameGuide and is protected by copyright law. Game titles, logos,
            screenshots, and related trademarks remain property of their respective owners. You may not reproduce,
            distribute, or create derivative works from our content without prior written permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">3. User Accounts</h2>
          <p className="mt-3">
            When creating an account, you agree to provide accurate and complete information. You are responsible
            for maintaining the confidentiality of your login credentials and for all activities under your account.
            We reserve the right to suspend or terminate accounts that violate these terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">4. User-Generated Content</h2>
          <p className="mt-3">
            Users who submit comments, tips, or other content grant GameGuide a non-exclusive, royalty-free,
            perpetual license to use, display, and distribute that content on the Site. You represent that any
            content you submit does not infringe third-party rights and is not unlawful, defamatory, or harmful.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">5. Disclaimer of Warranties</h2>
          <p className="mt-3">
            The Site and its content are provided "as is" without any warranties, express or implied. While we
            strive for accuracy, we do not guarantee that guides are error-free, complete, or will produce specific
            results. Game updates and patches may render certain guide information outdated.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">6. Limitation of Liability</h2>
          <p className="mt-3">
            GameGuide shall not be liable for any indirect, incidental, special, or consequential damages
            arising from your use of the Site or reliance on its content. This includes, but is not limited to,
            lost game progress, hardware issues, or any other damages related to following our guides.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">7. Third-Party Links and Advertisements</h2>
          <p className="mt-3">
            The Site may contain links to third-party websites and display advertisements. We are not responsible
            for the content, privacy practices, or terms of these external sites. Interactions with advertisers
            are solely between you and the advertiser.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">8. Changes to Terms</h2>
          <p className="mt-3">
            We reserve the right to modify these Terms of Service at any time. Changes become effective upon
            posting. Your continued use of the Site after changes are posted constitutes acceptance of the
            modified terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">9. Governing Law</h2>
          <p className="mt-3">
            These terms are governed by the laws of the State of California, United States, without regard to
            conflict of law principles. Any disputes arising from these terms shall be resolved in the courts
            of San Francisco County, California.
          </p>
        </section>
      </div>
    </div>
  );
}
// Updated: 2026-05-26 - Phase 3 i18n