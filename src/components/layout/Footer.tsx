import Link from 'next/link';
import { categories } from '@/data/site';
import { Language } from '@/i18n';
import { DictionaryStructure } from '@/i18n/dictionaries';

interface FooterProps {
  lang: Language;
  dict: DictionaryStructure;
}

export function Footer({ lang, dict }: FooterProps) {
  return (
    <footer className="border-t border-gray-800 bg-gray-950">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="text-lg font-bold text-white transition-colors hover:text-purple-400"
            >
              <span className="mr-2 rounded-lg bg-purple-600 px-2 py-1 text-sm font-black text-white">
                GGP
              </span>
              GameGuide
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              {dict.common.footerDescription}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">
              {dict.common.navigation}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${lang}/games`}
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  {dict.nav.games}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/guides`}
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  {dict.nav.guides}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/categories`}
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  {dict.nav.categories}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/builds`}
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  {dict.nav.builds}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/map`}
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  {dict.nav.map}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/forum`}
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  {dict.nav.forum}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">
              {dict.common.topCategories}
            </h3>
            <ul className="space-y-2">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/${lang}/categories/${cat.slug}`}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {cat.icon} {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">
              {dict.common.legal}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${lang}/privacy`}
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  {dict.privacy.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/terms`}
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  {dict.terms.termsOfService}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/contact`}
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  {dict.contact.contactUs}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-6 text-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} {dict.common.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}