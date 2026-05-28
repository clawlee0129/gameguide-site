import { getDictionary } from "@/i18n";
import { getLangFromParams } from "@/i18n";
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'GameGuide Privacy Policy — how we collect, use, and protect your data.',
};

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(getLangFromParams({ lang }));
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-300">Home</Link>
        <span>/</span>
        <span className="text-gray-400">Privacy Policy</span>
      </div>

      <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: May 23, 2026</p>

      <div className="mt-8 space-y-8 text-gray-300 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-white">1. Information We Collect</h2>
          <p className="mt-3">
            GameGuide collects minimal information necessary to provide and improve our service.
            When you visit our site, we automatically collect standard server log data including your
            IP address, browser type, referring pages, and time of visit. If you create an account,
            we collect your email address and a display name of your choice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">2. How We Use Information</h2>
          <p className="mt-3">
            We use collected information to deliver our content, analyze site traffic and usage patterns,
            improve our guides and user experience, and respond to inquiries submitted via our contact form.
            We do not sell, rent, or share your personal information with third parties for their marketing purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">3. Cookies</h2>
          <p className="mt-3">
            We use essential cookies to maintain site functionality and session state. We may also use
            analytics cookies to understand how visitors interact with our content. You can control cookie
            preferences through your browser settings. Disabling cookies may affect certain site features.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">4. Third-Party Services</h2>
          <p className="mt-3">
            Our site may display advertisements through third-party ad networks, which may use their own
            cookies and tracking technologies. We also use analytics services to measure site performance
            and user engagement. These third parties have their own privacy policies governing their use of data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">5. Data Security</h2>
          <p className="mt-3">
            We implement reasonable technical and organizational measures to protect your personal information
            against unauthorized access, alteration, disclosure, or destruction. However, no method of
            transmission over the internet or electronic storage is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">6. Your Rights</h2>
          <p className="mt-3">
            Depending on your jurisdiction, you may have rights to access, correct, delete, or port your
            personal data. To exercise these rights, contact us at privacy@gameguide.guide. We will respond
            to verified requests within the time frame required by applicable law.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">7. Changes to This Policy</h2>
          <p className="mt-3">
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an
            updated effective date. Continued use of the site after changes constitutes acceptance of the
            revised policy. We encourage periodic review of this page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">8. Contact</h2>
          <p className="mt-3">
            For questions about this Privacy Policy, contact us at{' '}
            <Link href="/contact" className="text-purple-400 hover:text-purple-300">our contact page</Link>{' '}
            or email privacy@gameguide.guide.
          </p>
        </section>
      </div>
    </div>
  );
}
// Updated: 2026-05-26 - Phase 3 i18n