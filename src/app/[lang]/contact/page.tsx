import { getDictionary } from "@/i18n";
import { getLangFromParams } from "@/i18n";
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the GameGuide Pro team. Request guides, report issues, or send feedback.',
};

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(getLangFromParams({ lang }));
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-300">Home</Link>
        <span>/</span>
        <span className="text-gray-400">Contact</span>
      </div>

      <h1 className="text-3xl font-bold text-white">Contact Us</h1>
      <p className="mt-2 text-gray-400">
        Have a question, suggestion, or want to request a guide? We&apos;d love to hear from you.
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Email</h3>
            <p className="mt-2 text-white">contact@gameguidepro.com</p>
            <p className="mt-1 text-sm text-gray-500">We typically respond within 24-48 hours.</p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Guide Requests</h3>
            <p className="mt-2 text-gray-300">
              Looking for a guide we haven&apos;t covered yet? Send us your request and we&apos;ll prioritize
              the most popular games and topics.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Content Corrections</h3>
            <p className="mt-2 text-gray-300">
              Found an error in one of our guides? Let us know and we&apos;ll update it promptly.
              Include the guide URL and a description of the issue.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
          <h3 className="text-lg font-semibold text-white">Send a Message</h3>
          <form className="mt-4 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-gray-200 placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-gray-200 placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-gray-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
              >
                <option value="general">General Inquiry</option>
                <option value="guide-request">Guide Request</option>
                <option value="correction">Content Correction</option>
                <option value="bug">Report a Bug</option>
                <option value="partnership">Partnership / Advertising</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-gray-200 placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 resize-none"
                placeholder="Tell us what's on your mind..."
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-purple-500"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
// Updated: 2026-05-26 - Phase 3 i18n